import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { STORY } from "../content";

export function StorySection() {
  return (
    <Section
      id="story"
      aria-label="Our story"
      className="py-24 md:py-36"
      style={{
        background: "linear-gradient(180deg, #FBF3EA 0%, #F7EAE5 100%)",
      }}
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "20%",
          left: "-10%",
          width: "50%",
          height: "60%",
          background: "radial-gradient(ellipse, rgba(231,180,106,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "680px",
          margin: "0 auto",
          padding: "0 clamp(1.25rem, 6vw, 3rem)",
          position: "relative",
          zIndex: 1,
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
              color: "var(--dusty-rose)",
              marginBottom: "1.25rem",
            }}
          >
            {STORY.label}
          </p>
        </Reveal>

        {/* Heading */}
        <Reveal delay={0.1}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 600,
              fontSize: "clamp(2.2rem, 7vw, 4rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "var(--ink)",
              marginBottom: "2.5rem",
            }}
          >
            {STORY.heading}
          </h2>
        </Reveal>

        {/* Gold hairline */}
        <Reveal delay={0.15}>
          <div
            aria-hidden="true"
            style={{
              width: "80px",
              height: "1.5px",
              background: "var(--amber)",
              opacity: 0.65,
              marginBottom: "2.5rem",
            }}
          />
        </Reveal>

        {/* Body paragraphs */}
        {STORY.body.map((para, i) => (
          <Reveal key={i} delay={0.2 + i * 0.12}>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(1rem, 2vw, 1.15rem)",
                lineHeight: 1.78,
                color: "var(--ink)",
                opacity: 0.88,
                marginBottom: "1.5rem",
              }}
            >
              {para}
            </p>
          </Reveal>
        ))}

        {/* Signature */}
        <Reveal delay={0.55}>
          <p
            style={{
              fontFamily: "var(--font-script)",
              fontSize: "clamp(2rem, 5vw, 2.8rem)",
              color: "var(--deep-rose)",
              marginTop: "2.5rem",
              lineHeight: 1.2,
            }}
          >
            {STORY.signature}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
