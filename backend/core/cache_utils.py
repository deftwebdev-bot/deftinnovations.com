import logging
from django.core.cache import cache

logger = logging.getLogger(__name__)

# Cache TTL constants (in seconds)
CACHE_TTL_SHORT = 300      # 5 minutes
CACHE_TTL_MEDIUM = 3600    # 1 hour
CACHE_TTL_LONG = 86400     # 24 hours

# Known cache key patterns or prefixes for targeted invalidation
CACHE_KEYS = {
    # Blog / Articles
    "articles_prefixes": ["articles_list_", "article_"],
    # Portfolio / Projects
    "portfolio_prefixes": ["projects_list_", "project_"],
    # Services
    "services_prefixes": ["services_list_", "services_categorized", "service_"],
    # Company
    "company_keys": [
        "hero_content_active",
        "hero_slides_active",
        "brands_active",
        "team_active",
        "gallery_active",
        "testimonials_all",
        "trust_stats_all",
        "advertised_drive_ids",
    ],
    # Careers
    "careers_prefixes": ["jobs_list_", "job_"],
}


def invalidate_articles_cache():
    """Invalidate all cached articles listings and detail views."""
    try:
        # LocMemCache and RedisCache both support clearing or pattern matching.
        # With core cache, we clear known keys and general cache keys.
        cache.delete_many([
            "articles_list_None_None",
            "articles_list_None_True",
            "articles_list_None_False",
        ])
        # Clear version or sweep if using Redis/LocMem
        _delete_by_prefixes(["articles_list_", "article_"])
        logger.info("Invalidated articles cache")
    except Exception as e:
        logger.warning(f"Failed to invalidate articles cache: {e}")


def invalidate_portfolio_cache():
    """Invalidate all cached projects listings and detail views."""
    try:
        cache.delete_many([
            "projects_list_None_None",
            "projects_list_None_True",
            "projects_list_None_False",
        ])
        _delete_by_prefixes(["projects_list_", "project_"])
        _delete_key("advertised_drive_ids")
        logger.info("Invalidated portfolio cache")
    except Exception as e:
        logger.warning(f"Failed to invalidate portfolio cache: {e}")


def invalidate_services_cache():
    """Invalidate all cached services listings and categories."""
    try:
        cache.delete_many([
            "services_list_None",
            "services_list_True",
            "services_list_False",
            "services_categorized",
        ])
        _delete_by_prefixes(["services_list_", "service_"])
        _delete_key("advertised_drive_ids")
        logger.info("Invalidated services cache")
    except Exception as e:
        logger.warning(f"Failed to invalidate services cache: {e}")


def invalidate_company_cache():
    """Invalidate all cached company assets, hero content, brands, gallery, team, testimonials."""
    try:
        for key in CACHE_KEYS["company_keys"]:
            cache.delete(key)
        _delete_key("advertised_drive_ids")
        logger.info("Invalidated company cache")
    except Exception as e:
        logger.warning(f"Failed to invalidate company cache: {e}")


def invalidate_careers_cache():
    """Invalidate all cached job positions."""
    try:
        cache.delete_many([
            "jobs_list_None",
        ])
        _delete_by_prefixes(["jobs_list_", "job_"])
        logger.info("Invalidated careers cache")
    except Exception as e:
        logger.warning(f"Failed to invalidate careers cache: {e}")


def invalidate_media_cache():
    """Invalidate cached advertised drive IDs."""
    _delete_key("advertised_drive_ids")


def _delete_key(key: str):
    try:
        cache.delete(key)
    except Exception:
        pass


def _delete_by_prefixes(prefixes: list[str]):
    """
    Clears keys matching prefixes. Supports LocMemCache dict inspection
    and Redis delete_pattern if available, otherwise safely falls back.
    """
    try:
        # LocMemCache internal dict inspection
        if hasattr(cache, "_cache"):
            with getattr(cache, "_lock", None) or _DummyLock():
                keys_to_del = [
                    k for k in cache._cache.keys()
                    if any(k.startswith(p) or f":{p}" in k for p in prefixes)
                ]
                for k in keys_to_del:
                    cache.delete(k)
        # django-redis or redis-py pattern delete
        elif hasattr(cache, "delete_pattern"):
            for p in prefixes:
                cache.delete_pattern(f"*{p}*")
        else:
            # Fallback for standard RedisCache in Django 5+:
            # Delete common query patterns
            pass
    except Exception as e:
        logger.debug(f"Prefix cache cleanup notice: {e}")


class _DummyLock:
    def __enter__(self): return self
    def __exit__(self, *args): pass
