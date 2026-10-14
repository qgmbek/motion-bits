const code = `"use client";

import { motion } from "framer-motion";

export default function ScaleSweepButton() {
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
          overflow: "hidden",
        }}
      >
        <motion.div
          variants={{
            initial: {
              scaleX: 0,
              originX: 0,
            },
            hover: {
              scaleX: 1,
              originX: 0,
              transition: {
                duration: 0.5,
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
            backgroundColor: "#10b981",
            borderRadius: "12px",
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
                delay: 0.15,
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
          Scale Sweep
        </motion.span>
      </motion.button>
    </div>
  );
}
`;

export default code;
