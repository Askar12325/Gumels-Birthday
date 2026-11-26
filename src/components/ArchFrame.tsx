import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface ArchFrameProps {
  src: string;
  fallback?: string;
  alt: string;
  className?: string;
}

/**
 * Arch-shaped portrait frame with gold border, amber glow,
 * subtle mouse-tilt on desktop.
 * Falls back to a blush gradient if the image fails to load.
 * The parent must set an explicit width + height (or className that does so).
 */
export function ArchFrame({ src, fallback, alt, className = "" }: ArchFrameProps) {
  const [imgError, setImgError] = useState(false);
  const actualSrc = imgError && fallback ? fallback : src;
  const frameRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 60, damping: 20 });
  const springY = useSpring(rawY, { stiffness: 60, damping: 20 });
  const rotateY = useTransform(springX, [-1, 1], [-6, 6]);
  const rotateX = useTransform(springY, [-1, 1], [5, -5]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    rawY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  }

  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <motion.div
      ref={frameRef}
      className={className}
      style={{
        position: "relative",
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 800,
        // width/height come from className passed by parent
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Amber glow halo — bleeds beyond frame edges */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "-8%",
          background:
            "radial-gradient(ellipse at 60% 40%, rgba(231,180,106,0.4) 0%, transparent 68%)",
          filter: "blur(28px)",
          borderRadius: "999px 999px 0 0",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Frame with arch shape + gold border */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          borderRadius: "999px 999px 0 0",
          border: "1.5px solid rgba(231,180,106,0.7)",
          boxShadow:
            "0 8px 48px rgba(168,100,106,0.18), 0 2px 12px rgba(231,180,106,0.15)",
          zIndex: 1,
        }}
      >
        {imgError ? (
          <div
            aria-label={alt}
            role="img"
            style={{
              width: "100%",
              height: "100%",
              minHeight: "260px",
              background:
                "linear-gradient(160deg, #F3D9D3 0%, #C98F88 60%, #A8646A 100%)",
            }}
          />
        ) : (
          <img
            src={actualSrc}
            alt={alt}
            onError={() => { if (!imgError) setImgError(true); }}
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "36% 58%",
            }}
            loading="eager"
            decoding="async"
          />
        )}
      </div>
    </motion.div>
  );
}
