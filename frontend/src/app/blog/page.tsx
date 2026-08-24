import React from "react";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { CtaSection } from "@/components/home/CtaSection";
import { getArticles } from "@/lib/api";
import { BlogListClient } from "./BlogListClient";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Journal & Insights — Deft Innovations",
  description: "Perspectives on high-contrast design, sub-second web engineering, performance paid acquisition, and brand growth.",
};

export default async function BlogPage() {
  const articles = await getArticles();

  return (
    <div className="min-h-screen bg-white text-[#0a0a0a]">
      <Navbar />
      <main>
        <BlogListClient initialArticles={articles} />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
