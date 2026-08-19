"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DeftLogo } from "@/components/ui/DeftLogo";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { LinkedinIcon, TwitterIcon, GithubIcon, InstagramIcon } from "@/components/ui/SocialIcons";

const NAV = {
  Company: [
    { name: "About Agency", href: "/about" },
    { name: "Our Services", href: "/services" },
    { name: "Case Studies", href: "/portfolio" },
    { name: "Editorial Journal", href: "/blog" },
    { name: "Careers & Hiring", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ],
  Services: [
    { name: "Digital Marketing", href: "/services#digital-marketing" },
    { name: "Brand Architecture", href: "/services#branding" },
    { name: "Next.js Development", href: "/services#web-development" },
    { name: "Performance Ads", href: "/services#performance-marketing" },
    { name: "Technical SEO", href: "/services#seo" },
    { name: "Social Strategy", href: "/services#social-media-marketing" },
  ],
};

const SOCIALS = [
  { icon: LinkedinIcon, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: TwitterIcon,  href: "https://twitter.com",  label: "Twitter / X" },
  { icon: InstagramIcon, href: "https://instagram.com", label: "Instagram" },
  { icon: GithubIcon,   href: "https://github.com",   label: "GitHub" },
];

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSub = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
    setEmail("");
    setTimeout(() => setSent(false), 5000);
  };

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

          {/* Nav cols */}
          {Object.entries(NAV).map(([group, links]) => (
            <div key={group} className="lg:col-span-2 space-y-5">
              <h3 className="text-label text-white/30">{group}</h3>
              <ul className="space-y-3">
                {links.map(({ name, href }) => (
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
          ))}

          {/* Newsletter col */}
          <div className="lg:col-span-4 space-y-5">
            <h3 className="text-label text-white/30">Growth Insights</h3>
            <p className="text-sm text-white/45 leading-relaxed font-light">
              Bi-weekly strategy on marketing technology, brand systems, and conversion optimization — no noise.
            </p>
            <form onSubmit={handleSub} className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full bg-white/[0.04] border border-white/10 rounded-full py-3 pl-5 pr-14 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-white/30 transition-colors"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white text-black flex items-center justify-center hover:bg-white/90 transition-colors"
                aria-label="Subscribe"
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </form>
            {sent && (
              <p className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" /> Subscribed!
              </p>
            )}
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
