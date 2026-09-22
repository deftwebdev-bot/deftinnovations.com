"use client";

import React from "react";
import Link from "next/link";
import { MediaImage as Image } from "@/components/ui/MediaImage";
import { ArrowRight, Play } from "lucide-react";
import { FadeIn, LineReveal, ImageReveal } from "@/components/ui/Motion";
import { Project } from "@/lib/api";
import { getMediaUrl } from "@/lib/api";

interface CaseStudiesSectionProps {
  projects?: Project[];
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({
  projects = [],
}) => {
  const projectList = projects ?? [];
  const displayProjects = projectList.slice(0, 6);

  return (
    <section className="section bg-white text-[#0a0a0a]">
      <div className="container-xl space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black/[0.08]">
          <div className="space-y-2">
            <FadeIn direction="up">
              <span className="text-xs font-mono font-semibold tracking-widest text-black/40 uppercase">
                Selected Portfolio
              </span>
            </FadeIn>
            <h2 className="ttl-80 font-light text-[#0a0a0a] tracking-tight">
              <LineReveal delay={0.1}>Case Studies</LineReveal>
            </h2>
          </div>

          <FadeIn direction="up" delay={0.2}>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors group"
            >
              <span>View all works</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeIn>
        </div>

        {/* 3-Col Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {displayProjects.map((project, idx) => (
            <FadeIn key={project.id} direction="up" delay={idx * 0.08}>
              <Link
                href={`/portfolio/${project.slug}`}
                className="group block space-y-3 cursor-pointer"
              >
                {/* Image — clean, no overlays */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 border border-black/[0.06]">
                  {project.videoUrl ? (
                    <div className="w-full h-full bg-neutral-900 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                      </div>
                    </div>
                  ) : (
                    <ImageReveal className="w-full h-full">
                      <Image
                        src={getMediaUrl(project.imageUrl)}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </ImageReveal>
                  )}
                </div>

                {/* Caption — small category + title */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono font-medium text-black/40 uppercase tracking-wider">
                    {project.category}
                  </span>
                  <h3 className="text-base font-normal text-[#0a0a0a] group-hover:text-black/60 transition-colors leading-snug">
                    {project.title}
                  </h3>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>

        {/* Bottom CTA on mobile */}
        <div className="text-center pt-4 md:hidden">
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700">
            <span>View all works</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
