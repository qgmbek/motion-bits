"use client";

import { motion } from "framer-motion";

export default function GlitchHoverButton() {
  return (
    <div
      style={{
        height: "100%",
        minHeight: 280,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0a",
      }}
    >
      <motion.button
        initial="rest"
        whileHover="hover"
        whileTap={{ scale: 0.98 }}
        style={{
          position: "relative",
          padding: "16px 40px",
          border: "1px solid rgba(255,255,255,0.2)",
          background: "#111",
          color: "#fff",
          fontSize: 15,
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          cursor: "pointer",
          fontFamily: "ui-monospace, monospace",
        }}
      >
        <motion.span
          aria-hidden
          variants={{
            rest: { opacity: 0, x: 0 },
            hover: {
              opacity: [0, 1, 0, 1, 0],
              x: [-2, 2, -1, 1, 0],
              transition: { duration: 0.35, repeat: Infinity, repeatDelay: 0.1 },
            },
          }}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ff0080",
            mixBlendMode: "screen",
          }}
        >
          Glitch Hover
        </motion.span>
        <motion.span
          aria-hidden
          variants={{
            rest: { opacity: 0, x: 0 },
            hover: {
              opacity: [0, 1, 0, 1, 0],
              x: [2, -2, 1, -1, 0],
              transition: { duration: 0.35, repeat: Infinity, repeatDelay: 0.1 },
            },
          }}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#00ffff",
            mixBlendMode: "screen",
          }}
        >
          Glitch Hover
        </motion.span>
        <span style={{ position: "relative" }}>Glitch Hover</span>
      </motion.button>
    </div>
  );
}
