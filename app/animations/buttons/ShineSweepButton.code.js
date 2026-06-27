const code = `"use client";

import { motion } from "framer-motion";

export default function ShineSweepButton() {
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
        whileTap={{ scale: 0.97 }}
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "16px 40px",
          borderRadius: 10,
          border: "1px solid rgba(255,255,255,0.15)",
          background: "#141414",
          color: "#fff",
          fontSize: 15,
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          cursor: "pointer",
        }}
      >
        <motion.span
          variants={{
            rest: { x: "-120%" },
            hover: { x: "120%", transition: { duration: 0.7, ease: "easeInOut" } },
          }}
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.35) 50%, transparent 60%)",
            pointerEvents: "none",
          }}
        />
        <span style={{ position: "relative", zIndex: 1 }}>Shine Sweep</span>
      </motion.button>
    </div>
  );
}
`;

export default code;
