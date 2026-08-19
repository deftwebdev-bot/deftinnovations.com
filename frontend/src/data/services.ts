export interface Service {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  iconName: string;
  deliverables: string[];
  businessBenefits: string[];
  processSteps: string[];
  featuredStats?: { label: string; value: string };
  imageUrl?: string;
}

export const SERVICES_DATA: Service[] = [
  {
    id: "digital-marketing",
    slug: "digital-marketing",
    title: "Digital Marketing Strategy",
    tagline: "Omnichannel strategy focused on measurable business performance and audience conversion.",
    description: "We craft targeted, data-backed digital marketing ecosystems that turn casual traffic into loyal customer relationships. Combining deep consumer psychology with cutting-edge ad tech, our campaigns build sustainable growth channels.",
    category: "Growth & Marketing",
    iconName: "TrendingUp",
    deliverables: [
      "Omnichannel Campaign Architecture",
      "Customer Acquisition Funnels",
      "Audience Segmentation & Persona Engineering",
      "Conversion Rate Optimization (CRO)",
      "Real-time ROI Analytics Dashboards"
    ],
    businessBenefits: [
      "Accelerated pipeline generation and customer acquisition",
      "Lower Cost Per Acquisition (CPA) through refined targeting",
      "Complete visibility into attribution and marketing spend",
      "Scalable campaign frameworks built for long-term growth"
    ],
    processSteps: [
      "Market Analysis & Competitor Audit",
      "Funnel & Attribution Architecture",
      "Creative Production & Campaign Setup",
      "A/B Testing & Rapid Iteration",
      "Scale & Automation Optimization"
    ],
    featuredStats: { label: "Average Client CPA Reduction", value: "38%" }
  },
  {
    id: "branding",
    slug: "branding",
    title: "Brand Identity & Systems",
    tagline: "Strategic brand identities engineered for distinction, authority, and longevity.",
    description: "A compelling brand is your unfair market advantage. We build comprehensive visual and verbal brand systems that resonate deeply with high-value audiences and elevate your industry positioning.",
    category: "Creative & Brand",
    iconName: "Palette",
    deliverables: [
      "Visual Identity Systems & Logomarks",
      "Brand Architecture & Positioning Strategy",
      "Tone of Voice & Messaging Frameworks",
      "Digital & Print Style Guidelines",
      "Custom Typography & Design Tokens"
    ],
    businessBenefits: [
      "Instant premium positioning and competitive differentiation",
      "Increased pricing power and brand perceived value",
      "Consistent cross-channel brand presence",
      "Unified internal brand alignment and pride"
    ],
    processSteps: [
      "Brand Discovery & Market Positioning",
      "Concept Exploration & Art Direction",
      "Identity System Refinement",
      "Brand Guidelines Creation",
      "Asset Rollout & Brand Launch"
    ],
    featuredStats: { label: "Brand Equity Increase", value: "3.4x" }
  },
  {
    id: "web-development",
    slug: "web-development",
    title: "Next-Gen Web Development",
    tagline: "High-performance digital products engineered with modern technology and modern aesthetic precision.",
    description: "Your website is your 24/7 global flagship store. We design and build ultra-fast, accessible, conversion-driven web applications using modern technologies like Next.js, React, and Tailwind CSS.",
    category: "Technology",
    iconName: "Code2",
    deliverables: [
      "Custom Next.js & React Web Applications",
      "Headless CMS Integration (Sanity, Contentful, Strapi)",
      "High-Performance E-Commerce Systems",
      "Interactive UI Micro-animations & 3D WebGL",
      "Full WCAG 2.1 AA Accessibility & Technical SEO"
    ],
    businessBenefits: [
      "Lighthouse 90+ performance scores for maximum Google ranking",
      "Sub-second page load times that maximize conversion rates",
      "Seamless CMS management for internal marketing teams",
      "Future-proof, enterprise-ready web infrastructure"
    ],
    processSteps: [
      "UX Architecture & Wireframing",
      "High-Fidelity Component Design",
      "Next.js & Frontend Engineering",
      "Performance & SEO Optimization",
      "Deployment & Continuous Support"
    ],
    featuredStats: { label: "Average Page Speed", value: "0.4s" }
  },
  {
    id: "performance-marketing",
    slug: "performance-marketing",
    title: "Performance Paid Acquisition",
    tagline: "Precision PPC, Meta, LinkedIn & Search campaigns engineered for immediate ROAS.",
    description: "Stop wasting budget on vanity metrics. We run disciplined, highly targeted paid search and paid social campaigns designed specifically to acquire high-intent buyers with positive ROI.",
    category: "Growth & Marketing",
    iconName: "Target",
    deliverables: [
      "Google Ads (Search, Display, Shopping, Performance Max)",
      "Meta Ads (Instagram & Facebook Paid Funnels)",
      "LinkedIn B2B Account-Based Marketing (ABM)",
      "Programmatic Media Buying & Retargeting",
      "Custom Landing Page Design & CRO"
    ],
    businessBenefits: [
      "Immediate revenue generation and qualified sales leads",
      "Disciplined budget allocation to highest-converting channels",
      "Continuous multivariate creative testing",
      "Transparent multi-touch attribution"
    ],
    processSteps: [
      "Audience & Buying Intent Mapping",
      "Ad Creative & Copy Engineering",
      "Campaign Launch & Bid Strategy",
      "Daily Bid & Creative Optimization",
      "Scaling Winning Ad Sets"
    ],
    featuredStats: { label: "Average Client ROAS", value: "4.2x" }
  },
  {
    id: "seo",
    slug: "seo",
    title: "Technical SEO & Organic Growth",
    tagline: "Dominating search rankings with technical excellence, content strategy, and authority building.",
    description: "Organic search remains the highest-converting long-term customer channel. We combine deep technical SEO audits with high-authority content strategies to secure top-tier organic visibility.",
    category: "Technology",
    iconName: "Search",
    deliverables: [
      "Technical SEO Architecture & Site Speed Optimization",
      "High-Intent Keyword & Topic Cluster Mapping",
      "Content Strategy & Editorial Production",
      "Digital PR & Backlink Authority Acquisition",
      "Schema Markup & Rich Snippet Structuring"
    ],
    businessBenefits: [
      "Predictable, compounding organic lead volume",
      "Reduced reliance on paid ad acquisition",
      "Higher brand authority and domain credibility",
      "Long-term sustainable market dominance"
    ],
    processSteps: [
      "Comprehensive Technical Audit",
      "Keyword & Opportunity Gap Analysis",
      "On-Page & Architecture Refinement",
      "Authority Building & Digital PR",
      "Monthly Traffic & Ranking Performance"
    ],
    featuredStats: { label: "Organic Search Growth", value: "+210%" }
  },
  {
    id: "social-media-marketing",
    slug: "social-media-marketing",
    title: "Social Media Strategy & Content",
    tagline: "Creating viral narratives, community engagement, and brand authority across digital platforms.",
    description: "We turn social channels into active customer engines. From high-production short-form video to editorial design, we create social media content that stops the scroll and builds true brand advocacy.",
    category: "Creative & Brand",
    iconName: "Share2",
    deliverables: [
      "Social Media Brand Strategy & Content Pillars",
      "Short-Form Video Production (Reels, TikTok, Shorts)",
      "Graphic Design & Carousel Content Creation",
      "Community Management & Influencer Partnerships",
      "Analytics & Social Listening Reports"
    ],
    businessBenefits: [
      "Expanded brand reach and modern cultural relevance",
      "Deeper audience engagement and community loyalty",
      "Direct social commerce and inbound inquiry channels",
      "High-converting visual social proof"
    ],
    processSteps: [
      "Channel Strategy & Persona Alignment",
      "Content Calendar & Asset Production",
      "Publishing & Engagement Management",
      "Community Growth Initiatives",
      "Monthly Engagement Insights"
    ],
    featuredStats: { label: "Monthly Audience Impressions", value: "12M+" }
  }
];
