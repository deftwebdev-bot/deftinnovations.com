"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FadeIn, ImageReveal } from "@/components/ui/Motion";
import { Project } from "@/lib/api";
import { getMediaUrl } from "@/lib/api";
import { Play, ChevronDown, Check } from "lucide-react";

function getUniqueIndustries(projects: Project[]): string[] {
  const set = new Set(projects.map((p) => p.industry).filter(Boolean));
  return Array.from(set).sort();
}

function getUniqueCategories(projects: Project[]): string[] {
  const set = new Set(projects.map((p) => p.category).filter(Boolean));
  return Array.from(set).sort();
}

function DropdownFilter({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: string[];
  selected: string;
  onSelect: (val: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border border-black/15 text-black/60 hover:border-black/30 hover:text-[#0a0a0a] transition-all"
      >
        <span>{selected || label}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-black/10 rounded-xl shadow-lg z-50 overflow-hidden">
          <button
            onClick={() => { onSelect(""); setOpen(false); }}
            className={`w-full text-left px-4 py-3 text-sm hover:bg-black/[0.03] transition-colors flex items-center justify-between ${!selected ? "text-[#0a0a0a] font-medium" : "text-black/60"}`}
          >
            <span>All {label}</span>
            {!selected && <Check className="w-4 h-4 text-black/40" />}
          </button>
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { onSelect(opt); setOpen(false); }}
              className={`w-full text-left px-4 py-3 text-sm hover:bg-black/[0.03] transition-colors flex items-center justify-between ${selected === opt ? "text-[#0a0a0a] font-medium" : "text-black/60"}`}
            >
              <span>{opt}</span>
              {selected === opt && <Check className="w-4 h-4 text-black/40" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function PortfolioListClient({ initialProjects }: { initialProjects: Project[] }) {
  const [industry, setIndustry] = useState("");
  const [expertise, setExpertise] = useState("");

  const industries = getUniqueIndustries(initialProjects);
  const categories = getUniqueCategories(initialProjects);

  const projects = initialProjects.filter((p) => {
    if (industry && p.industry !== industry) return false;
    if (expertise && p.category !== expertise) return false;
    return true;
  });

  return (
    <>
      {/* Page header — clean, no hero image */}
      <section className="section bg-white">
        <div className="container-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black/[0.08]">
            <div className="space-y-2">
              <FadeIn direction="up">
                <h1 className="ttl-80 font-light text-[#0a0a0a] tracking-tight">
                  Case Studies
                  <span className="text-2xl font-light text-black/30 ml-3 align-super">({projects.length})</span>
                </h1>
              </FadeIn>
            </div>

            {/* Dropdown filters */}
            <FadeIn direction="up" delay={0.1}>
              <div className="flex items-center gap-3">
                <DropdownFilter
                  label="Industries"
                  options={industries}
                  selected={industry}
                  onSelect={setIndustry}
                />
                <DropdownFilter
                  label="Expertise"
                  options={categories}
                  selected={expertise}
                  onSelect={setExpertise}
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Projects grid — clean cards like reference */}
      <section className="section-sm bg-white pt-0">
        <div className="container-xl">
          {projects.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <p className="text-black/40 text-lg">No projects match the selected filters.</p>
              <button
                onClick={() => { setIndustry(""); setExpertise(""); }}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
              {projects.map((project, idx) => (
                <FadeIn key={project.id} direction="up" delay={idx * 0.06}>
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

                    {/* Caption — category + title */}
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
          )}
        </div>
      </section>
    </>
  );
}
