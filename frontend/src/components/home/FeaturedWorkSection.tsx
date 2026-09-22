"use client";

import React from "react";
import Link from "next/link";
import { MediaImage as Image } from "@/components/ui/MediaImage";
import { ArrowUpRight } from "lucide-react";
import { FadeIn, ImageReveal, LineReveal } from "@/components/ui/Motion";
import { Project } from "@/lib/api";
import { getMediaUrl } from "@/lib/api";

interface FeaturedWorkSectionProps {
  projects?: Project[];
}

export const FeaturedWorkSection: React.FC<FeaturedWorkSectionProps> = ({ projects = [] }) => {
  const projectList = projects ?? [];
  const featured = projectList.filter((p) => p.featured).slice(0, 3);
  const displayProjects = featured.length >= 3 ? featured : projectList.slice(0, 3);

  if (displayProjects.length === 0) return null;

  return (
    <section className="section bg-[#0d0d0d]">
      <div className="container-xl space-y-16">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-4">
            <FadeIn direction="up">
              <span className="pill text-white/60">Selected Work</span>
            </FadeIn>
            <h2 className="text-h1">
              <LineReveal delay={0.1}>Proof over promises.</LineReveal>
            </h2>
          </div>

          <FadeIn direction="up" delay={0.25}>
            <Link href="/portfolio" className="btn-ghost text-sm">
              Full Archive <ArrowUpRight className="w-4 h-4" />
            </Link>
          </FadeIn>
        </div>

        {/* Project 1 — Full-bleed wide hero card */}
        {displayProjects[0] && (
          <FadeIn direction="up" delay={0.1}>
            <Link
              href={`/portfolio/${displayProjects[0].slug}`}
              className="group block relative rounded-2xl overflow-hidden h-[70vh] min-h-[420px]"
            >
              <ImageReveal className="absolute inset-0">
                <Image
                  src={getMediaUrl(displayProjects[0].imageUrl)}
                  alt={displayProjects[0].title}
                  fill
                  className="object-cover transition-transform duration-[1.4s] group-hover:scale-105"
                  sizes="100vw"
                  priority
                />
              </ImageReveal>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
                <div className="space-y-2">
                  <span className="pill text-white/70 text-[10px]">
                    {displayProjects[0].category} · {displayProjects[0].client}
                  </span>
                  <h3 className="text-h2 text-white max-w-xl leading-tight">
                    {displayProjects[0].title}
                  </h3>
                </div>

                {displayProjects[0].results && displayProjects[0].results[0] && (
                  <div className="text-right shrink-0">
                    <div className="text-4xl sm:text-5xl font-black font-mono text-white">
                      {displayProjects[0].results[0].metric}
                    </div>
                    <div className="text-label text-white/50">{displayProjects[0].results[0].label}</div>
                  </div>
                )}
              </div>
            </Link>
          </FadeIn>
        )}

        {/* Projects 2 & 3 — Side by side */}
        {displayProjects.length > 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayProjects.slice(1, 3).map((project, idx) => (
              <FadeIn key={project.id} direction="up" delay={idx * 0.12}>
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="group block relative rounded-2xl overflow-hidden h-[50vh] min-h-[340px]"
                >
                  <ImageReveal className="absolute inset-0" delay={0.06 * idx}>
                    <Image
                      src={getMediaUrl(project.imageUrl)}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-[1.4s] group-hover:scale-105"
                      sizes="50vw"
                    />
                  </ImageReveal>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <h3 className="text-h3 text-white leading-snug">{project.title}</h3>
                  </div>

                  <div className="absolute top-5 right-5">
                    <span className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-45">
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
