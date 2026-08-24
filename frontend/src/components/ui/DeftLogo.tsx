import React from "react";
import Link from "next/link";

interface DeftLogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: "sm" | "md" | "lg";
  dark?: boolean;
}

export const DeftLogo: React.FC<DeftLogoProps> = ({ className = "", iconOnly = false, size = "md", dark = false }) => {
  const textSizes: Record<string, { primary: string; secondary: string }>= {
    sm: { primary: "text-base", secondary: "text-[9px]" },
    md: { primary: "text-xl", secondary: "text-[10px]" },
    lg: { primary: "text-2xl", secondary: "text-xs" },
  };

  const currentText = textSizes[size] || textSizes.md;

  return (
    <Link href="/" className={`inline-flex items-center group focus:outline-none ${className}`} aria-label="Deft Innovations Homepage">
      {!iconOnly && (
        <div className="flex flex-col leading-none">
          <span className={`${dark ? "text-[#0a0a0a]" : "text-white"} font-extrabold tracking-[-0.03em] ${currentText.primary} ${dark ? "group-hover:text-black/80" : "group-hover:text-white/90"} transition-colors`}>Deft</span>
          <span className={`${dark ? "text-black/40" : "text-white/50"} font-mono tracking-[0.2em] uppercase ${currentText.secondary} ${dark ? "group-hover:text-black/30" : "group-hover:text-white/40"} transition-colors mt-0.5`}>Innovations</span>
        </div>
      )}
    </Link>
  );
};
