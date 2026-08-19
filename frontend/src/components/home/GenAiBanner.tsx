"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { FadeIn, LineReveal } from "@/components/ui/Motion";
import { motion } from "framer-motion";

export const GenAiBanner = () => {
  return (
    <section className="relative py-24 sm:py-32 bg-[#090909] text-white overflow-hidden border-y border-white/10">
      {/* Ambient background glow & radial gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-emerald-500/20 blur-[120px] rounded-full"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#090909]/60 to-[#090909]" />
      </div>

      <div className="container-xl relative z-10 text-center space-y-8 max-w-4xl mx-auto">
        <FadeIn direction="up">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-mono tracking-wider text-white/90">
            <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            Agentic AI & Next-Gen Intelligence
          </span>
        </FadeIn>

        <h2 className="ttl-80 font-light text-white tracking-tight leading-[1.08]">
          <LineReveal delay={0.1}>Unlock The Power of</LineReveal>{" "}
          <span className="bg-gradient-to-r from-blue-400 via-purple-300 to-emerald-300 bg-clip-text text-transparent font-normal">
            Gen AI
          </span>
        </h2>

        <FadeIn direction="up" delay={0.25}>
          <p className="text-lg sm:text-xl text-white/60 font-light leading-relaxed max-w-2xl mx-auto">
            Today&apos;s businesses need more than just digital tools — they need clear strategic direction, backed by deep customer insight and agentic automation built to scale.
          </p>
        </FadeIn>

        <FadeIn direction="up" delay={0.35}>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact?service=gen-ai"
              className="btn-primary group"
            >
              <span>Start with Gen AI</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/services"
              className="btn-ghost"
            >
              Explore Solutions
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
