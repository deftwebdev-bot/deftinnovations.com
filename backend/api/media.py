"""
Media proxy for Google Drive-hosted videos.

Why this exists:
  Google Drive serves direct-download links (drive.google.com/uc?export=download&id=...)
  with `Content-Disposition: attachment`, which Chrome's Opaque Response Blocking (ORB)
  treats as non-media and blocks with `net::ERR_BLOCKED_BY_ORB` when used as a
  <video src>. Drive also does not send CORS headers on the download hop.

  This endpoint fetches the file server-side (following Drive's redirect) and
  re-serves it as a clean `video/mp4` stream with Range support, from our own origin.

Performance:
  - The first request for a file downloads it from Drive into an on-disk cache
    (_CACHE_DIR). Every later request is served straight from disk — no Drive
    round-trip, no rate-limit exposure, and byte-range seeking at disk speed.
  - A strong ETag (id + size + mtime) lets browsers revalidate: repeat views
    with If-None-Match get a tiny 304 instead of re-downloading.
  - Files bigger than _MAX_CACHE_BYTES are streamed through without caching.
"""
import hashlib
import importlib
import os
import re
import tempfile
import urllib.request
import urllib.error

from django.http import FileResponse, HttpResponse, Http404
from ninja import Router

media_router = Router(tags=["Media"])

# On-disk cache for proxied Drive files. Kept in the system temp dir so it
# survives dev-server autoreloads but never pollutes the repo.
_CACHE_DIR = os.path.join(tempfile.gettempdir(), "deft-media-cache")
os.makedirs(_CACHE_DIR, exist_ok=True)

# Files larger than this are streamed through without caching (protects disk).
_MAX_CACHE_BYTES = 256 * 1024 * 1024

# Cap the cache at ~1 GB; least-recently-used entries are pruned when exceeded.
_MAX_CACHE_TOTAL_BYTES = 1024 * 1024 * 1024

# Timeout for the upstream Drive request.
_TIMEOUT_SECONDS = 30

_CHUNK = 64 * 1024

_CACHE_CONTROL = "public, max-age=86400, stale-while-revalidate=604800"


def _is_valid_drive_id(file_id: str) -> bool:
    return 20 <= len(file_id) <= 64 and all(c.isalnum() or c in "-_" for c in file_id)


_ADVERTISED_IDS_CACHE_KEY = "advertised_drive_ids"
_ADVERTISED_IDS_TTL_SECONDS = 60

# App models whose URL fields may reference Drive files. Every URLField (plus
# the gallery JSONField) on these models is scanned, so a field rename in a
# migration can no longer silently break the allow-list — the old code
# hardcoded HeroContent.video_url, which the 0014 rename turned into
# video_file, making the query crash on every request and the proxy fail open.
_ADVERTISED_MODELS = [
    "apps.blog.models:Article",
    "apps.company.models:CultureGallery",
    "apps.company.models:HeroContent",
    "apps.company.models:TeamMember",
    "apps.company.models:Testimonial",
    "apps.company.models:TrustedBrand",
    "apps.portfolio.models:Project",
    "apps.services.models:Service",
    "apps.services.models:ServiceCategory",
]


def _iter_advertised_urls():
    """Yield every URL stored in the URL/JSON fields of the content models."""
    from django.db.models import JSONField, URLField

    for spec in _ADVERTISED_MODELS:
        module_path, _, model_name = spec.partition(":")
        model = getattr(importlib.import_module(module_path), model_name)
        for field in model._meta.concrete_fields:
            if isinstance(field, URLField):
                values = (
                    model.objects.exclude(**{field.name: ""})
                    .exclude(**{f"{field.name}__isnull": True})
                    .values_list(field.name, flat=True)
                )
                yield from values
            elif isinstance(field, JSONField):
                # e.g. Project.gallery_images (a list of image URLs per row).
                # Only string entries can be URLs — dicts (featured_stats) and
                # tag lists are skipped, and non-strings must never leak into
                # _extract_drive_id, which expects text.
                values = model.objects.exclude(**{field.name: []}).values_list(field.name, flat=True)
                for value in values:
                    if isinstance(value, (list, tuple)):
                        yield from (v for v in value if isinstance(v, str))
                    elif isinstance(value, str) and value:
                        yield value


