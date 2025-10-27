"use client";
import { useEffect } from "react";

export default function AddSlot() {
  useEffect(() => {
    // Ensure old scripts are cleared before reloading new one
    const existingScript = document.getElementById("effectivegate-script");
    if (existingScript) existingScript.remove();

    // Create the script element
    const script = document.createElement("script");
    script.id = "effectivegate-script";
    script.src = "https://pl27824467.effectivegatecpm.com/7076df2eeb869e5e6f25661a6c818963/invoke.js";
    script.async = true;

    // Append script to body after container is ready
    const container = document.getElementById("container-7076df2eeb869e5e6f25661a6c818963");
    if (container) {
      container.innerHTML = ""; // clear old ad if remounting
      container.appendChild(script);
    } else {
      document.body.appendChild(script); // fallback if container not found
    }

    // Optional cleanup on unmount
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div
      id="container-7076df2eeb869e5e6f25661a6c818963"
      className="my-6 flex justify-center"
      style={{ minHeight: "250px" }}
    />
  );
}
