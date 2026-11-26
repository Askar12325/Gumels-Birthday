import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { FOOTER } from "../content";

export function SiteFooter() {
  function handleReplay() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer
      aria-label="Site footer"
      style={{
        background: "#FBF3EA",
        paddingTop: "clamp(3rem,8vw,5rem)",
        paddingBottom: "clamp(2rem,5vw,3rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top gold hairline */}
      <div style={{ width: "100%", height: "1px", background: "linear-gradient(90deg,transparent,rgba(231,180,106,0.6),transparent)", marginBottom: "clamp(2rem,5vw,3.5rem)" }} aria-hidden="true" />

      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)", textAlign: "center", position: "relative", zIndex: 1 }}>

        {/* Script line */}
        <Reveal>
          <p style={{
            fontFamily: "var(--font-script)",
            fontSize: "clamp(2rem,5vw,2.8rem)",
            color: "var(--deep-rose)",
            marginBottom: "clamp(1.5rem,3vw,2rem)",
            lineHeight: 1.2,
          }}>
            {FOOTER.scriptLine}
          </p>
        </Reveal>

        {/* Gold hairline accent */}
        <Reveal delay={0.1}>
          <div style={{ width: "60px", height: "1.5px", background: "var(--amber)", opacity: 0.65, margin: "0 auto clamp(1.5rem,3vw,2rem)" }} aria-hidden="true" />
        </Reveal>

        {/* Built by — bold, prominent */}
        <Reveal delay={0.15}>
          <p style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(1.3rem,3.5vw,2rem)",
            color: "var(--ink)",
            letterSpacing: "-0.01em",
            marginBottom: "0.4rem",
            lineHeight: 1.2,
          }}>
            {FOOTER.credit}
          </p>
        </Reveal>

        {/* Gold underline accent under credit */}
        <Reveal delay={0.2}>
          <div style={{ width: "90px", height: "2.5px", background: "var(--amber)", margin: "0 auto clamp(2rem,4vw,3rem)", borderRadius: "2px" }} aria-hidden="true" />
        </Reveal>

        {/* Rose */}
        <Reveal delay={0.25}>
          <div style={{ fontSize: "1.5rem", marginBottom: "clamp(1.5rem,3vw,2rem)" }} aria-hidden="true">🌹</div>
        </Reveal>

        {/* Replay button */}
        <Reveal delay={0.3}>
          <motion.button
            onClick={handleReplay}
            whileHover={{ scale: 1.04, boxShadow: "0 4px 24px rgba(231,180,106,0.25)" }}
            whileTap={{ scale: 0.96 }}
            aria-label="Replay from the top"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.78rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--ink)",
              background: "transparent",
              border: "1.5px solid rgba(231,180,106,0.55)",
              borderRadius: "999px",
              padding: "0.6rem 1.8rem",
              cursor: "pointer",
              minHeight: "44px",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              transition: "border-color 0.2s",
            }}
          >
            <span aria-hidden="true" style={{ fontSize: "0.9rem" }}>↑</span>
            {FOOTER.replayLabel}
          </motion.button>
        </Reveal>
      </div>

      {/* Bottom fade */}
      <div aria-hidden="true" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "60px", background: "linear-gradient(0deg,rgba(243,217,211,0.15),transparent)", pointerEvents: "none" }} />
    </footer>
  );
}
