"use client";

import React, { useState } from "react";
import { MediaImage as Image } from "@/components/ui/MediaImage";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, X } from "lucide-react";
import { FadeIn, LineReveal, ImageReveal } from "@/components/ui/Motion";
import { TeamMember, Article, CultureGalleryItem, getMediaUrl } from "@/lib/api";
import { CtaSection } from "@/components/home/CtaSection";

/* ── Fallback team data ── */
const FALLBACK_TEAM: TeamMember[] = [
  { id: 1, name: "Marcus Vance", role: "Founder & Creative Director", imageUrl: "" },
  { id: 2, name: "Sophia Lin", role: "Partner & Head of Technology", imageUrl: "" },
  { id: 3, name: "David Chen", role: "VP of Performance Marketing", imageUrl: "" },
  { id: 4, name: "Elena Rostova", role: "Principal Brand Strategist", imageUrl: "" },
];

/* ── Fallback gallery photos ── */
const FALLBACK_GALLERY: CultureGalleryItem[] = [
  { id: "gal-1", imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=85" },
  { id: "gal-2", imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=85" },
  { id: "gal-3", imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=85" },
  { id: "gal-4", imageUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=85" },
  { id: "gal-5", imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=85" },
  { id: "gal-6", imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=85" },
  { id: "gal-7", imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85" },
  { id: "gal-8", imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=85" },
];

/* ── Collage layout patterns — cycles through varied aspect ratios for visual richness ── */
const ASPECT_PATTERNS = [
  "aspect-[4/5]",
  "aspect-[16/10]",
  "aspect-[4/5]",
  "aspect-[4/3]",
  "aspect-[16/10]",
  "aspect-[4/5]",
  "aspect-[4/3]",
  "aspect-[16/10]",
];

interface OurTeamClientProps {
  team?: TeamMember[];
  gallery?: CultureGalleryItem[];
  articles?: Article[];
}

export function OurTeamClient({ team = [], gallery = [], articles = [] }: OurTeamClientProps) {
  const [lightbox, setLightbox] = useState<CultureGalleryItem | null>(null);

  const displayTeam = team.length > 0 ? team : FALLBACK_TEAM;
  const displayGallery = gallery.length > 0 ? gallery : FALLBACK_GALLERY;
  const displayArticles = articles.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#070707] text-white">
      <main>

        {/* ── 1. Page Hero — Team Group Photo Background (extends behind navbar) ── */}
        <section className="relative min-h-screen flex items-end overflow-hidden">
          {/* Background Image — first gallery photo or fallback */}
          {displayGallery.length > 0 ? (
            <div className="absolute inset-0">
              <Image
                src={getMediaUrl(displayGallery[0].imageUrl)}
                alt="Deft Innovations Team"
                fill
                className="object-cover object-center"
                sizes="100vw"
                priority
              />
            </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#070707]" />
          )}

          {/* Gradient overlays for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

          {/* Content — positioned at bottom of hero */}
          <div className="relative z-10 container-xl pb-12 sm:pb-20 space-y-6">
            <FadeIn direction="up">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-mono font-semibold tracking-widest text-white/80 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Our People &amp; Culture
              </span>
            </FadeIn>

            <h1 className="ttl-120 font-light text-white tracking-tight leading-[1.02] max-w-4xl">
              <LineReveal delay={0.1}>The Minds Behind</LineReveal>
              <span className="text-white/50 block font-light">
                The Digital Magic.
              </span>
            </h1>

            <FadeIn direction="up" delay={0.25}>
              <p className="text-lg sm:text-xl font-light text-white/60 leading-relaxed max-w-2xl">
                We are 150+ strategists, designers, and engineers from 10+ countries — building products that shape how millions experience the digital world.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.35}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a href="#gallery" className="btn-primary inline-flex items-center gap-2 group">
                  <span>Life at Deft</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#team" className="btn-ghost inline-flex items-center gap-2">
                  <span>Meet the Team</span>
                </a>
                <Link
                  href="/careers"
                  className="btn-outline-dark text-sm inline-flex items-center gap-2 border-white/20 text-white hover:bg-white hover:text-black group transition-all"
                >
                  <span>Join us</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── 2. Life at Deft — Collage Gallery ─────────── */}
        <section id="gallery" className="section bg-white border-t border-black/10">
          <div className="container-xl space-y-12">

            {/* Section header */}
            <div className="space-y-2 pb-6 border-b border-black/10">
              <FadeIn direction="up">
                <span className="text-xs font-mono font-semibold tracking-widest text-black/40 uppercase">
                  Culture &amp; Spaces
                </span>
              </FadeIn>
              <h2 className="ttl-80 font-light text-[#0a0a0a] tracking-tight">
                <LineReveal delay={0.1}>Life at Deft</LineReveal>
              </h2>
              <FadeIn direction="up" delay={0.15}>
                <p className="text-base sm:text-lg text-black/50 font-light max-w-lg">
                  Inside our creative studios, global retreats, sprint demos, and everyday collaborative moments.
                </p>
              </FadeIn>
            </div>

            {/* Collage masonry grid — varied aspect ratios, no cards, no overlays */}
            <div className="columns-2 md:columns-3 lg:columns-4 gap-0">
              {displayGallery.map((photo, idx) => {
                const src = getMediaUrl(photo.imageUrl);
                if (!src) return null;
                const aspectClass = ASPECT_PATTERNS[idx % ASPECT_PATTERNS.length];
                return (
                  <FadeIn key={photo.id} direction="up" delay={idx * 0.04}>
                    <div
                      onClick={() => setLightbox(photo)}
                      className={`relative w-full ${aspectClass} break-inside-avoid overflow-hidden cursor-pointer group`}
                    >
                      <Image
                        src={src}
                        alt={`Life at Deft ${idx + 1}`}
                        fill
                        // First two gallery photos are above the fold — eagerly load them
                        priority={idx < 2}
                        loading={idx < 2 ? "eager" : "lazy"}
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      />
                      {/* Subtle hover shimmer */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                    </div>
                  </FadeIn>
                );
              })}
            </div>

          </div>
        </section>

        {/* ── 3. Team Grid ───────────────────────────────── */}
        <section id="team" className="section bg-[#070707] border-t border-white/10">
          <div className="container-xl space-y-16">

            {/* Section header */}
            <div className="space-y-3 pb-8 border-b border-white/10">
              <FadeIn direction="up">
                <span className="text-xs font-mono font-semibold tracking-widest text-white/40 uppercase">
                  Leadership &amp; Talent
                </span>
              </FadeIn>
              <h2 className="ttl-80 font-light text-white tracking-tight">
                <LineReveal delay={0.1}>Meet the Team</LineReveal>
              </h2>
              <FadeIn direction="up" delay={0.15}>
                <p className="text-base sm:text-lg text-white/50 font-light max-w-xl leading-relaxed">
                  The strategists, designers, and engineers shaping digital experiences across the globe.
                </p>
              </FadeIn>
            </div>

            {/* Team cards — modern aesthetic with layered hover effects */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-7">
              {displayTeam.map((member, idx) => {
                const rawImg = member.imageUrl?.trim() || "";
                const photoSrc = rawImg ? getMediaUrl(rawImg) : null;

                return (
                  <motion.div
                    key={member.id || idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative"
                  >
                    {/* Card container with border glow on hover */}
                    <div className="relative overflow-hidden bg-[#0e0e0e] border border-white/[0.06] transition-all duration-500 group-hover:border-white/[0.15] group-hover:shadow-[0_0_60px_rgba(255,255,255,0.04)]">
                      {/* Photo area */}
                      <div className="relative aspect-[3/4] w-full overflow-hidden">
                        <ImageReveal className="w-full h-full">
                          {photoSrc ? (
                            <Image
                              src={photoSrc}
                              alt={member.name}
                              fill
                              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                              sizes="(max-width: 640px) 50vw, (max-width: 1200px) 33vw, 25vw"
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-white/[0.06] via-transparent to-white/[0.02]">
                              <span className="text-4xl font-bold font-mono text-white/20 tracking-tight">
                                {member.name.slice(0, 2).toUpperCase()}
                              </span>
                            </div>
                          )}
                        </ImageReveal>

                        {/* Bottom gradient — always visible, deepens on hover */}
                        <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black via-black/60 to-transparent transition-opacity duration-500" />

                        {/* Top edge highlight on hover */}
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Name & role overlaid at bottom of image */}
                        <div className="absolute inset-x-0 bottom-0 z-10 p-5 space-y-1.5">
                          <h3 className="text-base sm:text-lg font-semibold text-white leading-snug tracking-tight">
                            {member.name}
                          </h3>
                          <p className="text-[11px] font-mono text-white/50 tracking-[0.12em] uppercase leading-relaxed">
                            {member.role}
                          </p>
                        </div>
                      </div>

                      {/* Subtle bottom accent line on hover */}
                      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ── 4. "You Will Like It Here!" Careers Section ── */}
        <section className="section bg-white text-[#0a0a0a] border-t border-black/10 overflow-hidden">
          <div className="container-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

              {/* Left Column */}
              <div className="lg:col-span-7 space-y-8">
                <FadeIn direction="up">
                  <span className="text-xs font-mono font-semibold tracking-widest text-black/40 uppercase">
                    Join The Habitat
                  </span>
                </FadeIn>
                <h2 className="ttl-120 font-light text-[#0a0a0a] tracking-tight leading-[1.02]">
                  <LineReveal delay={0.1}>You Will Like It</LineReveal>{" "}
                  <span className="font-light text-black/40 block">Here!</span>
                </h2>
                <FadeIn direction="up" delay={0.25}>
                  <p className="text-xl sm:text-2xl text-black/60 font-light leading-relaxed max-w-xl">
                    At Deft Innovations, we create a habitat where you grow stronger roots and larger branches. Together let&apos;s build game-changing digital products.
                  </p>
                </FadeIn>
                <FadeIn direction="up" delay={0.35}>
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <Link href="/careers" className="btn-primary inline-flex items-center gap-2 group">
                      <span>Explore opportunities</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link href="/contact" className="inline-flex items-center gap-2 px-9 py-3.5 rounded-full border border-black/20 bg-transparent text-[#0a0a0a] font-semibold text-[0.9rem] tracking-[-0.01em] transition-all duration-250 hover:border-[#0a0a0a] hover:bg-black/5">
                      <span>Send an open pitch</span>
                    </Link>
                  </div>
                </FadeIn>
              </div>                {/* Right Column: Visual frame + rotating stamp */}
              <div className="lg:col-span-5 relative flex items-center justify-center">
                <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden bg-neutral-100 border border-black/10 shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=85"
                    alt="Life at Deft"
                    fill
                    priority
                    loading="eager"
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white text-xs font-mono tracking-wider flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15">
                      DEFT CULTURE LAB · EST 2015
                    </span>
                    <span className="opacity-75">JOIN US</span>
                  </div>
                </div>

                {/* Rotating circular badge */}
                <div className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 z-20 pointer-events-none">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
                    className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-[#0a0a0a] text-white p-2 shadow-2xl flex items-center justify-center border border-white/20"
                  >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <path
                        id="ourTeamCirclePath"
                        d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                        fill="none"
                      />
                      <text className="text-[9px] font-mono tracking-[0.24em] fill-white uppercase font-bold">
                        <textPath href="#ourTeamCirclePath" startOffset="0%">
                          • DEFT INNOVATIONS • JOIN THE TEAM •
                        </textPath>
                      </text>
                    </svg>
                    <div className="absolute w-4 h-4 rounded-full bg-white flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-black" />
                    </div>
                  </motion.div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── 5. Insights Journal ────────────────────────── */}
        {displayArticles.length > 0 && (
          <section className="section bg-white text-[#0a0a0a] border-t border-black/10">
            <div className="container-xl space-y-16">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black/10">
                <div className="space-y-2">
                  <FadeIn direction="up">
                    <span className="text-xs font-mono font-semibold tracking-widest text-black/40 uppercase">
                      Thought Leadership
                    </span>
                  </FadeIn>
                  <h2 className="ttl-80 font-light text-[#0a0a0a] tracking-tight">
                    <LineReveal delay={0.1}>Insights</LineReveal>
                  </h2>
                </div>
                <FadeIn direction="up" delay={0.2}>
                  <Link href="/blog" className="inline-flex items-center gap-2 px-9 py-3.5 rounded-full border border-black/20 bg-transparent text-[#0a0a0a] font-semibold text-[0.9rem] tracking-[-0.01em] transition-all duration-250 hover:border-[#0a0a0a] hover:bg-black/5 group text-sm">
                    <span>Explore all insights</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </FadeIn>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayArticles.map((article, idx) => (
                  <FadeIn key={article.id || idx} direction="up" delay={idx * 0.08}>
                    <Link
                      href={`/blog/${article.slug}`}
                      className="group block space-y-5 cursor-pointer rounded-2xl p-4 -m-4 hover:bg-black/[0.03] transition-colors duration-300"
                    >
                      <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-neutral-100 border border-black/10">
                        <ImageReveal className="w-full h-full">
                          <Image
                            src={getMediaUrl(article.imageUrl)}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </ImageReveal>
                        <div className="absolute top-3 left-3 z-20">
                          <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-white text-[11px] font-mono uppercase tracking-wider">
                            {article.category}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 text-xs font-mono text-black/40">
                          <span>{article.publishedAt || "August 2026"}</span>
                          <span>•</span>
                          <span>{article.readTime}</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-normal text-[#0a0a0a] group-hover:text-black/70 transition-colors leading-snug">
                          {article.title}
                        </h3>
                        <p className="text-sm text-black/50 line-clamp-2 font-light leading-relaxed">
                          {article.excerpt}
                        </p>
                        <div className="pt-2 flex items-center gap-2 text-sm font-medium text-black/70 group-hover:text-black group-hover:translate-x-1 transition-all">
                          <span>Read more</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── 6. Global CTA Banner ───────────────────────── */}
        <CtaSection />

      </main>

      {/* ── Lightbox: click gallery photo to preview fullscreen ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/96 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all z-50"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full max-h-[88vh] rounded-3xl overflow-hidden border border-white/20 bg-neutral-950 shadow-2xl"
              style={{ aspectRatio: "16/10" }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={getMediaUrl(lightbox.imageUrl)}
                alt="Life at Deft"
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
