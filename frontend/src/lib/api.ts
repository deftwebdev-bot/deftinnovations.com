import { Article, ARTICLES_DATA } from "@/data/articles";
import { Project, PROJECTS_DATA } from "@/data/projects";
import { Service, SERVICES_DATA } from "@/data/services";
import { TeamMember, TEAM_DATA } from "@/data/team";
import { Testimonial, TESTIMONIALS_DATA, TRUST_STATS } from "@/data/testimonials";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

/**
 * Resolve full URL for media assets (images, uploads, etc.)
 */
export function getMediaUrl(url?: string | null): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/media/")) return `${API_URL}${url}`;
  if (url.startsWith("/")) return url;
  return `${API_URL}/media/${url}`;
}

/**
 * High-performance fetch helper with fallback to static dataset
 */
async function fetchWithFallback<T>(endpoint: string, fallback: T, options?: RequestInit): Promise<T> {
  try {
    const res = await fetch(`${API_URL}/api/v1${endpoint}`, {
      next: { revalidate: 0 },
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
    });

    if (!res.ok) {
      console.warn(`[API] Failed to fetch ${endpoint}, status: ${res.status}. Using fallback data.`);
      return fallback;
    }

    const data = await res.json();
    return data as T;
  } catch (err) {
    console.warn(`[API] Network error fetching ${endpoint}. Falling back to static data:`, (err as Error).message);
    return fallback;
  }
}

// ---------------- Hero Content ----------------
export interface HeroContent {
  id?: number;
  badgeText: string;
  headlinePrimary: string;
  headlineSecondary: string;
  subheadline: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  videoUrl?: string | null;
  heroImageUrl: string;
}

export const FALLBACK_HERO_CONTENT: HeroContent = {
  id: 1,
  badgeText: "Experiences Powered by Intelligence",
  headlinePrimary: "Brands Built to Move",
  headlineSecondary: "Businesses Forward.",
  subheadline: "Strategy, creativity, technology & performance marketing — unified into one growth engine for ambitious global enterprises.",
  primaryCtaText: "Explore Case Studies",
  primaryCtaLink: "/portfolio",
  secondaryCtaText: "Start a Project",
  secondaryCtaLink: "/contact",
  videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-41315-large.mp4",
  heroImageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=2000&q=90",
};

export const FALLBACK_HERO_SLIDES: HeroContent[] = [
  FALLBACK_HERO_CONTENT,
  {
    id: 2,
    badgeText: "AI Precision. Human Intuition. Real Results.",
    headlinePrimary: "Digital Transformation",
    headlineSecondary: "Engineered to Scale.",
    subheadline: "Empowering market leaders through superior design architecture, high-performance web systems, and data-driven marketing.",
    primaryCtaText: "Our Capabilities",
    primaryCtaLink: "/services",
    secondaryCtaText: "Consult Our Team",
    secondaryCtaLink: "/contact",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-working-on-a-laptop-42998-large.mp4",
    heroImageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=85",
  },
  {
    id: 3,
    badgeText: "Strategic Impact — Est. 2020",
    headlinePrimary: "Helping You Take the",
    headlineSecondary: "Next Digital Leap.",
    subheadline: "From bespoke web platforms to high-ROAS performance engines, we turn complex technical challenges into revenue growth.",
    primaryCtaText: "Start a Project",
    primaryCtaLink: "/contact",
    secondaryCtaText: "View Journal",
    secondaryCtaLink: "/blog",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-sky-in-a-sunset-26070-large.mp4",
    heroImageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=2000&q=85",
  }
];

export async function getHeroContent(): Promise<HeroContent> {
  return fetchWithFallback<HeroContent>("/company/hero", FALLBACK_HERO_CONTENT, {
    next: { revalidate: 60, tags: ["hero-content"] },
  });
}

export async function getHeroSlides(): Promise<HeroContent[]> {
  return fetchWithFallback<HeroContent[]>("/company/hero/slides", FALLBACK_HERO_SLIDES, {
    next: { revalidate: 60, tags: ["hero-slides"] },
  });
}

// ---------------- Trusted Brands ----------------
export interface TrustedBrand {
  id: number;
  name: string;
  logoUrl?: string | null;
  websiteUrl?: string | null;
}

