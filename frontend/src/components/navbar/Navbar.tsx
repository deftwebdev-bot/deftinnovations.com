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
  const [menuOpen, setMenuOpen]   = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
        style={{ paddingBlock: scrolled ? "0.75rem" : "1.25rem" }}
      >
        <div className="container-xl flex items-center justify-between">
          <DeftLogo size={scrolled ? "sm" : "md"} />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                    active ? "text-white" : "text-white/50 hover:text-white"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="navPill"
                      className="absolute inset-0 rounded-full bg-white/10 border border-white/15"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/contact" className="btn-primary text-sm py-2.5 px-5">
              Start a Project <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
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
            className="fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col justify-center px-8"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-white"
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
                    className="flex items-center justify-between py-4 border-b border-white/[0.06] group"
                  >
                    <span className="text-hero" style={{ fontSize: "clamp(2.2rem,6vw,3.5rem)", fontWeight: 800, letterSpacing: "-0.04em", color: pathname === link.href ? "#fff" : "rgba(255,255,255,0.35)" }}>
                      {link.name}
                    </span>
                    <ArrowUpRight className="w-6 h-6 text-white/30 group-hover:text-white transition-colors" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-10">
              <Link href="/contact" className="btn-primary w-full justify-center">
                Start a Project <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
