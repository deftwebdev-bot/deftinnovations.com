import React from "react";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { CtaSection } from "@/components/home/CtaSection";
import { getProjects } from "@/lib/api";
import { PortfolioListClient } from "./PortfolioListClient";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Case Studies & Portfolio — Deft Innovations",
  description: "Explore transformative digital products, brand identities, and high-ROAS performance campaigns delivered by Deft Innovations.",
};

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-white text-[#0a0a0a]">
      <Navbar />
      <main>
        <PortfolioListClient initialProjects={projects} />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
