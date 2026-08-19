"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FadeIn, LineReveal, ImageReveal } from "@/components/ui/Motion";
import { Project, PROJECTS_DATA } from "@/data/projects";
import { getMediaUrl } from "@/lib/api";

interface CaseStudiesSectionProps {
  projects?: Project[];
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({
  projects = PROJECTS_DATA,
}) => {
  const projectList = projects && projects.length > 0 ? projects : PROJECTS_DATA;
  const displayProjects = projectList.slice(0, 6);

  return (
    <section className="section bg-[#ffffff] text-[#0a0a0a]">
      <div className="container-xl space-y-16">
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
              className="btn-outline-dark text-sm inline-flex items-center gap-2 group"
            >
              <span>View all works</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeIn>
        </div>

        {/* 3-Col Case Studies Grid (WAC Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {displayProjects.map((project, idx) => (
            <FadeIn key={project.id} direction="up" delay={idx * 0.08}>
              <Link
                href={`/portfolio/${project.slug}`}
                className="group block space-y-4 cursor-pointer"
              >
                {/* 1:1 Aspect Ratio Image Frame */}
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-neutral-100 border border-black/[0.06]">
                  <ImageReveal className="w-full h-full">
                    <Image
                      src={getMediaUrl(project.imageUrl)}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </ImageReveal>

                  {/* Category Pill on Image */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-black text-xs font-medium shadow-sm">
                      {project.category}
                    </span>
                  </div>

                  {project.results && project.results[0] && (
                    <div className="absolute bottom-4 right-4 z-20 px-3.5 py-1.5 rounded-xl bg-black/80 backdrop-blur-md text-white text-right shadow-sm">
                      <span className="text-sm font-bold font-mono">{project.results[0].metric}</span>
                      <span className="text-[10px] text-white/70 block leading-tight">{project.results[0].label}</span>
                    </div>
                  )}
                </div>

                {/* Info Text */}
                <div className="space-y-1.5">
                  <div className="text-xs font-mono font-medium text-black/40 uppercase tracking-wider">
                    {project.client} · {project.year}
                  </div>
                  <h3 className="ttl-h3 font-normal text-[#0a0a0a] group-hover:text-black/70 transition-colors leading-snug">
                    {project.title}: {project.summary}
                  </h3>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>

        {/* Bottom CTA on mobile */}
        <div className="text-center pt-4 md:hidden">
          <Link href="/portfolio" className="btn-dark w-full justify-center">
            <span>View all works</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
