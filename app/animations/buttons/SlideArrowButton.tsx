"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function SlideArrowButton() {
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
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "16px 28px",
          borderRadius: 999,
          border: "1px solid rgba(255,255,255,0.12)",
          background: "#111",
          color: "#fff",
          fontSize: 15,
          fontWeight: 500,
          cursor: "pointer",
        }}
      >
        <motion.span variants={{ rest: { x: 0 }, hover: { x: -4 } }}>Get Started</motion.span>
        <motion.span
          variants={{
            rest: { x: -8, opacity: 0 },
            hover: { x: 0, opacity: 1, transition: { duration: 0.25 } },
          }}
          style={{ display: "flex", alignItems: "center" }}
        >
          <ArrowRight size={18} />
        </motion.span>
      </motion.button>
    </div>
  );
}
