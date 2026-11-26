import { useRef, useMemo, useEffect } from "react";
import type React from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { generateHeartPoints, generateScatteredPoints, generateDriftPoints } from "../lib/heartPoints";
import { isMobile, prefersReducedMotion } from "../lib/utils";
import type { ParallaxState } from "../hooks/useMouseParallax";

// Petal colours — blush, dusty rose, amber
const PETAL_COLOURS = [
  new THREE.Color("#F3D9D3"),
  new THREE.Color("#E8C4BF"),
  new THREE.Color("#C98F88"),
  new THREE.Color("#D4A39D"),
  new THREE.Color("#E7B46A"),
  new THREE.Color("#EBC48A"),
  new THREE.Color("#A8646A"),
];

function pickColor(): THREE.Color {
  return PETAL_COLOURS[Math.floor(Math.random() * PETAL_COLOURS.length)].clone();
}

interface PetalHeartProps {
  scrollProgress: number;
  parallax: React.RefObject<ParallaxState>;
}

export function PetalHeart({ scrollProgress, parallax }: PetalHeartProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const reduced = prefersReducedMotion();
  const mobile = isMobile();

  // Fewer particles on small/low-end screens for smooth 60fps
  const COUNT = mobile ? 400 : 1200;

  // Pre-generate all three position sets
  const heartPositions = useMemo(() => generateHeartPoints(COUNT), [COUNT]);
  const scatterPositions = useMemo(() => generateScatteredPoints(COUNT, 7), [COUNT]);
  const driftPositions = useMemo(() => generateDriftPoints(COUNT), [COUNT]);

  // Per-petal random data: phase offset, rotation axis, scale, colour
  const petalData = useMemo(() => {
    return Array.from({ length: COUNT }, () => ({
      phase: Math.random() * Math.PI * 2,
      axisX: Math.random() - 0.5,
      axisY: Math.random() - 0.5,
      axisZ: Math.random() - 0.5,
      scale: 0.03 + Math.random() * 0.05,
      color: pickColor(),
    }));
  }, [COUNT]);

  // Colour buffer
  useEffect(() => {
    if (!meshRef.current) return;
    for (let i = 0; i < COUNT; i++) {
      meshRef.current.setColorAt(i, petalData[i].color);
    }
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [COUNT, petalData]);

  const timeRef = useRef(0);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const heartFormProgress = useRef(0); // 0 → 1 over ~3.5s

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    timeRef.current += delta;
    const t = timeRef.current;

    // Form progress: 0→1 over 3.5 seconds (eased)
    if (heartFormProgress.current < 1) {
      heartFormProgress.current = Math.min(
        1,
        heartFormProgress.current + delta / 3.5
      );
    }
    const fp = easeOutExpo(heartFormProgress.current);

    // Scroll drift: how much petals scatter away on scroll
    const driftFactor = easeInQuad(Math.min(1, scrollProgress * 2.5));

    // Combined interpolation: scatter → heart → drift
    // Phase 1: scatter → heart  (fp: 0→1, driftFactor = 0)
    // Phase 2: heart → drift    (driftFactor: 0→1)

    const px = parallax.current?.x ?? 0;
    const py = parallax.current?.y ?? 0;

    for (let i = 0; i < COUNT; i++) {
      const d = petalData[i];

      // Position interpolation
      const scatter = scatterPositions[i];
      const heart = heartPositions[i];
      const drift = driftPositions[i];

      // First lerp scatter → heart using fp
      const ix = lerp(scatter.x, heart.x, fp);
      const iy = lerp(scatter.y, heart.y, fp);
      const iz = lerp(scatter.z, heart.z, fp);

      // Then lerp heart → drift using driftFactor
      const fx = lerp(ix, drift.x, driftFactor);
      const fy = lerp(iy, drift.y, driftFactor);
      const fz = lerp(iz, drift.z, driftFactor);

      // Breathing when formed (gentle sine)
      const breathe = reduced ? 0 : Math.sin(t * 0.9 + d.phase) * 0.045 * fp * (1 - driftFactor);

      // Parallax offset
      const parallaxStrength = mobile ? 0.12 : 0.22;
      const pox = px * parallaxStrength;
      const poy = py * parallaxStrength * 0.6;

      dummy.position.set(
        fx + breathe * (d.axisX * 0.5) + pox,
        fy + breathe * (d.axisY * 0.5) + poy,
        fz + breathe * (d.axisZ * 0.3)
      );

      // Rotation
      const rotSpeed = reduced ? 0 : 0.3;
      dummy.rotation.set(
        t * rotSpeed * d.axisX + d.phase,
        t * rotSpeed * d.axisY,
        t * rotSpeed * d.axisZ
      );

      // Scale — tiny during scatter, grow as heart forms
      const s = d.scale * (0.4 + fp * 0.6);
      dummy.scale.setScalar(s);

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;

    // Slow whole-group rotation when formed
    if (!reduced) {
      meshRef.current.rotation.y = Math.sin(t * 0.08) * 0.25 * fp * (1 - driftFactor);
      meshRef.current.rotation.x = Math.sin(t * 0.05) * 0.08 * fp * (1 - driftFactor);
    }
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, COUNT]}
      frustumCulled={false}
    >
      {/* Curved petal geometry — a slightly deformed ellipsoid */}
      <sphereGeometry args={[1, 4, 3]} />
      <meshStandardMaterial
        vertexColors
        roughness={0.85}
        metalness={0.05}
        transparent
        opacity={0.92}
      />
    </instancedMesh>
  );
}

// ── Easing helpers ──────────────────────────────────────────────────────────
function easeOutExpo(x: number): number {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

function easeInQuad(x: number): number {
  return x * x;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}
