import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { FadeIn, LineReveal } from "@/components/ui/Motion";
import { getServices, getServiceBySlug, getMediaUrl } from "@/lib/api";
import { CtaSection } from "@/components/home/CtaSection";
import { ArrowRight, ArrowUpRight, CheckCircle2, Layers, Zap, BarChart3 } from "lucide-react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: `${service.title} | Deft Innovations`,
    description: service.tagline,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const allServices = await getServices();
  const siblingServices = allServices.filter(
    (s) => s.categoryId === service.categoryId && s.slug !== service.slug
  );

  return (
    <div className="min-h-screen bg-white text-[#0a0a0a]">
      <Navbar />

      <main>
        {/* Hero — dark with background image */}
        <section className="relative min-h-[45vh] flex items-end overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1557683316-973673baf926?w=900&auto=format&fit=crop&q=60"
            alt="Abstract gradient background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

          <div className="relative z-10 container-xl pt-32 sm:pt-40 pb-12 sm:pb-20 space-y-4">
            <FadeIn direction="up">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-4"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                <span>All Services</span>
              </Link>
            </FadeIn>

            <FadeIn direction="up">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-mono font-semibold tracking-widest text-white/80 uppercase">
                {service.categoryName}
              </span>
            </FadeIn>

            <h1 className="ttl-80 font-light text-white tracking-tight leading-[1.08] max-w-3xl">
              <LineReveal delay={0.1}>{service.title}</LineReveal>
            </h1>

            <FadeIn direction="up" delay={0.15}>
              <p className="text-sm sm:text-base font-light text-white/60 leading-relaxed max-w-md">
                {service.tagline}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Overview — text + image */}
        <section className="section bg-white">
          <div className="container-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              <div className="lg:col-span-5 space-y-6">
                <FadeIn direction="up">
                  <span className="text-xs font-mono font-semibold tracking-widest text-black/30 uppercase">
                    Overview
                  </span>
                </FadeIn>

                <FadeIn direction="up" delay={0.1}>
                  <p className="text-base text-black/60 font-light leading-relaxed">
                    {service.description}
                  </p>
                </FadeIn>

                <FadeIn direction="up" delay={0.2}>
                  <Link
                    href={`/contact?service=${service.slug}`}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#0a0a0a] text-white font-semibold text-[0.9rem] tracking-[-0.01em] transition-all duration-250 hover:bg-[#222] hover:shadow-lg hover:-translate-y-0.5 group"
                  >
                    <span>Book Consultation</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </FadeIn>
              </div>

              <div className={`lg:col-span-7 flex items-center justify-center`}>
                {(service.imageUrl || service.categoryImageUrl) ? (
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-neutral-100 border border-black/[0.06]">
                    <Image
                      src={getMediaUrl(service.imageUrl || service.categoryImageUrl)}
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      priority
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-[16/10] bg-neutral-100 border border-black/[0.06] flex items-center justify-center">
                    <span className="text-5xl font-bold text-black/10 font-mono">
                      {service.title.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>



        {/* Deliverables */}
        {service.deliverables.length > 0 && (
          <section className="section bg-white border-t border-black/10">
            <div className="container-xl">
              <div className="space-y-10">
                <FadeIn direction="up">
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-semibold tracking-widest text-black/30 uppercase flex items-center gap-2">
                      <Layers className="w-4 h-4" />
                      What We Deliver
                    </span>
                    <h2 className="ttl-80 font-light text-[#0a0a0a] tracking-tight">
                      Tangible Outputs
                    </h2>
                  </div>
                </FadeIn>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {service.deliverables.map((item, i) => (
                    <FadeIn key={i} direction="up" delay={i * 0.06}>
                      <div className="p-6 border border-black/10 rounded-xl hover:border-black/25 hover:bg-black/[0.02] transition-all">
                        <div className="flex items-center gap-3 mb-3">
                          <CheckCircle2 className="w-5 h-5 text-black/30" />
                          <span className="text-sm font-mono text-black/40">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <p className="text-base font-normal text-[#0a0a0a]">
                          {item}
                        </p>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Process Steps */}
        {service.processSteps.length > 0 && (
          <section className="section bg-white border-t border-black/10">
            <div className="container-xl">
              <div className="space-y-10">
                <FadeIn direction="up">
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-semibold tracking-widest text-black/30 uppercase flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Our Process
                    </span>
                    <h2 className="ttl-80 font-light text-[#0a0a0a] tracking-tight">
                      How We Work
                    </h2>
                  </div>
                </FadeIn>

                <div className="space-y-0">
                  {service.processSteps.map((step, i) => (
                    <FadeIn key={i} direction="up" delay={i * 0.06}>
                      <div className="flex items-start gap-6 py-6 border-b border-black/[0.06] last:border-b-0">
                        <span className="text-4xl font-black font-mono text-black/10 shrink-0 w-12">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="text-base text-black/70 font-light leading-relaxed pt-2">
                          {step}
                        </p>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Business Benefits */}
        {service.businessBenefits.length > 0 && (
          <section className="section bg-white border-t border-black/10">
            <div className="container-xl">
              <div className="space-y-10">
                <FadeIn direction="up">
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-semibold tracking-widest text-black/30 uppercase flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      Business Impact
                    </span>
                    <h2 className="ttl-80 font-light text-[#0a0a0a] tracking-tight">
                      Why It Matters
                    </h2>
                  </div>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {service.businessBenefits.map((b, i) => (
                    <FadeIn key={i} direction="up" delay={i * 0.06}>
                      <div className="flex items-start gap-4">
                        <CheckCircle2 className="w-5 h-5 text-black/25 shrink-0 mt-1" />
                        <p className="text-base text-black/70 font-light leading-relaxed">
                          {b}
                        </p>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Sibling services */}
        {siblingServices.length > 0 && (
          <section className="section bg-white border-t border-black/10">
            <div className="container-xl space-y-10">
              <FadeIn direction="up">
                <div className="space-y-2">
                  <span className="text-xs font-mono font-semibold tracking-widest text-black/30 uppercase">
                    More in {service.categoryName}
                  </span>
                  <h2 className="ttl-80 font-light text-[#0a0a0a] tracking-tight">
                    Related Services
                  </h2>
                </div>
              </FadeIn>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {siblingServices.map((sibling, idx) => (
                  <FadeIn key={sibling.id} direction="up" delay={idx * 0.08}>
                    <Link
                      href={`/services/${sibling.slug}`}
                      className="group block p-6 border border-black/10 rounded-xl hover:border-black/25 hover:bg-black/[0.02] transition-all"
                    >
                      <h4 className="text-lg font-normal text-[#0a0a0a] group-hover:text-black/70 transition-colors">
                        {sibling.title}
                      </h4>
                      <p className="text-sm text-black/40 mt-2 line-clamp-2 font-light">
                        {sibling.tagline}
                      </p>
                      <div className="mt-4 flex items-center gap-2 text-sm font-medium text-black/50 group-hover:text-black group-hover:translate-x-1 transition-all">
                        <span>Learn more</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </Link>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>
        )}

        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
