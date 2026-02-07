"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

export default function LiquidMaskReveal() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh", // Full viewport for dramatic effect
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0a0a0a",
        overflow: "hidden",
        fontFamily: "'Playfair Display', serif", // Premium fashion vibe
      }}
    >
      {/* 1. The Definition Layer 
        This SVG is invisible (width/height 0) but defines the clipPath shape.
      */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <clipPath id="liquid-mask" clipPathUnits="objectBoundingBox">
            {/* We animate the scale of this path to "open" the liquid */}
            <motion.path
              d="M0.5,0.5 m-0.2,0 a0.2,0.2 0 1,0 0.4,0 a0.2,0.2 0 1,0 -0.4,0"
              initial={{ scale: 0, transformOrigin: "center" }}
              animate={isInView ? { scale: 15 } : { scale: 0 }}
              transition={{
                duration: 2.5,
                ease: [0.77, 0, 0.175, 1], // "Quart" ease for a dramatic slow finish
              }}
              // The path below is a simple circle, but you can swap d for a wobbly blob
              // For a true liquid feel, we rely on the ease and scale speed
            />
          </clipPath>
        </defs>
      </svg>

      {/* 2. The Content Layer 
        This applies the clip-path defined above.
      */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          clipPath: "url(#liquid-mask)", // References the SVG above
          WebkitClipPath: "url(#liquid-mask)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff", // Text background (reveal color)
        }}
      >
        {/* Parallax Content Container */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
          style={{ textAlign: "center", padding: "20px" }}
        >
          <h1
            style={{
              fontSize: "clamp(3rem, 8vw, 8rem)",
              lineHeight: "1",
              margin: 0,
              color: "#0a0a0a",
              letterSpacing: "-0.03em",
              fontWeight: "400",
            }}
          >
            Liquid Mask
            <br />
            <span style={{ fontStyle: "italic" }}>Reveal</span>
          </h1>

          <p
            style={{
              marginTop: "2rem",
              fontSize: "1.2rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#555",
            }}
          >
            Autumn / Winter Collection
          </p>
        </motion.div>
      </div>

      {/* 3. The Background Hint
        What the user sees before the reveal.
      */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ color: "#333", fontSize: "14px", letterSpacing: "2px" }}>
          SCROLL TO REVEAL
        </span>
      </div>
    </div>
  );
}
