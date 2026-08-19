export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: "Branding" | "Web Development" | "Digital Marketing" | "Performance Marketing" | "Social Media" | "Creative";
  industry: string;
  summary: string;
  challenge: string;
  solution: string;
  results: { metric: string; label: string }[];
  servicesProvided: string[];
  technologiesUsed: string[];
  imageUrl: string;
  galleryImages: string[];
  year: string;
  featured: boolean;
}

export const PROJECTS_DATA: Project[] = [
  {
    id: "project-nexus-fintech",
    slug: "nexus-fintech",
    title: "Nexus Digital Wealth — Brand & Next.js App Architecture",
    client: "Nexus Global Capital",
    category: "Web Development",
    industry: "Fintech & Private Wealth",
    summary: "Complete digital transformation for a premier institutional asset manager, replacing a legacy corporate website with a sub-second Next.js web application.",
    challenge: "Nexus had an outdated legacy platform that failed to communicate authority to institutional investors, suffering from slow load speeds (4.2s) and low digital lead conversion.",
    solution: "Deft Innovations built an ultra-minimalist, high-performance web experience leveraging Next.js App Router, custom financial interactive tools, and an authoritative monochrome brand language.",
    results: [
      { metric: "0.35s", label: "Page Load Time" },
      { metric: "+320%", label: "Qualified Lead Volume" },
      { metric: "99/100", label: "Lighthouse Performance Score" }
    ],
    servicesProvided: ["Web Development", "Branding", "Technical SEO", "UI/UX Design"],
    technologiesUsed: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel Enterprise"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80"
    ],
    year: "2025",
    featured: true
  },
  {
    id: "project-aura-luxury",
    slug: "aura-luxury-eyewear",
    title: "Aura Atelier — Global E-Commerce & Performance Acquisition",
    client: "Aura Luxury Group",
    category: "Branding",
    industry: "Luxury Fashion & Retail",
    summary: "Rebranding and global omnichannel performance campaign that positioned Aura as the leading sustainable luxury optical atelier.",
    challenge: "Aura was struggling to stand out in a crowded direct-to-consumer eyewear market dominated by legacy brands with massive ad budgets.",
    solution: "We engineered an editorial visual identity and launched hyper-targetedMeta and Google ad campaigns showcasing craftsmanship through high-contrast monochrome cinematography.",
    results: [
      { metric: "4.8x", label: "Blended Campaign ROAS" },
      { metric: "+185%", label: "Year-over-Year Revenue" },
      { metric: "42k", label: "New Active Subscribers" }
    ],
    servicesProvided: ["Branding", "Performance Marketing", "Social Media", "Creative Direction"],
    technologiesUsed: ["Meta Ads Manager", "Shopify Plus", "Klaviyo", "Google Performance Max"],
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=80"
    ],
    year: "2025",
    featured: true
  },
  {
    id: "project-sentinel-cyber",
    slug: "sentinel-cybersecurity",
    title: "Sentinel One AI — B2B Account-Based Performance Marketing",
    client: "Sentinel Security Labs",
    category: "Performance Marketing",
    industry: "Enterprise Cybersecurity",
    summary: "Multi-touch B2B lead generation pipeline targeting Chief Information Security Officers (CISOs) across Fortune 500 enterprises.",
    challenge: "Long 9-month sales cycles and low conversion rates on expensive B2B ad spend.",
    solution: "Deft Innovations created intent-based content funnels, technical whitepapers, and surgical LinkedIn ABM campaigns connected to an interactive ROI calculator.",
    results: [
      { metric: "$14.2M", label: "Pipeline Value Generated" },
      { metric: "-45%", label: "Sales Cycle Length Reduction" },
      { metric: "64%", label: "Demo Booking Conversion Rate" }
    ],
    servicesProvided: ["Digital Marketing", "Performance Marketing", "Content Strategy", "SEO"],
    technologiesUsed: ["HubSpot CRM", "LinkedIn Campaign Manager", "Google Analytics 4", "Clearbit"],
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1600&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=1200&q=80"
    ],
    year: "2024",
    featured: true
  },
  {
    id: "project-kuro-ev",
    slug: "kuro-automotive-ev",
    title: "Kuro Motors — Next-Gen Electric Mobility Launch Campaign",
    client: "Kuro Mobility Corp",
    category: "Digital Marketing",
    industry: "Automotive & CleanTech",
    summary: "Unveiling a revolutionary high-performance electric vehicle brand through immersive web design and viral digital marketing.",
    challenge: "Launching an independent EV brand competing directly against established automotive giants.",
    solution: "We built a high-impact launch platform with 3D interactive car configurators and ran an exclusive reservation campaign generating massive pre-orders.",
    results: [
      { metric: "18,500+", label: "Pre-Orders Collected" },
      { metric: "24M", label: "Organic Social Impressions" },
      { metric: "8.2%", label: "Landing Page Conversion Rate" }
    ],
    servicesProvided: ["Web Development", "Digital Marketing", "Social Media", "Creative Design"],
    technologiesUsed: ["Three.js", "Next.js", "Tailwind CSS", "Blender 3D", "AWS Lambda"],
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80"
    ],
    year: "2024",
    featured: true
  },
  {
    id: "project-solaris-health",
    slug: "solaris-biotech",
    title: "Solaris BioTech — Rebrand & Enterprise Web Platform",
    client: "Solaris Life Sciences",
    category: "Creative",
    industry: "Biotechnology & Health",
    summary: "Complete strategic rebrand for a publicly traded biotechnology pioneer expanding globally.",
    challenge: "Outdated visual assets and fragmented sub-brand architecture created confusion during corporate acquisitions.",
    solution: "Unification of 4 company divisions under a crisp, cohesive monochrome identity system and unified Next.js web ecosystem.",
    results: [
      { metric: "100%", label: "Brand Alignment Across 4 Subsidiaries" },
      { metric: "+140%", label: "Investor Relations Traffic" }
    ],
    servicesProvided: ["Branding", "Web Development", "Content Strategy"],
    technologiesUsed: ["Next.js", "Tailwind CSS", "TypeScript", "Sanity CMS"],
    imageUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1600&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80"
    ],
    year: "2024",
    featured: false
  },
  {
    id: "project-vanguard-architecture",
    slug: "vanguard-architects",
    title: "Vanguard Studios — Editorial Portfolio & SEO Strategy",
    client: "Vanguard Architectural Group",
    category: "Social Media",
    industry: "Architecture & Design",
    summary: "Editorial digital publication portfolio and organic social strategy for an award-winning architectural firm.",
    challenge: "Lack of online presence led to missed high-net-worth residential and commercial commission opportunities.",
    solution: "Curation of a minimalist visual gallery, architectural photography showcases, and organic social dominance on Instagram and LinkedIn.",
    results: [
      { metric: "4.5M", label: "Annual Architectural Impressions" },
      { metric: "14", label: "Major Global Commercial Contracts Inquired" }
    ],
    servicesProvided: ["Social Media", "SEO", "Creative Design"],
    technologiesUsed: ["Figma", "Next.js", "Instagram Creator Tools", "Google Search Console"],
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
    ],
    year: "2025",
    featured: false
  }
];
