import os
import sys
import django

# Setup Django environment
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from apps.blog.models import Article
from apps.portfolio.models import Project
from apps.services.models import Service
from apps.company.models import HeroContent, TrustedBrand, TeamMember, Testimonial, TrustStat
from apps.careers.models import JobPosition

def seed_database():
    print("🌱 Starting database seeding for Deft Innovations...")

    # 1. Seed Articles
    articles_data = [
        {
            "slug": "why-monochrome-design-converts-better",
            "title": "The Psychology of High-Contrast Monochrome UI: Why Simplicity Commands Premium Authority",
            "excerpt": "In a digital landscape cluttered with bright gradients and sensory overload, ultra-clean monochrome design cuts through noise and elevates brand value.",
            "category": "Branding",
            "author_name": "Marcus Vance",
            "author_role": "Head of Creative Direction",
            "author_avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
            "published_at": "August 10, 2025",
            "read_time": "6 min read",
            "image_url": "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1200&q=80",
            "featured": True,
            "tags": ["UI/UX Design", "Brand Identity", "Design Psychology", "Monochrome Aesthetics"],
            "content": """When visitors land on your website, they form an impression of your brand within 50 milliseconds. Traditional agency websites often lean heavily on vibrant rainbow gradients, floating 3D glass cards, and continuous motion. However, modern research shows that visual clutter increases cognitive load and degrades user trust.

### 1. High Contrast Signals Uncompromising Clarity
Monochrome design forces your content, messaging, and typography to take center stage. When you strip away decorative fluff, what remains is pure strategic substance.
High-contrast black-and-white palettes radiate confidence. Think of luxury houses like Leica, Chanel, or Apple — their restraint is their power.

### 2. Speed and Focus Enhance Conversion
A minimalist design built on clean layout grids loads significantly faster. By reducing heavy asset dependencies and unnecessary animation scripts:
- Page load times drop below 0.5 seconds.
- User friction drops.
- Conversion rates naturally increase.

### 3. The Power of Intentional Micro-interactions
Removing visual noise doesn't mean creating a static or boring experience. Subtle micro-interactions — smooth hover reveals, precise button states, and crisp typography transitions — communicate meticulous engineering and craftsmanship.

At **Deft Innovations**, we apply this high-contrast philosophy across all client touchpoints to ensure your message stands out clearly in competitive markets."""
        },
        {
            "slug": "nextjs-15-performance-guide-for-agencies",
            "title": "Engineering Sub-Second Web Platforms: How Next.js App Router Drives Enterprise Conversion",
            "excerpt": "A deep dive into server-side rendering, streaming SSR, image optimization, and technical SEO architecture that achieve 99/100 Lighthouse scores.",
            "category": "Web Development",
            "author_name": "Sophia Lin",
            "author_role": "Lead Systems Architect",
            "author_avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
            "published_at": "July 28, 2025",
            "read_time": "8 min read",
            "image_url": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
            "featured": False,
            "tags": ["Next.js", "Web Performance", "Technical SEO", "React"],
            "content": """Website speed is no longer just a technical metric — it is your most impactful conversion lever. Google's Core Web Vitals directly dictate search rankings, while a 100ms delay in load time can lower conversion rates by up to 7%.

### Modern Web Architecture
Building with Next.js App Router enables server-first execution:
1. **Server Components (RSC)**: Zero JavaScript sent to the browser for static layouts and copy blocks.
2. **Edge Caching**: Instant content delivery worldwide via Vercel Edge CDN.
3. **Optimized Asset Pipeline**: Automatic WebP and AVIF image generation with zero layout shift (CLS = 0).

When building for enterprise brands, performance cannot be an afterthought — it must be built into the foundational architecture."""
        },
        {
            "slug": "data-driven-performance-marketing-2025",
            "title": "Beyond Vanity Metrics: Constructing High-ROAS Omnichannel Paid Media Pipelines",
            "excerpt": "Why relying strictly on platform attribution is failing B2B and D2C brands, and how first-party tracking restores true ROAS clarity.",
            "category": "Digital Marketing",
            "author_name": "David Chen",
            "author_role": "VP of Growth & Media Strategy",
            "author_avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
            "published_at": "July 14, 2025",
            "read_time": "7 min read",
            "image_url": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
            "featured": False,
            "tags": ["Performance Marketing", "PPC", "Attribution", "ROAS Optimization"],
            "content": """Privacy changes, cookie deprecation, and AI ad bidding have permanently altered digital acquisition. To succeed today, agencies must look beyond default platform dashboards and build robust first-party analytics pipelines.

### The 3 Pillars of Modern Media Buying
- **Creative Diversification**: Testing 10+ visual angles weekly to overcome ad fatigue.
- **Conversion API (CAPI) Integration**: Direct server-to-server event reporting for accurate conversion tracking.
- **LTV-Based Bidding**: Aligning ad spend with long-term customer lifetime value rather than single order value."""
        },
        {
            "slug": "b2b-seo-top-rankings-guide",
            "title": "The Technical SEO Blueprint for Dominating High-Intent B2B Keywords",
            "excerpt": "How structured data, topic clusters, and site speed optimization combine to capture decision-makers searching for enterprise solutions.",
            "category": "SEO",
            "author_name": "Sophia Lin",
            "author_role": "Lead Systems Architect",
            "author_avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
            "published_at": "June 30, 2025",
            "read_time": "5 min read",
            "image_url": "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=1200&q=80",
            "featured": False,
            "tags": ["SEO", "Content Marketing", "B2B Strategy"],
            "content": """Organic search dominance is built on technical foundations, topical authority, and high-value content. In B2B markets where single contract values exceed six figures, ranking #1 for commercial intent terms generates non-stop qualified pipeline."""
        }
    ]

    for item in articles_data:
        Article.objects.update_or_create(slug=item['slug'], defaults=item)
    print(f"✅ Loaded {len(articles_data)} Articles")

    # 2. Seed Projects
    projects_data = [
        {
            "slug": "nexus-fintech",
            "title": "Nexus Digital Wealth — Brand & Next.js App Architecture",
            "client": "Nexus Global Capital",
            "category": "Web Development",
            "industry": "Fintech & Private Wealth",
            "summary": "Complete digital transformation for a premier institutional asset manager, replacing a legacy corporate website with a sub-second Next.js web application.",
            "challenge": "Nexus had an outdated legacy platform that failed to communicate authority to institutional investors, suffering from slow load speeds (4.2s) and low digital lead conversion.",
            "solution": "Deft Innovations built an ultra-minimalist, high-performance web experience leveraging Next.js App Router, custom financial interactive tools, and an authoritative monochrome brand language.",
            "results": [
                {"metric": "0.35s", "label": "Page Load Time"},
                {"metric": "+320%", "label": "Qualified Lead Volume"},
                {"metric": "99/100", "label": "Lighthouse Performance Score"}
            ],
            "services_provided": ["Web Development", "Branding", "Technical SEO", "UI/UX Design"],
            "technologies_used": ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel Enterprise"],
            "image_url": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
            "gallery_images": [
                "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80"
            ],
            "year": "2025",
            "featured": True,
            "order": 1
        },
        {
            "slug": "aura-luxury-eyewear",
            "title": "Aura Atelier — Global E-Commerce & Performance Acquisition",
            "client": "Aura Luxury Group",
            "category": "Branding",
            "industry": "Luxury Fashion & Retail",
            "summary": "Rebranding and global omnichannel performance campaign that positioned Aura as the leading sustainable luxury optical atelier.",
            "challenge": "Aura was struggling to stand out in a crowded direct-to-consumer eyewear market dominated by legacy brands with massive ad budgets.",
            "solution": "We engineered an editorial visual identity and launched hyper-targeted Meta and Google ad campaigns showcasing craftsmanship through high-contrast monochrome cinematography.",
            "results": [
                {"metric": "4.8x", "label": "Blended Campaign ROAS"},
                {"metric": "+185%", "label": "Year-over-Year Revenue"},
                {"metric": "42k", "label": "New Active Subscribers"}
            ],
            "services_provided": ["Branding", "Performance Marketing", "Social Media", "Creative Direction"],
            "technologies_used": ["Meta Ads Manager", "Shopify Plus", "Klaviyo", "Google Performance Max"],
            "image_url": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80",
            "gallery_images": [
                "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=80"
            ],
            "year": "2025",
            "featured": True,
            "order": 2
        },
        {
            "slug": "sentinel-cybersecurity",
            "title": "Sentinel One AI — B2B Account-Based Performance Marketing",
            "client": "Sentinel Security Labs",
            "category": "Performance Marketing",
            "industry": "Enterprise Cybersecurity",
            "summary": "Multi-touch B2B lead generation pipeline targeting Chief Information Security Officers (CISOs) across Fortune 500 enterprises.",
            "challenge": "Long 9-month sales cycles and low conversion rates on expensive B2B ad spend.",
            "solution": "Deft Innovations created intent-based content funnels, technical whitepapers, and surgical LinkedIn ABM campaigns connected to an interactive ROI calculator.",
            "results": [
                {"metric": "$14.2M", "label": "Pipeline Value Generated"},
                {"metric": "-45%", "label": "Sales Cycle Length Reduction"},
                {"metric": "64%", "label": "Demo Booking Conversion Rate"}
            ],
            "services_provided": ["Digital Marketing", "Performance Marketing", "Content Strategy", "SEO"],
            "technologies_used": ["HubSpot CRM", "LinkedIn Campaign Manager", "Google Analytics 4", "Clearbit"],
            "image_url": "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1600&q=80",
            "gallery_images": [
                "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=1200&q=80"
            ],
            "year": "2024",
            "featured": True,
            "order": 3
        },
        {
            "slug": "kuro-automotive-ev",
            "title": "Kuro Motors — Next-Gen Electric Mobility Launch Campaign",
            "client": "Kuro Mobility Corp",
            "category": "Digital Marketing",
            "industry": "Automotive & CleanTech",
            "summary": "Unveiling a revolutionary high-performance electric vehicle brand through immersive web design and viral digital marketing.",
            "challenge": "Launching an independent EV brand competing directly against established automotive giants.",
            "solution": "We built a high-impact launch platform with 3D interactive car configurators and ran an exclusive reservation campaign generating massive pre-orders.",
            "results": [
                {"metric": "18,500+", "label": "Pre-Orders Collected"},
                {"metric": "24M", "label": "Organic Social Impressions"},
                {"metric": "8.2%", "label": "Landing Page Conversion Rate"}
            ],
            "services_provided": ["Web Development", "Digital Marketing", "Social Media", "Creative Design"],
            "technologies_used": ["Three.js", "Next.js", "Tailwind CSS", "Blender 3D", "AWS Lambda"],
            "image_url": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80",
            "gallery_images": [
                "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80"
            ],
            "year": "2024",
            "featured": True,
            "order": 4
        },
        {
            "slug": "solaris-biotech",
            "title": "Solaris BioTech — Rebrand & Enterprise Web Platform",
            "client": "Solaris Life Sciences",
            "category": "Creative",
            "industry": "Biotechnology & Health",
            "summary": "Complete strategic rebrand for a publicly traded biotechnology pioneer expanding globally.",
            "challenge": "Outdated visual assets and fragmented sub-brand architecture created confusion during corporate acquisitions.",
            "solution": "Unification of 4 company divisions under a crisp, cohesive monochrome identity system and unified Next.js web ecosystem.",
            "results": [
                {"metric": "100%", "label": "Brand Alignment Across 4 Subsidiaries"},
                {"metric": "+140%", "label": "Investor Relations Traffic"}
            ],
            "services_provided": ["Branding", "Web Development", "Content Strategy"],
            "technologies_used": ["Next.js", "Tailwind CSS", "TypeScript", "Sanity CMS"],
            "image_url": "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1600&q=80",
            "gallery_images": [
                "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80"
            ],
            "year": "2024",
            "featured": False,
            "order": 5
        },
        {
            "slug": "vanguard-architects",
            "title": "Vanguard Studios — Editorial Portfolio & SEO Strategy",
            "client": "Vanguard Architectural Group",
            "category": "Social Media",
            "industry": "Architecture & Design",
            "summary": "Editorial digital publication portfolio and organic social strategy for an award-winning architectural firm.",
            "challenge": "Lack of online presence led to missed high-net-worth residential and commercial commission opportunities.",
            "solution": "Curation of a minimalist visual gallery, architectural photography showcases, and organic social dominance on Instagram and LinkedIn.",
            "results": [
                {"metric": "4.5M", "label": "Annual Architectural Impressions"},
                {"metric": "14", "label": "Major Global Commercial Contracts Inquired"}
            ],
            "services_provided": ["Social Media", "SEO", "Creative Design"],
            "technologies_used": ["Figma", "Next.js", "Instagram Creator Tools", "Google Search Console"],
            "image_url": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
            "gallery_images": [
                "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
            ],
            "year": "2025",
            "featured": False,
            "order": 6
        }
    ]

    for item in projects_data:
        Project.objects.update_or_create(slug=item['slug'], defaults=item)
    print(f"✅ Loaded {len(projects_data)} Projects")

    # 3. Seed Services
    services_data = [
        {
            "slug": "digital-marketing",
            "title": "Digital Marketing Strategy",
            "tagline": "Omnichannel strategy focused on measurable business performance and audience conversion.",
            "description": "We craft targeted, data-backed digital marketing ecosystems that turn casual traffic into loyal customer relationships. Combining deep consumer psychology with cutting-edge ad tech, our campaigns build sustainable growth channels.",
            "category": "Growth & Marketing",
            "icon_name": "TrendingUp",
            "deliverables": [
                "Omnichannel Campaign Architecture",
                "Customer Acquisition Funnels",
                "Audience Segmentation & Persona Engineering",
                "Conversion Rate Optimization (CRO)",
                "Real-time ROI Analytics Dashboards"
            ],
            "business_benefits": [
                "Accelerated pipeline generation and customer acquisition",
                "Lower Cost Per Acquisition (CPA) through refined targeting",
                "Complete visibility into attribution and marketing spend",
                "Scalable campaign frameworks built for long-term growth"
            ],
            "process_steps": [
                "Market Analysis & Competitor Audit",
                "Funnel & Attribution Architecture",
                "Creative Production & Campaign Setup",
                "A/B Testing & Rapid Iteration",
                "Scale & Automation Optimization"
            ],
            "featured_stats": {"label": "Average Client CPA Reduction", "value": "38%"},
            "order": 1
        },
        {
            "slug": "branding",
            "title": "Brand Identity & Systems",
            "tagline": "Strategic brand identities engineered for distinction, authority, and longevity.",
            "description": "A compelling brand is your unfair market advantage. We build comprehensive visual and verbal brand systems that resonate deeply with high-value audiences and elevate your industry positioning.",
            "category": "Creative & Brand",
            "icon_name": "Palette",
            "deliverables": [
                "Visual Identity Systems & Logomarks",
                "Brand Architecture & Positioning Strategy",
                "Tone of Voice & Messaging Frameworks",
                "Digital & Print Style Guidelines",
                "Custom Typography & Design Tokens"
            ],
            "business_benefits": [
                "Instant premium positioning and competitive differentiation",
                "Increased pricing power and brand perceived value",
                "Consistent cross-channel brand presence",
                "Unified internal brand alignment and pride"
            ],
            "process_steps": [
                "Brand Discovery & Market Positioning",
                "Concept Exploration & Art Direction",
                "Identity System Refinement",
                "Brand Guidelines Creation",
                "Asset Rollout & Brand Launch"
            ],
            "featured_stats": {"label": "Brand Equity Increase", "value": "3.4x"},
            "order": 2
        },
        {
            "slug": "web-development",
            "title": "Next-Gen Web Development",
            "tagline": "High-performance digital products engineered with modern technology and modern aesthetic precision.",
            "description": "Your website is your 24/7 global flagship store. We design and build ultra-fast, accessible, conversion-driven web applications using modern technologies like Next.js, React, and Tailwind CSS.",
            "category": "Technology",
            "icon_name": "Code2",
            "deliverables": [
                "Custom Next.js & React Web Applications",
                "Headless CMS Integration (Sanity, Contentful, Strapi)",
                "High-Performance E-Commerce Systems",
                "Interactive UI Micro-animations & 3D WebGL",
                "Full WCAG 2.1 AA Accessibility & Technical SEO"
            ],
            "business_benefits": [
                "Lighthouse 90+ performance scores for maximum Google ranking",
                "Sub-second page load times that maximize conversion rates",
                "Seamless CMS management for internal marketing teams",
                "Future-proof, enterprise-ready web infrastructure"
            ],
            "process_steps": [
                "UX Architecture & Wireframing",
                "High-Fidelity Component Design",
                "Next.js & Frontend Engineering",
                "Performance & SEO Optimization",
                "Deployment & Continuous Support"
            ],
            "featured_stats": {"label": "Average Page Speed", "value": "0.4s"},
            "order": 3
        },
        {
            "slug": "performance-marketing",
            "title": "Performance Paid Acquisition",
            "tagline": "Precision PPC, Meta, LinkedIn & Search campaigns engineered for immediate ROAS.",
            "description": "Stop wasting budget on vanity metrics. We run disciplined, highly targeted paid search and paid social campaigns designed specifically to acquire high-intent buyers with positive ROI.",
            "category": "Growth & Marketing",
            "icon_name": "Target",
            "deliverables": [
                "Google Ads (Search, Display, Shopping, Performance Max)",
                "Meta Ads (Instagram & Facebook Paid Funnels)",
                "LinkedIn B2B Account-Based Marketing (ABM)",
                "Programmatic Media Buying & Retargeting",
                "Custom Landing Page Design & CRO"
            ],
            "business_benefits": [
                "Immediate revenue generation and qualified sales leads",
                "Disciplined budget allocation to highest-converting channels",
                "Continuous multivariate creative testing",
                "Transparent multi-touch attribution"
            ],
            "process_steps": [
                "Audience & Buying Intent Mapping",
                "Ad Creative & Copy Engineering",
                "Campaign Launch & Bid Strategy",
                "Daily Bid & Creative Optimization",
                "Scaling Winning Ad Sets"
            ],
            "featured_stats": {"label": "Average Client ROAS", "value": "4.2x"},
            "order": 4
        },
        {
            "slug": "seo",
            "title": "Technical SEO & Organic Growth",
            "tagline": "Dominating search rankings with technical excellence, content strategy, and authority building.",
            "description": "Organic search remains the highest-converting long-term customer channel. We combine deep technical SEO audits with high-authority content strategies to secure top-tier organic visibility.",
            "category": "Technology",
            "icon_name": "Search",
            "deliverables": [
                "Technical SEO Architecture & Site Speed Optimization",
                "High-Intent Keyword & Topic Cluster Mapping",
                "Content Strategy & Editorial Production",
                "Digital PR & Backlink Authority Acquisition",
                "Schema Markup & Rich Snippet Structuring"
            ],
            "business_benefits": [
                "Predictable, compounding organic lead volume",
                "Reduced reliance on paid ad acquisition",
                "Higher brand authority and domain credibility",
                "Long-term sustainable market dominance"
            ],
            "process_steps": [
                "Comprehensive Technical Audit",
                "Keyword & Opportunity Gap Analysis",
                "On-Page & Architecture Refinement",
                "Authority Building & Digital PR",
                "Monthly Traffic & Ranking Performance"
            ],
            "featured_stats": {"label": "Organic Search Growth", "value": "+210%"},
            "order": 5
        },
        {
            "slug": "social-media-marketing",
            "title": "Social Media Strategy & Content",
            "tagline": "Creating viral narratives, community engagement, and brand authority across digital platforms.",
            "description": "We turn social channels into active customer engines. From high-production short-form video to editorial design, we create social media content that stops the scroll and builds true brand advocacy.",
            "category": "Creative & Brand",
            "icon_name": "Share2",
            "deliverables": [
                "Social Media Brand Strategy & Content Pillars",
                "Short-Form Video Production (Reels, TikTok, Shorts)",
                "Graphic Design & Carousel Content Creation",
                "Community Management & Influencer Partnerships",
                "Analytics & Social Listening Reports"
            ],
            "business_benefits": [
                "Expanded brand reach and modern cultural relevance",
                "Deeper audience engagement and community loyalty",
                "Direct social commerce and inbound inquiry channels",
                "High-converting visual social proof"
            ],
            "process_steps": [
                "Channel Strategy & Persona Alignment",
                "Content Calendar & Asset Production",
                "Publishing & Engagement Management",
                "Community Growth Initiatives",
                "Monthly Engagement Insights"
            ],
            "featured_stats": {"label": "Monthly Audience Impressions", "value": "12M+"},
            "order": 6
        }
    ]

    for item in services_data:
        Service.objects.update_or_create(slug=item['slug'], defaults=item)
    print(f"✅ Loaded {len(services_data)} Services")

    # 4. Seed Team Members
    team_data = [
        {
            "name": "Marcus Vance",
            "role": "Founder & Creative Director",
            "bio": "Pioneering high-impact brand systems and strategic digital experiences for fast-growing global enterprises with over 12 years of agency leadership.",
            "image_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
            "socials": {"linkedin": "https://linkedin.com", "twitter": "https://twitter.com"},
            "order": 1
        },
        {
            "name": "Sophia Lin",
            "role": "Partner & Head of Technology",
            "bio": "Specializing in Next.js web applications, high-throughput cloud infrastructure, and technical performance optimization that drives Lighthouse 95+ metrics.",
            "image_url": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
            "socials": {"linkedin": "https://linkedin.com", "github": "https://github.com"},
            "order": 2
        },
        {
            "name": "David Chen",
            "role": "VP of Performance Marketing",
            "bio": "Architecting omnichannel paid acquisition funnels and multi-touch attribution models that have managed over $25M in profitable ad spend.",
            "image_url": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
            "socials": {"linkedin": "https://linkedin.com", "twitter": "https://twitter.com"},
            "order": 3
        },
        {
            "name": "Elena Rostova",
            "role": "Principal Brand Strategist",
            "bio": "Crafting authoritative brand messaging, visual design tokens, and luxury positioning for technology and consumer brands.",
            "image_url": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
            "socials": {"linkedin": "https://linkedin.com", "twitter": "https://twitter.com"},
            "order": 4
        }
    ]

    for item in team_data:
        TeamMember.objects.update_or_create(name=item['name'], defaults=item)
    print(f"✅ Loaded {len(team_data)} Team Members")

    # 5. Seed Testimonials
    testimonials_data = [
        {
            "quote": "Deft Innovations transformed our institutional web presence completely. Their monochrome visual direction and sub-second Next.js architecture resulted in a 320% increase in qualified investor inquiries within 90 days of launch.",
            "author": "Alexander Wright",
            "role": "Managing Partner",
            "company": "Nexus Global Capital",
            "logo_text": "NEXUS",
            "metric": "+320%",
            "metric_label": "Lead Conversion Growth",
            "order": 1
        },
        {
            "quote": "Working with Deft Innovations feels like having an elite in-house creative and engineering team. Their disciplined performance ad strategy delivered a 4.8x ROAS while elevating our luxury brand positioning.",
            "author": "Claire Sterling",
            "role": "Chief Marketing Officer",
            "company": "Aura Luxury Group",
            "logo_text": "AURA ATELIER",
            "metric": "4.8x",
            "metric_label": "Paid Campaign ROAS",
            "order": 2
        },
        {
            "quote": "They don't just build websites; they build high-converting growth engines. The level of speed, polish, and strategic clarity Deft brought to our B2B cybersecurity launch was outstanding.",
            "author": "Vikram Malhotra",
            "role": "VP of Enterprise Marketing",
            "company": "Sentinel Security Labs",
            "logo_text": "SENTINEL",
            "metric": "-45%",
            "metric_label": "Sales Cycle Shortened",
            "order": 3
        }
    ]

    for item in testimonials_data:
        Testimonial.objects.update_or_create(author=item['author'], defaults=item)
    print(f"✅ Loaded {len(testimonials_data)} Testimonials")

    # 6. Seed Trust Stats
    trust_stats = [
        {"value": "150+", "label": "Projects Delivered Globally", "order": 1},
        {"value": "$45M+", "label": "Client Revenue Generated", "order": 2},
        {"value": "98.4%", "label": "Client Retention Rate", "order": 3},
        {"value": "0.4s", "label": "Average Page Speed", "order": 4}
    ]

    for item in trust_stats:
        TrustStat.objects.update_or_create(label=item['label'], defaults=item)
    print(f"✅ Loaded {len(trust_stats)} Trust Stats")

    # 7. Seed Hero Content
    hero_data = {
        "badge_text": "Creative Technology & Marketing Agency — Est. 2020",
        "headline_primary": "Building Brands That Move",
        "headline_secondary": "Businesses Forward.",
        "subheadline": "Strategy, creativity, technology & performance marketing — unified into one growth engine for ambitious businesses.",
        "primary_cta_text": "Start a Project",
        "primary_cta_link": "/contact",
        "secondary_cta_text": "View Work",
        "secondary_cta_link": "/portfolio",
        "hero_image_url": "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=2000&q=90",
        "is_active": True
    }
    HeroContent.objects.update_or_create(id=1, defaults=hero_data)
    print("✅ Loaded Hero Banner Content")

    # 8. Seed Trusted Brands
    brands_data = [
        {"name": "NEXUS GLOBAL CAPITAL", "order": 1},
        {"name": "AURA ATELIER", "order": 2},
        {"name": "SENTINEL LABS", "order": 3},
        {"name": "KURO MOTORS", "order": 4},
        {"name": "SOLARIS BIOTECH", "order": 5},
        {"name": "VANGUARD ARCHITECTS", "order": 6},
        {"name": "QUANTUM VENTURES", "order": 7},
        {"name": "ATLAS CREATIVE CO.", "order": 8},
        {"name": "MERIDIAN HEALTH", "order": 9},
        {"name": "PRISM DIGITAL", "order": 10},
    ]
    for b in brands_data:
        TrustedBrand.objects.update_or_create(name=b['name'], defaults={"order": b['order'], "is_active": True})
    print(f"✅ Loaded {len(brands_data)} Trusted Brands")

    # 9. Seed Job Positions
    jobs_data = [
        {
            "slug": "senior-full-stack-engineer",
            "title": "Senior Full-Stack Engineer",
            "department": "Engineering",
            "location": "Remote (Global) / Dubai, UAE",
            "job_type": "Full-time",
            "experience_level": "Senior (4+ yrs)",
            "salary_range": "$95,000 — $135,000 / yr + Equity",
            "overview": "Lead the engineering of high-traffic, sub-second web platforms, enterprise SaaS portals, and interactive headless digital experiences for global clientele using Next.js, React 19, TypeScript, and Python Django.",
            "responsibilities": [
                "Architect and ship production Next.js App Router applications with sub-second Core Web Vitals.",
                "Build type-safe, resilient REST and GraphQL APIs with Django Ninja and PostgreSQL.",
                "Collaborate directly with our design and growth teams to implement fluid micro-interactions and Framer Motion experiences.",
                "Optimize technical performance, edge caching (ISR), CDN routing, and CI/CD deployment pipelines.",
                "Mentor junior and mid-level developers and conduct rigorous code reviews."
            ],
            "requirements": [
                "4+ years of professional full-stack development experience with React, Next.js, and TypeScript.",
                "Deep proficiency in Python (Django / FastAPI) and relational databases (PostgreSQL).",
                "Strong mastery of modern CSS, Tailwind CSS, animation libraries (Framer Motion), and responsive layouts.",
                "Experience with cloud infrastructure (Vercel, AWS, Docker, Coolify/Dokku).",
                "Obsession with performance benchmarks, clean code craftsmanship, and WCAG accessibility."
            ],
            "perks": [
                "100% remote-first flexibility with global co-working stipends.",
                "Annual learning & conference budget ($2,500/year).",
                "Top-tier Apple hardware (MacBook Pro M3 Max + 4K display).",
                "Comprehensive health & wellness coverage.",
                "Generous paid time off (28 days + local holidays)."
            ],
            "featured": True,
            "is_active": True,
            "order": 1
        },
        {
            "slug": "lead-brand-product-designer",
            "title": "Lead Brand & Product Designer",
            "department": "Design & Creative",
            "location": "Remote / London, UK / Dubai, UAE",
            "job_type": "Full-time",
            "experience_level": "Lead / Principal (5+ yrs)",
            "salary_range": "$90,000 — $125,000 / yr",
            "overview": "Define the visual soul, brand identity systems, and high-contrast digital interfaces for market-leading enterprise and fintech clients.",
            "responsibilities": [
                "Craft comprehensive visual identity systems, typography tokens, logomarks, and brand guidelines.",
                "Design world-class web and product experiences in Figma with meticulous attention to grid structures and micro-interactions.",
                "Work closely with our engineering team to ensure pixel-perfect, design-to-code execution.",
                "Lead client design presentations, brand discovery workshops, and design critique sessions.",
                "Push the boundaries of modern monochrome and high-contrast luxury digital aesthetics."
            ],
            "requirements": [
                "5+ years of senior design leadership experience in premier design studios or digital product agencies.",
                "Outstanding portfolio demonstrating mastery of brand systems, modern web UI/UX, and typography.",
                "Expert-level command of Figma, design systems, vector illustration, and prototyping.",
                "Strong understanding of frontend technical constraints (HTML, CSS, flexbox/grid, motion curves).",
                "Articulate communication skills with ability to pitch and defend design rationale to C-suite executives."
            ],
            "perks": [
                "Remote-first work culture with flexible working hours across timezones.",
                "Annual hardware & ergonomic home office stipend ($2,000).",
                "Health, dental, and wellness package.",
                "Paid team retreats in global destinations (Dubai, Lisbon, Tokyo).",
                "Generous profit-sharing and performance bonuses."
            ],
            "featured": True,
            "is_active": True,
            "order": 2
        },
        {
            "slug": "performance-marketing-strategist",
            "title": "Senior Performance Marketing Strategist",
            "department": "Performance Marketing",
            "location": "Remote / Austin, TX / London, UK",
            "job_type": "Full-time",
            "experience_level": "Senior (3+ yrs)",
            "salary_range": "$80,000 — $115,000 / yr + Performance Bonus",
            "overview": "Architect omnichannel paid acquisition pipelines, first-party attribution tracking, and high-ROAS ad campaigns across Meta, Google Search, LinkedIn ABM, and programmatic channels.",
            "responsibilities": [
                "Manage and scale 6-figure monthly client ad budgets across Google Ads, Meta Ads, and LinkedIn Campaign Manager.",
                "Design conversion rate optimization (CRO) hypotheses and landing page multivariate tests.",
                "Build automated analytics reporting pipelines connecting server-side Conversion APIs (CAPI) with CRM data.",
                "Analyze full-funnel attribution, customer lifetime value (LTV), and ROAS metrics to optimize spend allocation.",
                "Partner with creative designers to brief high-converting static and short-form video ad assets."
            ],
            "requirements": [
                "3+ years managing substantial paid media spend ($100k+/month) with proven track record of profitable ROAS.",
                "Deep analytical mindset with expertise in GA4, Looker Studio, Triple Whale, and server-side tracking.",
                "Strong copywriting and visual messaging sense for direct-response advertising.",
                "Experience in both B2B lead generation (ABM) and premium D2C / E-commerce growth.",
                "High proficiency with rapid multivariate ad testing frameworks."
            ],
            "perks": [
                "Competitive base salary + quarterly profit-share based on portfolio ROAS.",
                "Full remote equipment and co-working allowance.",
                "Comprehensive health & dental coverage.",
                "Unlimited paid vacation policy.",
                "Dedicated budget for ad tech certifications and industry summits."
            ],
            "featured": False,
            "is_active": True,
            "order": 3
        },
        {
            "slug": "technical-seo-content-lead",
            "title": "Technical SEO & Topical Authority Lead",
            "department": "SEO & Content",
            "location": "Remote (Global)",
            "job_type": "Full-time",
            "experience_level": "Senior (3+ yrs)",
            "salary_range": "$75,000 — $105,000 / yr",
            "overview": "Spearhead technical SEO architecture, semantic topic clusters, and content marketing strategies that secure top-tier organic visibility for high-intent commercial keywords.",
            "responsibilities": [
                "Perform in-depth technical SEO audits covering Core Web Vitals, crawl budgets, schema markup, and JavaScript rendering.",
                "Build topical authority maps, keyword cluster frameworks, and content briefs for enterprise clients.",
                "Oversee digital PR and high-authority editorial backlink acquisition campaigns.",
                "Monitor algorithmic updates, indexation issues, and international search engine visibility.",
                "Produce actionable monthly search ranking and organic pipeline revenue reports."
            ],
            "requirements": [
                "3+ years of enterprise technical SEO experience.",
                "Expert mastery of SEO tools: Ahrefs, SEMrush, Screaming Frog, Google Search Console, and schema generators.",
                "Working knowledge of HTML, structured JSON-LD data, Next.js metadata API, and web performance metrics.",
                "Proven track record of growing organic search traffic by 200%+ for B2B or SaaS brands.",
                "Exceptional analytical and technical writing skills."
            ],
            "perks": [
                "Work from anywhere in the world.",
                "Access to enterprise-tier SEO and data tools.",
                "Flexible schedule with asynchronous communication.",
                "Full health insurance and wellness stipends.",
                "Annual company off-sites."
            ],
            "featured": False,
            "is_active": True,
            "order": 4
        }
    ]

    for j in jobs_data:
        JobPosition.objects.update_or_create(slug=j['slug'], defaults=j)
    print(f"✅ Loaded {len(jobs_data)} Job Positions")

    print("\n🚀 Database seeding completed successfully!")

if __name__ == '__main__':
    seed_database()
