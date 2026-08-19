"use client";

import React from "react";
import Image from "next/image";
import { FadeIn, LineReveal, ImageReveal } from "@/components/ui/Motion";
import { Testimonial, TESTIMONIALS_DATA } from "@/data/testimonials";
import { Quote } from "lucide-react";

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
}

const TESTIMONIAL_COVERS = [
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
];

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials = TESTIMONIALS_DATA,
}) => {
  const list = testimonials && testimonials.length > 0 ? testimonials : TESTIMONIALS_DATA;
  const displayList = list.slice(0, 3);

  return (
    <section className="section bg-[#f8f9fa] text-[#0a0a0a] border-b border-black/[0.06]">
      <div className="container-xl space-y-16">
        {/* Header */}
        <div className="space-y-2 pb-6 border-b border-black/[0.08]">
          <FadeIn direction="up">
            <span className="text-xs font-mono font-semibold tracking-widest text-black/40 uppercase">
              Client Experiences
            </span>
          </FadeIn>
          <h2 className="ttl-80 font-light text-[#0a0a0a] tracking-tight">
            <LineReveal delay={0.1}>Featured Stories</LineReveal>
          </h2>
          <p className="text-lg text-black/60 font-light max-w-xl">
            Discover authentic experiences, straight from the ambitious leaders we partner with.
          </p>
        </div>

        {/* 3-Col Stories Grid (WAC Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayList.map((item, idx) => (
            <FadeIn key={item.id || idx} direction="up" delay={idx * 0.1}>
              <div className="group rounded-2xl bg-white border border-black/[0.06] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                
                {/* Photo / Visual Frame */}
                <div className="relative aspect-[16/10] w-full bg-neutral-100 overflow-hidden">
                  <ImageReveal className="w-full h-full">
                    <Image
                      src={TESTIMONIAL_COVERS[idx % TESTIMONIAL_COVERS.length]}
                      alt={item.author}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </ImageReveal>

                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-white text-xs font-mono">
                      {item.company}
                    </span>
                  </div>

                  {item.metric && (
                    <div className="absolute bottom-4 right-4 z-20 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md text-black text-right shadow-sm">
                      <span className="text-sm font-bold font-mono">{item.metric}</span>
                      <span className="text-[10px] text-black/60 block leading-tight">{item.metricLabel}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                  <blockquote className="text-black/80 text-base leading-relaxed font-light italic">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>

                  <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-[#0a0a0a]">{item.author}</h4>
                      <p className="text-xs text-black/50">{item.role} · {item.company}</p>
                    </div>
                    <Quote className="w-6 h-6 text-black/15" />
                  </div>
                </div>

              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
