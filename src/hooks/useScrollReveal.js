import { useEffect, useRef, useState } from "react";

function getInitialVisible() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(getInitialVisible);
  const threshold = options.threshold ?? 0.12;
  const rootMargin = options.rootMargin ?? "0px 0px -48px 0px";

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
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [visible, threshold, rootMargin]);

  return { ref, visible };
}
