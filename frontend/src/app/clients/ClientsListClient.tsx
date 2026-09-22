"use client";

import React, { useState, useEffect } from "react";
import { MediaImage as Image } from "@/components/ui/MediaImage";
import Link from "next/link";
import { FadeIn } from "@/components/ui/Motion";
import { TrustedBrand, Project, getMediaUrl } from "@/lib/api";
import { ChevronDown, Check, X, ArrowRight, ExternalLink } from "lucide-react";

function getUniqueIndustries(brands: TrustedBrand[]): string[] {
  const set = new Set(brands.map((b) => b.industry).filter(Boolean));
  return Array.from(set).sort();
}

export function ClientsListClient({
  initialBrands,
  allProjects = [],
}: {
  initialBrands: TrustedBrand[];
  allProjects?: Project[];
}) {
  const [industry, setIndustry] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<TrustedBrand | null>(null);

  const allIndustries = getUniqueIndustries(initialBrands);
  const availableIndustries = ["All", ...allIndustries];

  const filtered = industry === "All"
    ? initialBrands
    : initialBrands.filter((b) => b.industry === industry);

  const clientProjects = selectedBrand
    ? allProjects.filter((p) => p.clientId === selectedBrand.id)
    : [];

  // Close on escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedBrand(null);
    };
    if (selectedBrand) {
      document.addEventListener("keydown", handler);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [selectedBrand]);

  return (
    <>
      {/* Main grid content — always full width, no layout shift */}
      <section className="section bg-white pt-40 sm:pt-48">
        <div className="container-xl space-y-12">
          {/* Title & description */}
          <div className="text-center space-y-4">
            <FadeIn direction="up">
              <h1 className="ttl-80 font-light text-[#0a0a0a] tracking-tight">
                Our Clients
              </h1>
            </FadeIn>
            <FadeIn direction="up" delay={0.05}>
              <p className="text-base text-black/50 font-light max-w-lg mx-auto">
                We focus on being a true partner to serve our valued clients the best.{" "}
                Have a look at our{" "}
                <Link href="/testimonials" className="text-blue-600 hover:text-blue-700 underline underline-offset-2">
                  Client Stories
                </Link>{" "}
                to find out what makes us different.
              </p>
            </FadeIn>
          </div>

          {/* Industry dropdown */}
          <FadeIn direction="up" delay={0.1}>
            <div className="flex justify-center">
              <div className="relative w-64">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-full flex items-center justify-between px-5 py-3 border border-black/20 text-sm text-black/60 hover:border-black/40 transition-colors bg-white"
                >
                  <span>{industry === "All" ? "Browse by industry" : industry}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {dropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-black/10 shadow-lg z-50 overflow-hidden max-h-64 overflow-y-auto">
                    {availableIndustries.map((ind) => (
                      <button
                        key={ind}
                        onClick={() => { setIndustry(ind); setDropdownOpen(false); }}
                        className={`w-full text-left px-5 py-3 text-sm hover:bg-black/[0.03] transition-colors flex items-center justify-between ${
                          industry === ind ? "text-[#0a0a0a] font-medium" : "text-black/50"
                        }`}
                      >
                        <span>{ind === "All" ? "All Industries" : ind}</span>
                        {industry === ind && <Check className="w-4 h-4 text-black/40" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </FadeIn>

          {/* Clients grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <p className="text-black/40 text-lg">No clients in this industry yet.</p>
              <button onClick={() => setIndustry("All")} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Show All
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border-t border-l border-black/10">
              {filtered.map((brand, idx) => {
                const hasValidLogo = Boolean(brand.logoUrl && typeof brand.logoUrl === 'string' && brand.logoUrl.trim().length > 0);
                const isSelected = selectedBrand?.id === brand.id;
                return (
                  <FadeIn key={brand.id} direction="up" delay={idx * 0.03}>
                    <button
                      onClick={() => setSelectedBrand(isSelected ? null : brand)}
                      className={`w-full h-44 sm:h-52 border-r border-b border-black/10 flex items-center justify-center p-8 transition-all duration-300 ${
                        isSelected
                          ? "bg-[#0a0a0a] border-[#0a0a0a]"
                          : "bg-white hover:bg-neutral-50"
                      }`}
                    >
                      {hasValidLogo ? (
                        <div className={`relative w-full h-full transition-all duration-300 ${
                          isSelected ? "opacity-100" : "grayscale opacity-80 hover:grayscale-0 hover:opacity-100"
                        }`}>
                          <Image
                            src={getMediaUrl(brand.logoUrl)}
                            alt={brand.name}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                        </div>
                      ) : (
                        <span className={`font-mono text-xs font-bold tracking-widest uppercase text-center transition-colors ${
                          isSelected ? "text-white" : "text-black/30"
                        }`}>
                          {brand.name}
                        </span>
                      )}
                    </button>
                  </FadeIn>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Offcanvas panel — fixed overlay, does NOT affect grid layout */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full max-w-lg bg-white shadow-2xl z-[70] transform transition-transform duration-300 ease-out overflow-y-auto ${
          selectedBrand ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button — sticky top */}
        <div className="sticky top-0 z-10 bg-white border-b border-black/10 px-8 py-4 flex items-center justify-between">
          <span className="text-xs font-mono font-semibold tracking-widest text-black/30 uppercase">
            Client Details
          </span>
          <button
            onClick={() => setSelectedBrand(null)}
            className="w-9 h-9 flex items-center justify-center border border-black/10 hover:border-black/30 hover:bg-black/5 transition-all"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-black/50" />
          </button>
        </div>

        <div className="p-8 space-y-8">
          {/* Client logo */}
          <div className="h-28 flex items-center justify-center border border-black/10 p-6">
            {selectedBrand?.logoUrl ? (
              <div className="relative w-full h-full">
                <Image
                  src={getMediaUrl(selectedBrand.logoUrl)}
                  alt={selectedBrand.name}
                  fill
                  className="object-contain"
                  sizes="250px"
                />
              </div>
            ) : (
              <span className="font-mono text-sm font-bold tracking-widest text-black/40 uppercase">
                {selectedBrand?.name}
              </span>
            )}
          </div>

          {/* Client info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#0a0a0a]">{selectedBrand?.name}</h2>
            {selectedBrand?.industry && (
              <span className="inline-block px-3 py-1 bg-black/5 border border-black/10 text-[11px] font-mono text-black/50 uppercase tracking-wider">
                {selectedBrand.industry}
              </span>
            )}
            {selectedBrand?.websiteUrl && (
              <a
                href={selectedBrand.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 transition-colors"
              >
                Visit website <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          {/* Client projects */}
          <div className="space-y-4">
            <span className="text-xs font-mono font-semibold tracking-widest text-black/30 uppercase">
              Case Studies ({clientProjects.length})
            </span>

            {clientProjects.length === 0 ? (
              <p className="text-sm text-black/40 font-light py-4">
                No case studies linked to this client yet.
              </p>
            ) : (
              <div className="space-y-4">
                {clientProjects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/portfolio/${project.slug}`}
                    className="group block border border-black/10 hover:border-black/25 transition-all overflow-hidden"
                  >
                    {project.imageUrl && (
                      <div className="relative h-44 overflow-hidden bg-neutral-100">
                        <Image
                          src={getMediaUrl(project.imageUrl)}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="400px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3">
                          <span className="px-2 py-0.5 bg-white/20 backdrop-blur-md text-white text-[10px] font-mono uppercase">
                            {project.category}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="p-4 space-y-2">
                      <h3 className="text-sm font-semibold text-[#0a0a0a] group-hover:text-black/60 transition-colors leading-snug">
                        {project.title}
                      </h3>
                      <p className="text-xs text-black/40 line-clamp-2 font-light">
                        {project.summary}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-blue-600 group-hover:text-blue-700">
                        <span>View case study</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Backdrop — separate element, only visible when panel is open */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[65] transition-opacity duration-300 ${
          selectedBrand ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSelectedBrand(null)}
      />
    </>
  );
}
