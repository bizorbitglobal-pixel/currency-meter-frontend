"use client";

export default function AddSlot() {
  return (
    <>
      {/* The ad script */}
      <Script
        id="effective-gate-ad"
        strategy="afterInteractive"
        data-cfasync="false"
        src="//pl27824467.effectivegatecpm.com/7076df2eeb869e5e6f25661a6c818963/invoke.js"
      />

      {/* The ad container */}
      <div
        id="container-7076df2eeb869e5e6f25661a6c818963"
        className="my-6 flex justify-center"
      ></div>
    </>
  );
}
