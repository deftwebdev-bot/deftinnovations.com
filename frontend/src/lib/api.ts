// ─── Type Definitions ────────────────────────────────────────────────────────

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: {
    name: string;
    role: string;
    avatarUrl: string;
  };
  publishedAt: string;
  readTime: string;
  imageUrl: string;
  featured: boolean;
  tags: string[];
}

export interface MetricResult {
  metric: string;
  label: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  clientId?: number | null;
  category: string;
  industry: string;
  summary: string;
  challenge: string;
  solution: string;
  results: MetricResult[];
  servicesProvided: string[];
  technologiesUsed: string[];
  imageUrl: string;
  videoUrl?: string | null;
  galleryImages: string[];
  year: string;
  featured: boolean;
}

export interface FeaturedStat {
  label: string;
  value: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  categoryName: string;
  categoryId: string;
  categoryImageUrl: string;
  iconName: string;
  deliverables: string[];
  businessBenefits: string[];
  processSteps: string[];
  featuredStats?: FeaturedStat | null;
  imageUrl: string;
}

export interface ServiceCategory {
  id: string;
  slug: string;
  title: string;
  iconName: string;
  description: string;
  imageUrl: string;
  services: Service[];
}

export interface TeamMember {
  id: string | number;
  name: string;
  role: string;
  imageUrl: string;
  order?: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  logoText: string;
  metric?: string;
  metricLabel?: string;
}

export interface TrustStat {
  value: string;
  label: string;
}

export interface CultureGalleryItem {
  id: string;
  imageUrl: string;
  order?: number;
}

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

export interface TrustedBrand {
  id: number;
  name: string;
  industry: string;
  logoUrl?: string | null;
  websiteUrl?: string | null;
  isFeatured: boolean;
}

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

export interface ContactPayload {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}

// ─── Core Utilities ───────────────────────────────────────────────────────────

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
 * Fetch from backend API with graceful fallback on failure
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
      console.warn(`[API] ${endpoint} → ${res.status}. Using fallback.`);
      return fallback;
    }

    return (await res.json()) as T;
  } catch (err) {
    console.warn(`[API] Network error: ${endpoint}`, (err as Error).message);
    return fallback;
  }
}

// ─── Hero Content ─────────────────────────────────────────────────────────────

const EMPTY_HERO: HeroContent = {
  badgeText: "",
  headlinePrimary: "",
  headlineSecondary: "",
  subheadline: "",
  primaryCtaText: "Start a Project",
  primaryCtaLink: "/contact",
  secondaryCtaText: "View Work",
  secondaryCtaLink: "/portfolio",
  videoUrl: null,
  heroImageUrl: "",
};

export async function getHeroContent(): Promise<HeroContent> {
  return fetchWithFallback<HeroContent>("/company/hero", EMPTY_HERO, {
    next: { revalidate: 60, tags: ["hero-content"] },
  });
}

export async function getHeroSlides(): Promise<HeroContent[]> {
  return fetchWithFallback<HeroContent[]>("/company/hero/slides", [EMPTY_HERO], {
    next: { revalidate: 60, tags: ["hero-slides"] },
  });
}

// ─── Trusted Brands ───────────────────────────────────────────────────────────

export async function getTrustedBrands(): Promise<TrustedBrand[]> {
  return fetchWithFallback<TrustedBrand[]>("/company/brands", [], {
    next: { revalidate: 300, tags: ["trusted-brands"] },
  });
}

// ─── Careers & Jobs ───────────────────────────────────────────────────────────

export async function getCareerJobs(department?: string): Promise<JobPosition[]> {
  const query = department ? `?department=${encodeURIComponent(department)}` : "";
  return fetchWithFallback<JobPosition[]>(`/careers/jobs${query}`, [], {
    next: { revalidate: 60, tags: ["careers-jobs"] },
  });
}

export async function getCareerJobBySlug(slug: string): Promise<JobPosition | null> {
  return fetchWithFallback<JobPosition | null>(`/careers/jobs/${slug}`, null, {
    next: { revalidate: 60, tags: [`career-job-${slug}`] },
  });
}

export async function submitJobApplication(
  payload: JobApplicationPayload
): Promise<{ success: boolean; message: string; applicationId?: number }> {
  const res = await fetch(`${API_URL}/api/v1/careers/apply`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to submit application.");
  }

  return res.json();
}

// ─── Articles / Blog ─────────────────────────────────────────────────────────

export async function getArticles(category?: string): Promise<Article[]> {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  return fetchWithFallback<Article[]>(`/articles/${query}`, [], {
    next: { revalidate: 60, tags: ["articles"] },
  });
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return fetchWithFallback<Article | null>(`/articles/${slug}`, null, {
    next: { revalidate: 60, tags: [`article-${slug}`] },
  });
}

// ─── Projects / Portfolio ─────────────────────────────────────────────────────

export async function getProjects(category?: string): Promise<Project[]> {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  return fetchWithFallback<Project[]>(`/projects/${query}`, [], {
    next: { revalidate: 60, tags: ["projects"] },
  });
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return fetchWithFallback<Project | null>(`/projects/${slug}`, null, {
    next: { revalidate: 60, tags: [`project-${slug}`] },
  });
}

// ─── Services ─────────────────────────────────────────────────────────────────

export async function getServices(): Promise<Service[]> {
  return fetchWithFallback<Service[]>("/services/", [], {
    next: { revalidate: 300, tags: ["services"] },
  });
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  return fetchWithFallback<Service | null>(`/services/${slug}`, null, {
    next: { revalidate: 300, tags: [`service-${slug}`] },
  });
}

export async function getCategorizedServices(): Promise<ServiceCategory[]> {
  return fetchWithFallback<ServiceCategory[]>("/services/categorized", [], {
    next: { revalidate: 300, tags: ["services"] },
  });
}

// ─── Company / Social Proof ───────────────────────────────────────────────────

export async function getTeam(): Promise<TeamMember[]> {
  return fetchWithFallback<TeamMember[]>("/company/team", [], {
    next: { revalidate: 300, tags: ["team"] },
  });
}

export async function getGalleryPhotos(): Promise<CultureGalleryItem[]> {
  return fetchWithFallback<CultureGalleryItem[]>("/company/gallery", [], {
    next: { revalidate: 300, tags: ["gallery"] },
  });
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return fetchWithFallback<Testimonial[]>("/company/testimonials", [], {
    next: { revalidate: 300, tags: ["testimonials"] },
  });
}

export async function getTrustStats(): Promise<TrustStat[]> {
  return fetchWithFallback<TrustStat[]>("/company/trust-stats", [], {
    next: { revalidate: 300, tags: ["trust-stats"] },
  });
}

// ─── Contact Leads ────────────────────────────────────────────────────────────

export async function submitContactLead(
  payload: ContactPayload
): Promise<{ success: boolean; message: string; leadId?: number }> {
  const res = await fetch(`${API_URL}/api/v1/contact/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to submit inquiry.");
  }

  return res.json();
}
