import React from "react";
import { FadeIn, LineReveal } from "./Motion";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  description,
  centered = false,
  className = "",
}) => {
  const lines = title.split("|");

  return (
    <div className={`space-y-5 ${centered ? "text-center" : ""} ${className}`}>
      {badge && (
        <FadeIn direction="up">
          <span className={`pill text-white/60 ${centered ? "mx-auto" : ""}`}>{badge}</span>
        </FadeIn>
      )}

      <h2 className="text-h1 max-w-3xl">
        {lines.map((line, i) => (
          <LineReveal key={i} delay={0.1 + i * 0.1} className={i > 0 ? "text-white/30" : ""}>
            {line.trim()}
          </LineReveal>
        ))}
      </h2>

      {description && (
        <FadeIn direction="up" delay={0.3}>
          <p className={`text-lg text-white/50 leading-relaxed font-light max-w-2xl ${centered ? "mx-auto" : ""}`}>
            {description}
          </p>
        </FadeIn>
      )}
    </div>
  );
};
