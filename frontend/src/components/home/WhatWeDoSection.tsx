"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FadeIn, LineReveal, ImageReveal } from "@/components/ui/Motion";
import { Service, SERVICES_DATA } from "@/data/services";
import { getMediaUrl } from "@/lib/api";

const DEFAULT_SERVICE_IMAGES: Record<string, string> = {
  "digital-marketing": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
  "brand-identity": "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
  "web-development": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
  "performance-ads": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
  "seo-organic": "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?auto=format&fit=crop&w=800&q=80",
  "social-media-strategy": "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80",
};

interface WhatWeDoSectionProps {
  services?: Service[];
}

export const WhatWeDoSection: React.FC<WhatWeDoSectionProps> = ({
  services = SERVICES_DATA,
}) => {
  const serviceList = services && services.length > 0 ? services : SERVICES_DATA;

  return (
    <section className="section bg-[#0e0e0e] text-white">
      <div className="container-xl space-y-14">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-2">
            <FadeIn direction="up">
              <span className="text-xs font-mono font-semibold tracking-widest text-white/40 uppercase">
                Core Capabilities
              </span>
            </FadeIn>
            <h2 className="ttl-80 font-light text-white tracking-tight">
              <LineReveal delay={0.1}>What We Do</LineReveal>
            </h2>
          </div>

          <FadeIn direction="up" delay={0.2}>
            <Link
              href="/services"
              className="btn-ghost text-sm inline-flex items-center gap-2 group"
            >
              <span>Explore What We Do</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeIn>
        </div>

        {/* 3-Col Image Card Grid (WAC Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {serviceList.map((service, idx) => {
            const imgSrc =
              service.imageUrl ||
              DEFAULT_SERVICE_IMAGES[service.slug] ||
              "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80";

            return (
              <FadeIn key={service.id || idx} direction="up" delay={idx * 0.07}>
                <Link
                  href={`/services#${service.slug}`}
                  className="group block relative rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] border border-white/10 bg-[#161616]"
                >
                  {/* Photo Background */}
                  <ImageReveal className="w-full h-full absolute inset-0">
                    <Image
                      src={getMediaUrl(imgSrc)}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </ImageReveal>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

                  {/* Card Content Overlay */}
                  <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between z-10">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-mono text-white/90 uppercase tracking-wider">
                        {service.category}
                      </span>
                      <span className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white/70 group-hover:bg-white group-hover:text-black transition-all">
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="text-xl sm:text-2xl font-normal text-white group-hover:text-white transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/60 line-clamp-2 font-light">
                        {service.tagline}
                      </p>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>

        {/* Mobile Bottom CTA */}
        <div className="text-center pt-4 md:hidden">
          <Link href="/services" className="btn-primary w-full justify-center">
            <span>Explore What We Do</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