export const FALLBACK_BRANDS: TrustedBrand[] = [
  { id: 1, name: "NEXUS GLOBAL CAPITAL" },
  { id: 2, name: "AURA ATELIER" },
  { id: 3, name: "SENTINEL LABS" },
  { id: 4, name: "KURO MOTORS" },
  { id: 5, name: "SOLARIS BIOTECH" },
  { id: 6, name: "VANGUARD ARCHITECTS" },
  { id: 7, name: "QUANTUM VENTURES" },
  { id: 8, name: "ATLAS CREATIVE CO." },
  { id: 9, name: "MERIDIAN HEALTH" },
  { id: 10, name: "PRISM DIGITAL" },
];

export async function getTrustedBrands(): Promise<TrustedBrand[]> {
  return fetchWithFallback<TrustedBrand[]>("/company/brands", FALLBACK_BRANDS, {
    next: { revalidate: 300, tags: ["trusted-brands"] },
  });
}

// ---------------- Careers & Jobs ----------------
export interface JobPosition {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  jobType: string;
  experienceLevel: string;
  salaryRange: string;
  overview: string;
  responsibilities: string[];
  requirements: string[];
  perks: string[];
  featured: boolean;
  isActive: boolean;
  createdAt: string;
}

export const FALLBACK_JOBS: JobPosition[] = [
  {
    id: "job-1",
    slug: "senior-full-stack-engineer",
    title: "Senior Full-Stack Engineer",
    department: "Engineering",
    location: "Remote (Global) / Dubai, UAE",
    jobType: "Full-time",
    experienceLevel: "Senior (4+ yrs)",
    salaryRange: "$95,000 — $135,000 / yr + Equity",
    overview: "Lead the engineering of high-traffic, sub-second web platforms, enterprise SaaS portals, and interactive headless digital experiences for global clientele using Next.js, React 19, TypeScript, and Python Django.",
    responsibilities: [
      "Architect and ship production Next.js App Router applications with sub-second Core Web Vitals.",
      "Build type-safe, resilient REST and GraphQL APIs with Django Ninja and PostgreSQL.",
      "Collaborate directly with our design and growth teams to implement fluid micro-interactions and Framer Motion experiences.",
      "Optimize technical performance, edge caching (ISR), CDN routing, and CI/CD deployment pipelines.",
      "Mentor junior and mid-level developers and conduct rigorous code reviews.",
    ],
    requirements: [
      "4+ years of professional full-stack development experience with React, Next.js, and TypeScript.",
      "Deep proficiency in Python (Django / FastAPI) and relational databases (PostgreSQL).",
      "Strong mastery of modern CSS, Tailwind CSS, animation libraries (Framer Motion), and responsive layouts.",
      "Experience with cloud infrastructure (Vercel, AWS, Docker, Coolify/Dokku).",
      "Obsession with performance benchmarks, clean code craftsmanship, and WCAG accessibility.",
    ],
    perks: [
      "100% remote-first flexibility with global co-working stipends.",
      "Annual learning & conference budget ($2,500/year).",
      "Top-tier Apple hardware (MacBook Pro M3 Max + 4K display).",
      "Comprehensive health & wellness coverage.",
      "Generous paid time off (28 days + local holidays).",
    ],
    featured: true,
    isActive: true,
    createdAt: "August 17, 2026",
  },
  {
    id: "job-2",
    slug: "lead-brand-product-designer",
    title: "Lead Brand & Product Designer",
    department: "Design & Creative",
    location: "Remote / London, UK / Dubai, UAE",
    jobType: "Full-time",
    experienceLevel: "Lead / Principal (5+ yrs)",
    salaryRange: "$90,000 — $125,000 / yr",
    overview: "Define the visual soul, brand identity systems, and high-contrast digital interfaces for market-leading enterprise and fintech clients.",
    responsibilities: [
      "Craft comprehensive visual identity systems, typography tokens, logomarks, and brand guidelines.",
      "Design world-class web and product experiences in Figma with meticulous attention to grid structures and micro-interactions.",
      "Work closely with our engineering team to ensure pixel-perfect, design-to-code execution.",
      "Lead client design presentations, brand discovery workshops, and design critique sessions.",
      "Push the boundaries of modern monochrome and high-contrast luxury digital aesthetics.",
    ],
    requirements: [
      "5+ years of senior design leadership experience in premier design studios or digital product agencies.",
      "Outstanding portfolio demonstrating mastery of brand systems, modern web UI/UX, and typography.",
      "Expert-level command of Figma, design systems, vector illustration, and prototyping.",
      "Strong understanding of frontend technical constraints (HTML, CSS, flexbox/grid, motion curves).",
      "Articulate communication skills with ability to pitch and defend design rationale to C-suite executives.",
    ],
    perks: [
      "Remote-first work culture with flexible working hours across timezones.",
      "Annual hardware & ergonomic home office stipend ($2,000).",
      "Health, dental, and wellness package.",
      "Paid team retreats in global destinations (Dubai, Lisbon, Tokyo).",
      "Generous profit-sharing and performance bonuses.",
    ],
    featured: true,
    isActive: true,
    createdAt: "August 17, 2026",
  },
  {
    id: "job-3",
    slug: "performance-marketing-strategist",
    title: "Senior Performance Marketing Strategist",
    department: "Performance Marketing",
    location: "Remote / Austin, TX / London, UK",
    jobType: "Full-time",
    experienceLevel: "Senior (3+ yrs)",
    salaryRange: "$80,000 — $115,000 / yr + Performance Bonus",
    overview: "Architect omnichannel paid acquisition pipelines, first-party attribution tracking, and high-ROAS ad campaigns across Meta, Google Search, LinkedIn ABM, and programmatic channels.",
    responsibilities: [
      "Manage and scale 6-figure monthly client ad budgets across Google Ads, Meta Ads, and LinkedIn Campaign Manager.",
      "Design conversion rate optimization (CRO) hypotheses and landing page multivariate tests.",
      "Build automated analytics reporting pipelines connecting server-side Conversion APIs (CAPI) with CRM data.",
      "Analyze full-funnel attribution, customer lifetime value (LTV), and ROAS metrics to optimize spend allocation.",
      "Partner with creative designers to brief high-converting static and short-form video ad assets.",
    ],
    requirements: [
      "3+ years managing substantial paid media spend ($100k+/month) with proven track record of profitable ROAS.",
      "Deep analytical mindset with expertise in GA4, Looker Studio, Triple Whale, and server-side tracking.",
      "Strong copywriting and visual messaging sense for direct-response advertising.",
      "Experience in both B2B lead generation (ABM) and premium D2C / E-commerce growth.",
      "High proficiency with rapid multivariate ad testing frameworks.",
    ],
    perks: [
      "Competitive base salary + quarterly profit-share based on portfolio ROAS.",
      "Full remote equipment and co-working allowance.",
      "Comprehensive health & dental coverage.",
      "Unlimited paid vacation policy.",
      "Dedicated budget for ad tech certifications and industry summits.",
    ],
    featured: false,
    isActive: true,
    createdAt: "August 17, 2026",
  },
  {
    id: "job-4",
    slug: "technical-seo-content-lead",
    title: "Technical SEO & Topical Authority Lead",
    department: "SEO & Content",
    location: "Remote (Global)",
    jobType: "Full-time",
    experienceLevel: "Senior (3+ yrs)",
    salaryRange: "$75,000 — $105,000 / yr",
    overview: "Spearhead technical SEO architecture, semantic topic clusters, and content marketing strategies that secure top-tier organic visibility for high-intent commercial keywords.",
    responsibilities: [
      "Perform in-depth technical SEO audits covering Core Web Vitals, crawl budgets, schema markup, and JavaScript rendering.",
      "Build topical authority maps, keyword cluster frameworks, and content briefs for enterprise clients.",
      "Oversee digital PR and high-authority editorial backlink acquisition campaigns.",
      "Monitor algorithmic updates, indexation issues, and international search engine visibility.",
      "Produce actionable monthly search ranking and organic pipeline revenue reports.",
    ],
    requirements: [
      "3+ years of enterprise technical SEO experience.",
      "Expert mastery of SEO tools: Ahrefs, SEMrush, Screaming Frog, Google Search Console, and schema generators.",
      "Working knowledge of HTML, structured JSON-LD data, Next.js metadata API, and web performance metrics.",
      "Proven track record of growing organic search traffic by 200%+ for B2B or SaaS brands.",
      "Exceptional analytical and technical writing skills.",
    ],
    perks: [
      "Work from anywhere in the world.",
      "Access to enterprise-tier SEO and data tools.",
      "Flexible schedule with asynchronous communication.",
      "Full health insurance and wellness stipends.",
      "Annual company off-sites.",
    ],
    featured: false,
    isActive: true,
    createdAt: "August 17, 2026",
  },
];

