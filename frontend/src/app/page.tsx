import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { ScrollAnimatedSection } from "@/components/home/ScrollAnimatedSection";
import { CaseStudiesSection } from "@/components/home/CaseStudiesSection";
import { OurStorySection } from "@/components/home/OurStorySection";
import { WhatWeDoSection } from "@/components/home/WhatWeDoSection";
import { GenAiBanner } from "@/components/home/GenAiBanner";
import { ClientsSection } from "@/components/home/ClientsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CareersCultureSection } from "@/components/home/CareersCultureSection";
import { InsightsSection } from "@/components/home/InsightsSection";
import { CtaSection } from "@/components/home/CtaSection";
import {
  getHeroSlides,
  getTrustedBrands,
  getTrustStats,
  getServices,
  getProjects,
  getTestimonials,
  getTeam,
  getArticles,
} from "@/lib/api";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const [heroSlides, brands, stats, services, projects, testimonials, team, articles] = await Promise.all([
    getHeroSlides(),
    getTrustedBrands(),
    getTrustStats(),
    getServices(),
    getProjects(),
    getTestimonials(),
    getTeam(),
    getArticles(),
  ]);

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#0a0a0a]">
      <Navbar />
      <main>
        {/* 1. Fullscreen Multi-Slide Video Hero Carousel */}
        <HeroCarousel slides={heroSlides} />

        {/* 2. Interactive Scroll-Animated Manifesto & Expanding Video Frame */}
        <ScrollAnimatedSection />

        {/* 3. Case Studies (White BG - Square 1:1 Aspect Cards) */}
        <CaseStudiesSection projects={projects} />

        {/* 3. Our Story & Numbers (Light Gray BG - Floating Stats) */}
        <OurStorySection stats={stats} />

        {/* 4. What We Do Capabilities (Dark Visual Photo Cards) */}
        <WhatWeDoSection services={services} />

        {/* 5. Gen AI & Agentic Solutions Showcase Banner */}
        <GenAiBanner />

        {/* 6. Clients & Brand Partnerships (White BG - 5-Col Grid) */}
        <ClientsSection brands={brands} />

        {/* 7. Featured Stories / Video Testimonials (3-Col Story Cards) */}
        <TestimonialsSection testimonials={testimonials} />

        {/* 8. Careers / Life at Deft ("You Will Like It Here!" + Rotating Stamp) */}
        <CareersCultureSection team={team} />

        {/* 9. Insights / Blog Journal (3-Col Latest Thought Leadership) */}
        <InsightsSection articles={articles} />

        {/* 10. Take The Digital Leap CTA (High-Contrast Dark Banner) */}
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
