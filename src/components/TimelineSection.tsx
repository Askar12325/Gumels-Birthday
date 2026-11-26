import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "./Reveal";
import { Section } from "./Section";
import { TIMELINE } from "../content";

gsap.registerPlugin(ScrollTrigger);

export function TimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef    = useRef<SVGPathElement>(null);
  const heartRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !lineRef.current || !heartRef.current) return;

    const lineEl  = lineRef.current;
    const heartEl = heartRef.current;
    const sectionEl = sectionRef.current;

    const totalLen = lineEl.getTotalLength?.() ?? 800;
    gsap.set(lineEl, { strokeDasharray: totalLen, strokeDashoffset: totalLen });

    // Travel distance = height of the entries container
    const travelY = sectionEl.offsetHeight - 20;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionEl,
        start: "top 75%",
        end: "bottom 25%",
        scrub: 1.5,
      },
    });

    tl.to(lineEl,  { strokeDashoffset: 0, duration: 1, ease: "none" }, 0)
      .to(heartEl, { y: travelY,          duration: 1, ease: "none" }, 0);

    return () => { tl.kill(); };
  }, []);

  return (
    <Section
      id="timeline"
      aria-label="Three years together"
      style={{
        background: "linear-gradient(180deg,#FBF3EA 0%,#F7EAE5 100%)",
        paddingTop: "clamp(4rem,10vw,8rem)",
        paddingBottom: "clamp(4rem,10vw,8rem)",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)" }}>
        {/* Heading */}
        <Reveal>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--dusty-rose)", marginBottom: "1rem" }}>
            {TIMELINE.label}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 600, fontSize: "clamp(2.2rem,6vw,3.8rem)", letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "clamp(3rem,8vw,5rem)" }}>
            {TIMELINE.heading}
          </h2>
        </Reveal>

        {/* Thread + entries container */}
        <div ref={sectionRef} style={{ position: "relative" }}>

          {/* Vertical gold thread SVG */}
          <svg
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "clamp(16px,5vw,50%)",
              top: 0, bottom: 0,
              width: "2px",
              height: "100%",
              overflow: "visible",
              transform: "translateX(-50%)",
              zIndex: 0,
            }}
            preserveAspectRatio="none"
          >
            <path
              ref={lineRef}
              d="M 1 0 L 1 1000"
              stroke="#E7B46A"
              strokeWidth="2"
              fill="none"
            />
          </svg>

          {/* Travelling heart */}
          <div
            ref={heartRef}
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "clamp(16px,5vw,50%)",
              top: 0,
              transform: "translate(-50%, -50%)",
              fontSize: "1.1rem",
              zIndex: 2,
              filter: "drop-shadow(0 0 6px rgba(231,180,106,0.8))",
            }}
          >
            ❤️
          </div>

          {/* Year entries */}
          {TIMELINE.years.map((yr, i) => {
            const isRight = i % 2 === 1;
            return (
              <Reveal key={i} delay={0.1 + i * 0.15}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    marginBottom: "clamp(3rem,8vw,5.5rem)",
                    paddingLeft: "clamp(40px,8vw,80px)",
                    position: "relative",
                    zIndex: 1,
                  }}
                  className={`timeline-entry ${isRight ? "timeline-right" : "timeline-left"}`}
                >
                  {/* Dot on thread */}
                  <div style={{
                    position: "absolute",
                    left: "clamp(9px,4.3vw,43px)",
                    top: "12px",
                    width: "10px", height: "10px",
                    borderRadius: "50%",
                    background: "#E7B46A",
                    border: "2px solid #FBF3EA",
                    boxShadow: "0 0 0 3px rgba(231,180,106,0.3)",
                    transform: "translateX(-50%)",
                  }} aria-hidden="true" />

                  {/* Large outlined numeral */}
                  <p style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "clamp(3.5rem,12vw,8rem)",
                    lineHeight: 0.9,
                    color: "transparent",
                    WebkitTextStroke: "1.5px #E7B46A",
                    letterSpacing: "-0.04em",
                    marginBottom: "0.5rem",
                    userSelect: "none",
                  }} aria-hidden="true">
                    {yr.num}
                  </p>

                  <h3 style={{
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    fontWeight: 600,
                    fontSize: "clamp(1.3rem,3vw,2rem)",
                    color: "var(--ink)",
                    marginBottom: "0.75rem",
                  }}>
                    {yr.title}
                  </h3>
                  <p style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "clamp(0.9rem,1.8vw,1.1rem)",
                    lineHeight: 1.75,
                    color: "var(--ink)",
                    opacity: 0.8,
                    maxWidth: "400px",
                  }}>
                    {yr.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Desktop: alternate left/right */}
      <style>{`
        @media (min-width: 768px) {
          #timeline .timeline-entry {
            width: 50%;
            padding-left: clamp(40px,5vw,60px) !important;
          }
          #timeline .timeline-right {
            align-self: flex-end;
            margin-left: auto;
          }
          #timeline svg {
            left: 50% !important;
          }
        }
      `}</style>
    </Section>
  );
}
