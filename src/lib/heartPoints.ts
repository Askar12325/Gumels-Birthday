import * as THREE from "three";

/**
 * Generate 3D positions on the surface of a heart shape.
 * Returns an array of Vector3 positions.
 */
export function generateHeartPoints(count: number, scale = 1.8): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i < count; i++) {
    // parametric heart in XY, scatter across Z
    const t = (i / count) * Math.PI * 2;
    // Classic heart parametric
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t);
    // Add some 3D depth variation
    const jitter = 0.6;
    const z = (Math.random() - 0.5) * jitter * 4;
    const xj = x / 16 + (Math.random() - 0.5) * jitter * 0.3;
    const yj = y / 13 + (Math.random() - 0.5) * jitter * 0.3;
    points.push(new THREE.Vector3(xj * scale, yj * scale * 0.9, z));
  }
  return points;
}

/**
 * Generate random scattered positions within a sphere.
 */
export function generateScatteredPoints(count: number, radius = 5): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = radius * Math.cbrt(Math.random());
    points.push(
      new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      )
    );
  }
  return points;
}

/**
 * Generate wind-drift positions (petals blown away).
 */
export function generateDriftPoints(count: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i < count; i++) {
    points.push(
      new THREE.Vector3(
        (Math.random() - 0.3) * 14,
        (Math.random() - 0.5) * 10 + 2,
        (Math.random() - 0.5) * 8
      )
    );
  }
  return points;
}
