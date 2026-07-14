import { useEffect, useRef, useState } from "react";

function getInitialVisible() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(getInitialVisible);

  useEffect(() => {
    if (visible) return;

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: options.threshold ?? 0.12,
        rootMargin: options.rootMargin ?? "0px 0px -48px 0px",
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [visible, options.threshold, options.rootMargin]);

  return { ref, visible };
}
