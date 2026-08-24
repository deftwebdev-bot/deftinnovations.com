import React from "react";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { getTeam, getTrustStats, getArticles } from "@/lib/api";
import { AboutClient } from "./AboutClient";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "About Us | Our Story & Expertise",
  description: "Learn about Deft Innovations — our story, purpose, global impact, core pillars, and expertise across digital engineering, design, and performance marketing.",
};

export default async function AboutPage() {
  const [team, stats, articles] = await Promise.all([
    getTeam(),
    getTrustStats(),
    getArticles(),
  ]);

  return (
    <div className="min-h-screen bg-[#070707] text-white">
      <Navbar />
      <AboutClient team={team} stats={stats} articles={articles} />
      <Footer />
    </div>
  );
}