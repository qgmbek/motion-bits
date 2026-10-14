const code = `"use client";

import { motion } from "framer-motion";

export default function MorphShadeButton() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#0e0e10",
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
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
      >
        <motion.div
          variants={{
            initial: {
              borderRadius: "12px",
              backgroundColor: "#1a1a1a",
              boxShadow: "0 0 0 0 rgba(99, 102, 241, 0)",
            },
            hover: {
              borderRadius: "32px",
              backgroundColor: "#6366f1",
              boxShadow: "0 0 40px 8px rgba(99, 102, 241, 0.4)",
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
          }}
        />

        <motion.span
          variants={{
            initial: {
              color: "#e6e6e6",
              letterSpacing: "0.1em",
            },
            hover: {
              color: "#ffffff",
              letterSpacing: "0.15em",
              transition: {
                delay: 0.1,
                duration: 0.3,
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
          Morph Shade
        </motion.span>
      </motion.button>
    </div>
  );
}
`;

export default code;
