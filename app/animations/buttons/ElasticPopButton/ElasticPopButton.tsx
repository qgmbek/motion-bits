"use client";

import { motion } from "framer-motion";

export default function ElasticPopButton() {
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
        whileHover={{
          scale: 1.08,
          transition: { type: "spring", stiffness: 500, damping: 12 },
        }}
        whileTap={{
          scale: 0.88,
          transition: { type: "spring", stiffness: 600, damping: 10 },
        }}
        style={{
          padding: "18px 44px",
          borderRadius: 16,
          border: "none",
          background: "linear-gradient(135deg, #f97316, #ef4444)",
          color: "#fff",
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: "0.04em",
          cursor: "pointer",
          boxShadow: "0 8px 24px rgba(239,68,68,0.35)",
        }}
      >
        Elastic Pop
      </motion.button>
    </div>
  );
}
