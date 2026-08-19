"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ─── FADE IN ────────────────────────────────────────────────── */
interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  once?: boolean;
  distance?: number;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
  once = true,
  distance = 40,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-60px" });

  const offset = {
    up:    { y: distance, x: 0 },
    down:  { y: -distance, x: 0 },
    left:  { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    none:  { x: 0, y: 0 },
  }[direction];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...offset }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offset }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ─── STAGGER CHILDREN ───────────────────────────────────────── */
interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}

const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

const staggerVariants = {
  hidden: {},
  show: (stagger: number) => ({
    transition: { staggerChildren: stagger },
  }),
};

const childVariant = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_EXPO } },
};

export const Stagger: React.FC<StaggerProps> = ({
  children,
  className = "",
  stagger = 0.1,
  delay = 0,
}) => (
  <motion.div
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-60px" }}
    variants={staggerVariants}
    custom={stagger}
    transition={{ delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerItem: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <motion.div variants={childVariant} className={className}>
    {children}
  </motion.div>
);

/* ─── WORD REVEAL ────────────────────────────────────────────── */
interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export const WordReveal: React.FC<WordRevealProps> = ({
  text,
  className = "",
  delay = 0,
  stagger = 0.04,
}) => {
  const words = text.split(" ");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <span ref={ref} className={`inline-flex flex-wrap gap-x-[0.28em] ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: "0.4em" }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: "0.4em" }}
          transition={{ duration: 0.6, delay: delay + i * stagger, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block overflow-hidden"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

/* ─── LINE REVEAL ────────────────────────────────────────────── */
interface LineRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const LineReveal: React.FC<LineRevealProps> = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "105%" }}
        animate={isInView ? { y: 0 } : { y: "105%" }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

/* ─── COUNTER ────────────────────────────────────────────────── */
interface CounterProps {
  value: string;
  className?: string;
}

export const RevealCounter: React.FC<CounterProps> = ({ value, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {value}
    </motion.span>
  );
};

/* ─── IMAGE REVEAL ────────────────────────────────────────────── */
export const ImageReveal: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({
  children,
  className = "",
  delay = 0,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ opacity: 0.2, scale: 1.06 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0.2, scale: 1.06 }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
};
