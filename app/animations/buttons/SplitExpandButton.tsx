"use client";

import { motion } from "framer-motion";

export default function SplitExpandButton() {
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
          padding: "16px 36px",
          border: "none",
          background: "transparent",
          color: "#fff",
          fontSize: 15,
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          cursor: "pointer",
        }}
      >
        <motion.span
          variants={{
            rest: { scaleX: 0.3, opacity: 0.4 },
            hover: { scaleX: 1, opacity: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: "#a78bfa",
            transformOrigin: "center",
          }}
        />
        <motion.span
          variants={{
            rest: { scaleX: 0.3, opacity: 0.4 },
            hover: { scaleX: 1, opacity: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
          }}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 1,
            background: "#a78bfa",
            transformOrigin: "center",
          }}
        />
        <motion.span
          variants={{
            rest: { letterSpacing: "0.1em" },
            hover: { letterSpacing: "0.2em", transition: { duration: 0.35 } },
          }}
        >
          Split Expand
        </motion.span>
      </motion.button>
    </div>
  );
}
