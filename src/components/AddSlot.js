"use client";
import { useEffect } from "react";

export default function AddSlot({ slot, format = "auto", responsive = "true" }) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.log("Ads not loaded yet");
    }
  }, []);

  return (
    <ins
      className="adsbygoogle block my-6"
      style={{ display: "block" }}
      data-ad-client="ca-pub-XXXXXXX"   // replace with your AdSense ID
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive}
    ></ins>
  );
}
