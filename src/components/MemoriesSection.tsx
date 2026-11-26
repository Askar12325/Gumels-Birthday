import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { MEMORIES } from "../content";

// ── SVG string-lights wire ────────────────────────────────────────────────────
function StringLights({ bulbCount = 14 }: { bulbCount?: number }) {
  const W = 1200;
  const H = 90;
  // gentle catenary-like curve
  const path = `M 0 ${H * 0.3} Q ${W * 0.25} ${H} ${W * 0.5} ${H * 0.5} Q ${W * 0.75} ${H * 0.1} ${W} ${H * 0.4}`;

  // evenly spaced bulb positions along a simplified polyline
  const bulbs = Array.from({ length: bulbCount }, (_, i) => {
    const t = i / (bulbCount - 1);
    const x = t * W;
    // rough catenary y
    const y =
      H * 0.3 +
      Math.sin(t * Math.PI) * H * 0.6 -
      Math.sin(t * Math.PI * 2) * H * 0.15;
    return { x, y, delay: (i * 0.18) % 2 };
  });

  return (
    <svg
      viewBox={`0 0 ${W} ${H + 20}`}
      preserveAspectRatio="none"
      style={{ width: "100%", height: "80px", display: "block", overflow: "visible" }}
      aria-hidden="true"
    >
      {/* wire */}
      <path d={path} fill="none" stroke="rgba(231,180,106,0.55)" strokeWidth="1.5" />
      {/* bulbs */}
      {bulbs.map((b, i) => (
        <g key={i}>
          {/* tiny wire drop */}
          <line
            x1={b.x} y1={b.y - 2}
            x2={b.x} y2={b.y + 7}
            stroke="rgba(231,180,106,0.4)" strokeWidth="1"
          />
          {/* glow halo */}
          <circle cx={b.x} cy={b.y + 10} r="9" fill="rgba(231,180,106,0.12)">
            <animate
              attributeName="opacity"
              values="0.4;1;0.4"
              dur="2.2s"
              begin={`${b.delay}s`}
              repeatCount="indefinite"
            />
          </circle>
          {/* bulb body */}
          <ellipse cx={b.x} cy={b.y + 10} rx="4" ry="6" fill="#E7B46A">
            <animate
              attributeName="opacity"
              values="0.6;1;0.6"
              dur="2.2s"
              begin={`${b.delay}s`}
              repeatCount="indefinite"
            />
          </ellipse>
          {/* bright core */}
          <circle cx={b.x} cy={b.y + 8} r="1.5" fill="#FFF3D0" opacity="0.9" />
        </g>
      ))}
    </svg>
  );
}

// ── Polaroid card ─────────────────────────────────────────────────────────────
interface PolaroidProps {
  src: string;
  fallback: string;
  caption: string;
  objectPosition: string;
  rotation: number;
  swayDelay: number;
  onOpen: () => void;
  index: number;
}

