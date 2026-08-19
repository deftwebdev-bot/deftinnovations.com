"use client";

import React from "react";
import { FadeIn, LineReveal } from "@/components/ui/Motion";

const PILLARS = [
  {
    no: "01",
    title: "Engineering + Creative\nSynthesis",
    description: "Our engineers and brand strategists build together from sprint day one — no handoffs, no silos. The result is fast, beautiful, and relentlessly functional.",
  },
  {
    no: "02",
    title: "Rigorous Business\nAttribution",
    description: "No vanity metrics. Every campaign, platform, and rebrand is tied directly to revenue pipeline, CPA reduction, and compound bottom-line growth.",
  },
  {
    no: "03",
    title: "Zero Template\nCompromises",
    description: "We architect custom Next.js platforms from first principles — ensuring complete brand originality, sub-second performance, and enterprise scalability.",
  },
  {
    no: "04",
    title: "Direct Senior\nLeadership",
    description: "You work with lead strategists and engineers — never passed to junior account managers. Transparent sprint reporting. Full client IP ownership.",
  },
];

export const WhyDeftSection = () => (
  <section className="section bg-[#0a0a0a] border-t border-white/[0.06]">
    <div className="container-xl space-y-20">

      {/* Large editorial header */}
      <div className="max-w-4xl space-y-6">
        <FadeIn direction="up">
          <span className="pill text-white/60">Why Deft</span>
        </FadeIn>
        <h2 className="text-display">
          <LineReveal delay={0.1}>Built for leaders who</LineReveal>
          <LineReveal delay={0.2} className="text-white/30">demand real impact.</LineReveal>
        </h2>
        <FadeIn direction="up" delay={0.35}>
          <p className="text-white/55 text-xl leading-relaxed max-w-2xl font-light">
            We replaced the bloated corporate agency playbook with a precision creative-tech model — agile, transparent, and ruthlessly results-driven.
          </p>
        </FadeIn>
      </div>

      {/* Four pillars — editorial magazine grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] overflow-hidden rounded-2xl">
        {PILLARS.map((pillar, idx) => (
          <FadeIn key={pillar.no} direction="up" delay={idx * 0.1}>
            <div className="bg-[#0a0a0a] h-full p-8 flex flex-col justify-between gap-12 group hover:bg-[#121212] transition-colors duration-300">
              <div className="flex items-start justify-between">
                <span className="step-number">{pillar.no}</span>
                <span className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-white transition-colors duration-300 mt-2" />
              </div>
              <div className="space-y-4">
                <h3 className="text-h3 text-white whitespace-pre-line">
                  {pillar.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed font-light">
                  {pillar.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

    </div>
  </section>
);
