"use client";

import React from "react";
import { FadeIn, LineReveal } from "@/components/ui/Motion";

const STEPS = [
  { no: "01", title: "Discover",   body: "Deep audit of your market, buyer intent, competitors, and tech stack to expose high-leverage growth gaps." },
  { no: "02", title: "Strategize", body: "Brand architecture, technical roadmap, content pillars, and acquisition funnel design — before a single pixel is moved." },
  { no: "03", title: "Create",     body: "Custom Next.js platforms, editorial visual identity systems, and high-converting ad creative — built in parallel." },
  { no: "04", title: "Launch",     body: "Edge CDN deployment, full Lighthouse audits, and targeted media activation with real-time attribution tracking." },
  { no: "05", title: "Grow",       body: "Continuous multivariate testing, bid optimization, CRO, and market expansion — compounding returns over time." },
];

export const ProcessSection = () => (
  <section className="section bg-[#0d0d0d] border-t border-white/[0.06]">
    <div className="container-xl space-y-20">

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="space-y-4">
          <FadeIn direction="up">
            <span className="pill text-white/60">How We Work</span>
          </FadeIn>
          <h2 className="text-h1">
            <LineReveal delay={0.1}>A 5-phase system</LineReveal>
            <LineReveal delay={0.2} className="text-white/30">designed for speed.</LineReveal>
          </h2>
        </div>

        <FadeIn direction="up" delay={0.3}>
          <p className="text-white/50 text-base leading-relaxed max-w-sm font-light">
            Disciplined and repeatable. Our sprint process eliminates project risk and ships production-ready results in weeks.
          </p>
        </FadeIn>
      </div>

      {/* Horizontal scroll on mobile, full grid on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
        {STEPS.map((step, idx) => (
          <FadeIn key={step.no} direction="up" delay={idx * 0.09}>
            <div className="group bg-[#0d0d0d] h-full p-6 lg:p-8 flex flex-col gap-8 hover:bg-[#141414] transition-colors duration-300">
              <div className="flex items-start justify-between">
                <span className="step-number text-4xl">{step.no}</span>
                {/* Progress indicator */}
                <div className="w-10 h-1.5 rounded-full bg-white/[0.06] overflow-hidden mt-3">
                  <div
                    className="h-full bg-white/50 rounded-full group-hover:bg-white transition-colors duration-500"
                    style={{ width: `${(idx + 1) * 20}%` }}
                  />
                </div>
              </div>
              <div className="space-y-3 mt-auto">
                <h3 className="text-xl font-bold text-white">{step.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed font-light">{step.body}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

    </div>
  </section>
);
