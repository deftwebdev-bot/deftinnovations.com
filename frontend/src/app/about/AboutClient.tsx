"use client";

import React, { useRef, useState, useEffect } from "react";
import { MediaImage as Image } from "@/components/ui/MediaImage";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, ArrowUpRight, Award, Users, Compass, Layers, CheckCircle2 } from "lucide-react";
import { FadeIn, LineReveal, ImageReveal } from "@/components/ui/Motion";
import { TeamMember, TrustStat, Article, getMediaUrl } from "@/lib/api";
import { CtaSection } from "@/components/home/CtaSection";

/* ── Animated Counter Component ────────────────────────────── */
interface CounterProps {
  value: string;
  className?: string;
  duration?: number;
}

const AnimatedCounter: React.FC<CounterProps> = ({ value, className = "", duration = 1800 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const numericMatch = value.match(/([\d.]+)/);
    if (!numericMatch) {
      setDisplay(value);
      return;
    }

    const target = parseFloat(numericMatch[1]);
    const prefix = value.slice(0, value.indexOf(numericMatch[1]));
    const suffix = value.slice(value.indexOf(numericMatch[1]) + numericMatch[1].length);
    const decimals = numericMatch[1].includes(".") ? numericMatch[1].split(".")[1].length : 0;
    const start = performance.now();

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const current = easeOut(progress) * target;
      setDisplay(`${prefix}${current.toFixed(decimals)}${suffix}`);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, value, duration]);

  return <span ref={ref} className={className}>{display}</span>;
};

const CULTURE_IMAGES = [
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=85",
];

const PILLARS = [
  {
    id: "purpose",
    title: "Our Purpose",
    tagline: "To deliver experiences that change the way your customers feel about your business.",
    link: "/services",
    linkText: "Our Purpose",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    icon: Compass,
  },
  {
    id: "team",
    title: "Our Team",
    tagline: "Holistic leadership, holistic growth! A team of visionaries connected by shared commitments for a unified vision.",
    link: "/our-team",
    linkText: "Our Team",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    icon: Users,
  },
  {
    id: "awards",
    title: "Awards & Recognitions",
    tagline: "Our dedication is fueled by your compliments, inspiring us to push the boundaries and deliver something extraordinary.",
    link: "/portfolio",
    linkText: "Awards & Recognitions",
    imageUrl: "https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?auto=format&fit=crop&w=800&q=80",
    icon: Award,
  },
  {
    id: "capabilities",
    title: "Our Capabilities",
    tagline: "We are one, but we are many! Transform your digital footprint with scalable and result-driven all-in-one solutions.",
    link: "/services",
    linkText: "Our Capabilities",
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    icon: Layers,
  },
];

interface AboutClientProps {
  team?: TeamMember[];
  stats?: TrustStat[];
  articles?: Article[];
}

