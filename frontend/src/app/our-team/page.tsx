import React from "react";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { getTeam, getArticles, getGalleryPhotos } from "@/lib/api";
import { OurTeamClient } from "./OurTeamClient";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Our Team & Life at Deft | Creative Technology Agency",
  description: "Meet the experts, visionaries, and systems architects behind Deft Innovations. Explore life at Deft, our culture gallery, and open opportunities.",
};

export default async function OurTeamPage() {
  const [team, gallery, articles] = await Promise.all([
    getTeam(),
    getGalleryPhotos(),
    getArticles(),
  ]);

  return (
    <div className="min-h-screen bg-[#070707] text-white">
      <Navbar />
      <OurTeamClient team={team} gallery={gallery} articles={articles} />
      <Footer />
    </div>
  );
}
