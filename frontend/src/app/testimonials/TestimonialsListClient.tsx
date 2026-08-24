"use client";

import React from "react";
import Image from "next/image";
import { FadeIn } from "@/components/ui/Motion";
import { Testimonial } from "@/lib/api";
import { Quote, Star } from "lucide-react";

const AVATAR_COVERS = [
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
];

export function TestimonialsListClient({
  initialTestimonials,
}: {
  initialTestimonials: Testimonial[];
}) {
  return (
    <section className="section bg-white pt-40 sm:pt-48">
      <div className="container-xl space-y-16">
        {/* Title */}
        <div className="text-center space-y-4">
          <FadeIn direction="up">
            <h1 className="ttl-80 font-light text-[#0a0a0a] tracking-tight">
              Testimonials
            </h1>
          </FadeIn>
          <FadeIn direction="up" delay={0.05}>
            <p className="text-base text-black/50 font-light max-w-lg mx-auto">
              Hear directly from the founders, marketers, and operators who
              partnered with us to build something remarkable.
            </p>
          </FadeIn>
        </div>

        {/* Testimonial cards */}
        {initialTestimonials.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-black/40 text-lg">No testimonials yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {initialTestimonials.map((item, idx) => (
              <FadeIn key={item.id || idx} direction="up" delay={idx * 0.06}>
                <div className="group h-full flex flex-col border border-black/10 hover:border-black/25 transition-all duration-300 overflow-hidden">
                  {/* Author header */}
                  <div className="p-6 pb-0 flex items-center gap-4">
                    <div className="relative w-14 h-14 shrink-0 overflow-hidden border border-black/10">
                      <Image
                        src={AVATAR_COVERS[idx % AVATAR_COVERS.length]}
                        alt={item.author}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-[#0a0a0a] truncate">
                        {item.author}
                      </h3>
                      <p className="text-xs text-black/45 truncate">
                        {item.role}
                      </p>
                    </div>
                  </div>

                  {/* Company badge */}
                  <div className="px-6 pt-3">
                    <span className="inline-block px-2.5 py-0.5 bg-black/[0.04] border border-black/[0.08] text-[10px] font-mono font-medium text-black/45 uppercase tracking-wider">
                      {item.company}
                    </span>
                  </div>

                  {/* Quote */}
                  <div className="p-6 flex-1">
                    <blockquote className="text-sm text-black/65 font-light leading-relaxed italic">
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>
                  </div>

                  {/* Metric (if exists) */}
                  {item.metric && (
                    <div className="px-6 pb-6">
                      <div className="flex items-center gap-3 p-4 bg-black/[0.02] border border-black/[0.06]">
                        <div className="text-xl font-black font-mono text-[#0a0a0a]">
                          {item.metric}
                        </div>
                        <div className="text-[11px] font-mono text-black/40 uppercase tracking-wider leading-tight">
                          {item.metricLabel}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Bottom accent */}
                  <div className="mt-auto border-t border-black/[0.06] p-4 flex items-center justify-between">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 fill-black/20 text-black/20"
                        />
                      ))}
                    </div>
                    <Quote className="w-5 h-5 text-black/10" />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
