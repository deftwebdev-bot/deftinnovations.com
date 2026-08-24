"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FadeIn, LineReveal } from "@/components/ui/Motion";
import { JobPosition, Testimonial, TrustStat } from "@/lib/api";
import {
  ArrowRight, ArrowUpRight, MapPin, Briefcase, DollarSign,
  Globe, HeartHandshake, Zap, Sparkles, Users, Target,
  TrendingUp, Award, Building2, CheckCircle2, Quote,
} from "lucide-react";

const DEPARTMENTS = ["All", "Engineering", "Design & Creative", "Performance Marketing", "SEO & Content", "Strategy & Operations"];

const WHY_DEFT = [
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
    title: "Learning Stipend",
    desc: "$2,500/year dedicated to books, courses, masterclasses, and global technology/design conferences.",
  },
  {
    icon: HeartHandshake,
    title: "Global Retreats",
    desc: "All-expenses-paid international team off-sites in premier destinations like Dubai, Lisbon, and Tokyo.",
  },
];

const LIFE_AT_DEFT = [
  { stat: "50+", label: "Team Members" },
  { stat: "15+", label: "Countries" },
  { stat: "4.9", label: "Glassdoor Rating" },
  { stat: "92%", label: "Retention Rate" },
];

const BENEFITS = [
  "Competitive salary with equity options",
  "Comprehensive health & dental insurance",
  "Unlimited PTO with minimum 20-day policy",
  "Annual learning & conference budget",
  "Home office setup allowance",
  "Flexible working hours",
  "Annual team retreats worldwide",
  "Career growth & mentorship programs",
];

