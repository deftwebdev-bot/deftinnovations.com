import React from "react";
import Link from "next/link";
import { DeftLogo } from "@/components/ui/DeftLogo";
import { Mail, Phone, MapPin } from "lucide-react";
import { LinkedinIcon, YoutubeIcon, FacebookIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import { NewsletterForm } from "./NewsletterForm";
import { Service } from "@/lib/api";

const SOCIALS = [
  { icon: LinkedinIcon,  href: "https://www.linkedin.com/company/deftinnovations", label: "LinkedIn" },
  { icon: YoutubeIcon,   href: "https://www.youtube.com/@deftinnovations/",        label: "YouTube" },
  { icon: InstagramIcon, href: "https://www.instagram.com/deftinnovations/",       label: "Instagram" },
  { icon: FacebookIcon,  href: "https://www.facebook.com/deftinnovations",         label: "Facebook" },
];

const COMPANY_LINKS = [
  { name: "About Agency", href: "/about" },
  { name: "Our Team & Life", href: "/our-team" },
  { name: "Our Services", href: "/services" },
  { name: "Our Clients", href: "/clients" },
  { name: "Case Studies", href: "/portfolio" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Editorial Journal", href: "/blog" },
  { name: "Careers & Hiring", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

/** Static fallback if the API is unreachable — real slugs, real detail pages. */
const FALLBACK_SERVICES: Service[] = [
  { id: "website-development", slug: "website-development", title: "Website Development" },
  { id: "digital-marketing-strategy", slug: "digital-marketing-strategy", title: "Digital Marketing Strategy" },
  { id: "google-ads", slug: "google-ads", title: "Google Ads" },
  { id: "technical-seo-organic-growth", slug: "technical-seo-organic-growth", title: "SEO & Organic Growth" },
  { id: "brand-identity-systems", slug: "brand-identity-systems", title: "Brand Identity Systems" },
  { id: "video-production", slug: "video-production", title: "Video Production" },
] as Service[];

const SERVICES_API_URL = `${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"}/api/v1/services/`;

async function getFooterServices(): Promise<Service[]> {
  try {
    const res = await fetch(SERVICES_API_URL, {
      next: { revalidate: 300, tags: ["services"] },
    });
    if (!res.ok) return FALLBACK_SERVICES;
    const all: Service[] = await res.json();
    const featured = all.filter((s) => s.featured);
    return (featured.length > 0 ? featured : all).slice(0, 6);
  } catch {
    return FALLBACK_SERVICES;
  }
}

export const Footer = async () => {
  const services = await getFooterServices();

  return (
    <footer className="bg-[#060606] border-t border-white/[0.06] pt-20 pb-10">
      <div className="container-xl space-y-16">

        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Brand col */}
          <div className="lg:col-span-4 space-y-6">
            <DeftLogo size="lg" />
            <p className="text-sm text-white/45 leading-relaxed max-w-xs font-light">
              A creative technology and marketing agency engineering market-defining digital platforms and performance campaigns for ambitious enterprises.
            </p>
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Company col */}
          <div className="lg:col-span-2 space-y-5">
            <h3 className="text-label text-white/30">Company</h3>
            <ul className="space-y-3">
              {COMPANY_LINKS.map(({ name, href }) => (
                <li key={name}>
                  <Link
                    href={href}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services col — dynamic, links to each service's detail page */}
          <div className="lg:col-span-2 space-y-5">
            <h3 className="text-label text-white/30">Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact col */}
          <div className="lg:col-span-4 space-y-5">
            <h3 className="text-label text-white/30">Get in Touch</h3>
            <div className="space-y-3">
              <a href="mailto:sales@deftinnovations.in" className="flex items-center gap-2.5 text-sm text-white/50 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-white/30" /> sales@deftinnovations.in
              </a>
              <a href="mailto:hr@deftinnovations.in" className="flex items-center gap-2.5 text-sm text-white/50 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-white/30" /> hr@deftinnovations.in
              </a>
              <a href="tel:+919496464650" className="flex items-center gap-2.5 text-sm text-white/50 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-white/30" /> +91 9496 464 650
              </a>
              <a href="tel:+918330081350" className="flex items-center gap-2.5 text-sm text-white/50 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-white/30" /> +91 8330 081 350
              </a>
            </div>
            <div className="space-y-2 pt-2 border-t border-white/[0.06]">
              <div className="flex items-start gap-2.5 text-xs text-white/35 font-light">
                <MapPin className="w-3.5 h-3.5 mt-0.5 text-white/25" />
                <span>HiLITE Business Park, NH 66, Thondayad, Kozhikode, Kerala 673014</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-white/35 font-light">
                <MapPin className="w-3.5 h-3.5 mt-0.5 text-white/25" />
                <span>Chandakunnu, Nilambur, Kerala 679329</span>
              </div>
            </div>
            <NewsletterForm />
          </div>
        </div>

        <hr className="hr" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/25 font-mono">
          <p>© {new Date().getFullYear()} Deft Innovations Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white/50 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white/50 transition-colors">Terms</Link>
            <Link href="/sitemap.xml" className="hover:text-white/50 transition-colors">Sitemap</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
