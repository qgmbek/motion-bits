"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function PowerOnText() {
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setBooted(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        background: "#0a0a0f",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
        fontFamily: "'Cinzel', serif",
      }}
    >
      {/* Power Flash */}
      {!booted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.3, 0.8, 0] }}
          transition={{ duration: 0.6 }}
          style={{
            position: "absolute",
            inset: 0,
            background: "white",
            zIndex: 2,
          }}
        />
      )}

      {/* Scanline Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "repeating-linear-gradient( to bottom, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 2px, transparent 4px )",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Text */}
      <motion.h1
        initial={{
          opacity: 0,
          scale: 1.4,
          filter: "blur(12px)",
          letterSpacing: "0.5em",
        }}
        animate={
          booted
            ? {
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                letterSpacing: "0.15em",
              }
            : {
                opacity: [0, 1, 0.3, 0.8, 0],
              }
        }
        transition={{
          duration: 1.4,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          fontSize: "clamp(2.5rem, 6vw, 6rem)",
          color: "#d8d8e0",
          textTransform: "uppercase",
          textAlign: "center",
          textShadow: booted
            ? "0 0 8px rgba(200,200,255,0.4)"
            : "0 0 25px rgba(255,255,255,1)",
          zIndex: 3,
          position: "relative",
        }}
      >
        {booted ? "Power-On Text" : "████████████"}
      </motion.h1>

      {/* Subtle Flicker */}
      {booted && (
        <motion.div
          animate={{
            opacity: [0.04, 0.08, 0.03, 0.07, 0.05],
          }}
          transition={{
            repeat: Infinity,
            duration: 0.3,
          }}
          style={{
            position: "absolute",
            inset: 0,
            background: "#ffffff",
            mixBlendMode: "overlay",
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
}
