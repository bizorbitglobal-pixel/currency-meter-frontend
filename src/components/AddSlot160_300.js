"use client";
import Script from "next/script";
import { useEffect } from "react";

export default function AdSlot160x300() {
  useEffect(() => {
    // Set ad configuration globally before script executes
    window.atOptions = {
      key: "ac464d4a9edb061acba728866b8c9627",
      format: "iframe",
      height: 300,
      width: 160,
      params: {},
    };
  }, []);

  return (
    <>
      {/* External ad script */}
      <Script
        id="highperformanceformat-ad"
        strategy="afterInteractive"
        src="//www.highperformanceformat.com/ac464d4a9edb061acba728866b8c9627/invoke.js"
      />

      
    </>
  );
}
