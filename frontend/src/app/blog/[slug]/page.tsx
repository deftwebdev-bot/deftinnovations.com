import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { getArticleBySlug, getArticles, getMediaUrl } from "@/lib/api";
import { CtaSection } from "@/components/home/CtaSection";
import { FadeIn, LineReveal, ImageReveal } from "@/components/ui/Motion";
import { ArrowRight, Clock, Share2 } from "lucide-react";
import type { Metadata } from "next";

export const dynamicParams = true;

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = await getArticleBySlug(slug);
  if (!a) return { title: "Not Found" };
  return { title: `${a.title} — Deft Innovations`, description: a.excerpt };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const allArticles = await getArticles();
  const related = allArticles.filter((a) => a.slug !== slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-white text-[#0a0a0a]">
      <Navbar />

      <main>
        {/* Hero — article image as background */}
        <section className="relative min-h-[50vh] flex items-end overflow-hidden">
          {article.imageUrl ? (
            <>
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#070707]" />
          )}

          <div className="relative z-10 max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-12 sm:pb-16 space-y-4">
            <FadeIn direction="up">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-4"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                <span>All Articles</span>
              </Link>
            </FadeIn>

            <FadeIn direction="up">
              <div className="flex items-center gap-3 text-[11px] font-mono font-semibold tracking-widest text-white/60 uppercase">
                <span>{article.category}</span>
                <span>·</span>
                <span>{article.publishedAt}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {article.readTime}
                </span>
              </div>
            </FadeIn>

            <h1 className="ttl-80 font-light text-white tracking-tight leading-[1.08]">
              <LineReveal delay={0.1}>{article.title}</LineReveal>
            </h1>

            <FadeIn direction="up" delay={0.15}>
              <p className="text-sm sm:text-base font-light text-white/60 leading-relaxed max-w-lg">
                {article.excerpt}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Author bar */}
        <section className="bg-white border-b border-black/10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-black/10">
                <Image src={article.author.avatarUrl} alt={article.author.name} fill className="object-cover" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0a0a0a]">{article.author.name}</p>
                <p className="text-[11px] font-mono text-black/40">{article.author.role}</p>
              </div>
            </div>
            <span className="flex items-center gap-2 text-sm text-black/35">
              <Share2 className="w-4 h-4" /> Share
            </span>
          </div>
        </section>

        {/* Body content */}
        <section className="section bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <FadeIn direction="up">
              <div className="space-y-6 text-black/70 text-[1.06rem] leading-[1.85] font-light">
                {article.content.split("\n\n").map((para, i) => {
                  if (para.trim().startsWith("### ")) {
                    return (
                      <h3 key={i} className="ttl-h3 font-normal text-[#0a0a0a] pt-4 pb-1">
                        {para.replace("### ", "")}
                      </h3>
                    );
                  }
                  if (para.trim().startsWith("- ") || para.trim().startsWith("1. ")) {
                    return (
                      <div key={i} className="p-5 bg-black/[0.03] border border-black/10 text-sm text-black/60 whitespace-pre-line">
                        {para}
                      </div>
                    );
                  }
                  return <p key={i}>{para}</p>;
                })}
              </div>
            </FadeIn>

            {/* Tags */}
            <div className="pt-8 border-t border-black/10 flex flex-wrap gap-2">
              {article.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-black/5 border border-black/10 text-black/50 text-[11px] font-mono font-medium">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Related articles */}
        {related.length > 0 && (
          <section className="section-sm bg-white border-t border-black/10">
            <div className="container-xl space-y-8">
              <FadeIn direction="up">
                <div className="space-y-1">
                  <span className="text-xs font-mono font-semibold tracking-widest text-black/30 uppercase">
                    Keep Reading
                  </span>
                  <h2 className="ttl-h3 font-normal text-[#0a0a0a]">
                    Related Insights
                  </h2>
                </div>
              </FadeIn>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {related.map((r) => (
                  <FadeIn key={r.id} direction="up" delay={0.08}>
                    <Link href={`/blog/${r.slug}`} className="group flex gap-4 items-start">
                      <div className="relative w-24 h-24 shrink-0 overflow-hidden bg-neutral-100 border border-black/[0.06]">
                        <ImageReveal className="w-full h-full">
                          <Image
                            src={r.imageUrl}
                            alt={r.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="96px"
                          />
                        </ImageReveal>
                      </div>
                      <div className="space-y-1.5 min-w-0">
                        <div className="flex items-center gap-2 text-[10px] font-mono font-medium text-black/35 uppercase tracking-wider">
                          <span>{r.category}</span>
                          <span>·</span>
                          <span>{r.readTime}</span>
                        </div>
                        <h3 className="text-sm font-normal text-[#0a0a0a] group-hover:text-black/60 transition-colors leading-snug line-clamp-2">
                          {r.title}
                        </h3>
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
