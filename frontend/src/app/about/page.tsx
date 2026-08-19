import React from "react";
import Image from "next/image";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { FadeIn, LineReveal, ImageReveal } from "@/components/ui/Motion";
import { getTeam, getTrustStats, getMediaUrl } from "@/lib/api";
import { CtaSection } from "@/components/home/CtaSection";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "About Deft Innovations",
  description: "Learn about Deft Innovations — our mission, vision, leadership team, and the strategic approach behind our creative technology agency.",
};

const VALUES = [
  { no: "01", title: "Relentless Rigor",        body: "Every strategic decision is backed by empirical data, behavior testing, and clear revenue targets — never subjective opinions." },
  { no: "02", title: "Engineering Excellence",  body: "We treat software as craft. Sub-second performance, bulletproof accessibility, and clean scalable code are non-negotiable." },
  { no: "03", title: "Aesthetic Restraint",     body: "Visual simplicity is strategic power. High-contrast precision typography creates instant brand authority." },
  { no: "04", title: "Radical Transparency",   body: "Direct senior access, clear sprint reporting, and complete client IP ownership — no hidden fees or lock-in." },
];

export default async function AboutPage() {
  const [team, stats] = await Promise.all([getTeam(), getTrustStats()]);

  const defaultStats = [
    { value: "150+", label: "Global Projects" },
    { value: "98.4%", label: "Client Retention" },
    { value: "0.4s", label: "Avg Page Speed" },
    { value: "$45M+", label: "Revenue Generated" },
  ];
  const displayStats = stats.length > 0 ? stats : defaultStats;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <main className="pt-32">

        {/* ── Page hero ──────────────────────────────────── */}
        <section className="section bg-[#0a0a0a]">
          <div className="container-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-end">

              <div className="lg:col-span-7 space-y-8">
                <FadeIn direction="up">
                  <span className="pill text-white/60">Agency Heritage</span>
                </FadeIn>
                <h1 className="text-display">
                  <LineReveal delay={0.1}>We are Deft Innovations.</LineReveal>
                  <LineReveal delay={0.22} className="text-white/30">Built different by design.</LineReveal>
                </h1>
                <FadeIn direction="up" delay={0.35}>
                  <p className="text-xl text-white/55 leading-relaxed max-w-lg font-light">
                    Founded on the belief that modern brands require more than agency templates — we combine brand architecture, web engineering, and disciplined media under one roof.
                  </p>
                </FadeIn>
              </div>

              {/* Side stat panel */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
                {displayStats.slice(0, 4).map((s, i) => (
                  <FadeIn key={i} direction="up" delay={i * 0.08}>
                    <div className="bg-[#0a0a0a] p-8 text-center space-y-1">
                      <div className="text-h2 font-black font-mono text-white">{s.value}</div>
                      <div className="text-label text-white/35">{s.label}</div>
                    </div>
                  </FadeIn>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* ── Big image ──────────────────────────────────── */}
        <section className="bg-[#0a0a0a]">
          <div className="container-xl">
            <ImageReveal className="w-full h-[60vh] sm:h-[70vh] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=85"
                alt="Deft Innovations team at work"
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-xs font-mono text-white/70">
                  DEFT INNOVATIONS · CREATIVE TECHNOLOGY LAB
                </div>
              </div>
            </ImageReveal>
          </div>
        </section>

        {/* ── Mission / Vision ───────────────────────────── */}
        <section className="section border-t border-white/[0.06]">
          <div className="container-xl space-y-20">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
              {[
                {
                  tag: "Mission",
                  headline: "Empowering Market Leaders Through Superior Brand & Technical Execution",
                  body: "To eliminate digital mediocrity by engineering bespoke digital platforms, authoritative brand identities, and high-ROAS marketing campaigns that deliver compounding revenue.",
                },
                {
                  tag: "Vision",
                  headline: "Setting the Global Benchmark for Creative Technology Agencies",
                  body: "To remain the premier independent agency choice for high-growth enterprises worldwide — recognized for uncompromising technical speed, aesthetic authority, and measurable business impact.",
                },
              ].map((item, i) => (
                <FadeIn key={i} direction="up" delay={i * 0.1}>
                  <div className="bg-[#0a0a0a] p-10 sm:p-14 space-y-6 h-full">
                    <span className="text-label text-white/30">{item.tag}</span>
                    <h3 className="text-h3 text-white">{item.headline}</h3>
                    <p className="text-white/50 leading-relaxed font-light">{item.body}</p>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* Core values */}
            <div className="space-y-12">
              <div className="space-y-4">
                <FadeIn direction="up"><span className="pill text-white/60">Core Values</span></FadeIn>
                <h2 className="text-h1">
                  <LineReveal delay={0.1}>Principles that drive</LineReveal>
                  <LineReveal delay={0.2} className="text-white/30">every decision.</LineReveal>
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
                {VALUES.map((val, i) => (
                  <FadeIn key={i} direction="up" delay={i * 0.08}>
                    <div className="bg-[#0a0a0a] h-full p-8 flex flex-col gap-8 hover:bg-[#111] transition-colors duration-300">
                      <span className="step-number">{val.no}</span>
                      <div className="space-y-3 mt-auto">
                        <h4 className="text-xl font-bold text-white">{val.title}</h4>
                        <p className="text-sm text-white/45 leading-relaxed font-light">{val.body}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ── Approach ───────────────────────────────────── */}
        <section className="section bg-[#0d0d0d] border-t border-white/[0.06]">
          <div className="container-xl space-y-12">
            <div className="space-y-4">
              <FadeIn direction="up"><span className="pill text-white/60">Our Approach</span></FadeIn>
              <h2 className="text-h1">
                <LineReveal delay={0.1}>Strategy + Creativity</LineReveal>
                <LineReveal delay={0.2} className="text-white/30">+ Technology + Execution</LineReveal>
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
              {[
                { no: "01", h: "Strategy",   b: "Data audit, persona mapping, funnel design, and competitive positioning." },
                { no: "02", h: "Creativity", b: "High-contrast design systems, editorial typography, and conversion copywriting." },
                { no: "03", h: "Technology", b: "Sub-second Next.js web apps, headless CMS, serverless APIs, and automated tracking." },
                { no: "04", h: "Execution",  b: "Multivariate campaign deployment, search dominance, and continuous CRO." },
              ].map((item, i) => (
                <FadeIn key={i} direction="up" delay={i * 0.08}>
                  <div className="bg-[#0d0d0d] h-full p-8 flex flex-col gap-8 hover:bg-[#141414] transition-colors duration-300">
                    <span className="step-number">{item.no}</span>
                    <div className="space-y-3 mt-auto">
                      <h4 className="text-xl font-bold text-white">{item.h}</h4>
                      <p className="text-sm text-white/45 leading-relaxed font-light">{item.b}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── Team ───────────────────────────────────────── */}
        <section className="section border-t border-white/[0.06]">
          <div className="container-xl space-y-16">
            <div className="space-y-4">
              <FadeIn direction="up"><span className="pill text-white/60">Leadership & Team</span></FadeIn>
              <h2 className="text-h1">
                <LineReveal delay={0.1}>The minds behind</LineReveal>
                <LineReveal delay={0.2} className="text-white/30">Deft Innovations.</LineReveal>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, idx) => {
                const rawImg = member.imageUrl?.trim() || "";
                const photoSrc = rawImg ? getMediaUrl(rawImg) : null;

                return (
                  <FadeIn key={member.id} direction="up" delay={idx * 0.05}>
                    <div className="group space-y-4">
                      <ImageReveal className="w-full aspect-[3/4] rounded-xl overflow-hidden bg-[#141414] relative flex items-center justify-center" delay={0.03 * idx}>
                        {photoSrc ? (
                          <Image
                            src={photoSrc}
                            alt={member.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/[0.06] p-6 text-center">
                            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-3">
                              <span className="text-2xl font-bold font-mono text-white/70">
                                {member.name.slice(0, 2).toUpperCase()}
                              </span>
                            </div>
                            <span className="text-xs font-mono text-white/40 tracking-wider uppercase">{member.role}</span>
                          </div>
                        )}
                      </ImageReveal>
                      <div>
                        <h4 className="text-lg font-bold text-white">{member.name}</h4>
                        <p className="text-label text-white/40">{member.role}</p>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>

        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
