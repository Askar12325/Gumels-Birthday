import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { LETTER } from "../content";

// ── Wax seal SVG ──────────────────────────────────────────────────────────────
function WaxSeal({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <motion.button
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onClick(); }}
      aria-label={label}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.93 }}
      style={{
        all: "unset", cursor: "pointer",
        display: "flex", flexDirection: "column",
        alignItems: "center", gap: "0.75rem",
      }}
    >
      <svg width="88" height="88" viewBox="0 0 88 88" aria-hidden="true">
        <defs>
          <radialGradient id="sealGrad" cx="40%" cy="35%">
            <stop offset="0%" stopColor="#D4A39D" />
            <stop offset="100%" stopColor="#A8646A" />
          </radialGradient>
        </defs>
        {/* Seal base */}
        <circle cx="44" cy="44" r="40" fill="url(#sealGrad)" />
        {/* Decorative ring */}
        <circle cx="44" cy="44" r="34" fill="none" stroke="rgba(251,243,234,0.3)" strokeWidth="1.5" strokeDasharray="4 3" />
        {/* Rose outline */}
        <text x="44" y="52" textAnchor="middle" fontSize="28" fill="rgba(251,243,234,0.9)">🌹</text>
      </svg>
      <span style={{
        fontFamily: "var(--font-body)",
        fontSize: "0.65rem", letterSpacing: "0.18em",
        textTransform: "uppercase", color: "var(--dusty-rose)",
      }}>
        {label}
      </span>
    </motion.button>
  );
}

// ── Envelope flap ─────────────────────────────────────────────────────────────
function Envelope({ onOpened }: { onOpened: () => void }) {
  const [phase, setPhase] = useState<"closed" | "opening" | "open">("closed");

  function open() {
    if (phase !== "closed") return;
    setPhase("opening");
    setTimeout(() => { setPhase("open"); onOpened(); }, 800);
  }

  return (
    <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
      {/* Envelope body */}
      <motion.div
        style={{
          width: "clamp(260px,80vw,480px)",
          height: "clamp(170px,50vw,310px)",
          background: "#FBF3EA",
          border: "1.5px solid rgba(231,180,106,0.5)",
          borderRadius: "4px",
          boxShadow: "0 8px 48px rgba(43,34,39,0.12)",
          position: "relative",
          overflow: "hidden",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        {/* Inner V lines */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.25 }} aria-hidden="true">
          <line x1="0" y1="0" x2="50%" y2="55%" stroke="#E7B46A" strokeWidth="1" />
          <line x1="100%" y1="0" x2="50%" y2="55%" stroke="#E7B46A" strokeWidth="1" />
          <line x1="0" y1="100%" x2="50%" y2="55%" stroke="#E7B46A" strokeWidth="0.8" />
          <line x1="100%" y1="100%" x2="50%" y2="55%" stroke="#E7B46A" strokeWidth="0.8" />
        </svg>

        {/* Seal */}
        {phase === "closed" && (
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 2 }}>
            <WaxSeal onClick={open} label={LETTER.sealLabel} />
          </div>
        )}
      </motion.div>

      {/* Flap animation */}
      <AnimatePresence>
        {phase !== "closed" && (
          <motion.div
            key="flap"
            initial={{ rotateX: 0, originX: "50%", originY: "0%" }}
            animate={{ rotateX: -180 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              top: 0, left: 0, right: 0,
              height: "50%",
              background: "#F7EDE2",
              borderRadius: "4px 4px 0 0",
              border: "1.5px solid rgba(231,180,106,0.4)",
              transformOrigin: "top center",
              zIndex: 3,
              backfaceVisibility: "hidden",
            }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Typewriter letter ─────────────────────────────────────────────────────────
function TypewriterLetter() {
  const [visibleCount, setVisibleCount] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Reveal one paragraph every 0.85s
    intervalRef.current = setInterval(() => {
      setVisibleCount(c => {
        if (c >= LETTER.paragraphs.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return c;
        }
        return c + 1;
      });
    }, 850);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      style={{
        maxWidth: "clamp(280px,80vw,560px)",
        margin: "0 auto",
        background: "#FEFAF5",
        padding: "clamp(1.5rem,5vw,3rem) clamp(1.5rem,5vw,2.5rem)",
        borderRadius: "2px",
        boxShadow: "0 8px 60px rgba(43,34,39,0.1), 0 2px 12px rgba(231,180,106,0.1)",
        border: "1px solid rgba(231,180,106,0.25)",
        position: "relative",
      }}
    >
      {/* Paper lines */}
      {Array.from({ length: 12 }, (_, i) => (
        <div key={i} aria-hidden="true" style={{
          position: "absolute", left: 0, right: 0,
          top: `${60 + i * 36}px`,
          height: "1px",
          background: "rgba(201,143,136,0.08)",
        }} />
      ))}

      {/* Letter content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {LETTER.paragraphs.map((para, i) => {
          const isVisible = i < visibleCount;
          // Special styles for salutation, sign-off, etc.
          const isSalutation = i === 0;
          const isSignOff = i >= LETTER.paragraphs.length - 2;
          return (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: isSalutation || isSignOff ? "var(--font-display)" : "var(--font-display)",
                fontSize: isSalutation
                  ? "clamp(1rem,2.5vw,1.3rem)"
                  : isSignOff
                    ? "clamp(1rem,2.5vw,1.25rem)"
                    : "clamp(0.9rem,1.8vw,1.1rem)",
                fontStyle: isSalutation || isSignOff ? "italic" : "normal",
                fontWeight: isSalutation ? 600 : 400,
                lineHeight: 1.85,
                color: "var(--ink)",
                marginBottom: isSignOff && i === LETTER.paragraphs.length - 2 ? "0.3rem" : "1.1rem",
                letterSpacing: isSalutation ? "0.01em" : "normal",
              }}
            >
              {para}
            </motion.p>
          );
        })}
      </div>
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function LetterSection() {
  const [opened, setOpened] = useState(false);

  return (
    <Section
      id="letter"
      aria-label="A letter for you"
      style={{
        background: "linear-gradient(180deg,#FBF3EA 0%,#F7EAE5 100%)",
        paddingTop: "clamp(4rem,10vw,7rem)",
        paddingBottom: "clamp(4rem,10vw,7rem)",
        overflow: "hidden",
      }}
    >
      {/* Warm glow */}
      <div aria-hidden="true" style={{
        position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)",
        width: "60%", height: "50%",
        background: "radial-gradient(ellipse,rgba(231,180,106,0.1) 0%,transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)", position: "relative", zIndex: 1 }}>
        <Reveal>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--dusty-rose)", marginBottom: "1rem", textAlign: "center" }}>
            {LETTER.label}
          </p>
        </Reveal>

        {/* Envelope */}
        <Reveal delay={0.1}>
          <div style={{ marginBottom: "clamp(2rem,5vw,3rem)" }}>
            <Envelope onOpened={() => setOpened(true)} />
          </div>
        </Reveal>

        {/* Letter */}
        <AnimatePresence>
          {opened && <TypewriterLetter key="letter" />}
        </AnimatePresence>
      </div>
    </Section>
  );
}