export async function getCareerJobs(department?: string): Promise<JobPosition[]> {
  const query = department ? `?department=${encodeURIComponent(department)}` : "";
  return fetchWithFallback<JobPosition[]>(`/careers/jobs${query}`, FALLBACK_JOBS, {
    next: { revalidate: 60, tags: ["careers-jobs"] },
  });
}

export async function getCareerJobBySlug(slug: string): Promise<JobPosition | null> {
  const fallback = FALLBACK_JOBS.find((j) => j.slug === slug) || null;
  return fetchWithFallback<JobPosition | null>(`/careers/jobs/${slug}`, fallback, {
    next: { revalidate: 60, tags: [`career-job-${slug}`] },
  });
}

export interface JobApplicationPayload {
  jobSlug?: string;
  fullName: string;
  email: string;
  phone?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  githubUrl?: string;
  resumeLink: string;
  coverLetter?: string;
}

export async function submitJobApplication(payload: JobApplicationPayload): Promise<{ success: boolean; message: string; applicationId?: number }> {
  try {
    const res = await fetch(`${API_URL}/api/v1/careers/apply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to submit job application.");
    }

    return await res.json();
  } catch (err) {
    throw new Error((err as Error).message || "An unexpected network error occurred.");
  }
}

// ---------------- Articles / Blog ----------------
export async function getArticles(category?: string): Promise<Article[]> {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  return fetchWithFallback<Article[]>(`/articles/${query}`, ARTICLES_DATA, {
    next: { revalidate: 60, tags: ["articles"] },
  });
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const fallback = ARTICLES_DATA.find((a) => a.slug === slug) || null;
  return fetchWithFallback<Article | null>(`/articles/${slug}`, fallback, {
    next: { revalidate: 60, tags: [`article-${slug}`] },
  });
}

// ---------------- Projects / Portfolio ----------------
export async function getProjects(category?: string): Promise<Project[]> {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  return fetchWithFallback<Project[]>(`/projects/${query}`, PROJECTS_DATA, {
    next: { revalidate: 60, tags: ["projects"] },
  });
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const fallback = PROJECTS_DATA.find((p) => p.slug === slug) || null;
  return fetchWithFallback<Project | null>(`/projects/${slug}`, fallback, {
    next: { revalidate: 60, tags: [`project-${slug}`] },
  });
}

// ---------------- Services ----------------
export async function getServices(): Promise<Service[]> {
  return fetchWithFallback<Service[]>("/services/", SERVICES_DATA, {
    next: { revalidate: 300, tags: ["services"] },
  });
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const fallback = SERVICES_DATA.find((s) => s.slug === slug) || null;
  return fetchWithFallback<Service | null>(`/services/${slug}`, fallback, {
    next: { revalidate: 300, tags: [`service-${slug}`] },
  });
}

// ---------------- Company & Social Proof ----------------
export async function getTeam(): Promise<TeamMember[]> {
  return fetchWithFallback<TeamMember[]>("/company/team", TEAM_DATA, {
    next: { revalidate: 300, tags: ["team"] },
  });
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return fetchWithFallback<Testimonial[]>("/company/testimonials", TESTIMONIALS_DATA, {
    next: { revalidate: 300, tags: ["testimonials"] },
  });
}

export interface TrustStat {
  value: string;
  label: string;
}

export async function getTrustStats(): Promise<TrustStat[]> {
  return fetchWithFallback<TrustStat[]>("/company/trust-stats", TRUST_STATS, {
    next: { revalidate: 300, tags: ["trust-stats"] },
  });
}

// ---------------- Contact Lead Submission ----------------
export interface ContactPayload {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  budget?: string;
  service?: string;
  message: string;
}

export async function submitContactLead(payload: ContactPayload): Promise<{ success: boolean; message: string; leadId?: number }> {
  try {
    const res = await fetch(`${API_URL}/api/v1/contact/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to submit inquiry.");
    }

    return await res.json();
  } catch (err) {
    throw new Error((err as Error).message || "An unexpected network error occurred.");
  }
}
