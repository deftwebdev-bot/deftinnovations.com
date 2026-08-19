"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { FadeIn, WordReveal } from "@/components/ui/Motion";
import { motion } from "framer-motion";

export const CtaSection = () => (
  <section className="section bg-[#0d0d0d] border-t border-white/[0.06] relative overflow-hidden">
    {/* Giant background watermark text */}
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2 }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
    >
      <span
        className="text-stroke whitespace-nowrap"
        style={{
          fontSize: "clamp(6rem, 18vw, 22rem)",
          fontWeight: 900,
          letterSpacing: "-0.04em",
          opacity: 0.08,
        }}
      >
        LET'S TALK
      </span>
    </motion.div>

    <div className="container-xl relative z-10 space-y-14 text-center">

      <div className="space-y-6">
        <FadeIn direction="up">
          <span className="pill text-white/60 mx-auto">Ready to grow?</span>
        </FadeIn>

        <h2 className="text-display max-w-4xl mx-auto">
          <WordReveal text="Have an idea worth building?" stagger={0.05} />
        </h2>

        <FadeIn direction="up" delay={0.3}>
          <p className="text-xl text-white/50 max-w-xl mx-auto font-light leading-relaxed">
            Whether you need a Next.js platform, a strategic rebrand, or a high-ROAS acquisition engine — our team delivers.
          </p>
        </FadeIn>
      </div>

      <FadeIn direction="up" delay={0.4} className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link href="/contact" className="btn-primary text-base px-9 py-4">
          Start a Project <ArrowUpRight className="w-5 h-5" />
        </Link>
        <Link href="/services" className="btn-ghost text-base px-9 py-4">
          View Services
        </Link>
      </FadeIn>

      <FadeIn direction="up" delay={0.55}>
        <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-white/35 font-mono">
          <span className="flex items-center gap-2">
            <Mail className="w-4 h-4" /> hello@deftinnovations.com
          </span>
          <span className="flex items-center gap-2">
            <Phone className="w-4 h-4" /> +1 (800) 450-DEFT
          </span>
          <span>Response time &lt; 2 hours</span>
        </div>
      </FadeIn>

    </div>
  </section>
);
