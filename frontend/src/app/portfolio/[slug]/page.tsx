import React from "react";
import { MediaImage as Image } from "@/components/ui/MediaImage";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { getProjectBySlug, getProjects, getMediaUrl, isYouTubeUrl, getYouTubeId } from "@/lib/api";
import { FadeIn, LineReveal, ImageReveal } from "@/components/ui/Motion";
import { CtaSection } from "@/components/home/CtaSection";
import { ArrowRight, ArrowUpRight, CheckCircle2, Play } from "lucide-react";
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
    <div className="min-h-screen bg-white text-[#0a0a0a]">
      <Navbar />

      <main>
        {/* Hero — project image as background */}
        <section className="relative min-h-[50vh] flex items-end overflow-hidden">
          {(project.imageUrl || project.videoUrl) ? (
            <>
              {project.imageUrl ? (
                <Image
                  src={getMediaUrl(project.imageUrl)}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="100vw"
                />
              ) : (
                <div className="absolute inset-0 bg-neutral-900" />
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#070707]" />
          )}

          <div className="relative z-10 container-xl pt-32 sm:pt-40 pb-12 sm:pb-20 space-y-4">
            <FadeIn direction="up">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-4"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                <span>All Case Studies</span>
              </Link>
            </FadeIn>

            <FadeIn direction="up">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-mono font-semibold tracking-widest text-white/80 uppercase">
                  {project.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-mono font-semibold tracking-widest text-white/60 uppercase">
                  {project.industry}
                </span>
              </div>
            </FadeIn>

            <h1 className="ttl-80 font-light text-white tracking-tight leading-[1.08] max-w-4xl">
              <LineReveal delay={0.1}>{project.title}</LineReveal>
            </h1>

            <FadeIn direction="up" delay={0.15}>
              <p className="text-sm sm:text-base font-light text-white/60 leading-relaxed max-w-md">
                {project.summary}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Meta bar */}
        <section className="bg-white border-b border-black/10">
          <div className="container-xl">
            <FadeIn direction="up">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-black/10">
                {[
                  { l: "Client", v: project.client },
                  { l: "Year", v: project.year },
                  { l: "Category", v: project.category },
                  { l: "Services", v: `${project.servicesProvided.length} delivered` },
                ].map((m, i) => (
                  <div key={i} className="bg-white p-5 space-y-1">
                    <span className="text-[11px] font-mono font-semibold tracking-widest text-black/30 uppercase">{m.l}</span>
                    <p className="text-sm font-semibold text-[#0a0a0a]">{m.v}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Hero media — image or video */}
        <section className="section bg-white">
          <div className="container-xl">
            {project.videoUrl && isYouTubeUrl(project.videoUrl) ? (
              <div className="relative w-full aspect-video bg-neutral-100 border border-black/[0.06] overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${getYouTubeId(project.videoUrl)}`}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={project.title}
                />
              </div>
            ) : project.videoUrl ? (
              /* Direct video file (incl. proxied Google Drive links) */
              <div className="relative w-full aspect-video bg-black overflow-hidden">
                <video
                  src={getMediaUrl(project.videoUrl)}
                  poster={project.imageUrl ? getMediaUrl(project.imageUrl) : undefined}
                  className="absolute inset-0 w-full h-full object-contain"
                  controls
                  playsInline
                  preload="metadata"
                />
              </div>
            ) : project.imageUrl ? (
              <div className="relative w-full aspect-video overflow-hidden bg-neutral-100 border border-black/[0.06]">
                <ImageReveal className="w-full h-full">
                  <Image
                    src={getMediaUrl(project.imageUrl)}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                  />
                </ImageReveal>
              </div>
            ) : (
              <div className="w-full aspect-video bg-neutral-100 border border-black/[0.06] flex items-center justify-center">
                <span className="text-7xl font-bold text-black/10 font-mono">
                  {project.title.slice(0, 2).toUpperCase()}
                </span>
              </div>
            )}
          </div>
        </section>

        {/* Results */}
        {project.results && project.results.length > 0 && (
          <section className="section-sm bg-white border-t border-black/10">
            <div className="container-xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {project.results.map((r, i) => (
                  <FadeIn key={i} direction="up" delay={i * 0.1}>
                    <div className="text-center space-y-2 py-8">
                      <div className="text-5xl sm:text-6xl font-black font-mono text-[#0a0a0a] tracking-tight">{r.metric}</div>
                      <div className="text-sm font-mono text-black/40 tracking-wider uppercase">{r.label}</div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Narrative */}
        <section className="section bg-white border-t border-black/10">
          <div className="container-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-8 space-y-16">
                <FadeIn direction="up">
                  <div className="space-y-4">
                    <span className="text-xs font-mono font-semibold tracking-widest text-black/30 uppercase">
                      01 — The Challenge
                    </span>
                    <h2 className="ttl-80 font-light text-[#0a0a0a] tracking-tight">The Problem</h2>
                    <p className="text-base text-black/60 font-light leading-relaxed">{project.challenge}</p>
                  </div>
                </FadeIn>

                <FadeIn direction="up" delay={0.1}>
                  <div className="space-y-4">
                    <span className="text-xs font-mono font-semibold tracking-widest text-black/30 uppercase">
                      02 — The Solution
                    </span>
                    <h2 className="ttl-80 font-light text-[#0a0a0a] tracking-tight">How We Solved It</h2>
                    <p className="text-base text-black/60 font-light leading-relaxed">{project.solution}</p>
                  </div>
                </FadeIn>

                {/* Gallery */}
                {project.galleryImages && project.galleryImages.length > 0 && (
                  <FadeIn direction="up" delay={0.15}>
                    <div className="space-y-4">
                      <span className="text-xs font-mono font-semibold tracking-widest text-black/30 uppercase">
                        03 — Visual Showcase
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {project.galleryImages.map((url, i) => (
                          <div key={i} className="relative h-64 overflow-hidden bg-neutral-100 border border-black/[0.06]">
                            <ImageReveal className="w-full h-full">
                              <Image src={getMediaUrl(url)} alt={`${project.title} asset ${i + 1}`} fill className="object-cover" sizes="50vw" />
                            </ImageReveal>
                          </div>
                        ))}
                      </div>
                    </div>
                  </FadeIn>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-4 space-y-6">
                <FadeIn direction="up" delay={0.1}>
                  <div className="p-6 space-y-4 border border-black/10">
                    <h3 className="text-xs font-mono font-semibold tracking-widest text-black/30 uppercase">Capabilities Provided</h3>
                    <ul className="space-y-2">
                      {project.servicesProvided.map((s, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-black/65">
                          <CheckCircle2 className="w-4 h-4 text-black/25 shrink-0" />{s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>

                <FadeIn direction="up" delay={0.15}>
                  <div className="p-6 space-y-4 border border-black/10">
                    <h3 className="text-xs font-mono font-semibold tracking-widest text-black/30 uppercase">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologiesUsed.map((t, i) => (
                        <span key={i} className="px-3 py-1 rounded-full bg-black/5 border border-black/10 text-black/60 text-[11px] font-mono font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </FadeIn>

                <FadeIn direction="up" delay={0.2}>
                  <div className="p-6 space-y-4 bg-[#0a0a0a] text-white">
                    <h4 className="text-xl font-bold">Need similar results?</h4>
                    <p className="text-sm text-white/60 font-light leading-relaxed">Book a strategy consultation with our lead team.</p>
                    <Link href="/contact" className="inline-flex items-center gap-2 w-full justify-center px-5 py-3 rounded-full bg-white text-black font-bold text-sm hover:bg-white/90 transition-all">
                      Start a Project <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </FadeIn>
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
