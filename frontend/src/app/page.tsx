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
import { LazySection } from "@/components/ui/LazySection";
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

export const revalidate = 60;

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

        {/* 2. Interactive Scroll-Animated Manifesto */}
        <ScrollAnimatedSection />

        {/* 3. Case Studies */}
        <LazySection>
          <CaseStudiesSection projects={projects} />
        </LazySection>

        {/* 4. Our Story & Numbers */}
        <LazySection>
          <OurStorySection stats={stats} />
        </LazySection>

        {/* 5. What We Do Capabilities */}
        <LazySection>
          <WhatWeDoSection services={services} />
        </LazySection>

        {/* 6. Gen AI Banner (contains heavy Three.js) */}
        <LazySection>
          <GenAiBanner />
        </LazySection>

        {/* 7. Clients & Brand Partnerships */}
        <LazySection>
          <ClientsSection brands={brands} />
        </LazySection>

        {/* 8. Featured Stories / Testimonials */}
        <LazySection>
          <TestimonialsSection testimonials={testimonials} />
        </LazySection>

        {/* 9. Careers / Life at Deft */}
        <LazySection>
          <CareersCultureSection team={team} />
        </LazySection>

        {/* 10. Insights / Blog Journal */}
        <LazySection>
          <InsightsSection articles={articles} />
        </LazySection>

        {/* 11. CTA */}
        <LazySection>
          <CtaSection />
        </LazySection>
      </main>
      <Footer />
    </div>
  );
}
