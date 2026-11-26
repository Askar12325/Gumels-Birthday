import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { WISH } from "../content";

export function WishSection() {
  return (
    <Section
      id="wish"
      aria-label="Birthday wish"
      className="py-28 md:py-44"
      style={{
        background: "linear-gradient(170deg, #1D2142 0%, #2E3660 50%, #3E4A80 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Stars / ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(231,180,106,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Decorative arch shape */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "clamp(200px, 40vw, 400px)",
          height: "clamp(300px, 55vw, 560px)",
          background: "rgba(243,217,211,0.03)",
          border: "1px solid rgba(231,180,106,0.12)",
          borderRadius: "999px 999px 0 0",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "640px",
          margin: "0 auto",
          padding: "0 clamp(1.25rem, 6vw, 3rem)",
          position: "relative",
          zIndex: 1,
          textAlign: "center",
        }}
      >
        {/* Label */}
        <Reveal delay={0}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.7rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(231,180,106,0.7)",
              marginBottom: "1.25rem",
            }}
          >
            {WISH.label}
          </p>
        </Reveal>

        {/* Heading */}
        <Reveal delay={0.1}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 600,
              fontSize: "clamp(2.4rem, 7vw, 4.2rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "#FBF3EA",
              marginBottom: "2.5rem",
            }}
          >
            {WISH.heading}
          </h2>
        </Reveal>

        {/* Gold hairline */}
        <Reveal delay={0.15}>
          <div
            aria-hidden="true"
            style={{
              width: "60px",
              height: "1.5px",
              background: "var(--amber)",
              opacity: 0.6,
              margin: "0 auto 2.5rem",
            }}
          />
        </Reveal>

        {/* Wish text */}
        <Reveal delay={0.25}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(1rem, 2vw, 1.15rem)",
              lineHeight: 1.82,
              color: "rgba(251,243,234,0.85)",
              marginBottom: "2.5rem",
            }}
          >
            {WISH.wish}
          </p>
        </Reveal>

        {/* Closing */}
        <Reveal delay={0.38}>
          <p
            style={{
              fontFamily: "var(--font-script)",
              fontSize: "clamp(2.2rem, 6vw, 3.2rem)",
              color: "var(--amber)",
              marginBottom: "1rem",
              lineHeight: 1.2,
            }}
          >
            {WISH.closing}
          </p>
        </Reveal>

        {/* From */}
        <Reveal delay={0.48}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.8rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(231,180,106,0.6)",
            }}
          >
            — {WISH.from}
          </p>
        </Reveal>

        {/* Closing rose */}
        <Reveal delay={0.6}>
          <div style={{ marginTop: "3rem", fontSize: "2rem" }} aria-hidden="true">
            🌹
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
