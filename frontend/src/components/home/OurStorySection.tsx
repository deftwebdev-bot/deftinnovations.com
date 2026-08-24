"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { TrustStat } from "@/lib/api";

/* ── Animated Counter ───────────────────────────────────────── */
interface CounterProps {
  value: string;
  className?: string;
  duration?: number;
}

const AnimatedCounter: React.FC<CounterProps> = ({ value, className = "", duration = 1800 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const numericMatch = value.match(/([\d.]+)/);
    if (!numericMatch) { setDisplay(value); return; }

    const target = parseFloat(numericMatch[1]);
    const prefix = value.slice(0, value.indexOf(numericMatch[1]));
    const suffix = value.slice(value.indexOf(numericMatch[1]) + numericMatch[1].length);
    const decimals = numericMatch[1].includes(".") ? numericMatch[1].split(".")[1].length : 0;
    const start = performance.now();

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const current = easeOut(progress) * target;
      setDisplay(`${prefix}${current.toFixed(decimals)}${suffix}`);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, value, duration]);

  return <span ref={ref} className={className}>{display}</span>;
};

/* ── Section ───────────────────────────────────────────────── */
interface OurStorySectionProps {
  stats?: TrustStat[];
}

export const OurStorySection: React.FC<OurStorySectionProps> = ({ stats = [] }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const defaultStats = [
    { value: "150+", label: "Projects Delivered Globally" },
    { value: "$45M+", label: "Client Revenue Generated" },
    { value: "98.4%", label: "Client Retention Rate" },
    { value: "0.4s", label: "Average Page Speed" },
  ];

  const statList = stats && stats.length > 0 ? stats : defaultStats;

  return (
    <section ref={sectionRef} className="relative bg-black text-white overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: "40px 40px",
      }} />

      <div className="relative container-xl py-24 sm:py-32 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Left — Narrative */}
          <div className="space-y-8">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-block text-xs font-mono font-semibold tracking-[0.2em] text-white/25 uppercase"
            >
              Who We Are
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight text-white leading-[1.05]"
            >
              Our Story
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-xl text-white/40 font-light leading-relaxed max-w-lg"
            >
              In a world brimming with possibilities, we sprouted, seizing our
              destiny to create an extraordinary narrative — a tale that
              encapsulates laughter, tears, challenges, and triumphs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href="/about"
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full border border-white/20 text-white text-sm font-medium hover:bg-white/[0.06] hover:border-white/30 transition-all duration-300 group"
              >
                <span>About us</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>

          {/* Right — Stats Grid */}
          <div className="grid grid-cols-2 gap-0">
            {statList.slice(0, 4).map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.2 + idx * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative p-8 sm:p-10 group"
                style={{
                  borderRight: (idx % 2 === 0) ? "1px solid rgba(255,255,255,0.06)" : "none",
                  borderBottom: (idx < 2) ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 space-y-3">
                  <AnimatedCounter
                    value={stat.value}
                    className="text-4xl sm:text-5xl font-bold tracking-tight text-white"
                    duration={1800 + idx * 200}
                  />
                  <p className="text-sm text-white/35 font-light leading-snug">
                    {stat.label}
                  </p>
                </div>

                {/* Subtle accent line on hover */}
                <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
