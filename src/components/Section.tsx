import React from "react";

interface SectionProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  as?: React.ElementType;
  "aria-label"?: string;
}

/**
 * Reusable semantic section wrapper with consistent padding.
 */
export function Section({
  id,
  className = "",
  style,
  children,
  as: Tag = "section",
  "aria-label": ariaLabel,
}: SectionProps) {
  return (
    <Tag
      id={id}
      aria-label={ariaLabel}
      className={`relative w-full ${className}`}
      style={style}
    >
      {children}
    </Tag>
  );
}