export function CareersClient({
  initialJobs,
  testimonials,
  trustStats,
}: {
  initialJobs: JobPosition[];
  testimonials: Testimonial[];
  trustStats: TrustStat[];
}) {
  const [dept, setDept] = useState("All");

  const filtered = initialJobs.filter((j) => dept === "All" || j.department === dept);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative min-h-[45vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#070707]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />

        <div className="relative z-10 container-xl pt-32 sm:pt-40 pb-12 sm:pb-20 space-y-4">
          <FadeIn direction="up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-mono font-semibold tracking-widest text-white/80 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Careers at Deft
            </span>
          </FadeIn>

          <h1 className="ttl-80 font-light text-white tracking-tight leading-[1.08] max-w-3xl">
            <LineReveal delay={0.1}>Build What&apos;s Next.</LineReveal>
            <span className="text-white/50 block font-light">
              Work with the best.
            </span>
          </h1>

          <FadeIn direction="up" delay={0.15}>
            <p className="text-sm sm:text-base font-light text-white/60 leading-relaxed max-w-lg">
              We are an elite collective of systems architects, creative directors, and performance growth strategists building iconic brands and sub-second digital experiences.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Life at Deft — Stats ─────────────────────────── */}
      <section className="section bg-white">
        <div className="container-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {LIFE_AT_DEFT.map((item, i) => (
              <FadeIn key={i} direction="up" delay={i * 0.08}>
                <div className="text-center space-y-2">
                  <div className="text-4xl sm:text-5xl font-black font-mono text-[#0a0a0a] tracking-tight">{item.stat}</div>
                  <div className="text-sm font-mono text-black/40 tracking-wider uppercase">{item.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Join Deft ─────────────────────────────────── */}
      <section className="section bg-white border-t border-black/10">
        <div className="container-xl space-y-12">
          <div className="max-w-xl space-y-2">
            <FadeIn direction="up">
              <span className="text-xs font-mono font-semibold tracking-widest text-black/30 uppercase flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Why Join Deft
              </span>
            </FadeIn>
            <FadeIn direction="up" delay={0.05}>
              <h2 className="ttl-80 font-light text-[#0a0a0a] tracking-tight">
                An environment engineered for craft.
              </h2>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_DEFT.map((p, i) => {
              const Icon = p.icon;
              return (
                <FadeIn key={i} direction="up" delay={i * 0.08}>
                  <div className="p-6 space-y-4 border border-black/10 hover:border-black/25 transition-all h-full">
                    <div className="w-10 h-10 rounded-xl bg-black/5 border border-black/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-black/60" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-base font-semibold text-[#0a0a0a]">{p.title}</h3>
                      <p className="text-sm text-black/45 leading-relaxed font-light">{p.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Benefits ─────────────────────────────────────── */}
      <section className="section bg-white border-t border-black/10">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-6">
              <FadeIn direction="up">
                <span className="text-xs font-mono font-semibold tracking-widest text-black/30 uppercase flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4" />
                  Benefits & Perks
                </span>
              </FadeIn>
              <FadeIn direction="up" delay={0.05}>
                <h2 className="ttl-80 font-light text-[#0a0a0a] tracking-tight">
                  We invest in our people.
                </h2>
              </FadeIn>
              <FadeIn direction="up" delay={0.1}>
                <p className="text-base text-black/50 font-light leading-relaxed">
                  Our benefits package is designed to support your growth, wellbeing, and creative energy. We believe great work comes from empowered people.
                </p>
              </FadeIn>
            </div>

            <FadeIn direction="up" delay={0.15}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {BENEFITS.map((b, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 border border-black/[0.06]">
                    <CheckCircle2 className="w-4 h-4 text-black/25 shrink-0 mt-0.5" />
                    <span className="text-sm text-black/65 font-light">{b}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Our Clients / Trust ─────────────────────────── */}
      {trustStats.length > 0 && (
        <section className="section bg-white border-t border-black/10">
          <div className="container-xl space-y-12">
            <div className="max-w-xl space-y-2">
              <FadeIn direction="up">
                <span className="text-xs font-mono font-semibold tracking-widest text-black/30 uppercase flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Our Clients Trust Us
                </span>
              </FadeIn>
              <FadeIn direction="up" delay={0.05}>
                <h2 className="ttl-80 font-light text-[#0a0a0a] tracking-tight">
                  Results that speak.
                </h2>
              </FadeIn>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-black/10">
              {trustStats.map((stat, i) => (
                <FadeIn key={i} direction="up" delay={i * 0.08}>
                  <div className="bg-white p-8 text-center space-y-2">
                    <div className="text-3xl sm:text-4xl font-black font-mono text-[#0a0a0a] tracking-tight">{stat.value}</div>
                    <div className="text-xs font-mono text-black/40 tracking-wider uppercase">{stat.label}</div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Testimonial ─────────────────────────────────── */}
      {testimonials.length > 0 && (
        <section className="section bg-white border-t border-black/10">
          <div className="container-xl">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <FadeIn direction="up">
                <Quote className="w-8 h-8 text-black/10 mx-auto" />
              </FadeIn>
              <FadeIn direction="up" delay={0.1}>
                <blockquote className="text-xl sm:text-2xl font-light text-[#0a0a0a] leading-relaxed">
                  {testimonials[0].quote}
                </blockquote>
              </FadeIn>
              <FadeIn direction="up" delay={0.15}>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-[#0a0a0a]">{testimonials[0].author}</p>
                  <p className="text-xs font-mono text-black/40">{testimonials[0].role}, {testimonials[0].company}</p>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      )}

      {/* ── Open Positions ─────────────────────────────────── */}
      <section id="positions" className="section bg-white border-t border-black/10">
        <div className="container-xl space-y-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-black/[0.08]">
            <div className="space-y-2">
              <FadeIn direction="up">
                <span className="text-xs font-mono font-semibold tracking-widest text-black/30 uppercase flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Open Positions
                </span>
              </FadeIn>
              <FadeIn direction="up" delay={0.05}>
                <h2 className="ttl-80 font-light text-[#0a0a0a] tracking-tight">
                  Current Opportunities
                  <span className="text-2xl font-light text-black/30 ml-3 align-super">({filtered.length})</span>
                </h2>
              </FadeIn>
            </div>

            <FadeIn direction="up" delay={0.1}>
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {DEPARTMENTS.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDept(d)}
                    className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
                      dept === d
                        ? "bg-[#0a0a0a] text-white border-[#0a0a0a]"
                        : "text-black/50 hover:text-[#0a0a0a] hover:border-black/30 border-black/15"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </FadeIn>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <p className="text-black/40 text-lg">No open roles currently in this department.</p>
              <button onClick={() => setDept("All")} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View All Departments
              </button>
            </div>
          ) : (
            <div className="space-y-0">
              {filtered.map((job, idx) => (
                <FadeIn key={job.id} direction="up" delay={idx * 0.06}>
                  <Link
                    href={`/careers/${job.slug}`}
                    className="group flex flex-col lg:flex-row lg:items-center justify-between py-8 border-b border-black/[0.06] last:border-b-0 hover:bg-black/[0.01] transition-all gap-4 px-2"
                  >
                    <div className="space-y-2.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-black/5 border border-black/10 text-[10px] font-mono font-semibold text-black/50 uppercase tracking-wider">
                          {job.department}
                        </span>
                        <span className="text-black/20">·</span>
                        <span className="text-xs text-black/40">{job.experienceLevel}</span>
                        {job.featured && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 text-[10px] font-mono font-semibold">
                            Priority Hire
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-normal text-[#0a0a0a] group-hover:text-black/60 transition-colors">
                        {job.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-black/40">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-black/25" /> {job.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5 text-black/25" /> {job.jobType}
                        </span>
                        <span className="flex items-center gap-1.5 font-mono text-black/60">
                          <DollarSign className="w-3.5 h-3.5 text-black/25" /> {job.salaryRange}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-medium text-blue-600 group-hover:text-blue-700 transition-colors">
                        View Role
                      </span>
                      <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Open Pitch ─────────────────────────────────── */}
      <section className="section bg-white border-t border-black/10">
        <div className="container-xl">
          <div className="p-8 sm:p-12 bg-[#0a0a0a] text-white flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-mono font-semibold tracking-widest text-white/60 uppercase">
                Don&apos;t see your role?
              </span>
              <h3 className="ttl-h3 font-normal text-white">We always hire exceptional talent.</h3>
              <p className="text-white/50 text-sm font-light leading-relaxed">
                If you are a world-class builder, designer, or marketer and believe you can make a major impact at Deft Innovations, pitch us directly.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-white/90 transition-all shrink-0"
            >
              <span>Send an Open Pitch</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
