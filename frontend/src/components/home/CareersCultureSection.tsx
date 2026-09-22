"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MediaImage as Image } from "@/components/ui/MediaImage";
import { ArrowRight } from "lucide-react";
import { FadeIn, LineReveal } from "@/components/ui/Motion";
import { TeamMember } from "@/lib/api";
import { getMediaUrl } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";

interface CareersCultureSectionProps {
  team?: TeamMember[];
}

const CULTURE_IMAGES = [
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=85",
];

export const CareersCultureSection: React.FC<CareersCultureSectionProps> = ({ team = [] }) => {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  // Extract photos from uploaded team members or fallback
  const teamPhotos = team
    .slice(0, 2)
    .map((m) => m.imageUrl)
    .filter((url) => url && typeof url === 'string' && url.trim().length > 0 && !url.includes("/admin/"));

  const displayPhotos = teamPhotos.length >= 1 ? teamPhotos : CULTURE_IMAGES;

  useEffect(() => {
    if (displayPhotos.length <= 1) return;
    const timer = setInterval(() => {
      setActivePhotoIdx((prev) => (prev + 1) % displayPhotos.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [displayPhotos.length]);

  const rawPhoto = displayPhotos[activePhotoIdx] || CULTURE_IMAGES[0];
  const photoSrc = getMediaUrl(rawPhoto) || CULTURE_IMAGES[0];

  return (
    <section className="section bg-[#ffffff] text-[#0a0a0a] border-b border-black/[0.06] overflow-hidden">
      <div className="container-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Heading & Narrative */}
          <div className="lg:col-span-7 space-y-8">
            <FadeIn direction="up">
              <span className="text-xs font-mono font-semibold tracking-widest text-black/40 uppercase">
                Life At Deft
              </span>
            </FadeIn>

            <h2 className="ttl-120 font-light text-[#0a0a0a] tracking-tight leading-[1.02]">
              <LineReveal delay={0.1}>You Will Like It</LineReveal>{" "}
              <span className="font-light text-black/40 block">Here!</span>
            </h2>

            <FadeIn direction="up" delay={0.25}>
              <p className="text-xl sm:text-2xl text-black/70 font-light leading-relaxed max-w-xl">
                At Deft Innovations, we are all about creating a habitat that lets you grow stronger roots and larger branches. Together let&apos;s build game-changing digital products.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.35}>
              <div className="pt-2">
                <Link
                  href="/careers"
                  className="btn-dark inline-flex items-center gap-2 group"
                >
                  <span>Explore opportunities</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Animated Image Frame with Rotating Stamp Badge (WAC Style) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Main Photo Card */}
            <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden bg-neutral-100 border border-black/[0.08] shadow-lg">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePhotoIdx}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={photoSrc}
                    alt="Life and Culture at Deft Innovations"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6 text-white text-xs font-mono tracking-wider flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md">
                      DEFT CULTURE LAB · 2026
                    </span>
                    <span className="opacity-80">
                      {String(activePhotoIdx + 1).padStart(2, "0")} / {String(displayPhotos.length).padStart(2, "0")}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Rotating Circular Stamp Badge */}
            <div className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 z-20 pointer-events-none">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-[#0a0a0a] text-white p-2 shadow-2xl flex items-center justify-center border border-white/20"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path
                    id="circlePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text className="text-[9px] font-mono tracking-[0.24em] fill-white uppercase font-bold">
                    <textPath href="#circlePath" startOffset="0%">
                      • DEFT INNOVATIONS • JOIN THE TEAM •
                    </textPath>
                  </text>
                </svg>
                <div className="absolute w-4 h-4 rounded-full bg-white flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-black" />
                </div>
              </motion.div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
