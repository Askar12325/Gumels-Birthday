import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GATE } from "../content";

interface GateProps {
  onOpen: () => void;
}

/**
 * Full-screen soft cream loader with an "Open your gift" gate.
 * Shows a brief ambient loader, then the gate prompt.
 */
export function Gate({ onOpen }: GateProps) {
  const [phase, setPhase] = useState<"loading" | "ready">("loading");

  useEffect(() => {
    // Brief loading feel — 1 second
    const t = setTimeout(() => setPhase("ready"), 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        key="gate"
        className="fixed inset-0 flex flex-col items-center justify-center z-50"
        style={{
          background: "radial-gradient(ellipse at 50% 60%, #F3D9D3 0%, #FBF3EA 60%)",
        }}
        exit={{ opacity: 0, scale: 1.04 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: 0.04, backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "200px 200px" }}
          aria-hidden="true"
        />

        {/* Ambient rose petal decoration */}
        <motion.div
          className="absolute pointer-events-none"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 2 }}
          style={{
            width: "480px", height: "480px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(231,180,106,0.18) 0%, transparent 70%)",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        <AnimatePresence mode="wait">
          {phase === "loading" ? (
            <motion.div
              key="loader"
              className="flex flex-col items-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Rose icon */}
              <motion.span
                style={{ fontSize: "2.5rem", lineHeight: 1 }}
                animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.08, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              >
                🌹
              </motion.span>
              {/* Loading shimmer line */}
              <div
                style={{ width: "120px", height: "1.5px", background: "var(--blush)", borderRadius: "2px", overflow: "hidden", position: "relative" }}
              >
                <motion.div
                  style={{ position: "absolute", inset: 0, background: "var(--amber)", borderRadius: "2px" }}
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="ready"
              className="flex flex-col items-center gap-8 px-6 text-center"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Rose */}
              <motion.span
                style={{ fontSize: "2.2rem", lineHeight: 1 }}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                aria-hidden="true"
              >
                🌹
              </motion.span>

              {/* "Today is all yours." */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.3rem, 4vw, 2.1rem)",
                  fontStyle: "italic",
                  color: "var(--ink)",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.3,
                }}
              >
                {GATE.loaderLine}
              </motion.p>

              {/* Gold hairline */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ width: "80px", height: "1px", background: "var(--amber)", opacity: 0.7 }}
                aria-hidden="true"
              />

              {/* Button */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                onClick={onOpen}
                className="relative group"
                style={{
                  minHeight: "52px",
                  padding: "0 2.4rem",
                  border: "1.5px solid rgba(231,180,106,0.6)",
                  borderRadius: "999px",
                  background: "transparent",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  transition: "background 0.3s, box-shadow 0.3s",
                }}
                whileHover={{ scale: 1.03, boxShadow: "0 4px 32px rgba(231,180,106,0.25)" }}
                whileTap={{ scale: 0.97 }}
                aria-label="Open your birthday gift"
              >
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.875rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--ink)",
                  }}
                >
                  Open your{" "}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-script)",
                    fontSize: "1.6rem",
                    color: "var(--deep-rose)",
                    lineHeight: 1,
                    paddingTop: "0.1em",
                  }}
                >
                  gift
                </span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
