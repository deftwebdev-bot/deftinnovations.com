import React from "react";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { CtaSection } from "@/components/home/CtaSection";
import { getTestimonials } from "@/lib/api";
import { TestimonialsListClient } from "./TestimonialsListClient";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Testimonials — Client Stories & Reviews",
  description:
    "Read what our clients say about working with Deft Innovations. Authentic testimonials from brands we've helped grow through strategy, design, and technology.",
};

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div className="min-h-screen bg-white text-[#0a0a0a]">
      <Navbar />
      <main>
        <TestimonialsListClient initialTestimonials={testimonials} />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
