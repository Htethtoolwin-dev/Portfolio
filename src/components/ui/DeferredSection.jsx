import { useEffect, useRef, useState } from "react";

export default function DeferredSection({ children, rootMargin = "500px 0px" }) {
  const ref = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || shouldRender) return;

    const preload = () => setShouldRender(true);
    window.addEventListener("portfolio:preload-sections", preload);

    if (window.location.hash) {
      preload();
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      window.removeEventListener("portfolio:preload-sections", preload);
    };
  }, [shouldRender, rootMargin]);

  return <div ref={ref}>{shouldRender ? children : null}</div>;
}
