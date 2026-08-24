import React from "react";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { CtaSection } from "@/components/home/CtaSection";
import { getCareerJobs, getTestimonials, getTrustStats } from "@/lib/api";
import { CareersClient } from "./CareersClient";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Careers & Open Roles — Deft Innovations",
  description: "Join our remote-first collective of systems architects, creative directors, and growth strategists. Explore open engineering, design, and marketing positions.",
};

export default async function CareersPage() {
  const [jobs, testimonials, trustStats] = await Promise.all([
    getCareerJobs(),
    getTestimonials(),
    getTrustStats(),
  ]);

  return (
    <div className="min-h-screen bg-white text-[#0a0a0a]">
      <Navbar />
      <main>
        <CareersClient initialJobs={jobs} testimonials={testimonials} trustStats={trustStats} />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
