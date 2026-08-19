import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { getProjectBySlug, getProjects, getMediaUrl } from "@/lib/api";
import { FadeIn, LineReveal, ImageReveal } from "@/components/ui/Motion";
import { CtaSection } from "@/components/home/CtaSection";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const dynamicParams = true;

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProjectBySlug(slug);
  if (!p) return { title: "Not Found" };
  return { title: `${p.title} — Case Study — Deft Innovations`, description: p.summary };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <main className="pt-32">

        {/* Header */}
        <section className="section bg-[#0a0a0a]">
          <div className="container-xl space-y-8">
            <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Case Studies
            </Link>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className="pill text-white/60 text-[10px]">{project.category}</span>
                <span className="pill text-white/40 text-[10px]">{project.industry}</span>
              </div>
              <h1 className="text-display max-w-4xl">
                <LineReveal delay={0.1}>{project.title}</LineReveal>
              </h1>
              <FadeIn direction="up" delay={0.25}>
                <p className="text-xl text-white/55 max-w-2xl leading-relaxed font-light">{project.summary}</p>
              </FadeIn>
            </div>

            {/* Meta bar */}
            <FadeIn direction="up" delay={0.35}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] rounded-xl overflow-hidden">
                {[
                  { l: "Client", v: project.client },
                  { l: "Year", v: project.year },
                  { l: "Category", v: project.category },
                  { l: "Services", v: `${project.servicesProvided.length} delivered` },
                ].map((m, i) => (
                  <div key={i} className="bg-[#0a0a0a] p-5 space-y-1">
                    <span className="text-label text-white/25">{m.l}</span>
                    <p className="text-sm font-semibold text-white">{m.v}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Full-bleed hero image */}
        <section className="bg-[#0a0a0a]">
          <div className="container-xl">
            <ImageReveal className="w-full h-[55vh] sm:h-[65vh] rounded-2xl overflow-hidden">
              <Image src={project.imageUrl} alt={project.title} fill className="object-cover" priority sizes="100vw" />
            </ImageReveal>
          </div>
        </section>

        {/* Results */}
        {project.results && project.results.length > 0 && (
          <section className="section-sm border-t border-white/[0.06]">
            <div className="container-xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
                {project.results.map((r, i) => (
                  <FadeIn key={i} direction="up" delay={i * 0.1}>
                    <div className="bg-[#0a0a0a] p-10 text-center space-y-2">
                      <div className="text-h1 font-black font-mono text-white">{r.metric}</div>
                      <div className="text-label text-white/40">{r.label}</div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Narrative */}
        <section className="section">
          <div className="container-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

              <div className="lg:col-span-8 space-y-20">
                <div className="space-y-5">
                  <span className="text-label text-white/30">01 — The Challenge</span>
                  <h2 className="text-h2 text-white">The Problem</h2>
                  <p className="text-white/60 text-base leading-relaxed font-light">{project.challenge}</p>
                </div>

                <div className="space-y-5">
                  <span className="text-label text-white/30">02 — The Solution</span>
                  <h2 className="text-h2 text-white">How We Solved It</h2>
                  <p className="text-white/60 text-base leading-relaxed font-light">{project.solution}</p>
                </div>

                {/* Gallery */}
                {project.galleryImages && project.galleryImages.length > 0 && (
                  <div className="space-y-6">
                    <span className="text-label text-white/30">03 — Visual Showcase</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {project.galleryImages.map((url, i) => (
                        <ImageReveal key={i} className="h-64 rounded-xl overflow-hidden" delay={0.05 * i}>
                          <Image src={url} alt={`${project.title} asset ${i + 1}`} fill className="object-cover" sizes="50vw" />
                        </ImageReveal>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-4 space-y-6">
                <div className="rounded-2xl bg-[#111] border border-white/[0.07] p-6 space-y-4">
                  <h3 className="text-label text-white/30">Capabilities Provided</h3>
                  <ul className="space-y-2">
                    {project.servicesProvided.map((s, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-white/65">
                        <CheckCircle2 className="w-4 h-4 text-white/40 shrink-0" />{s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl bg-[#111] border border-white/[0.07] p-6 space-y-4">
                  <h3 className="text-label text-white/30">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologiesUsed.map((t, i) => (
                      <span key={i} className="pill text-white/60 text-[10px]">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl bg-white p-6 space-y-4 text-black">
                  <h4 className="text-xl font-bold">Need similar results?</h4>
                  <p className="text-sm text-black/60 font-light leading-relaxed">Book a strategy consultation with our lead team.</p>
                  <Link href="/contact" className="inline-flex items-center gap-2 w-full justify-center px-5 py-3 rounded-full bg-black text-white font-bold text-sm hover:bg-black/90 transition-all">
                    Start a Project <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
