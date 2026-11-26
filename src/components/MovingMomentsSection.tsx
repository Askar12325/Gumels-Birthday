import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { MOVING_MOMENTS } from "../content";
import mediaJson from "../generated/media.json";

const VIDEOS: string[] = mediaJson.videos ?? [];

function SpeakerIcon({ muted }: { muted: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {muted ? (
        <>
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </>
      ) : (
        <>
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </>
      )}
    </svg>
  );
}

function ArchVideo({
  src,
  isActive,
  isNext,
  isMuted,
  onToggleMute,
  index,
}: {
  src: string;
  isActive: boolean;
  isNext: boolean;
  isMuted: boolean;
  onToggleMute: () => void;
  index: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isActive) {
      v.play().then(() => setBlocked(false)).catch(() => setBlocked(true));
    } else {
      v.pause();
    }
  }, [isActive]);

  const preload = isActive || isNext ? "auto" : "metadata";

  return (
    <motion.div
      animate={{ scale: isActive ? 1 : 0.9, opacity: isActive ? 1 : 0.5 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        flexShrink: 0,
        width: "clamp(180px,38vw,300px)",
        height: "clamp(270px,57vw,450px)",
        borderRadius: "999px 999px 0 0",
        overflow: "hidden",
        position: "relative",
        border: "1.5px solid rgba(231,180,106,0.6)",
        boxShadow: isActive
          ? "0 8px 48px rgba(168,100,106,0.22), 0 2px 16px rgba(231,180,106,0.2)"
          : "0 4px 20px rgba(43,34,39,0.1)",
        background: "linear-gradient(160deg,#F3D9D3,#C98F88)",
        cursor: "pointer",
      }}
      onClick={isActive ? onToggleMute : undefined}
      role={isActive ? "button" : undefined}
      aria-label={isActive ? (isMuted ? "Unmute video" : "Mute video") : undefined}
      tabIndex={isActive ? 0 : -1}
      onKeyDown={isActive ? (e) => { if (e.key === "Enter" || e.key === " ") onToggleMute(); } : undefined}
    >
      {/* Gold shimmer placeholder */}
      {!ready && (
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: "linear-gradient(135deg,#F3D9D3 25%,#E7B46A 50%,#F3D9D3 75%)",
          backgroundSize: "200% 200%",
          animation: "shimmer 1.6s linear infinite",
        }} aria-hidden="true" />
      )}

      <video
        ref={videoRef}
        src={`/videos/${src}#t=0.5`}
        preload={preload}
        muted={isMuted}
        playsInline
        loop
        onCanPlay={() => setReady(true)}
        style={{
          width: "100%", height: "100%",
          objectFit: "cover", display: "block",
        }}
      />

      {/* Play overlay if autoplay blocked */}
      {blocked && isActive && (
        <div style={{
          position: "absolute", inset: 0, zIndex: 2,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(43,34,39,0.3)",
        }}>
          <div style={{
            width: "52px", height: "52px", borderRadius: "50%",
            background: "rgba(231,180,106,0.85)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.3rem",
          }}>▶</div>
        </div>
      )}

      {/* Badges */}
      {isActive && (
        <>
          {/* Now playing */}
          <div style={{
            position: "absolute", bottom: "14px", left: "12px", zIndex: 3,
            background: "rgba(251,243,234,0.88)",
            padding: "3px 10px",
            borderRadius: "999px",
            fontSize: "0.65rem",
            fontFamily: "var(--font-body)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--ink)",
            display: "flex", alignItems: "center", gap: "4px",
          }}>
            <span style={{ color: "var(--deep-rose)" }}>♥</span>
            {MOVING_MOMENTS.nowPlaying}
          </div>

          {/* Mute button */}
          <button
            onClick={(e) => { e.stopPropagation(); onToggleMute(); }}
            aria-label={isMuted ? "Unmute" : "Mute"}
            style={{
              position: "absolute", bottom: "14px", right: "12px", zIndex: 3,
              background: "rgba(231,180,106,0.85)",
              border: "none", cursor: "pointer",
              width: "32px", height: "32px", borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--ink)",
            }}
          >
            <SpeakerIcon muted={isMuted} />
          </button>

          {/* Amber glow overlay at top */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "60px",
            background: "linear-gradient(180deg,rgba(231,180,106,0.15),transparent)",
            pointerEvents: "none", zIndex: 1,
          }} aria-hidden="true" />
        </>
      )}

      {/* Reflection */}
      <div style={{
        position: "absolute", bottom: "-20%", left: 0, right: 0, height: "30%",
        background: "linear-gradient(180deg,rgba(231,180,106,0.07),transparent)",
        transform: "scaleY(-1)",
        pointerEvents: "none",
        borderRadius: "0 0 999px 999px",
      }} aria-hidden="true" />

      <style>{`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
    </motion.div>
  );
}

export function MovingMomentsSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [mutedVideos, setMutedVideos] = useState<Set<number>>(new Set([...Array(VIDEOS.length).keys()]));
  const scrollRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((idx: number) => {
    const clamped = Math.max(0, Math.min(VIDEOS.length - 1, idx));
    setActiveIdx(clamped);
    // Unmute switches: mute all except active
    setMutedVideos(new Set(Array.from({ length: VIDEOS.length }, (_, i) => i).filter(i => i !== clamped)));
    // Scroll into view
    if (scrollRef.current) {
      const child = scrollRef.current.children[clamped] as HTMLElement;
      if (child) child.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, []);

  // Arrow key navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") goTo(activeIdx - 1);
      if (e.key === "ArrowRight") goTo(activeIdx + 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIdx, goTo]);

  function toggleMute(idx: number) {
    setMutedVideos(prev => {
      const next = new Set<number>();
      // All videos muted except the toggled one (if it was muted, unmute it; if unmuted, mute all)
      if (prev.has(idx)) {
        // was muted → unmute this, mute all others
        for (let i = 0; i < VIDEOS.length; i++) { if (i !== idx) next.add(i); }
      } else {
        // was unmuted → mute all
        for (let i = 0; i < VIDEOS.length; i++) next.add(i);
      }
      return next;
    });
  }

  if (VIDEOS.length === 0) return null;

  return (
    <Section
      id="moving-moments"
      aria-label="Moving moments"
      style={{
        background: "linear-gradient(180deg,#FBF3EA 0%,#F3DDD6 60%,#FBF3EA 100%)",
        paddingTop: "clamp(4rem,10vw,7rem)",
        paddingBottom: "clamp(4rem,10vw,7rem)",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)" }}>
        {/* Heading */}
        <Reveal>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--dusty-rose)", marginBottom: "1rem" }}>
            {MOVING_MOMENTS.label}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 600, fontSize: "clamp(2rem,6vw,3.5rem)", letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "0.5rem" }}>
            {MOVING_MOMENTS.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(0.9rem,2vw,1.1rem)", color: "var(--dusty-rose)", fontStyle: "italic", marginBottom: "clamp(2rem,5vw,3rem)" }}>
            {MOVING_MOMENTS.sub}
          </p>
        </Reveal>

        {/* Video strip */}
        <div style={{ position: "relative" }}>
          {/* Prev arrow */}
          {activeIdx > 0 && (
            <button onClick={() => goTo(activeIdx - 1)} aria-label="Previous video"
              style={{
                position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)",
                zIndex: 10, width: "44px", height: "44px", borderRadius: "50%",
                background: "rgba(251,243,234,0.9)", border: "1.5px solid rgba(231,180,106,0.5)",
                cursor: "pointer", fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
              }}>‹</button>
          )}

          <div ref={scrollRef} className="video-strip" style={{
            display: "flex",
            gap: "clamp(1rem,3vw,2rem)",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            padding: "clamp(1rem,2vw,2rem) clamp(2.5rem,6vw,4rem)",
            WebkitOverflowScrolling: "touch",
          }}
            onScroll={(e) => {
              // Detect which slide is most centered
              const container = e.currentTarget;
              const children = Array.from(container.children) as HTMLElement[];
              let minDist = Infinity, closestIdx = 0;
              children.forEach((child, i) => {
                const dist = Math.abs(child.getBoundingClientRect().left + child.offsetWidth / 2 - window.innerWidth / 2);
                if (dist < minDist) { minDist = dist; closestIdx = i; }
              });
              if (closestIdx !== activeIdx) setActiveIdx(closestIdx);
            }}
          >
            {VIDEOS.map((v, i) => (
              <div key={v} style={{ scrollSnapAlign: "center", flexShrink: 0 }} onClick={() => goTo(i)}>
                <ArchVideo
                  src={v}
                  index={i}
                  isActive={i === activeIdx}
                  isNext={i === activeIdx + 1}
                  isMuted={mutedVideos.has(i)}
                  onToggleMute={() => toggleMute(i)}
                />
              </div>
            ))}
          </div>

          {/* Next arrow */}
          {activeIdx < VIDEOS.length - 1 && (
            <button onClick={() => goTo(activeIdx + 1)} aria-label="Next video"
              style={{
                position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)",
                zIndex: 10, width: "44px", height: "44px", borderRadius: "50%",
                background: "rgba(251,243,234,0.9)", border: "1.5px solid rgba(231,180,106,0.5)",
                cursor: "pointer", fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
              }}>›</button>
          )}
        </div>

        {/* Dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "1.5rem" }}>
          {VIDEOS.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} aria-label={`Go to video ${i + 1}`}
              aria-current={i === activeIdx ? "true" : undefined}
              style={{
                width: i === activeIdx ? "24px" : "8px", height: "8px",
                borderRadius: "999px",
                background: i === activeIdx ? "var(--amber)" : "var(--dusty-rose)",
                border: "none", cursor: "pointer", padding: 0,
                transition: "width 0.3s, background 0.3s",
                opacity: i === activeIdx ? 1 : 0.4,
              }}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
