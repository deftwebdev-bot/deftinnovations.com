"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn, LineReveal } from "@/components/ui/Motion";
import { TrustStat } from "@/lib/api";

interface OurStorySectionProps {
  stats?: TrustStat[];
}

export const OurStorySection: React.FC<OurStorySectionProps> = ({ stats = [] }) => {
  const defaultStats = [
    { value: "150+", label: "High-Impact Projects" },
    { value: "50+", label: "Global Clients" },
    { value: "14+", label: "Dedicated Experts" },
    { value: "98.4%", label: "Client Retention" },
  ];

  const statList = stats && stats.length > 0 ? stats : defaultStats;

  return (
    <section className="section bg-[#f8f9fa] text-[#0a0a0a] border-y border-black/[0.06] overflow-hidden">
      <div className="container-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Narrative */}
          <div className="lg:col-span-7 space-y-8">
            <FadeIn direction="up">
              <span className="text-xs font-mono font-semibold tracking-widest text-black/40 uppercase">
                Agency Heritage
              </span>
            </FadeIn>

            <h2 className="ttl-120 font-light text-[#0a0a0a] tracking-tight">
              <LineReveal delay={0.1}>Our Story</LineReveal>
            </h2>

            <FadeIn direction="up" delay={0.25}>
              <p className="text-xl sm:text-2xl text-black/70 font-light leading-relaxed max-w-2xl">
                In a digital landscape filled with template solutions, Deft Innovations was built to create extraordinary digital platforms — combining strategic architecture, creative precision, and disciplined engineering that drive real enterprise growth.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.35}>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="btn-dark inline-flex items-center gap-2 group"
                >
                  <span>About us</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Right Floating Stat Cards (WAC Style) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {statList.slice(0, 4).map((s, idx) => (
              <FadeIn key={idx} direction="up" delay={0.15 + idx * 0.08}>
                <div className="p-8 rounded-2xl bg-white border border-black/[0.06] shadow-sm hover:shadow-md transition-all duration-300 space-y-2">
                  <div className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-[#0a0a0a]">
                    {s.value}
                  </div>
                  <p className="text-sm font-medium text-black/50 leading-snug">
                    {s.label}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
