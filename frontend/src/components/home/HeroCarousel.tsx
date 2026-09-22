"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { MediaImage as Image } from "@/components/ui/MediaImage";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react";
import { HeroContent, getMediaUrl, getYouTubeId, isYouTubeUrl } from "@/lib/api";

interface HeroCarouselProps {
  slides?: HeroContent[];
}

const DURATION = 7000; // 7s per slide

/**
 * HeroCarousel — performance notes:
 *  - All MP4 slides are mounted ONCE as stacked, opacity-crossfaded <video>
 *    layers. Previous versions remounted the active slide on every change,
 *    which re-fetched the video (a visible black gap + wasted bandwidth).
 *  - The upcoming slide's video is preloaded so transitions are instant.
 *  - Inactive videos are paused (zero decode cost while off-screen).
 *  - The progress strip is driven by a requestAnimationFrame loop that writes
 *    widths directly to DOM nodes — no React re-render 60x/sec.
 *  - YouTube slides still mount only while active (iframes can't be cheaply
 *    preloaded or paused).
 */
export const HeroCarousel: React.FC<HeroCarouselProps> = ({ slides = [] }) => {
  const slideList = slides ?? [];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);
  // Bumped whenever the progress loop should restart (tab visible again).
  const [cycle, setCycle] = useState(0);

  const count = slideList.length;

  // ── Slide advance + progress loop (rAF, no React re-renders) ──
  useEffect(() => {
    if (count < 2) return;

    // Static bars: fully-played slides left of current, empty right of it.
    barRefs.current.forEach((bar, i) => {
      if (!bar) return;
      bar.style.width = i < currentIdx ? "100%" : i > currentIdx ? "0%" : "0%";
    });

    let start: number | null = null;
    const tick = (now: number) => {
      if (start === null) start = now;
      const pct = Math.min(100, ((now - start) / DURATION) * 100);
      const bar = barRefs.current[currentIdx];
      if (bar) bar.style.width = `${pct}%`;
      if (pct >= 100) {
        setCurrentIdx((curr) => (curr + 1) % count);
        return; // effect re-runs for the new index
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [currentIdx, count, cycle]);

  // ── Play active video, pause others, preload the next one ──
  useEffect(() => {
    videoRefs.current.forEach((vid, i) => {
      if (!vid) return;
      if (i === currentIdx) {
        vid.muted = isMuted;
        vid.preload = "auto";
        const p = vid.play();
        if (p) p.catch(() => {/* autoplay guard */});
      } else {
        vid.pause();
        if (i === (currentIdx + 1) % count) {
          // Warm the cache for the upcoming slide.
          vid.preload = "auto";
          if (vid.networkState === HTMLMediaElement.NETWORK_EMPTY) vid.load();
        }
      }
    });
  }, [currentIdx, count, isMuted]);

  // ── Self-heal: if the active video gets paused by something external
  // (embedder occlusion, device interruption), resume it once visible again.
  useEffect(() => {
    let lastResume = 0;
    const onResume = () => {
      const vid = videoRefs.current[currentIdx];
      if (!vid || document.hidden) return;
      const now = Date.now();
      if (now - lastResume < 1000) return; // avoid fighting occlusion
      lastResume = now;
      const p = vid.play();
      if (p) p.catch(() => {});
    };
    document.addEventListener("visibilitychange", onResume);
    window.addEventListener("focus", onResume);
    return () => {
      document.removeEventListener("visibilitychange", onResume);
      window.removeEventListener("focus", onResume);
    };
  }, [currentIdx]);

  // ── Pause everything when the tab is hidden (battery / CPU) ──
  useEffect(() => {
    const onVis = () => {
      const vid = videoRefs.current[currentIdx];
      if (document.hidden) {
        vid?.pause();
        if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      } else {
        const p = vid?.play();
        if (p) p.catch(() => {});
        setCycle((c) => c + 1); // restart the rAF progress loop fresh
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [currentIdx]);

  const restartFrom = useCallback((idx: number) => {
    setCurrentIdx(idx % Math.max(count, 1));
  }, [count]);

  const nextSlide = useCallback(() => restartFrom(currentIdx + 1), [currentIdx, restartFrom]);
  const prevSlide = useCallback(
    () => restartFrom((currentIdx - 1 + Math.max(count, 1)) % Math.max(count, 1)),
    [currentIdx, restartFrom]
  );

  if (count === 0) return null;
  const activeSlide = slideList[currentIdx] || slideList[0];

  return (
    <section className="relative w-full h-[100svh] min-h-[640px] max-h-[1080px] bg-[#0a0a0a] text-white overflow-hidden select-none">
      {/* ── Slide Media — all layers stay mounted; active one is on top ── */}
      {slideList.map((slide, idx) => {
        const isActive = idx === currentIdx;
        const isYouTube = !!slide.videoUrl && isYouTubeUrl(slide.videoUrl);

        return (
          <div
            key={idx}
            className="absolute inset-0 transition-opacity duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              opacity: isActive ? 1 : 0,
              zIndex: isActive ? 1 : 0,
              pointerEvents: "none",
            }}
            aria-hidden={!isActive}
          >
            {isYouTube ? (
              /* YouTube iframe embed — mounted only while active */
              isActive && (
                <div className="absolute inset-0 overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeId(slide.videoUrl!)}?autoplay=1&mute=1&loop=1&playlist=${getYouTubeId(slide.videoUrl!)}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&disablekb=1&fs=0`}
                    title={slide.headlinePrimary}
                    allow="autoplay; encrypted-media"
                    className="absolute top-1/2 left-1/2 w-[177.78vh] h-[100vh] -translate-x-1/2 -translate-y-1/2"
                    style={{ border: "none" }}
                  />
                </div>
              )
            ) : slide.videoUrl ? (
              /* Direct MP4 — mounted once, crossfaded, never re-fetched */
              <video
                ref={(el) => { videoRefs.current[idx] = el; }}
                src={getMediaUrl(slide.videoUrl)}
                poster={slide.heroImageUrl ? getMediaUrl(slide.heroImageUrl) : undefined}
                muted={isMuted}
                loop
                playsInline
                preload={idx === 0 ? "auto" : "metadata"}
                className="w-full h-full object-cover"
              />
            ) : slide.heroImageUrl ? (
              <Image
                src={getMediaUrl(slide.heroImageUrl)}
                alt={slide.headlinePrimary}
                fill
                priority={idx === 0}
                className="object-cover"
                sizes="100vw"
              />
            ) : null}

            {/* Cinematic overlay gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-black/30" />
            <div className="absolute inset-0 bg-black/25" />
          </div>
        );
      })}

      {/* ── Top Badge / Mute Control ── */}
      <div className="absolute top-28 left-0 right-0 z-20">
        <div className="container-xl flex items-center justify-between">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-mono tracking-wider text-white/90">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {activeSlide.badgeText || "Experiences Powered by Intelligence"}
          </div>

          {(activeSlide.videoUrl || slideList.some((s) => s.videoUrl)) && (
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/80 hover:text-white hover:border-white/30 transition-all"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      {/* ── Main Slide Typography & CTA ── */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-32 sm:pb-28">
        <div className="container-xl space-y-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6 max-w-4xl"
            >
              <h1 className="ttl-80 text-white font-light tracking-tight leading-[1.05]">
                {activeSlide.headlinePrimary}{" "}
                <span className="text-white/40 block sm:inline font-light">
                  {activeSlide.headlineSecondary}
                </span>
              </h1>

              <p className="text-white/70 text-base sm:text-lg max-w-2xl font-light leading-relaxed">
                {activeSlide.subheadline}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link href={activeSlide.primaryCtaLink || "/contact"} className="btn-primary group">
                  <span>{activeSlide.primaryCtaText || "Start a Project"}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                {activeSlide.secondaryCtaText && (
                  <Link href={activeSlide.secondaryCtaLink || "/portfolio"} className="btn-ghost">
                    {activeSlide.secondaryCtaText}
                  </Link>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Bottom Progress Nav Strip ── */}
      <div className="absolute bottom-6 left-0 right-0 z-20">
        <div className="container-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10 pt-4">
          {/* Slide Progress Indicators — widths written directly by rAF */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {slideList.map((_, idx) => (
              <button
                key={idx}
                onClick={() => restartFrom(idx)}
                className="group relative flex-1 sm:w-28 h-1 bg-white/20 rounded-full overflow-hidden transition-all"
                aria-label={`Slide ${idx + 1}`}
              >
                <div
                  ref={(el) => { barRefs.current[idx] = el; }}
                  className="h-full bg-white"
                  style={{ width: idx === currentIdx ? "0%" : idx < currentIdx ? "100%" : "0%" }}
                />
              </button>
            ))}
          </div>

          {/* Slide Counter & Controls */}
          <div className="hidden md:flex items-center gap-4">
            <span className="text-xs font-mono text-white/50">
              {String(currentIdx + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
