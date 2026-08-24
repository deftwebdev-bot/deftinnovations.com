"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/ui/Motion";

export const CtaSection = () => (
  <section className="section-sm bg-[#0a0a0a] text-white border-t border-white/[0.06]">
    <div className="container-xl text-center space-y-8">
      <FadeIn direction="up">
        <h2 className="ttl-80 font-light tracking-tight">
          Have an idea worth building?
        </h2>
      </FadeIn>

      <FadeIn direction="up" delay={0.1}>
        <p className="text-base text-white/40 max-w-md mx-auto font-light">
          Let&apos;s talk about your next project.
        </p>
      </FadeIn>

      <FadeIn direction="up" delay={0.2}>
        <Link href="/contact" className="btn-primary">
          Start a Project <ArrowUpRight className="w-4 h-4" />
        </Link>
      </FadeIn>
    </div>
  </section>
);
