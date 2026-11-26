import { useEffect, useState } from "react";

/**
 * Returns scroll progress within the hero section (0 → 1).
 * Uses IntersectionObserver + scroll event for efficiency.
 */
export function useHeroScroll(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function update() {
      const heroEl = document.getElementById("hero");
      if (!heroEl) return;
      const rect = heroEl.getBoundingClientRect();
      const h = heroEl.offsetHeight;
      // progress goes 0→1 as the hero scrolls from visible to above viewport
      const p = Math.max(0, Math.min(1, -rect.top / h));
      setProgress(p);
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return progress;
}
