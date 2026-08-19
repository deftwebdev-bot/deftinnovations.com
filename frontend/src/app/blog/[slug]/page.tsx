import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { getArticleBySlug, getArticles, getMediaUrl } from "@/lib/api";
import { CtaSection } from "@/components/home/CtaSection";
import { FadeIn, ImageReveal } from "@/components/ui/Motion";
import { ArrowLeft, Clock, Share2 } from "lucide-react";
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
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <main className="pt-32">

        {/* Header */}
        <section className="section bg-[#0a0a0a]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Journal
            </Link>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-label text-white/40">
                <span className="pill text-white/60 text-[10px]">{article.category}</span>
                <span>{article.publishedAt}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime}</span>
              </div>

              <h1 className="text-h1 text-white leading-tight">{article.title}</h1>
              <p className="text-lg text-white/55 leading-relaxed font-light">{article.excerpt}</p>
            </div>

            {/* Author */}
            <div className="flex items-center justify-between pt-6 border-t border-white/[0.06]">
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/20">
                  <Image src={article.author.avatarUrl} alt={article.author.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="font-bold text-white">{article.author.name}</p>
                  <p className="text-xs text-white/40 font-mono">{article.author.role}</p>
                </div>
              </div>
              <span className="flex items-center gap-2 text-sm text-white/35"><Share2 className="w-4 h-4" /> Share</span>
            </div>
          </div>
        </section>

        {/* Hero image */}
        <section className="bg-[#0a0a0a]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ImageReveal className="w-full h-[50vh] rounded-2xl overflow-hidden">
              <Image src={article.imageUrl} alt={article.title} fill className="object-cover" priority sizes="100vw" />
            </ImageReveal>
          </div>
        </section>

        {/* Body */}
        <section className="section">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <FadeIn direction="up">
              <div className="space-y-6 text-white/75 text-[1.06rem] leading-[1.85] font-light">
                {article.content.split("\n\n").map((para, i) => {
                  if (para.trim().startsWith("### ")) {
                    return <h3 key={i} className="text-h3 text-white pt-4 pb-1 font-bold">{para.replace("### ", "")}</h3>;
                  }
                  if (para.trim().startsWith("- ") || para.trim().startsWith("1. ")) {
                    return (
                      <div key={i} className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white/70 whitespace-pre-line">
                        {para}
                      </div>
                    );
                  }
                  return <p key={i}>{para}</p>;
                })}
              </div>
            </FadeIn>

            {/* Tags */}
            <div className="pt-8 border-t border-white/[0.06] flex flex-wrap gap-2">
              {article.tags.map((tag, i) => (
                <span key={i} className="pill text-white/50 text-[10px]">#{tag}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="section-sm border-t border-white/[0.06]">
            <div className="container-xl space-y-10">
              <h2 className="text-h2 text-white">Related Insights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {related.map((r) => (
                  <Link key={r.id} href={`/blog/${r.slug}`} className="card-hover p-6 space-y-3">
                    <span className="text-label text-white/35">{r.category} · {r.readTime}</span>
                    <h3 className="text-xl font-bold text-white">{r.title}</h3>
                    <p className="text-sm text-white/45 line-clamp-2 font-light">{r.excerpt}</p>
                  </Link>
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
