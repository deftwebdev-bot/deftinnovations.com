"use client";

import React, { useState, useEffect, useRef, type ReactNode } from "react";

/**
 * LazySection — renders children only when they enter the viewport.
 * Uses IntersectionObserver for zero-cost below-the-fold loading.
 */
export function LazySection({
  children,
  rootMargin = "200px",
  className = "",
}: {
  children: ReactNode;
  rootMargin?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return; // already triggered
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [visible, rootMargin]);

  return (
    <div ref={ref} className={className}>
      {visible ? children : <div className="min-h-[100px]" />}
    </div>
  );
}
