"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FadeIn, LineReveal, ImageReveal } from "@/components/ui/Motion";
import { Article } from "@/data/articles";
import { Search, Clock, ArrowUpRight } from "lucide-react";

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
      {/* Hero */}
      <section className="section bg-[#0a0a0a]">
        <div className="container-xl space-y-10">
          <FadeIn direction="up">
            <span className="pill text-white/60">Editorial Journal</span>
          </FadeIn>
          <h1 className="text-display max-w-4xl">
            <LineReveal delay={0.1}>Perspectives on</LineReveal>
            <LineReveal delay={0.22} className="text-white/30">
              marketing &amp; technology.
            </LineReveal>
          </h1>

          {/* Search bar */}
          <div className="max-w-lg relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white/[0.04] border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Featured */}
      {!query && cat === "All" && featured && (
        <section className="section-sm bg-[#0a0a0a]">
          <div className="container-xl">
            <Link href={`/blog/${featured.slug}`} className="group block relative rounded-2xl overflow-hidden h-[55vh] min-h-[360px]">
              <ImageReveal className="absolute inset-0">
                <Image
                  src={featured.imageUrl}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-[1.4s] group-hover:scale-105"
                  priority
                  sizes="100vw"
                />
              </ImageReveal>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 space-y-3">
                <span className="pill text-white/70 text-[10px]">
                  Featured · {featured.category} · {featured.readTime}
                </span>
                <h2 className="text-h2 text-white max-w-2xl leading-tight">{featured.title}</h2>
                <div className="flex items-center gap-3">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20">
                    <Image src={featured.author.avatarUrl} alt={featured.author.name} fill className="object-cover" />
                  </div>
                  <span className="text-sm text-white/65">{featured.author.name}</span>
                  <span className="text-white/30">·</span>
                  <span className="text-sm text-white/45">{featured.publishedAt}</span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Filters */}
      <div className="sticky top-[72px] z-30 bg-[#0a0a0a]/90 backdrop-blur-xl border-y border-white/[0.06]">
        <div className="container-xl py-3 flex items-center gap-2 overflow-x-auto">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                cat === c
                  ? "bg-white text-black font-bold"
                  : "text-white/45 hover:text-white hover:bg-white/5 border border-white/[0.08]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Articles grid */}
      <section className="section bg-[#0a0a0a]">
        <div className="container-xl">
          {filtered.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <p className="text-white/50 text-lg">No articles matched your search.</p>
              <button
                onClick={() => {
                  setQuery("");
                  setCat("All");
                }}
                className="btn-ghost text-sm"
              >
                Reset
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((article, idx) => (
                <FadeIn key={article.id} direction="up" delay={idx * 0.08}>
                  <Link href={`/blog/${article.slug}`} className="group block space-y-5">
                    <ImageReveal className="w-full h-60 rounded-xl overflow-hidden" delay={0.03 * idx}>
                      <Image
                        src={article.imageUrl}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="33vw"
                      />
                    </ImageReveal>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-label text-white/35">
                        <span>{article.category}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.readTime}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white leading-snug group-hover:text-white/80 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-white/45 line-clamp-2 font-light leading-relaxed">{article.excerpt}</p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                      <div className="flex items-center gap-2.5">
                        <div className="relative w-6 h-6 rounded-full overflow-hidden border border-white/20">
                          <Image src={article.author.avatarUrl} alt={article.author.name} fill className="object-cover" />
                        </div>
                        <span className="text-xs text-white/55">{article.author.name}</span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-white/25 group-hover:text-white transition-colors" />
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
