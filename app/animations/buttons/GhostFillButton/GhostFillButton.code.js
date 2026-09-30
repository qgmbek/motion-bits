const code = `"use client";

import { motion } from "framer-motion";

export default function GhostFillButton() {
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
          overflow: "hidden",
          padding: "16px 40px",
          borderRadius: 10,
          border: "1px solid #fff",
          background: "transparent",
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
            rest: { scaleY: 0 },
            hover: { scaleY: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
          }}
          style={{
            position: "absolute",
            inset: 0,
            background: "#fff",
            transformOrigin: "bottom",
            zIndex: 0,
          }}
        />
        <motion.span
          variants={{
            rest: { color: "#fff" },
            hover: { color: "#000", transition: { delay: 0.15 } },
          }}
          style={{ position: "relative", zIndex: 1 }}
        >
          Ghost Fill
        </motion.span>
      </motion.button>
    </div>
  );
}
`;

export default code;
