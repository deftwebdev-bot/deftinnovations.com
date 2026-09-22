import React from "react";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { CtaSection } from "@/components/home/CtaSection";
import { getTrustedBrands, getProjects } from "@/lib/api";
import { ClientsListClient } from "./ClientsListClient";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Our Clients — Deft Innovations",
  description: "Trusted by forward-thinking brands worldwide. Explore the industries and companies we've partnered with.",
};

export default async function ClientsPage() {
  const [brands, projects] = await Promise.all([
    getTrustedBrands(),
    getProjects(),
  ]);

  return (
    <div className="min-h-screen bg-white text-[#0a0a0a]">
      <Navbar />
      <main>
        <ClientsListClient initialBrands={brands} allProjects={projects} />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