def _advertised_drive_ids():
    """Drive file IDs currently referenced by live content, or None on DB error.

    Scans every URLField on the content models so the proxy only serves files
    the site genuinely uses. Cached via Django core cache for _ADVERTISED_IDS_TTL_SECONDS
    so admin edits propagate without a DB hit on every media request (and the cache
    is shared across all gunicorn workers). Returns None when the DB can't be reached
    (fail-open, as a hard dependency here would take every hero video down with a
    transient DB blip).
    """
    from django.core.cache import cache as django_cache
    cached = django_cache.get(_ADVERTISED_IDS_CACHE_KEY)
    if cached is not None:
        return cached
    try:
        ids = set()
        for url in _iter_advertised_urls():
            extracted = _extract_drive_id(url)
            if extracted:
                ids.add(extracted)
        django_cache.set(_ADVERTISED_IDS_CACHE_KEY, ids, timeout=_ADVERTISED_IDS_TTL_SECONDS)
        return ids
    except Exception:
        # Fail-open: a DB hiccup shouldn't 404 every video. The failure is not
        # cached, so the next request retries the query.
        return None


def _extract_drive_id(url: str) -> str | None:
    """Pull a Drive file ID out of any common Drive URL shape (or None)."""
    if not url or "drive.google.com" not in url and "drive.usercontent.google.com" not in url:
        return None
    m = re.search(r"/file/d/([a-zA-Z0-9_-]+)", url)
    if m:
        return m.group(1)
    m = re.search(r"[?&]id=([a-zA-Z0-9_-]+)", url)
    if m:
        return m.group(1)
    return None


def _prune_cache():
    """Enforce the total-cache cap by deleting the oldest files first."""
    try:
        entries = []
        total = 0
        for name in os.listdir(_CACHE_DIR):
            p = os.path.join(_CACHE_DIR, name)
            try:
                st = os.stat(p)
            except OSError:
                continue
            if not name.endswith(".mp4"):
                continue
            entries.append((st.st_mtime, st.st_size, p))
            total += st.st_size
        if total <= _MAX_CACHE_TOTAL_BYTES:
            return
        entries.sort()  # oldest first
        for mtime, size, p in entries:
            if total <= _MAX_CACHE_TOTAL_BYTES:
                break
            try:
                os.unlink(p)
                total -= size
            except OSError:
                pass
    except OSError:
        pass


def _cache_path(file_id: str) -> str:
    return os.path.join(_CACHE_DIR, f"{file_id}.mp4")


def _etag_for(file_id: str, size: int, mtime: float) -> str:
    return '"%s"' % hashlib.sha1(f"{file_id}:{size}:{int(mtime)}".encode()).hexdigest()


def _entry_for(file_id: str):
    """Return the cache entry dict for a file that exists on disk, else None."""
    path = _cache_path(file_id)
    try:
        st = os.stat(path)
    except OSError:
        return None
    return {
        "id": file_id,
        "size": st.st_size,
        "mtime": st.st_mtime,
        "etag": _etag_for(file_id, st.st_size, st.st_mtime),
    }


def _build_drive_request(file_id: str) -> urllib.request.Request:
    url = f"https://drive.usercontent.google.com/download?id={file_id}&export=download"
    req = urllib.request.Request(url, method="GET")
    req.add_header("User-Agent", "Mozilla/5.0 (compatible; DeftInnovationsMediaProxy/2.0)")
    return req


