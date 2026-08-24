"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DeftLogo } from "@/components/ui/DeftLogo";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { name: "Home",      href: "/" },
  { name: "About",     href: "/about" },
  { name: "Services",  href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Blog",      href: "/blog" },
  { name: "Careers",   href: "/careers" },
  { name: "Contact",   href: "/contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled]   = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      setScrolledPastHero(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Pages with white hero background use dark text; everything else uses white text
  // /portfolio list = light bg; /portfolio/[slug] = dark hero with image
  // /privacy, /terms have dark hero but white content below
  const hasDarkHero = pathname === "/privacy" || pathname === "/terms";
  const isLightHero = pathname === "/about" || pathname === "/portfolio" || pathname === "/contact" || pathname === "/clients" || pathname === "/testimonials" || (hasDarkHero && scrolledPastHero);
  const linkColor = isLightHero ? "text-black/50 hover:text-black" : "text-white/50 hover:text-white";
  const activeLink = isLightHero ? "text-black" : "text-white";
  const pillBg = isLightHero ? "bg-black/10 border-black/15" : "bg-white/10 border-white/15";
  const scrolledBg = isLightHero
    ? "bg-white/80 backdrop-blur-xl border-b border-black/[0.06]"
    : "bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/[0.06]";
  const mobileBtnClass = isLightHero
    ? "border-black/10 bg-black/5 text-black"
    : "border-white/10 bg-white/5 text-white";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? scrolledBg : "bg-transparent"
        }`}
        style={{ paddingBlock: scrolled ? "0.75rem" : "1.25rem" }}
      >
        <div className="container-xl flex items-center justify-between">
          <DeftLogo size={scrolled ? "sm" : "md"} dark={isLightHero} />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                    active ? activeLink : linkColor
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="navPill"
                      className={`absolute inset-0 rounded-full border ${pillBg}`}
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/contact" className="btn-dark text-sm py-2.5 px-5">
              Start a Project <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden w-10 h-10 flex items-center justify-center rounded-full ${mobileBtnClass}`}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={`fixed inset-0 z-40 flex flex-col justify-center px-8 ${isLightHero ? "bg-white" : "bg-[#0a0a0a]"}`}
          >
            <button
              onClick={() => setMenuOpen(false)}
              className={`absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full border ${isLightHero ? "border-black/10 text-black" : "border-white/10 text-white"}`}
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>

            <nav className="space-y-2">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center justify-between py-4 border-b group ${isLightHero ? "border-black/[0.06]" : "border-white/[0.06]"}`}
                  >
                    <span className="text-hero" style={{ fontSize: "clamp(2.2rem,6vw,3.5rem)", fontWeight: 800, letterSpacing: "-0.04em", color: isLightHero ? (pathname === link.href ? "#0a0a0a" : "rgba(0,0,0,0.35)") : (pathname === link.href ? "#fff" : "rgba(255,255,255,0.35)") }}>
                      {link.name}
                    </span>
                    <ArrowUpRight className={`w-6 h-6 ${isLightHero ? "text-black/30 group-hover:text-black" : "text-white/30 group-hover:text-white"} transition-colors`} />
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-10">
              <Link href="/contact" className="btn-dark w-full justify-center">
                Start a Project <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
