import { motion } from "framer-motion";
import { HeroScene } from "../scenes/HeroScene";
import { ArchFrame } from "./ArchFrame";
import { ScrollCue } from "./ScrollCue";
import { HERO } from "../content";
import { useHeroScroll } from "../hooks/useHeroScroll";
import { useMouseParallax } from "../hooks/useMouseParallax";

export function Hero() {
  const scrollProgress = useHeroScroll();
  const parallax = useMouseParallax();

  return (
    <>
      <style>{`
        #hero {
          position: relative;
          width: 100%;
          min-height: 100dvh;
          overflow: hidden;
          background: linear-gradient(160deg, #FBF3EA 0%, #F3D9D3 55%, #EDD5CE 100%);
        }
        .hero-canvas {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
        }
        .hero-glow {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background: radial-gradient(ellipse 80% 60% at 65% 40%, rgba(231,180,106,0.22) 0%, transparent 70%);
        }
        /* ── Mobile first ────────────────────────────────── */
        .hero-content {
          position: relative;
          z-index: 2;
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(1rem, 2.5vw, 2rem);
          padding:
            clamp(2rem, 6vw, 4rem)
            clamp(1rem, 5vw, 4rem)
            clamp(1.5rem, 4vw, 3rem);
          padding-top: max(clamp(2rem, 6vw, 4rem), env(safe-area-inset-top));
          padding-bottom: max(clamp(1.5rem, 4vw, 3rem), env(safe-area-inset-bottom));
        }
        .hero-photo-wrap {
          order: 0;
          display: flex;
          justify-content: center;
          flex-shrink: 0;
        }
        /* Photo: fit within screen at all mobile sizes */
        .hero-arch-frame {
          width: min(44vw, 180px);
          height: min(64vw, 260px);
        }
        .hero-text {
          order: 1;
          display: flex;
          flex-direction: column;
          gap: clamp(0.5rem, 1.5vw, 1rem);
          text-align: center;
          align-items: center;
          flex: 1;
          justify-content: center;
        }
        .hero-scroll-cue {
          order: 2;
          margin-top: auto;
          padding-bottom: 0.5rem;
        }
        /* ── Tablet / Desktop ────────────────────────────── */
        @media (min-width: 768px) {
          .hero-content {
            flex-direction: row;
            align-items: center;
            justify-content: center;
            gap: clamp(2rem, 5vw, 5rem);
          }
          .hero-text {
            order: 0;
            text-align: left;
            align-items: flex-start;
            flex: 1;
            max-width: 540px;
          }
          .hero-photo-wrap {
            order: 1;
            flex-shrink: 0;
            align-items: center;
          }
          .hero-arch-frame {
            width: clamp(220px, 28vw, 360px);
            height: clamp(320px, 40vw, 520px);
          }
          .hero-scroll-cue {
            position: absolute;
            bottom: clamp(1.5rem, 3vw, 2.5rem);
            left: 50%;
            transform: translateX(-50%);
            margin-top: 0;
          }
        }
        @media (min-width: 1280px) {
          .hero-arch-frame {
            width: clamp(300px, 22vw, 400px);
            height: clamp(430px, 32vw, 570px);
          }
        }
        /* ── Mobile landscape ────────────────────────────── */
        @media (max-height: 500px) and (orientation: landscape) {
          .hero-content {
            flex-direction: row;
            min-height: 100dvh;
            gap: 1.5rem;
            padding-top: 1rem;
            padding-bottom: 1rem;
          }
          .hero-arch-frame {
            width: min(26vw, 160px);
            height: min(38vw, 230px);
          }
          .hero-text { order: 0; text-align: left; align-items: flex-start; }
          .hero-photo-wrap { order: 1; }
        }
      `}</style>

      <section id="hero" aria-label="Birthday hero">
        <div className="hero-glow" aria-hidden="true" />

        <div className="hero-canvas" aria-hidden="true">
          <HeroScene scrollProgress={scrollProgress} parallax={parallax} />
        </div>

        <div className="hero-content">
          {/* Portrait arch frame */}
          <motion.div
            className="hero-photo-wrap"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <ArchFrame
              src="/images/optimized/her-1.webp"
              fallback="/images/her-1.jpg"
              alt="Amina"
              className="hero-arch-frame"
            />
          </motion.div>

          {/* Text block */}
          <div className="hero-text">
            {/* Script: "Happy Birthday" */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-script)",
                fontSize: "clamp(1.5rem, 5vw, 2.9rem)",
                color: "var(--deep-rose)",
                lineHeight: 1.1,
              }}
            >
              {HERO.scriptLine}
            </motion.p>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.56, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontWeight: 600,
                /* At 360px: 15vw = 54px — comfortable. Max 10rem on desktop. */
                fontSize: "clamp(3.8rem, 15vw, 10rem)",
                lineHeight: 0.9,
                letterSpacing: "-0.03em",
                color: "var(--ink)",
              }}
            >
              {HERO.headline}
            </motion.h1>

            {/* Gold hairline */}
            <motion.div
              aria-hidden="true"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: "clamp(48px, 10vw, 100px)",
                height: "1.5px",
                background: "var(--amber)",
                opacity: 0.75,
                transformOrigin: "left center",
              }}
            />

            {/* Date */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(0.65rem, 1.6vw, 0.88rem)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--dusty-rose)",
              }}
            >
              {HERO.date}
            </motion.p>

            {/* Subline */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.08, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(0.9rem, 2vw, 1.35rem)",
                fontStyle: "italic",
                color: "var(--ink)",
                opacity: 0.72,
              }}
            >
              {HERO.subline}
            </motion.p>
          </div>

          {/* Scroll cue */}
          <div className="hero-scroll-cue">
            <ScrollCue />
          </div>
        </div>
      </section>
    </>
  );
}
