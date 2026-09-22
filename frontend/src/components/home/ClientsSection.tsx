"use client";

import React from "react";
import { MediaImage as Image } from "@/components/ui/MediaImage";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn, LineReveal } from "@/components/ui/Motion";
import { TrustedBrand, getMediaUrl } from "@/lib/api";

interface ClientsSectionProps {
  brands?: TrustedBrand[];
}

export const ClientsSection: React.FC<ClientsSectionProps> = ({
  brands = [],
}) => {
  // Show only featured clients on landing page
  const brandList = (brands ?? []).filter((b) => b.isFeatured);

  // Placeholder brands if few exist
  const placeholders = [
    { id: 101, name: "NEXUS CAPITAL", logoUrl: null, industry: "", isFeatured: true, websiteUrl: null },
    { id: 102, name: "AURA LUXURY", logoUrl: null, industry: "", isFeatured: true, websiteUrl: null },
    { id: 103, name: "SENTINEL TECH", logoUrl: null, industry: "", isFeatured: true, websiteUrl: null },
    { id: 104, name: "VORTEX ENERGY", logoUrl: null, industry: "", isFeatured: true, websiteUrl: null },
    { id: 105, name: "LUMEN HEALTH", logoUrl: null, industry: "", isFeatured: true, websiteUrl: null },
    { id: 106, name: "NOVA RETAIL", logoUrl: null, industry: "", isFeatured: true, websiteUrl: null },
    { id: 107, name: "HYPER SCALE", logoUrl: null, industry: "", isFeatured: true, websiteUrl: null },
    { id: 108, name: "PRISM MEDIA", logoUrl: null, industry: "", isFeatured: true, websiteUrl: null },
    { id: 109, name: "QUANTUM AI", logoUrl: null, industry: "", isFeatured: true, websiteUrl: null },
    { id: 110, name: "ATELIER GLOBAL", logoUrl: null, industry: "", isFeatured: true, websiteUrl: null },
  ];

  const displayList = brandList.length >= 6 ? brandList : [...brandList, ...placeholders.slice(0, 10 - brandList.length)];

  return (
    <section className="section bg-white text-[#0a0a0a] border-b border-black/[0.06]">
      <div className="container-xl space-y-16">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pb-6 border-b border-black/[0.08]">
          <div className="lg:col-span-5 space-y-2">
            <FadeIn direction="up">
              <span className="text-xs font-mono font-semibold tracking-widest text-black/40 uppercase">
                Partnerships
              </span>
            </FadeIn>
            <h2 className="ttl-80 font-light text-[#0a0a0a] tracking-tight">
              <LineReveal delay={0.1}>Clients</LineReveal>
            </h2>
          </div>

          <div className="lg:col-span-7 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <p className="text-lg text-black/60 font-light max-w-md">
              Our clients are everything to us; so are we to them. Trusted by forward-thinking brands worldwide.
            </p>

            <Link
              href="/clients"
              className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors group shrink-0"
            >
              <span>View all clients</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* 5-Col Client Logo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {displayList.map((brand, idx) => {
            const hasValidLogo = Boolean(brand.logoUrl && typeof brand.logoUrl === 'string' && brand.logoUrl.trim().length > 0);
            return (
              <FadeIn key={brand.id || idx} direction="up" delay={idx * 0.04}>
                <div className="h-28 sm:h-32 bg-[#f8f9fa] border border-black/[0.06] hover:border-black/20 hover:bg-white hover:shadow-md transition-all duration-300 flex items-center justify-center p-6 text-center group">
                  {hasValidLogo ? (
                    <div className="relative w-full h-full grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                      <Image
                        src={getMediaUrl(brand.logoUrl)}
                        alt={brand.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 50vw, 20vw"
                      />
                    </div>
                  ) : (
                    <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-black/40 group-hover:text-black transition-colors uppercase">
                      {brand.name}
                    </span>
                  )}
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};
