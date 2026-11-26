import { useState, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { MAKE_A_WISH } from "../content";

// ── Star field — memoised so positions are stable ─────────────────────────────
function Stars({ count = 60 }: { count?: number }) {
  const stars = useMemo(() => Array.from({ length: count }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    r: 0.5 + Math.random() * 1.2,
    delay: Math.random() * 4,
    dur: 2 + Math.random() * 3,
  })), [count]);
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} aria-hidden="true">
      {stars.map((s, i) => (
        <circle key={i} cx={`${s.x}%`} cy={`${s.y}%`} r={s.r} fill="rgba(251,243,234,0.7)">
          <animate attributeName="opacity" values="0.2;0.9;0.2" dur={`${s.dur}s`} begin={`${s.delay}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
}

// ── Single lantern ────────────────────────────────────────────────────────────
interface LanternProps {
  x: number; // vw %
  delay: number;
  size?: number;
  opacity?: number;
}
function FloatingLantern({ x, delay, size = 44, opacity = 0.9 }: LanternProps) {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ y: 0, opacity: 0, scale: 0.5 }}
      animate={{ y: "-110vh", opacity: [0, opacity, opacity * 0.6, 0], scale: [0.5, 1, 0.9] }}
      transition={{ duration: 5 + Math.random() * 3, delay, ease: "easeOut" }}
      style={{
        position: "absolute",
        left: `${x}%`,
        bottom: "15%",
        width: size,
        fontSize: `${size}px`,
        lineHeight: 1,
        filter: `drop-shadow(0 0 ${size * 0.3}px rgba(231,180,106,0.8))`,
        userSelect: "none",
      }}
    >
      🏮
    </motion.div>
  );
}

export function MakeAWishSection() {
  const [wished, setWished] = useState(false);
  const [lanterns, setLanterns] = useState<{ id: number; x: number; delay: number; size: number }[]>([]);
  const nextId = useRef(0);

  const triggerWish = useCallback(() => {
    if (wished) return;
    setWished(true);

    // Vibrate on mobile
    if (navigator.vibrate) navigator.vibrate([40, 30, 60]);

    // Spawn 18 lanterns with staggered delays
    const batch = Array.from({ length: 18 }, () => ({
      id: nextId.current++,
      x: 5 + Math.random() * 90,
      delay: Math.random() * 2.5,
      size: 28 + Math.floor(Math.random() * 28),
    }));
    setLanterns(batch);
  }, [wished]);

  return (
    <Section
      id="make-a-wish"
      aria-label="Make a wish"
      style={{
        background: "linear-gradient(180deg,#1D2142 0%,#2A3568 60%,#1D2142 100%)",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
        paddingTop: "clamp(4rem,10vw,7rem)",
        paddingBottom: "clamp(4rem,10vw,7rem)",
      }}
    >
      <Stars count={typeof window !== "undefined" && window.innerWidth < 768 ? 40 : 70} />
      
      {/* Floating lanterns */}
      <AnimatePresence>
        {lanterns.map(l => <FloatingLantern key={l.id} x={l.x} delay={l.delay} size={l.size} />)}
      </AnimatePresence>

      <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 clamp(1.25rem,5vw,3rem)" }}>
        <Reveal>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(231,180,106,0.6)", marginBottom: "1rem" }}>
            {MAKE_A_WISH.label}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 600, fontSize: "clamp(2.2rem,6vw,4rem)", letterSpacing: "-0.02em", color: "#FBF3EA", marginBottom: "clamp(2rem,5vw,3.5rem)" }}>
            {MAKE_A_WISH.heading}
          </h2>
        </Reveal>

        {/* The lantern button */}
        {!wished && (
          <Reveal delay={0.2}>
            <motion.button
              onClick={triggerWish}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") triggerWish(); }}
              aria-label="Tap the lantern to make a wish"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              style={{
                all: "unset", cursor: "pointer", display: "flex", flexDirection: "column",
                alignItems: "center", gap: "1rem",
              }}
            >
              <motion.span
                style={{ fontSize: "clamp(5rem,15vw,9rem)", lineHeight: 1, filter: "drop-shadow(0 0 32px rgba(231,180,106,0.6))" }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              >
                🏮
              </motion.span>
              <span style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.75rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(231,180,106,0.6)",
              }}>
                {MAKE_A_WISH.prompt}
              </span>
            </motion.button>
          </Reveal>
        )}

        {/* After wish text */}
        <AnimatePresence>
          {wished && (
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "clamp(1.3rem,4vw,2.2rem)",
                color: "rgba(251,243,234,0.9)",
                maxWidth: "520px",
                margin: "0 auto",
                lineHeight: 1.4,
              }}
            >
              {MAKE_A_WISH.afterWish}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
}
