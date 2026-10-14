"use client";

import { motion } from "framer-motion";

export default function PressGlowButton() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <motion.button
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        style={{
          position: "relative",
          width: 240,
          height: 64,
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
      >
        <motion.div
          variants={{
            initial: {
              backgroundColor: "#1a1a1a",
              boxShadow: "0 0 0 0 rgba(251, 191, 36, 0)",
              borderRadius: "12px",
            },
            hover: {
              backgroundColor: "#2a2a2a",
              boxShadow: "0 0 0 0 rgba(251, 191, 36, 0)",
              borderRadius: "12px",
              transition: {
                duration: 0.3,
              },
            },
            tap: {
              backgroundColor: "#fbbf24",
              boxShadow: "0 0 60px 20px rgba(251, 191, 36, 0.6)",
              borderRadius: "12px",
              transition: {
                duration: 0.2,
              },
            },
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />

        <motion.span
          variants={{
            initial: {
              color: "#e6e6e6",
            },
            hover: {
              color: "#ffffff",
              transition: {
                duration: 0.3,
              },
            },
            tap: {
              color: "#000000",
              transition: {
                duration: 0.2,
              },
            },
          }}
          style={{
            position: "relative",
            zIndex: 1,
            fontSize: "14px",
            textTransform: "uppercase",
            fontWeight: 600,
            fontFamily: "Inter, system-ui, -apple-system, sans-serif",
          }}
        >
          Press Glow
        </motion.span>
      </motion.button>
    </div>
  );
}
