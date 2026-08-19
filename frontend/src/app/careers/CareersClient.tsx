"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FadeIn, LineReveal } from "@/components/ui/Motion";
import { JobPosition } from "@/lib/api";
import { ArrowUpRight, MapPin, Briefcase, DollarSign, Sparkles, Globe, HeartHandshake, Zap } from "lucide-react";

const DEPARTMENTS = ["All", "Engineering", "Design & Creative", "Performance Marketing", "SEO & Content", "Strategy & Operations"];

const PERKS_LIST = [
  {
    icon: Globe,
    title: "100% Remote-First",
    desc: "Work from anywhere on Earth. We optimize for asynchronous deep work and clarity, not desk presence.",
  },
  {
    icon: Zap,
    title: "Top-Tier Hardware",
    desc: "Every team member gets a fully loaded Apple MacBook Pro M3 Max, 4K monitor, and ergonomic workspace budget.",
  },
  {
    icon: Sparkles,
    title: "Learning & Summit Stipend",
    desc: "$2,500/year dedicated to books, courses, masterclasses, and global technology/design conferences.",
  },
  {
    icon: HeartHandshake,
    title: "Annual Global Retreats",
    desc: "All-expenses-paid international team off-sites in premier destinations like Dubai, Lisbon, and Tokyo.",
  },
];

export function CareersClient({ initialJobs }: { initialJobs: JobPosition[] }) {
  const [dept, setDept] = useState("All");

  const filtered = initialJobs.filter((j) => {
    return dept === "All" || j.department === dept;
  });

  return (
    <>
      {/* ── Hero Section ─────────────────────────────────── */}
      <section className="section bg-[#0a0a0a]">
        <div className="container-xl space-y-8">
          <FadeIn direction="up">
            <span className="pill text-white/60">Careers at Deft</span>
          </FadeIn>

          <h1 className="text-display max-w-4xl">
            <LineReveal delay={0.1}>Build What&apos;s Next.</LineReveal>
            <LineReveal delay={0.22} className="text-white/30">
              Work with the best.
            </LineReveal>
          </h1>

          <FadeIn direction="up" delay={0.35}>
            <p className="text-xl text-white/55 max-w-2xl leading-relaxed font-light">
              We are an elite collective of systems architects, creative directors, and performance growth strategists.
              We build iconic brands and sub-second digital experiences for high-velocity global clients.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Perks / Culture Band ─────────────────────────── */}
      <section className="section-sm bg-[#0e0e0e] border-y border-white/[0.06]">
        <div className="container-xl space-y-12">
          <div className="max-w-xl space-y-2">
            <span className="text-label text-white/30">Why Join Deft Innovations</span>
            <h2 className="text-h2 text-white">An environment engineered for craft.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PERKS_LIST.map((p, i) => {
              const Icon = p.icon;
              return (
                <FadeIn key={i} direction="up" delay={i * 0.08}>
                  <div className="card-hover p-6 space-y-4 rounded-2xl bg-[#121212] border border-white/[0.07] h-full flex flex-col justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-white">{p.title}</h3>
                      <p className="text-sm text-white/45 leading-relaxed font-light">{p.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Open Positions ─────────────────────────────────── */}
      <section id="positions" className="section bg-[#0a0a0a]">
        <div className="container-xl space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="pill text-white/60 text-[10px]">Open Positions</span>
              <h2 className="text-h2 text-white">Current Opportunities ({filtered.length})</h2>
            </div>

            {/* Department Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {DEPARTMENTS.map((d) => (
                <button
                  key={d}
                  onClick={() => setDept(d)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    dept === d
                      ? "bg-white text-black"
                      : "text-white/50 hover:text-white bg-white/[0.03] border border-white/[0.08]"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 rounded-2xl bg-[#111] border border-white/[0.06] space-y-4">
              <p className="text-white/50 text-lg">No open roles currently in this department.</p>
              <button onClick={() => setDept("All")} className="btn-ghost text-sm">
                View All Departments
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((job, idx) => (
                <FadeIn key={job.id} direction="up" delay={idx * 0.08}>
                  <Link
                    href={`/careers/${job.slug}`}
                    className="group flex flex-col lg:flex-row lg:items-center justify-between p-6 sm:p-8 rounded-2xl bg-[#111] border border-white/[0.07] hover:border-white/30 hover:bg-[#161616] transition-all duration-300 gap-6"
                  >
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="pill text-white/80 font-bold bg-white/10 text-[10px]">
                          {job.department}
                        </span>
                        <span className="text-white/30">·</span>
                        <span className="text-white/50">{job.experienceLevel}</span>
                        {job.featured && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono">
                            Priority Hire
                          </span>
                        )}
                      </div>

                      <h3 className="text-2xl font-bold text-white group-hover:text-white/90 transition-colors">
                        {job.title}
                      </h3>

                      <p className="text-white/50 text-sm max-w-2xl line-clamp-2 font-light leading-relaxed">
                        {job.overview}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-white/40 pt-1">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-white/30" /> {job.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5 text-white/30" /> {job.jobType}
                        </span>
                        <span className="flex items-center gap-1.5 text-white/70 font-mono">
                          <DollarSign className="w-3.5 h-3.5 text-white/40" /> {job.salaryRange}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="hidden sm:inline-flex text-xs font-semibold text-white/40 group-hover:text-white transition-colors">
                        View Role
                      </span>
                      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Open Pitch / Spontaneous Application ─────────── */}
      <section className="section-sm bg-[#0a0a0a] border-t border-white/[0.06]">
        <div className="container-xl">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#161616] to-[#0d0d0d] border border-white/10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <span className="pill text-white/60 text-[10px]">Don't see your role?</span>
              <h3 className="text-h2 text-white">We always hire exceptional talent.</h3>
              <p className="text-white/50 text-base font-light leading-relaxed">
                If you are a world-class builder, designer, or marketer and believe you can make a major impact at Deft Innovations, pitch us directly.
              </p>
            </div>

            <Link href="/contact" className="btn-primary shrink-0 py-4 px-8 text-base">
              Send an Open Pitch <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
