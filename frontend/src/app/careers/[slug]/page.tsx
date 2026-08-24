import React from "react";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { CtaSection } from "@/components/home/CtaSection";
import { getCareerJobBySlug, getCareerJobs } from "@/lib/api";
import { JobDetailClient } from "./JobDetailClient";
import type { Metadata } from "next";

export const dynamicParams = true;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const jobs = await getCareerJobs();
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = await getCareerJobBySlug(slug);
  if (!job) return { title: "Position Not Found" };
  return {
    title: `${job.title} (${job.department}) — Careers — Deft Innovations`,
    description: job.overview,
  };
}

export const revalidate = 60;

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params;
  const job = await getCareerJobBySlug(slug);

  if (!job) notFound();

  return (
    <div className="min-h-screen bg-white text-[#0a0a0a]">
      <Navbar />
      <main>
        <JobDetailClient job={job} />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
