import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { FadeIn, LineReveal } from "@/components/ui/Motion";
import { getServices } from "@/lib/api";
import { CtaSection } from "@/components/home/CtaSection";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Capabilities & Services",
  description: "Explore Deft Innovations' core capabilities: Digital Marketing, Brand Architecture, Next.js Development, Performance Ads, Technical SEO, and Social Strategy.",
};

const ICONS: Record<string, string> = {
  TrendingUp: "↗", Palette: "◈", Code2: "{ }", Target: "◎", Search: "⌕", Share2: "⇌",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <main className="pt-32">

        {/* Page hero */}
        <section className="section bg-[#0a0a0a]">
          <div className="container-xl space-y-10">
            <FadeIn direction="up"><span className="pill text-white/60">Core Capabilities</span></FadeIn>
            <h1 className="text-display max-w-4xl">
              <LineReveal delay={0.1}>Six capabilities.</LineReveal>
              <LineReveal delay={0.22} className="text-white/30">Engineered for measurable growth.</LineReveal>
            </h1>
            <FadeIn direction="up" delay={0.35}>
              <p className="text-xl text-white/50 leading-relaxed max-w-2xl font-light">
                We don't offer generic packages. We engineer tailored strategic and technical capabilities designed to solve specific revenue bottlenecks.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Desktop sticky jump nav */}
        <div className="hidden lg:block sticky top-[72px] z-30 bg-[#0a0a0a]/90 backdrop-blur-xl border-y border-white/[0.06]">
          <div className="container-xl py-3 flex items-center gap-1">
            <span className="text-label text-white/25 mr-4">Jump to:</span>
            {services.map((s) => (
              <a key={s.id} href={`#${s.slug}`} className="px-4 py-1.5 text-sm text-white/40 hover:text-white hover:bg-white/5 rounded-full transition-all">
                {s.title.split(" ")[0]}
              </a>
            ))}
          </div>
        </div>

        {/* Services */}
        <section className="section-sm">
          <div className="container-xl space-y-6">
            {services.map((service, idx) => (
              <FadeIn key={service.id} direction="up" delay={idx * 0.07}>
                <div
                  id={service.slug}
                  className="scroll-mt-36 rounded-2xl bg-[#111] border border-white/[0.07] hover:border-white/15 transition-all duration-300 overflow-hidden"
                >
                  {/* Service header row */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-8 sm:p-12">

                    <div className="lg:col-span-7 space-y-5">
                      <div className="flex items-center gap-4">
                        <span className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl font-mono font-bold text-white/60">
                          {ICONS[service.iconName] ?? "✦"}
                        </span>
                        <div>
                          <span className="text-label text-white/30">Service {String(idx + 1).padStart(2, "0")} · {service.category}</span>
                          <h2 className="text-h3 text-white">{service.title}</h2>
                        </div>
                      </div>
                      <p className="text-white/65 text-base font-medium leading-relaxed">{service.tagline}</p>
                      <p className="text-white/45 text-sm leading-relaxed font-light max-w-xl">{service.description}</p>
                    </div>

                    <div className="lg:col-span-5 flex flex-col gap-5 justify-between">
                      {service.featuredStats && (
                        <div className="p-6 rounded-xl bg-black/50 border border-white/[0.06] text-right">
                          <div className="text-4xl font-black font-mono text-white">{service.featuredStats.value}</div>
                          <div className="text-label text-white/35">{service.featuredStats.label}</div>
                        </div>
                      )}
                      <Link
                        href={`/contact?service=${service.slug}`}
                        className="btn-primary justify-center text-sm"
                      >
                        Book Consultation <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Deliverables & benefits */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.05] border-t border-white/[0.07]">
                    <div className="p-8 space-y-4">
                      <h3 className="text-label text-white/30">What We Deliver</h3>
                      <ul className="space-y-2.5">
                        {service.deliverables.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-white/65">
                            <CheckCircle2 className="w-4 h-4 text-white/50 shrink-0 mt-0.5" />{item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-8 space-y-4">
                      <h3 className="text-label text-white/30">Business Impact</h3>
                      <ul className="space-y-2.5">
                        {service.businessBenefits.map((b, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-white/65">
                            <CheckCircle2 className="w-4 h-4 text-white/50 shrink-0 mt-0.5" />{b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
