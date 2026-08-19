"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FadeIn, LineReveal, ImageReveal } from "@/components/ui/Motion";
import { Article, ARTICLES_DATA } from "@/data/articles";
import { getMediaUrl } from "@/lib/api";

interface InsightsSectionProps {
  articles?: Article[];
}

export const InsightsSection: React.FC<InsightsSectionProps> = ({
  articles = ARTICLES_DATA,
}) => {
  const articleList = articles && articles.length > 0 ? articles : ARTICLES_DATA;
  const displayList = articleList.slice(0, 3);

  return (
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
          {displayList.map((article, idx) => (
            <FadeIn key={article.id || idx} direction="up" delay={idx * 0.08}>
              <Link
                href={`/blog/${article.slug}`}
                className="group block space-y-5 cursor-pointer rounded-2xl p-4 -m-4 hover:bg-white/[0.03] transition-colors duration-300"
              >
                {/* 16:10 Aspect Ratio Image */}
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

                {/* Meta & Title */}
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

        {/* Mobile Bottom Button */}
        <div className="text-center pt-4 md:hidden">
          <Link href="/blog" className="btn-ghost w-full justify-center">
            <span>Explore all insights</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
