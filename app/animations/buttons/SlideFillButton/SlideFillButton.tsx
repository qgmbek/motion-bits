"use client";

import { motion } from "framer-motion";

export default function SlideFillButton() {
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
        whileTap={{ scale: 0.95 }}
        style={{
          position: "relative",
          width: 240,
          height: 64,
          background: "#1a1a1a",
          border: "none",
          cursor: "pointer",
          padding: 0,
          overflow: "hidden",
          borderRadius: "12px",
        }}
      >
        <motion.div
          variants={{
            initial: {
              y: "100%",
            },
            hover: {
              y: "0%",
              transition: {
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
              },
            },
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "#06b6d4",
            borderRadius: "12px",
            zIndex: 0,
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
                delay: 0.1,
                duration: 0.3,
              },
            },
          }}
          style={{
            position: "relative",
            zIndex: 2,
            fontSize: "14px",
            textTransform: "uppercase",
            fontWeight: 600,
            fontFamily: "Inter, system-ui, -apple-system, sans-serif",
          }}
        >
          Slide Fill
        </motion.span>
      </motion.button>
    </div>
  );
}
