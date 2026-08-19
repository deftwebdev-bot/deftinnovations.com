"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FadeIn, LineReveal, ImageReveal } from "@/components/ui/Motion";
import { Project } from "@/data/projects";
import { getMediaUrl } from "@/lib/api";
import { ArrowUpRight } from "lucide-react";

const CATEGORIES = ["All", "Branding", "Web Development", "Digital Marketing", "Performance Marketing", "Social Media", "Creative"];

export function PortfolioListClient({ initialProjects }: { initialProjects: Project[] }) {
  const [cat, setCat] = useState("All");
  const projects = cat === "All" ? initialProjects : initialProjects.filter((p) => p.category === cat);

  return (
    <>
      {/* Hero */}
      <section className="section bg-[#0a0a0a]">
        <div className="container-xl space-y-10">
          <FadeIn direction="up">
            <span className="pill text-white/60">Case Studies</span>
          </FadeIn>
          <h1 className="text-display max-w-4xl">
            <LineReveal delay={0.1}>Substance &amp; results.</LineReveal>
            <LineReveal delay={0.22} className="text-white/30">
              Not just pretty slides.
            </LineReveal>
          </h1>
          <FadeIn direction="up" delay={0.35}>
            <p className="text-xl text-white/50 leading-relaxed max-w-xl font-light">
              Explore how we partner with forward-thinking enterprises to deliver transformative outcomes.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Filter bar */}
      <div className="sticky top-[72px] z-30 bg-[#0a0a0a]/90 backdrop-blur-xl border-y border-white/[0.06]">
        <div className="container-xl py-3 flex items-center gap-2 overflow-x-auto">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                cat === c
                  ? "bg-white text-black font-bold"
                  : "text-white/45 hover:text-white hover:bg-white/5 border border-white/[0.08]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Projects */}
      <section className="section bg-[#0a0a0a]">
        <div className="container-xl">
          {projects.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <p className="text-white/50 text-lg">No projects in this category yet.</p>
              <button onClick={() => setCat("All")} className="btn-ghost text-sm">
                Show All
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* First project — hero-sized */}
              <FadeIn direction="up">
                <Link
                  href={`/portfolio/${projects[0].slug}`}
                  className="group block relative rounded-2xl overflow-hidden h-[60vh] min-h-[380px]"
                >
                  <ImageReveal className="absolute inset-0">
                    <Image
                      src={getMediaUrl(projects[0].imageUrl)}
                      alt={projects[0].title}
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
                        {projects[0].category} · {projects[0].client}
                      </span>
                      <h2 className="text-h2 text-white max-w-xl">{projects[0].title}</h2>
                    </div>
                    {projects[0].results && projects[0].results[0] && (
                      <div className="text-right shrink-0">
                        <div className="text-4xl font-black font-mono text-white">{projects[0].results[0].metric}</div>
                        <div className="text-label text-white/50">{projects[0].results[0].label}</div>
                      </div>
                    )}
                  </div>
                </Link>
              </FadeIn>

              {/* Remaining projects — 2-col grid */}
              {projects.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects.slice(1).map((project, idx) => (
                    <FadeIn key={project.id} direction="up" delay={idx * 0.1}>
                      <Link
                        href={`/portfolio/${project.slug}`}
                        className="group block relative rounded-2xl overflow-hidden h-[45vh] min-h-[320px]"
                      >
                        <ImageReveal className="absolute inset-0" delay={0.05 * idx}>
                          <Image
                            src={getMediaUrl(project.imageUrl)}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-[1.4s] group-hover:scale-105"
                            sizes="50vw"
                          />
                        </ImageReveal>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 space-y-2">
                          <span className="pill text-white/60 text-[10px]">
                            {project.category} · {project.year}
                          </span>
                          <h3 className="text-h3 text-white leading-snug">{project.title}</h3>
                          <p className="text-white/45 text-sm leading-relaxed line-clamp-2 font-light">{project.summary}</p>
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
          )}
        </div>
      </section>
    </>
  );
}
