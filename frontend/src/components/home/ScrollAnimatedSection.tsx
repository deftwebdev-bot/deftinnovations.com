"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Sparkles, Zap, ShieldCheck, TrendingUp, ArrowDown } from "lucide-react";

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word: React.FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.18, 1]);

  return (
    <motion.span
      style={{ opacity }}
      className="inline-block mr-[0.25em] mb-[0.1em] text-white font-light"
    >
      {children}
    </motion.span>
  );
};

export const ScrollAnimatedSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const manifestoText =
    "We are a next-generation creative technology and performance marketing agency. We engineer high-velocity digital platforms, iconic monochrome brand identities, and data-driven acquisition engines that empower ambitious global enterprises to scale beyond boundaries.";

  const words = manifestoText.split(" ");

  // Progress percentage indicator transform
  const progressPercent = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const statsOpacity = useTransform(scrollYProgress, [0.75, 0.95], [0, 1]);
  const statsY = useTransform(scrollYProgress, [0.75, 0.95], [20, 0]);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#070707] text-white min-h-[340vh] border-b border-white/[0.08]"
    >
      {/* Sticky Fullscreen Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between items-center py-16 sm:py-20 px-6 sm:px-12 overflow-hidden z-10">
        
        {/* Background Ambient Radial Glow */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-gradient-to-tr from-blue-600/10 via-purple-600/10 to-transparent blur-[160px] rounded-full" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-[#070707]/80 to-[#070707]" />
        </div>

        {/* Top Header Tag */}
        {/* <div className="w-full max-w-6xl flex items-center justify-between border-b border-white/10 pb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono tracking-widest text-white/90 uppercase">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            Digital Acceleration Manifesto
          </div>
          <span className="text-[11px] font-mono text-white/40 tracking-wider hidden sm:inline-block">
            SCROLL TO ILLUMINATE
          </span>
        </div> */}

        {/* Central Clean Word-by-Word Scrubbing Text (Zero Duplicate Layers) */}
        <div className="w-full max-w-5xl my-auto text-center px-4 sm:px-8">
          <p className="text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-light leading-[1.3] sm:leading-[1.35] tracking-tight flex flex-wrap justify-center">
            {words.map((word, i) => {
              const start = (i / words.length) * 0.95;
              const end = start + (1 / words.length) * 0.95;
              return (
                <Word key={i} progress={scrollYProgress} range={[start, end]}>
                  {word}
                </Word>
              );
            })}
          </p>
        </div>

        {/* Bottom Floating Stats & Progress Bar */}
        <div className="w-full max-w-6xl space-y-6">
          {/* 3 Metric Pills revealing towards end of scroll */}
          {/* <motion.div
            style={{ opacity: statsOpacity, y: statsY }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            <div className="px-5 py-3 rounded-xl bg-white/[0.04] backdrop-blur-md border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-white/70">
                <Zap className="w-3.5 h-3.5 text-blue-400" />
                <span>SUB-SECOND SPEED</span>
              </div>
              <span className="font-mono text-sm font-bold text-white">99/100</span>
            </div>

            <div className="px-5 py-3 rounded-xl bg-white/[0.04] backdrop-blur-md border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-white/70">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                <span>ENTERPRISE BUILDS</span>
              </div>
              <span className="font-mono text-sm font-bold text-white">150+</span>
            </div>

            <div className="px-5 py-3 rounded-xl bg-white/[0.04] backdrop-blur-md border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-white/70">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                <span>CLIENT GROWTH AVG</span>
              </div>
              <span className="font-mono text-sm font-bold text-white">4.8x ROAS</span>
            </div>
          </motion.div> */}

          {/* Bottom Progress Bar & Scroll Indicator */}
          {/* <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs font-mono text-white/40">
            <div className="flex items-center gap-2">
              <ArrowDown className="w-3.5 h-3.5 animate-bounce text-blue-400" />
              <span className="tracking-wider">CONTINUE SCROLLING</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-24 sm:w-36 h-1 bg-white/15 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: useTransform(progressPercent, (v) => `${v}%`) }}
                />
              </div>
              <span className="text-white/60 font-mono text-[11px]">
                DEFT · 2026
              </span>
            </div>
          </div> */}
        </div>

      </div>
    </section>
  );
};
