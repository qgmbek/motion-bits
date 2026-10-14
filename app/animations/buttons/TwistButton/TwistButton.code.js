const code = `"use client";

import { motion } from "framer-motion";

export default function TwistButton() {
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
              rotate: 0,
              scale: 1,
              borderRadius: "12px",
              backgroundColor: "#1a1a1a",
            },
            hover: {
              rotate: 180,
              scale: 1.05,
              borderRadius: "50%",
              backgroundColor: "#f472b6",
              transition: {
                duration: 0.6,
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
              rotate: 0,
              color: "#e6e6e6",
            },
            hover: {
              rotate: -180,
              color: "#ffffff",
              transition: {
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
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
          Twist Button
        </motion.span>
      </motion.button>
    </div>
  );
}
`;

export default code;
