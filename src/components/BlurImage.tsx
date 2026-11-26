import { useState } from "react";
import type React from "react";

interface BlurImageProps {
  src: string;
  fallback?: string;
  alt: string;
  style?: React.CSSProperties;
  className?: string;
  eager?: boolean;
  objectPosition?: string;
}

/**
 * Blur-up image: shows a low-quality placeholder while the full image loads,
 * then fades in. Falls back to the original JPEG if WebP src fails.
 */
export function BlurImage({
  src,
  fallback,
  alt,
  style,
  className = "",
  eager = false,
  objectPosition = "center",
}: BlurImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const actualSrc = errored && fallback ? fallback : src;

  return (
    <div
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(160deg,#F3D9D3,#C98F88)",
        ...style,
      }}
    >
      <img
        src={actualSrc}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => { if (!errored && fallback) setErrored(true); }}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition,
          transition: "opacity 0.6s ease",
          opacity: loaded ? 1 : 0,
        }}
      />
    </div>
  );
}
