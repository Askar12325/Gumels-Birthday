import { useEffect, useRef } from "react";
import { lerp } from "../lib/utils";

export interface ParallaxState {
  x: number; // -1 to 1
  y: number; // -1 to 1
}

/**
 * Returns a ref-backed parallax state updated each animation frame.
 * Smoothly interpolates mouse/gyro position.
 */
export function useMouseParallax(): React.RefObject<ParallaxState> {
  const state = useRef<ParallaxState>({ x: 0, y: 0 });
  const target = useRef<ParallaxState>({ x: 0, y: 0 });

  useEffect(() => {
    // Desktop mouse
    function onMouseMove(e: MouseEvent) {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    }

    // Mobile gyroscope
    function onDeviceOrientation(e: DeviceOrientationEvent) {
      if (e.gamma == null || e.beta == null) return;
      target.current.x = Math.max(-1, Math.min(1, e.gamma / 30));
      target.current.y = Math.max(-1, Math.min(1, (e.beta - 45) / 30));
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("deviceorientation", onDeviceOrientation, {
      passive: true,
    });

    let rafId: number;
    function tick() {
      state.current.x = lerp(state.current.x, target.current.x, 0.06);
      state.current.y = lerp(state.current.y, target.current.y, 0.06);
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("deviceorientation", onDeviceOrientation);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return state;
}