function Polaroid({ src, fallback, caption, objectPosition, rotation, swayDelay, onOpen, index }: PolaroidProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <motion.button
      onClick={onOpen}
      aria-label={`View photo: ${caption}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        all: "unset",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transform: `rotate(${rotation}deg)`,
        transformOrigin: "top center",
      }}
    >
      {/* Peg */}
      <div style={{
        width: "14px", height: "22px",
        background: "linear-gradient(180deg,#b5853a,#8a6020)",
        borderRadius: "3px 3px 2px 2px",
        marginBottom: "-4px",
        zIndex: 2,
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
      }} />

      {/* Polaroid card */}
      <motion.div
        animate={{ rotate: [0, 1.2, -0.8, 0.5, 0] }}
        transition={{ duration: 4 + swayDelay, repeat: Infinity, ease: "easeInOut", delay: swayDelay }}
        whileHover={{ scale: 1.06, rotate: 0, zIndex: 10 }}
        style={{
          background: "#FEFAF5",
          padding: "10px 10px 36px",
          borderRadius: "2px",
          boxShadow: "0 6px 28px rgba(43,34,39,0.18), 0 2px 8px rgba(0,0,0,0.1)",
          width: "clamp(130px, 28vw, 185px)",
          position: "relative",
        }}
      >
        {/* Photo area */}
        <div style={{ width: "100%", paddingBottom: "118%", position: "relative", overflow: "hidden", background: "#F3D9D3" }}>
          <img
            src={imgSrc}
            alt={caption}
            loading="lazy"
            decoding="async"
            onError={() => setImgSrc(fallback)}
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover",
              objectPosition,
            }}
          />
        </div>
        {/* Caption */}
        <p style={{
          fontFamily: "var(--font-script)",
          fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
          color: "var(--ink)",
          textAlign: "center",
          marginTop: "8px",
          lineHeight: 1.2,
          position: "absolute",
          bottom: "8px",
          left: 0,
          right: 0,
        }}>
          {caption}
        </p>
      </motion.div>
    </motion.button>
  );
}

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({ item, onClose }: { item: typeof MEMORIES.polaroids[0]; onClose: () => void }) {
  const [imgSrc, setImgSrc] = useState(item.src);

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo: ${item.caption}`}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(43,34,39,0.72)",
        backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "clamp(1rem, 5vw, 3rem)",
      }}
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.88, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
        style={{
          background: "#FEFAF5",
          padding: "12px 12px 56px",
          borderRadius: "2px",
          boxShadow: "0 24px 80px rgba(0,0,0,0.3)",
          maxWidth: "min(90vw, 480px)",
          width: "100%",
          position: "relative",
        }}
      >
        <div style={{ width: "100%", paddingBottom: "115%", position: "relative", overflow: "hidden", background: "#F3D9D3" }}>
          <img
            src={imgSrc}
            alt={item.caption}
            loading="eager"
            onError={() => setImgSrc(item.fallback)}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: item.objectPosition }}
          />
        </div>
        <p style={{
          fontFamily: "var(--font-script)",
          fontSize: "clamp(1.3rem, 4vw, 1.8rem)",
          color: "var(--ink)",
          textAlign: "center",
          marginTop: "12px",
          position: "absolute", bottom: "14px", left: 0, right: 0,
        }}>
          {item.caption}
        </p>
        <button
          onClick={onClose}
          aria-label="Close photo"
          style={{
            position: "absolute", top: "-14px", right: "-14px",
            width: "36px", height: "36px", borderRadius: "50%",
            background: "var(--deep-rose)", border: "none", cursor: "pointer",
            color: "#fff", fontSize: "1.1rem", display: "flex",
            alignItems: "center", justifyContent: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          }}
        >
          ×
        </button>
      </motion.div>
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
const ROTATIONS = [-4, 2, -2];
const SWAY_DELAYS = [0, 1.4, 0.7];

export function MemoriesSection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const activePolaroid = lightboxIndex !== null ? MEMORIES.polaroids[lightboxIndex] : null;

  return (
    <Section
      id="memories"
      aria-label="Our memories"
      style={{
        background: "linear-gradient(180deg,#FBF3EA 0%,#F7EAE5 50%,#FBF3EA 100%)",
        paddingTop: "clamp(3rem,8vw,6rem)",
        paddingBottom: "clamp(3rem,8vw,6rem)",
        overflow: "hidden",
      }}
    >
      {/* Warm glow */}
      <div aria-hidden="true" style={{
        position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)",
        width: "70%", height: "60%",
        background: "radial-gradient(ellipse,rgba(231,180,106,0.1) 0%,transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)", position: "relative" }}>
        {/* Heading */}
        <Reveal>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--dusty-rose)", marginBottom: "1rem" }}>
            {MEMORIES.label}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 600, fontSize: "clamp(2rem,6vw,3.5rem)", letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "0.5rem" }}>
            {MEMORIES.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(0.9rem,2vw,1.1rem)", color: "var(--dusty-rose)", marginBottom: "clamp(2rem,5vw,3.5rem)", fontStyle: "italic" }}>
            {MEMORIES.sub}
          </p>
        </Reveal>

        {/* String lights */}
        <div style={{ marginBottom: "-20px", position: "relative", zIndex: 2 }}>
          <StringLights bulbCount={16} />
        </div>

        {/* Polaroid strip */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "clamp(1.5rem,4vw,3.5rem)",
          flexWrap: "wrap",
          rowGap: "clamp(2rem,5vw,3rem)",
          paddingTop: "clamp(1rem,3vw,2rem)",
          position: "relative",
          zIndex: 1,
        }}>
          {MEMORIES.polaroids.map((p, i) => (
            <Polaroid
              key={i}
              index={i}
              src={p.src}
              fallback={p.fallback}
              caption={p.caption}
              objectPosition={p.objectPosition}
              rotation={ROTATIONS[i] ?? 0}
              swayDelay={SWAY_DELAYS[i] ?? 0}
              onOpen={() => setLightboxIndex(i)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {activePolaroid && (
          <Lightbox
            key="lightbox"
            item={activePolaroid}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </Section>
  );
}
