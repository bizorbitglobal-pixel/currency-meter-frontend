"use client";

import React, { useEffect } from "react";

export default function AddSlot() {
  useEffect(() => {
    // Check if Ezoic standalone is loaded on the window
    if (window.ezstandalone) {
      try {
        window.ezstandalone.cmd.push(function () {
          // Define the placeholder and then show the ad
          window.ezstandalone.showAds(101);
        });
      } catch (e) {
        console.error("Ezoic error:", e);
      }
    }
  }, []);

  return (
    <div className="ad-container my-4 flex justify-center">
      {/* The actual placeholder Ezoic looks for */}
      <div id="ezoic-pub-ad-placeholder-101"></div>
    </div>
  );
}