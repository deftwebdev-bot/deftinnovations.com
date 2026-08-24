"use client";

import React from "react";
import { RevealCounter, FadeIn } from "@/components/ui/Motion";
import { TrustedBrand, TrustStat } from "@/lib/api";


interface TrustSectionProps {
  brands?: TrustedBrand[];
  stats?: { value: string; label: string }[];
}

const MarqueeItem: React.FC<{ name: string }> = ({ name }) => (
  <span className="flex items-center gap-8 text-white/25 hover:text-white/60 transition-colors duration-300 text-label tracking-[0.22em] whitespace-nowrap">
    {name}
    <span className="w-1 h-1 rounded-full bg-white/20" />
  </span>
);

export const TrustSection: React.FC<TrustSectionProps> = ({
  brands = [],
  stats = [],
}) => {
  const brandList = brands ?? [];
  const statList = stats ?? [];

  return (
    <section className="section-sm bg-[#0a0a0a] border-y border-white/[0.06]">
      <div className="container-xl space-y-16">
        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] overflow-hidden rounded-2xl">
          {statList.map((stat, i) => (
            <FadeIn key={i} direction="up" delay={i * 0.1}>
              <div className="bg-[#0a0a0a] p-8 space-y-2 text-center">
                <div className="text-h1 text-white font-mono font-black">
                  <RevealCounter value={stat.value} />
                </div>
                <div className="text-label text-white/40">{stat.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Marquee clients band */}
        <div className="space-y-5">
          <p className="text-center text-label text-white/30">Trusted by ambitious brands worldwide</p>
          <div className="overflow-hidden relative">
            {/* Left/right fades */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

            <div className="flex marquee-track gap-8 w-max">
              {[...brandList, ...brandList].map((brand, i) => (
                <MarqueeItem key={i} name={brand.name} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
