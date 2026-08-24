"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { WordReveal, FadeIn } from "@/components/ui/Motion";
import { HeroContent, getMediaUrl } from "@/lib/api";

interface HeroSectionProps {
  content?: HeroContent;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ content }) => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const imageY   = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const overlayO = useTransform(scrollYProgress, [0, 0.8], [0.55, 0.9]);

  const heroImage = getMediaUrl(content?.heroImageUrl);

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      {/* ── Parallax background image ───────────────────────── */}
      <motion.div className="absolute inset-0 z-0" style={{ y: imageY }}>
        {heroImage && (
          <Image
            src={heroImage}
            alt="Deft Innovations agency team"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        )}
        <motion.div
          className="absolute inset-0 bg-[#0a0a0a]"
          style={{ opacity: overlayO }}
        />
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-60 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
      </motion.div>

      {/* ── Floating top badge ───────────────────────────────── */}
      {content?.badgeText && (
        <FadeIn direction="none" delay={0.4} className="absolute top-28 left-0 right-0 z-10">
          <div className="container-xl">
            <span className="pill text-white/70">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              {content.badgeText}
            </span>
          </div>
        </FadeIn>
      )}

      {/* ── Hero content ────────────────────────────────────── */}
      <div className="relative z-10 container-xl pb-20 pt-44 space-y-10">
        {/* Giant headline */}
        <h1 className="text-hero max-w-[16ch]">
          {content?.headlinePrimary && (
            <WordReveal text={content.headlinePrimary} stagger={0.04} />
          )}
          <br />
          {content?.headlineSecondary && (
            <WordReveal
              text={content.headlineSecondary}
              stagger={0.04}
              delay={0.18}
              className="text-white/40"
            />
          )}
        </h1>

        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-8 sm:gap-16">
          {content?.subheadline && (
            <FadeIn direction="up" delay={0.55} className="max-w-sm">
              <p className="text-white/65 text-lg leading-relaxed font-normal">
                {content.subheadline}
              </p>
            </FadeIn>
          )}

          <FadeIn direction="up" delay={0.65} className="flex flex-col sm:flex-row gap-3">
            <Link href={content?.primaryCtaLink || "/contact"} className="btn-primary">
              {content?.primaryCtaText || "Start a Project"} <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link href={content?.secondaryCtaLink || "/portfolio"} className="btn-ghost">
              {content?.secondaryCtaText || "View Work"}
            </Link>
          </FadeIn>
        </div>

        {/* Scroll cue */}
        <FadeIn direction="up" delay={0.9} className="flex items-center gap-3 text-white/35">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4" />
          </motion.div>
          <span className="text-label tracking-widest text-xs">Scroll to explore</span>
        </FadeIn>
      </div>
    </section>
  );
};