def _parse_range(range_header: str | None, size: int):
    """Return (start, end), None for no/ignorable range, or 'invalid' for 416."""
    if not range_header:
        return None
    m = re.match(r"^bytes=(\d*)-(\d*)$", range_header.strip())
    if not m:
        return None
    start_s, end_s = m.groups()
    if not start_s and not end_s:
        return None
    if start_s:
        start = int(start_s)
        end = int(end_s) if end_s else size - 1
    else:
        # Suffix range: last N bytes.
        start = max(0, size - int(end_s))
        end = size - 1
    if start >= size or start > end:
        return "invalid"
    return (start, min(end, size - 1))


def _base_headers(entry: dict) -> dict:
    return {
        "Accept-Ranges": "bytes",
        "Cache-Control": _CACHE_CONTROL,
        "ETag": entry["etag"],
        "Content-Disposition": 'inline; filename="video.mp4"',
        "Access-Control-Allow-Origin": "*",
    }


def _sniff_content_type(path: str, fallback: str = "video/mp4") -> str:
    """Detect image vs video from the file's magic bytes.

    Drive links stored in image fields are proxied through this endpoint too,
    and next/image rejects an image response labelled video/mp4, which makes
    every Drive-hosted image hang or fail in dev. Sniff the real type instead
    of trusting the hardcoded default.
    """
    try:
        with open(path, "rb") as fh:
            head = fh.read(16)
    except OSError:
        return fallback
    if head.startswith(b"\xff\xd8\xff"):
        return "image/jpeg"
    if head.startswith(b"\x89PNG\r\n\x1a\n"):
        return "image/png"
    if head[:6] in (b"GIF87a", b"GIF89a"):
        return "image/gif"
    if head[:4] == b"RIFF" and head[8:12] == b"WEBP":
        return "image/webp"
    if head[4:8] == b"ftyp":
        return "video/mp4"
    return fallback


def _resolve_content_type(content_type: str | None, path: str) -> str:
    """Prefer a meaningful upstream type; otherwise sniff the cached file."""
    if content_type and content_type not in ("application/octet-stream",):
        return content_type
    return _sniff_content_type(path)


def _serve_from_disk(request, file_id: str, content_type: str | None = None):
    """Serve a cached file with Range / ETag / 304 handling."""
    entry = _entry_for(file_id)
    if not entry:
        return None

    resolved_type = _resolve_content_type(content_type, _cache_path(file_id))

    # 304 revalidation — the common case on repeat visits.
    inm = request.headers.get("If-None-Match", "")
    if inm and entry["etag"] in [t.strip() for t in inm.split(",")]:
        resp = HttpResponse(status=304)
        resp["ETag"] = entry["etag"]
        resp["Cache-Control"] = _CACHE_CONTROL
        return resp

    rng = _parse_range(request.headers.get("Range"), entry["size"])
    if rng == "invalid":
        resp = HttpResponse(status=416)
        resp["Content-Range"] = f"bytes */{entry['size']}"
        return resp

    fh = open(_cache_path(file_id), "rb")
    if rng:
        start, end = rng
        fh.seek(start)
        length = end - start + 1
        resp = FileResponse(fh, status=206, content_type=resolved_type)
        resp["Content-Range"] = f"bytes {start}-{end}/{entry['size']}"
        resp["Content-Length"] = str(length)
    else:
        resp = FileResponse(fh, status=200, content_type=resolved_type)
        resp["Content-Length"] = str(entry["size"])

    for k, v in _base_headers(entry).items():
        resp[k] = v
    return resp


def _stream_through(upstream, content_type: str):
    """Pass an uncacheable (huge) upstream response through without storing."""
    from django.http import StreamingHttpResponse

    def gen():
        try:
            while True:
                chunk = upstream.read(_CHUNK)
                if not chunk:
                    break
                yield chunk
        finally:
            upstream.close()

    resp = StreamingHttpResponse(streaming_content=gen(), status=200,
                                 content_type=content_type or "video/mp4")
    resp["Accept-Ranges"] = "bytes"
    resp["Cache-Control"] = _CACHE_CONTROL
    resp["Content-Disposition"] = 'inline; filename="video.mp4"'
    resp["Access-Control-Allow-Origin"] = "*"
    return resp


