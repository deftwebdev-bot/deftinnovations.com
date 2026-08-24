"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FadeIn, LineReveal, ImageReveal } from "@/components/ui/Motion";
import { Article } from "@/lib/api";
import { Search, Clock, ArrowRight } from "lucide-react";

const CATEGORIES = ["All", "Digital Marketing", "Branding", "Web Development", "SEO", "Social Media", "Business Growth", "Technology"];

export function BlogListClient({ initialArticles }: { initialArticles: Article[] }) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");

  const featured = initialArticles.find((a) => a.featured) || initialArticles[0];

  const filtered = initialArticles.filter((a) => {
    const matchCat = cat === "All" || a.category === cat;
    const matchQ =
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      (a.tags && a.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())));
    return matchCat && matchQ;
  });

  return (
    <>
      {/* Hero — dark background matching other pages */}
      <section className="relative min-h-[45vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#070707]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />

        <div className="relative z-10 container-xl pt-32 sm:pt-40 pb-12 sm:pb-20 space-y-4">
          <FadeIn direction="up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-mono font-semibold tracking-widest text-white/80 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Editorial Journal
            </span>
          </FadeIn>

          <h1 className="ttl-80 font-light text-white tracking-tight leading-[1.08] max-w-3xl">
            <LineReveal delay={0.1}>Perspectives on</LineReveal>
            <span className="text-white/50 block font-light">
              marketing & technology.
            </span>
          </h1>

          <FadeIn direction="up" delay={0.2}>
            <div className="max-w-md relative">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-11 pr-4 py-3 rounded-full bg-white/[0.06] border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-white/25 transition-colors"
              />
            </div>
          </FadeIn>
        </div>
      </section>



      {/* Category filters — white bar */}
      <div className="sticky top-[72px] z-30 bg-white/90 backdrop-blur-xl border-b border-black/10">
        <div className="container-xl py-4 flex items-center gap-2 overflow-x-auto">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${
                cat === c
                  ? "bg-[#0a0a0a] text-white border-[#0a0a0a]"
                  : "text-black/50 hover:text-[#0a0a0a] hover:border-black/30 border-black/15"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Articles grid — clean cards */}
      <section className="section bg-white">
        <div className="container-xl">
          {filtered.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <p className="text-black/40 text-lg">No articles matched your search.</p>
              <button
                onClick={() => { setQuery(""); setCat("All"); }}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Reset
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
              {filtered.map((article, idx) => (
                <FadeIn key={article.id} direction="up" delay={idx * 0.06}>
                  <Link href={`/blog/${article.slug}`} className="group block space-y-3">
                    {/* Image */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 border border-black/[0.06]">
                      <ImageReveal className="w-full h-full">
                        <Image
                          src={article.imageUrl}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </ImageReveal>
                    </div>

                    {/* Caption */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[11px] font-mono font-medium text-black/35 uppercase tracking-wider">
                        <span>{article.category}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.readTime}
                        </span>
                      </div>
                      <h3 className="text-base font-normal text-[#0a0a0a] group-hover:text-black/60 transition-colors leading-snug line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-black/40 line-clamp-2 font-light leading-relaxed">{article.excerpt}</p>
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-2.5 pt-2">
                      <div className="relative w-5 h-5 rounded-full overflow-hidden border border-black/10">
                        <Image src={article.author.avatarUrl} alt={article.author.name} fill className="object-cover" />
                      </div>
                      <span className="text-xs text-black/45">{article.author.name}</span>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
