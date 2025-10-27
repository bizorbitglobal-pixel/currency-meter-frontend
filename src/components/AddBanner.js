"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Lazy-loaded universal ad component for any iframe-based ad network.
 *
 * Automatically loads only when visible on screen (using IntersectionObserver).
 *
 * Example use:
 * <LazyAdBanner keyId="ef9445ea813717165ee0d59dc8f378c6" srcDomain="www.highperformanceformat.com" width={468} height={60} />
 */
export default function LazyAdBanner({
  keyId,
  srcDomain = "www.highperformanceformat.com",
  width = 300,
  height = 250,
  format = "iframe",
  params = {},
}) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect(); // stop observing once loaded
          }
        });
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const container = document.getElementById(`ad-container-${keyId}`);
    if (!container) return;

    // Define ad config globally (for networks like HighPerformanceFormat)
    window.atOptions = {
      key: keyId,
      format,
      height,
      width,
      params,
    };

    // Inject ad script dynamically
    const script = document.createElement("script");
    script.src = `https://${srcDomain}/${keyId}/invoke.js`;
    script.async = true;

    container.innerHTML = ""; // Clear old iframe before injecting
    container.appendChild(script);

    return () => {
      if (container) container.innerHTML = "";
    };
  }, [isVisible, keyId, srcDomain, width, height, format, params]);

  return (
    <div
      ref={containerRef}
      id={`ad-container-${keyId}`}
      className="flex justify-center items-center my-6"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        overflow: "hidden",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
      }}
    >
      {!isVisible && (
        <p className="text-xs text-gray-500 italic">Ad loading when visible...</p>
      )}
    </div>
  );
}
