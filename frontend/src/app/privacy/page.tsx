import React from "react";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import type { Metadata } from "next";
import { PrivacyClient } from "./PrivacyClient";

export const metadata: Metadata = {
  title: "Privacy Policy | Deft Innovations",
  description:
    "Read the Privacy Policy of Deft Innovations. Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-[#0a0a0a]">
      <Navbar />
      <PrivacyClient />
      <Footer />
    </div>
  );
}
