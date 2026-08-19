"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react";
import { HeroContent, FALLBACK_HERO_SLIDES, getMediaUrl } from "@/lib/api";

interface HeroCarouselProps {
  slides?: HeroContent[];
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ slides = FALLBACK_HERO_SLIDES }) => {
  const slideList = slides && slides.length > 0 ? slides : FALLBACK_HERO_SLIDES;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const DURATION = 7000; // 7s per slide

  useEffect(() => {
    setProgress(0);
    const interval = 100;
    const step = (interval / DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentIdx((curr) => (curr + 1) % slideList.length);
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [currentIdx, slideList.length]);

  const activeSlide = slideList[currentIdx] || slideList[0];

  const handleSelectSlide = (idx: number) => {
    setCurrentIdx(idx);
    setProgress(0);
  };

  const nextSlide = () => {
    setCurrentIdx((curr) => (curr + 1) % slideList.length);
    setProgress(0);
  };

  const prevSlide = () => {
    setCurrentIdx((curr) => (curr - 1 + slideList.length) % slideList.length);
    setProgress(0);
  };

  return (
    <section className="relative w-full h-[100svh] min-h-[640px] max-h-[1080px] bg-[#0a0a0a] text-white overflow-hidden select-none">
      {/* ── Slide Media (Video or Image) ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 z-0"
        >
          {activeSlide.videoUrl ? (
            <video
              ref={(el) => { videoRefs.current[currentIdx] = el; }}
              src={activeSlide.videoUrl}
              poster={getMediaUrl(activeSlide.heroImageUrl)}
              autoPlay
              muted={isMuted}
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <Image
              src={getMediaUrl(activeSlide.heroImageUrl)}
              alt={activeSlide.headlinePrimary}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          )}

          {/* Cinematic overlay gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-black/30" />
          <div className="absolute inset-0 bg-black/25" />
        </motion.div>
      </AnimatePresence>

      {/* ── Top Badge / Mute Control ── */}
      <div className="absolute top-28 left-0 right-0 z-20">
        <div className="container-xl flex items-center justify-between">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-mono tracking-wider text-white/90">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {activeSlide.badgeText || "Experiences Powered by Intelligence"}
          </div>

          {activeSlide.videoUrl && (
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
                <Link
                  href={activeSlide.primaryCtaLink || "/contact"}
                  className="btn-primary group"
                >
                  <span>{activeSlide.primaryCtaText || "Start a Project"}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                {activeSlide.secondaryCtaText && (
                  <Link
                    href={activeSlide.secondaryCtaLink || "/portfolio"}
                    className="btn-ghost"
                  >
                    {activeSlide.secondaryCtaText}
                  </Link>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── WAC-style Bottom Thumbnail & Progress Nav Strip ── */}
      <div className="absolute bottom-6 left-0 right-0 z-20">
        <div className="container-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10 pt-4">
          {/* Slide Progress Indicators */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {slideList.map((slide, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectSlide(idx)}
                className="group relative flex-1 sm:w-28 h-1 bg-white/20 rounded-full overflow-hidden transition-all"
                aria-label={`Slide ${idx + 1}`}
              >
                <div
                  className={`h-full bg-white transition-all ${
                    idx === currentIdx
                      ? "duration-100"
                      : idx < currentIdx
                      ? "w-full"
                      : "w-0"
                  }`}
                  style={{
                    width: idx === currentIdx ? `${progress}%` : idx < currentIdx ? "100%" : "0%",
                  }}
                />
              </button>
            ))}
          </div>

          {/* Slide Thumbnail Strip & Counter */}
          <div className="hidden md:flex items-center gap-4">
            <span className="text-xs font-mono text-white/50">
              {String(currentIdx + 1).padStart(2, "0")} / {String(slideList.length).padStart(2, "0")}
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
