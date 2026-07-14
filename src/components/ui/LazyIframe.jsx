import { useEffect, useRef, useState } from "react";

export default function LazyIframe({ src, title, className, placeholderClassName }) {
  const containerRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || shouldLoad) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div ref={containerRef} className={placeholderClassName}>
      {shouldLoad ? (
        <iframe src={src} title={title} className={className} loading="lazy" />
      ) : (
        <div
          className={className}
          aria-hidden="true"
          role="presentation"
        />
      )}
    </div>
  );
}