export function AboutClient({ team = [], stats = [], articles = [] }: AboutClientProps) {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  // Extract photos from uploaded team members or fallback
  const teamPhotos = team
    .slice(0, 2)
    .map((m) => m.imageUrl)
    .filter((url) => url && typeof url === "string" && url.trim().length > 0 && !url.includes("/admin/"));

  const displayPhotos = teamPhotos.length >= 1 ? teamPhotos : CULTURE_IMAGES;

  useEffect(() => {
    if (displayPhotos.length <= 1) return;
    const timer = setInterval(() => {
      setActivePhotoIdx((prev) => (prev + 1) % displayPhotos.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [displayPhotos.length]);

  // Tab switcher for Expertise Block (Design / Build / Market)
  useEffect(() => {
    const tabTimer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(tabTimer);
  }, []);

  const rawPhoto = displayPhotos[activePhotoIdx] || CULTURE_IMAGES[0];
  const photoSrc = getMediaUrl(rawPhoto) || CULTURE_IMAGES[0];

  const defaultStats = [
    { value: "850+", label: "Success Stories" },
    { value: "600+", label: "International Clients" },
    { value: "35+", label: "Countries Served" },
    { value: "13+", label: "Years Of Experience" },
  ];
  const displayStats = stats.length > 0 ? stats : defaultStats;

  const displayArticles = articles.slice(0, 3);

  return (
    <div className="min-h-screen bg-white text-[#0a0a0a]">
      <main className="pt-32 sm:pt-40">

        {/* ── 1. Intro Text Section (WAC Style #intro_text_block) ── */}
        <section className="section-sm pb-12 sm:pb-16 bg-white">
          <div className="container-xl space-y-6">
            <FadeIn direction="up">
              <span className="text-xs font-mono font-semibold tracking-widest text-black/40 uppercase">
                About Deft
              </span>
            </FadeIn>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light text-[#0a0a0a] leading-[1.15] tracking-tight max-w-5xl">
              <LineReveal delay={0.1}>
                Engineering next-generation digital platforms for ambitious brands.
              </LineReveal>
            </h1>
          </div>
        </section>

        {/* ── 2. Full-Width Video / Expansive Showcase (#about_video_wrapper) ── */}
        <section className="pb-24 sm:pb-32">
          <div className="container-xl">
            <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 bg-neutral-900 shadow-2xl group">
              <ImageReveal className="w-full h-full">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2200&q=85"
                  alt="Deft Innovations Global Headquarters & Lab"
                  fill
                  className="object-cover group-hover:scale-103 transition-transform duration-1000 ease-out"
                  sizes="100vw"
                  priority
                />
              </ImageReveal>

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4 z-20">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-xs font-mono text-white/80">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  DEFT INNOVATIONS · CREATIVE TECHNOLOGY LAB
                </div>
                <span className="text-xs font-mono text-white/50 hidden sm:inline-block">
                  EST. 2015 · INDEPENDENT GLOBAL AGENCY
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. Sticky Scroll / "Big Dreams, Bigger Numbers" (#sticky_scroll_video) ── */}
        <section className="section bg-[#0a0a0a] border-t border-white/10">
          <div className="container-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              {/* Left Column: Heading & Narrative */}
              <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-36">
                <FadeIn direction="up">
                  <span className="text-xs font-mono font-semibold tracking-widest text-white/40 uppercase">
                    Growth &amp; Scale
                  </span>
                </FadeIn>

                <h2 className="ttl-80 font-light text-white tracking-tight leading-[1.05]">
                  <LineReveal delay={0.1}>Big Dreams,</LineReveal>
                  <span className="text-white/40 block font-light">Bigger Numbers</span>
                </h2>

                <FadeIn direction="up" delay={0.2}>
                  <p className="text-lg sm:text-xl font-light text-white/50 leading-relaxed">
                    We are moving ahead with relentless energy to achieve amazing results that speak volumes. We don&apos;t intend to slow down either!
                  </p>
                </FadeIn>

                <FadeIn direction="up" delay={0.3}>
                  <div className="pt-2">
                    <Link
                      href="/contact"
                      className="btn-outline-dark text-sm inline-flex items-center gap-2 border-white/20 text-white hover:bg-white hover:text-black group transition-all"
                    >
                      <span>Start a conversation</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </FadeIn>
              </div>

              {/* Right Column: Listing Items with Numbers */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
                {displayStats.map((item, idx) => (
                  <FadeIn key={idx} direction="up" delay={idx * 0.08}>
                    <div className="bg-[#0e0e0e] p-8 sm:p-10 space-y-3 hover:bg-[#141414] transition-colors duration-300 group h-full flex flex-col justify-between">
                      <AnimatedCounter
                        value={item.value}
                        className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white block group-hover:text-blue-400 transition-colors"
                        duration={1800 + idx * 200}
                      />
                      <p className="text-base text-white/50 font-light">
                        {item.label}
                      </p>
                    </div>
                  </FadeIn>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* ── 4. Our Story Narrative Section (#our_story_block) ── */}
        <section className="section bg-[#070707] border-t border-white/10">
          <div className="container-xl space-y-8 max-w-5xl">
            <FadeIn direction="up">
              <span className="text-xs font-mono font-semibold tracking-widest text-white/40 uppercase">
                Our Story
              </span>
            </FadeIn>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-light text-white/90 leading-[1.4] tracking-tight">
              From humble origins to global trailblazers — the transformational journey of an independent agency that moulded itself into a global technology game changer and now stands out from its peers. Our story is worth a good read!
            </h2>
          </div>
        </section>

        {/* ── 5. One Global Block / 4 Pillars Grid (#globalTeamWidget) ── */}
        <section className="section bg-white border-t border-black/[0.06]">
          <div className="container-xl space-y-12">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black/10">
              <div className="space-y-2">
                <FadeIn direction="up">
                  <span className="text-xs font-mono font-semibold tracking-widest text-black/40 uppercase">
                    Core Pillars
                  </span>
                </FadeIn>
                <h2 className="ttl-80 font-light text-[#0a0a0a] tracking-tight">
                  <LineReveal delay={0.1}>Who We Are</LineReveal>
                </h2>
              </div>
              <p className="text-lg text-black/50 font-light max-w-md">
                Connected by shared commitments and an uncompromising standard of craft.
              </p>
            </div>

            {/* 2x2 Pillar Cards Grid — compact cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PILLARS.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <FadeIn key={pillar.id} direction="up" delay={idx * 0.08}>
                    <Link
                      href={pillar.link}
                      className="group block rounded-2xl bg-gray-50 border border-black/[0.06] overflow-hidden hover:border-black/15 hover:bg-gray-100 transition-all duration-300 flex flex-col justify-between h-full"
                    >
                      {/* Banner Thumbnail */}
                      <div className="relative aspect-[16/6] w-full bg-neutral-100 overflow-hidden">
                        <ImageReveal className="w-full h-full">
                          <Image
                            src={pillar.imageUrl}
                            alt={pillar.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </ImageReveal>
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent" />
                        
                        <div className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md border border-black/10 flex items-center justify-center text-black/50 group-hover:text-black group-hover:bg-[#0a0a0a] group-hover:border-transparent transition-all">
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4 text-blue-500" />
                            <h3 className="text-base sm:text-lg font-semibold text-[#0a0a0a] group-hover:text-black transition-colors">
                              {pillar.title}
                            </h3>
                          </div>
                          <p className="text-sm text-black/50 font-light leading-relaxed">
                            {pillar.tagline}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-black/[0.06] flex items-center gap-2 text-xs font-medium text-black/60 group-hover:text-black transition-colors">
                          <span>Learn more about {pillar.linkText}</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </FadeIn>
                );
              })}
            </div>

          </div>
        </section>

        {/* ── 6. Expertise Block (Design. Build. Market. - #expertise_block) ── */}
        <section className="relative py-28 sm:py-36 bg-[#070707] text-white border-t border-white/10 overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-blue-600/15 via-purple-600/15 to-emerald-500/10 blur-[150px] rounded-full" />
          </div>

          <div className="container-xl relative z-10 space-y-10 max-w-5xl mx-auto text-center">
            {/* Animated Title Words */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight">
              <span className={`transition-all duration-500 ${activeTab === 0 ? "text-white font-normal" : "text-white/30"}`}>
                Design.
              </span>
              <span className={`transition-all duration-500 ${activeTab === 1 ? "text-white font-normal" : "text-white/30"}`}>
                Build.
              </span>
              <span className={`transition-all duration-500 ${activeTab === 2 ? "text-white font-normal" : "text-white/30"}`}>
                Market.
              </span>
            </div>

            <p className="text-xl sm:text-3xl font-light text-white/70 leading-relaxed max-w-4xl mx-auto">
              It’s in Deft Innovations’ DNA to transform your brand into its best digital self. We are driven by a customer-centric approach in creating engaging, interactive, and immersive experiences that deliver only the best.
            </p>

            <div className="flex justify-center">
              <Link
                href="/services"
                className="btn-primary inline-flex items-center gap-2 text-base px-8 py-4 group"
              >
                <span>Our expertise</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── 7. Our Impact Section (#our_impact_block7) ── */}
        <section className="section bg-[#ffffff] text-[#0a0a0a]">
          <div className="container-xl space-y-16">
            
            {/* Content & Heading */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-8 border-b border-black/10">
              <div className="lg:col-span-5 space-y-2">
                <span className="text-xs font-mono font-semibold tracking-widest text-black/40 uppercase">
                  Global Results
                </span>
                <h2 className="ttl-80 font-light text-[#0a0a0a] tracking-tight">
                  Our Impact
                </h2>
              </div>
              <div className="lg:col-span-7">
                <p className="text-lg sm:text-xl text-black/60 font-light leading-relaxed max-w-2xl">
                  Every innovation that happens here is out of a quest to get better at what we are already doing. We deliver ideas that make a difference, create experiences that transform lives and build ecosystems that foster progress.
                </p>
              </div>
            </div>

            {/* Impact Stat Columns — from DB trust-stats */}
            <div className={`grid grid-cols-1 gap-8 sm:gap-12 ${displayStats.length <= 3 ? "md:grid-cols-3" : "md:grid-cols-4"}`}>
              {displayStats.map((stat, i) => (
                <div key={stat.label + i} className="space-y-2">
                  <div className="ttl-80 font-light text-[#0a0a0a] tracking-tight">
                    <AnimatedCounter value={stat.value} duration={1800 + i * 200} />
                  </div>
                  <p className="text-base text-black/60 font-light">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div>
              <Link
                href="/portfolio"
                className="btn-dark inline-flex items-center gap-2 group"
              >
                <span>View Our Impact</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>
        </section>

        {/* ── 8. Careers / "You Will Like It Here!" (#teamImageSliderComponent) ── */}
        <section className="section bg-[#ffffff] text-[#0a0a0a] border-t border-black/10 overflow-hidden">
          <div className="container-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

              {/* Left Column: Heading & Narrative */}
              <div className="lg:col-span-7 space-y-8">
                <FadeIn direction="up">
                  <span className="text-xs font-mono font-semibold tracking-widest text-black/40 uppercase">
                    Life At Deft
                  </span>
                </FadeIn>

                <h2 className="ttl-120 font-light text-[#0a0a0a] tracking-tight leading-[1.02]">
                  <LineReveal delay={0.1}>You Will Like It</LineReveal>{" "}
                  <span className="font-light text-black/40 block">Here!</span>
                </h2>

                <FadeIn direction="up" delay={0.25}>
                  <p className="text-xl sm:text-2xl text-black/70 font-light leading-relaxed max-w-xl">
                    At Deft Innovations, we are all about creating a habitat that lets you grow stronger roots and larger branches. Together let&apos;s build game-changing digital products.
                  </p>
                </FadeIn>

                <FadeIn direction="up" delay={0.35}>
                  <div className="pt-2">
                    <Link
                      href="/careers"
                      className="btn-dark inline-flex items-center gap-2 group"
                    >
                      <span>Explore opportunities</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </FadeIn>
              </div>

              {/* Right Column: Animated Image Frame with Rotating Stamp Badge */}
              <div className="lg:col-span-5 relative flex items-center justify-center">
                <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden bg-neutral-100 border border-black/[0.08] shadow-lg">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activePhotoIdx}
                      initial={{ opacity: 0, scale: 1.08 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={photoSrc}
                        alt="Life and Culture at Deft Innovations"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 40vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      <div className="absolute bottom-6 left-6 right-6 text-white text-xs font-mono tracking-wider flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md">
                          DEFT CULTURE LAB · 2026
                        </span>
                        <span className="opacity-80">
                          {String(activePhotoIdx + 1).padStart(2, "0")} / {String(displayPhotos.length).padStart(2, "0")}
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Rotating Circular Stamp Badge */}
                <div className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 z-20 pointer-events-none">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
                    className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-[#0a0a0a] text-white p-2 shadow-2xl flex items-center justify-center border border-white/20"
                  >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <path
                        id="circlePathAbout"
                        d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                        fill="none"
                      />
                      <text className="text-[9px] font-mono tracking-[0.24em] fill-white uppercase font-bold">
                        <textPath href="#circlePathAbout" startOffset="0%">
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

        {/* ── 9. Insights / Blog Section (#homeBlogsWidget9) ── */}
        <section className="section bg-[#0a0a0a] text-white border-t border-white/10">
          <div className="container-xl space-y-16">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
              <div className="space-y-2">
                <FadeIn direction="up">
                  <span className="text-xs font-mono font-semibold tracking-widest text-white/40 uppercase">
                    Thought Leadership
                  </span>
                </FadeIn>
                <h2 className="ttl-80 font-light text-white tracking-tight">
                  <LineReveal delay={0.1}>Insights</LineReveal>
                </h2>
              </div>

              <FadeIn direction="up" delay={0.2}>
                <Link
                  href="/blog"
                  className="btn-ghost text-sm inline-flex items-center gap-2 group"
                >
                  <span>Explore all insights</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </FadeIn>
            </div>

            {/* 3-Col Insight Cards Grid (WAC Style) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayArticles.map((article, idx) => (
                <FadeIn key={article.id || idx} direction="up" delay={idx * 0.08}>
                  <Link
                    href={`/blog/${article.slug}`}
                    className="group block space-y-5 cursor-pointer rounded-2xl p-4 -m-4 hover:bg-white/[0.03] transition-colors duration-300"
                  >
                    <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#161616] border border-white/10">
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
                      <div className="flex items-center gap-3 text-xs font-mono text-white/40">
                        <span>{article.publishedAt || "August 2026"}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-normal text-white group-hover:text-white/80 transition-colors leading-snug">
                        {article.title}
                      </h3>

                      <p className="text-sm text-white/50 line-clamp-2 font-light leading-relaxed">
                        {article.excerpt}
                      </p>

                      <div className="pt-2 flex items-center gap-2 text-sm font-medium text-white/80 group-hover:text-white group-hover:translate-x-1 transition-all">
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

        {/* ── 10. Global CTA Banner / Enquire Now ── */}
        <CtaSection />

      </main>
    </div>
  );
}