def _download_to_cache(request, file_id: str, upstream, size: int, content_type: str):
    """Download the upstream file into the cache, then serve it from disk."""
    path = _cache_path(file_id)
    tmp_path = path + ".part"

    try:
        received = 0
        with open(tmp_path, "wb") as out:
            while received < size:
                chunk = upstream.read(min(_CHUNK, size - received))
                if not chunk:
                    break
                out.write(chunk)
                received += len(chunk)
        if received != size:
            # Short read — don't cache a truncated file.
            os.unlink(tmp_path)
            upstream.close()
            return _refetch_and_stream(file_id, content_type)
        os.replace(tmp_path, path)
    except Exception:
        # Cache write failed (disk full, permissions, client vanished) — fall
        # back to a plain streaming pass-through so the user still gets video.
        try:
            if os.path.exists(tmp_path):
                os.unlink(tmp_path)
        except OSError:
            pass
        upstream.close()
        return _refetch_and_stream(file_id, content_type)

    upstream.close()
    _prune_cache()
    return _serve_from_disk(request, file_id, content_type)


def _refetch_and_stream(file_id: str, content_type: str):
    """Fallback: a fresh upstream fetch streamed through (cache write failed)."""
    try:
        upstream = urllib.request.urlopen(_build_drive_request(file_id), timeout=_TIMEOUT_SECONDS)
    except (urllib.error.HTTPError, urllib.error.URLError, TimeoutError, OSError):
        return HttpResponse(status=502, reason="Upstream fetch failed")
    return _stream_through(upstream, content_type)


@media_router.get(
    "/drive-video/{file_id}",
    url_name="drive-video",
    include_in_schema=False,
)
def drive_video_proxy(request, file_id: str):
    """
    Stream a Google Drive file as an inline video/mp4 response.

    - Repeat requests are served from an on-disk cache (no Drive round-trip).
    - HTTP Range requests return 206 so <video> can seek without re-downloading.
    - A strong ETag gives browsers 304 Not Modified on revalidation.
    """
    # ── Hardening ────────────────────────────────────────────
    # Only proxy files that the site actually advertises, so this endpoint can
    # never be abused as an open Drive downloader (cache-filling / IP exposure).
    advertised = _advertised_drive_ids()
    if advertised is not None and file_id not in advertised:
        raise Http404

    if not _is_valid_drive_id(file_id):
        raise Http404

    # 1. Cached? Serve entirely from disk.
    if os.path.exists(_cache_path(file_id)):
        resp = _serve_from_disk(request, file_id)
        if resp:
            return resp  # None only if the file vanished between stat and open

    # 2. Not cached → fetch from Drive.
    try:
        upstream = urllib.request.urlopen(_build_drive_request(file_id), timeout=_TIMEOUT_SECONDS)
    except urllib.error.HTTPError as exc:
        return HttpResponse(status=exc.code, reason=exc.reason)
    except (urllib.error.URLError, TimeoutError, OSError):
        return HttpResponse(status=502, reason="Upstream fetch failed")

    headers = upstream.headers
    content_type = headers.get("Content-Type", "")

    # Drive interposes a "virus scan / too big to scan" HTML confirmation page
    # for large files. If we got HTML, it's not a video.
    if "text/html" in content_type:
        upstream.close()
        return HttpResponse(status=415, reason="Upstream returned HTML (not a media file)")

    if upstream.status != 200:
        upstream.close()
        return HttpResponse(status=upstream.status)

    declared_size = headers.get("Content-Length")
    if declared_size and int(declared_size) <= _MAX_CACHE_BYTES:
        return _download_to_cache(request, file_id, upstream, int(declared_size),
                                  content_type or "video/mp4")

    # Too big to cache — stream through without storing.
    return _stream_through(upstream, content_type or "video/mp4")
