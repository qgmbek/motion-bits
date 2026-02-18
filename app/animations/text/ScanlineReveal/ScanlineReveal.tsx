"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

export default function ScanlineReveal() {
  const text = "Scanline Reveal";

  const chars = useMemo(() => text.split(""), [text]);

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        overflow: "hidden",
        padding: "24px 12px",
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          fontSize: 48,
          fontFamily: "monospace",
          letterSpacing: "0.08em",
          color: "#7CFF9B",
        }}
      >
        {chars.map((char, i) => (
          <motion.span
            key={i}
            initial={{
              opacity: 0,
              filter: "blur(6px)",
            }}
            animate={{
              opacity: [0, 1, 0.85, 1],
              filter: ["blur(6px)", "blur(0px)"],
            }}
            transition={{
              delay: i * 0.035,
              duration: 0.45,
              ease: "easeOut",
            }}
            style={{
              display: "inline-block",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>

      <motion.div
        initial={{ y: "-140%" }}
        animate={{ y: "120%" }}
        transition={{
          duration: 0.8,
          ease: "linear",
        }}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: "24px",
          background:
            "linear-gradient(to bottom, transparent, rgba(124,255,155,0.35), transparent)",
          mixBlendMode: "screen",
          pointerEvents: "none",
        }}
      />

      {/* FLICKER */}
      <motion.div
        animate={{ opacity: [0.04, 0.09, 0.05, 0.08] }}
        transition={{
          repeat: Infinity,
          duration: 0.15,
          ease: "linear",
        }}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "repeating-linear-gradient(to bottom, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 2px, transparent 4px)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
