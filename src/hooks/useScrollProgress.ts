import { useEffect, useState } from "react";

/**
 * Returns the scroll progress of the page as a value from 0 to 1.
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      setProgress(window.scrollY / max);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return progress;
}
