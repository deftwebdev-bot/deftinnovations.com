"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Globe } from "lucide-react";
import { FadeIn, LineReveal } from "@/components/ui/Motion";
import { AiOrbBg } from "@/components/ui/AiOrbBg";

/* ── Section ───────────────────────────────────────────────── */
export const GenAiBanner = () => {
  return (
    <section className="relative py-24 sm:py-32 bg-[#090909] text-white overflow-hidden border-y border-white/10">
      {/* Background: 3D glowing orb + ambient corner glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Corner ambient glows (magenta top-left, blue bottom-right) */}
        <div className="absolute -top-32 -left-32 w-[480px] h-[480px] bg-purple-600/20 blur-[160px] rounded-full" />
        <div className="absolute -bottom-32 -right-32 w-[480px] h-[480px] bg-blue-600/20 blur-[160px] rounded-full" />

        {/* 3D rotating glass orb (Three.js) */}
        <AiOrbBg />

        {/* Vignette so the orb fades cleanly into the section background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-[#090909]" />
      </div>

      <div className="container-xl relative z-10 text-center space-y-6 max-w-lg mx-auto">
        <FadeIn direction="up">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-mono tracking-wider text-white/90">
            <Globe className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            Next-Gen Web Development
          </span>
        </FadeIn>

        <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight leading-[1.15]">
          <LineReveal delay={0.1}>Websites Engineered for</LineReveal>{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-300 bg-clip-text text-transparent font-normal">
            The Future
          </span>
        </h2>

        <FadeIn direction="up" delay={0.25}>
          <p className="text-sm sm:text-base text-white/60 font-light leading-relaxed max-w-sm mx-auto">
            From lightning-fast Next.js platforms to immersive interactive experiences — we build digital products that perform at scale.
          </p>
        </FadeIn>

        <FadeIn direction="up" delay={0.3}>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact?service=web-development"
              className="btn-primary group !px-5 !py-2.5 !text-sm"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/services"
              className="btn-ghost !px-5 !py-2.5 !text-sm"
            >
              Explore Services
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};