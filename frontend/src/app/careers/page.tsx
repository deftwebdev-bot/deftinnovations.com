import React from "react";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { CtaSection } from "@/components/home/CtaSection";
import { getCareerJobs } from "@/lib/api";
import { CareersClient } from "./CareersClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers & Open Roles — Deft Innovations",
  description: "Join our remote-first collective of systems architects, creative directors, and growth strategists. Explore open engineering, design, and marketing positions.",
};

export const revalidate = 60;

export default async function CareersPage() {
  const jobs = await getCareerJobs();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <main className="pt-32">
        <CareersClient initialJobs={jobs} />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
