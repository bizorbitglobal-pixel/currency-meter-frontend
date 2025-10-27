"use client";
import { useEffect } from "react";

/**
 * Universal ad component for any iframe-based ad network (Adsterra, HighPerformanceFormat, etc.)
 *
 * @param {string} keyId - The unique ad key or ID (e.g., 'ef9445ea813717165ee0d59dc8f378c6')
 * @param {string} srcDomain - The ad network domain (e.g., 'www.highperformanceformat.com')
 * @param {string|number} width - Ad width in px or %
 * @param {string|number} height - Ad height in px
 * @param {string} format - Format type (e.g., 'iframe', 'banner', 'popup')
 * @param {object} params - Optional additional parameters
 */
export default function AdBanner({
  keyId,
  srcDomain = "www.highperformanceformat.com",
  width = 300,
  height = 250,
  format = "iframe",
  params = {},
}) {
  useEffect(() => {
    // Cleanup any existing ad instance before reloading
    const containerId = `ad-container-${keyId}`;
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = ""; // clear previous iframe

    // Define the global ad configuration object (required by ad scripts)
    window.atOptions = {
      key: keyId,
      format,
      height,
      width,
      params,
    };

    // Create the <script> dynamically
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://${srcDomain}/${keyId}/invoke.js`;
    script.async = true;

    container.appendChild(script);

    // Cleanup on unmount
    return () => {
      if (container) container.innerHTML = "";
    };
  }, [keyId, srcDomain, width, height, format, params]);

  return (
    <div
      id={`ad-container-${keyId}`}
      className="flex justify-center items-center my-6"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        overflow: "hidden",
      }}
    >
      <p className="text-xs text-gray-500 italic">Loading ad...</p>
    </div>
  );
}
