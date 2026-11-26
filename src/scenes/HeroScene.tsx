import { useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PetalHeart } from "./PetalHeart";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { clampedDpr, isMobile } from "../lib/utils";
import type { ParallaxState } from "../hooks/useMouseParallax";

/** CSS-only hero fallback when WebGL is not supported */
function NoWebGLFallback() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(ellipse 70% 60% at 50% 55%, #F3D9D3 0%, #FBF3EA 60%, #EDD5CE 100%)",
        overflow: "hidden",
      }}
    >
      {/* Soft amber glow blobs */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "35%",
          width: "55%",
          height: "55%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(231,180,106,0.3) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "20%",
          width: "35%",
          height: "35%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201,143,136,0.25) 0%, transparent 70%)",
          filter: "blur(32px)",
        }}
      />
    </div>
  );
}

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

interface HeroSceneProps {
  scrollProgress: number;
  parallax: React.RefObject<ParallaxState>;
}

/**
 * WebGL canvas for the petal heart.
 * Wrapped in an ErrorBoundary so a crash shows a gradient fallback.
 * Also detects WebGL support before mounting the Canvas.
 */
export function HeroScene({ scrollProgress, parallax }: HeroSceneProps) {
  const mobile = isMobile();
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);
  const checkedRef = useRef(false);

  useEffect(() => {
    if (checkedRef.current) return;
    checkedRef.current = true;
    setWebglSupported(detectWebGL());
  }, []);

  if (webglSupported === null) return null; // Brief mount delay
  if (!webglSupported) return <NoWebGLFallback />;

  return (
    <ErrorBoundary fallback={<NoWebGLFallback />}>
      <Canvas
        style={{ width: "100%", height: "100%", background: "transparent" }}
        gl={{
          antialias: !mobile,
          alpha: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: false,
        }}
        dpr={clampedDpr()}
        camera={{ position: [0, 0.5, 9], fov: 48 }}
        flat
      >
        <ambientLight intensity={1.1} color="#FBF3EA" />
        <directionalLight position={[3, 5, 4]} intensity={0.9} color="#E7B46A" />
        <directionalLight position={[-3, -2, 2]} intensity={0.3} color="#F3D9D3" />
        <PetalHeart scrollProgress={scrollProgress} parallax={parallax} />
      </Canvas>
    </ErrorBoundary>
  );
}
