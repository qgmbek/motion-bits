"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

export default function ScanlineRevealText() {
  const text = "Scanline Reveal";

  // split text into characters so scan feels granular
  const chars = useMemo(() => text.split(""), [text]);

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        overflow: "hidden",
        background: "#000",
        padding: "24px 32px",
      }}
    >
      {/* PHOSPHOR GLOW */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          filter: "blur(12px)",
          opacity: 0.35,
          pointerEvents: "none",
          color: "#7CFF9B",
          fontSize: 48,
          fontFamily: "monospace",
          letterSpacing: "0.08em",
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </div>

      {/* TEXT */}
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

      {/* SCANLINE MASK */}
      <motion.div
        initial={{ y: "-120%" }}
        animate={{ y: "120%" }}
        transition={{
          duration: 1.1,
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
