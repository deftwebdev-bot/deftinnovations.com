import React from "react";
import Link from "next/link";
import { MediaImage as Image } from "@/components/ui/MediaImage";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { FadeIn, LineReveal } from "@/components/ui/Motion";
import { getCategorizedServices, getMediaUrl } from "@/lib/api";
import { CtaSection } from "@/components/home/CtaSection";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Capabilities & Services",
  description:
    "Explore Deft Innovations' core capabilities: Digital Marketing, Brand Architecture, Next.js Development, Performance Ads, Technical SEO, and Social Strategy.",
};

export default async function ServicesPage() {
  const categories = await getCategorizedServices();

  return (
    <div className="min-h-screen bg-white text-[#0a0a0a]">
      <Navbar />

      <main>
        {/* Page hero — background image */}
        <section className="relative min-h-[45vh] flex items-end overflow-hidden">
          {/* Background image */}
          <Image
            src="https://images.unsplash.com/photo-1689141047490-a0916682dcfd?w=2400&auto=format&fit=crop&q=80"
            alt="Abstract swirl pattern"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

          {/* Content */}
          <div className="relative z-10 container-xl pt-32 sm:pt-40 pb-12 sm:pb-20 space-y-4">
            <FadeIn direction="up">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-mono font-semibold tracking-widest text-white/80 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Core Capabilities
              </span>
            </FadeIn>

            <h1 className="ttl-80 font-light text-white tracking-tight leading-[1.08] max-w-3xl">
              <LineReveal delay={0.1}>What we do.</LineReveal>
              <span className="text-white/50 block font-light">
                Engineered for growth.
              </span>
            </h1>

            <FadeIn direction="up" delay={0.25}>
              <p className="text-sm sm:text-base font-light text-white/60 leading-relaxed max-w-md">
                Tailored strategic and technical capabilities to solve your revenue bottlenecks.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Category sections — alternating layout on white */}
        <section className="section bg-white border-t border-black/10">
          <div className="container-xl">
            <div className="space-y-0">
              {categories.map((category, catIdx) => {
                const firstService = category.services[0];
                const catImage = category.imageUrl || firstService?.imageUrl || "";
                const isReversed = catIdx % 2 !== 0;

                return (
                  <FadeIn
                    key={category.id}
                    direction="up"
                    delay={catIdx * 0.08}
                  >
                    <div
                      id={category.slug}
                      className="scroll-mt-36 border-t border-black/[0.06] py-16 lg:py-24"
                    >
                      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start ${isReversed ? "direction-rtl" : ""}`}>

                        {/* Text column */}
                        <div className={`lg:col-span-5 space-y-8 ${isReversed ? "lg:order-2" : "lg:order-1"}`}>
                          <h2 className="ttl-80 font-light text-[#0a0a0a] tracking-tight leading-[1.08]">
                            <LineReveal delay={0.1}>
                              {category.title}
                            </LineReveal>
                          </h2>

                          <div className="space-y-0">
                            {category.services.map((service) => (
                              <Link
                                key={service.id}
                                href={`/services/${service.slug}`}
                                className="group flex items-center justify-between py-4 border-b border-black/[0.08] hover:border-black/25 transition-colors"
                              >
                                <span className="text-base sm:text-lg font-normal text-black/70 group-hover:text-[#0a0a0a] transition-colors">
                                  {service.title}
                                </span>
                                <ArrowRight className="w-4 h-4 text-black/20 group-hover:text-[#0a0a0a] group-hover:translate-x-1 transition-all" />
                              </Link>
                            ))}
                          </div>

                          <Link
                            href={`/services/${firstService?.slug || ""}`}
                            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors group"
                          >
                            <span>
                              Explore {category.title.toLowerCase()}
                            </span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>

                        {/* Image column */}
                        <div className={`lg:col-span-7 flex items-center justify-center ${isReversed ? "lg:order-1" : "lg:order-2"}`}>
                          {catImage ? (
                            <div className="relative w-full max-h-[75vh] flex items-center justify-center bg-neutral-50 border border-black/[0.06] overflow-hidden">
                              <Image
                                src={getMediaUrl(catImage)}
                                alt={category.title}
                                width={1200}
                                height={800}
                                className="w-full h-auto max-h-[75vh] object-contain"
                                sizes="(max-width: 1024px) 100vw, 58vw"
                              />
                            </div>
                          ) : (
                            <div className="w-full aspect-[16/10] bg-neutral-100 border border-black/[0.06] flex items-center justify-center">
                              <span className="text-5xl font-bold text-black/10 font-mono">
                                {category.title.slice(0, 2).toUpperCase()}
                              </span>
                            </div>
                          )}
                        </div>

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
