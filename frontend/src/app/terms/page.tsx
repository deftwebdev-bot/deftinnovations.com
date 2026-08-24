import React from "react";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import type { Metadata } from "next";
import { TermsClient } from "./TermsClient";

export const metadata: Metadata = {
  title: "Terms & Conditions | Deft Innovations",
  description:
    "Read the Terms and Conditions governing your use of the Deft Innovations website and services.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-[#0a0a0a]">
      <Navbar />
      <TermsClient />
      <Footer />
    </div>
  );
}
