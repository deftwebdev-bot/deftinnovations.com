import React from "react";
import Link from "next/link";
import Image from "next/image";

interface DeftLogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: "sm" | "md" | "lg";
  dark?: boolean;
}

const sizeHeights: Record<string, string> = {
  sm: "h-8",
  md: "h-10",
  lg: "h-14",
};

export const DeftLogo: React.FC<DeftLogoProps> = ({ className = "", size = "md", dark = false }) => {
  const height = sizeHeights[size] || sizeHeights.md;

  return (
    <Link href="/" className={`inline-flex items-center group focus:outline-none ${className}`} aria-label="Deft Innovations Homepage">
      {/* Source asset is white-on-transparent; invert() renders it black on light pages. */}
      <Image
        src="/deft-logo.png"
        alt="Deft Innovations"
        width={1648}
        height={587}
        priority
        className={`${height} w-auto max-w-none ${dark ? "invert" : ""} transition-opacity group-hover:opacity-80`}
      />
    </Link>
  );
};
