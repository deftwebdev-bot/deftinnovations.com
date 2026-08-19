import React from "react";
import Link from "next/link";

interface DeftLogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: "sm" | "md" | "lg";
}

export const DeftLogo: React.FC<DeftLogoProps> = ({ className = "", iconOnly = false, size = "md" }) => {
  const sizeClasses = {
    sm: "h-7",
    md: "h-9",
    lg: "h-12"
  };

  const iconSizes = {
    sm: 28,
    md: 36,
    lg: 48
  };

  const currentIconSize = iconSizes[size];

  return (
    <Link href="/" className={`inline-flex items-center gap-3 group focus:outline-none ${className}`} aria-label="Deft Innovations Homepage">
      {/* Geometric Deft Emblem: Crisp High-Contrast Monochrome Symbol */}
      <svg
        width={currentIconSize}
        height={currentIconSize}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 group-hover:scale-105"
      >
        <rect width="40" height="40" rx="8" fill="#2D2D2D" />
        <path
          d="M11 10H22C27.5228 10 32 14.4772 32 20C32 25.5228 27.5228 30 22 30H11V10Z"
          fill="#FFFFFF"
        />
        <path
          d="M17 16H21C23.2091 16 25 17.7909 25 20C25 22.2091 23.2091 24 21 24H17V16Z"
          fill="#2D2D2D"
        />
        <rect x="11" y="10" width="3" height="20" fill="#FFFFFF" />
      </svg>

      {!iconOnly && (
        <div className="flex flex-col">
          <span className="text-white font-bold tracking-tight text-lg leading-tight uppercase group-hover:text-white/90 transition-colors">
            DEFT <span className="font-light tracking-widest text-white/70 text-xs block font-mono uppercase">INNOVATIONS</span>
          </span>
        </div>
      )}
    </Link>
  );
};
