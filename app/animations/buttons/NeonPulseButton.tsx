"use client";

import { motion } from "framer-motion";

export default function NeonPulseButton() {
  return (
    <div
      style={{
        height: "100%",
        minHeight: 280,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#050508",
      }}
    >
      <motion.button
        animate={{
          boxShadow: [
            "0 0 8px rgba(167,139,250,0.4), 0 0 20px rgba(167,139,250,0.2)",
            "0 0 16px rgba(167,139,250,0.8), 0 0 40px rgba(167,139,250,0.4)",
            "0 0 8px rgba(167,139,250,0.4), 0 0 20px rgba(167,139,250,0.2)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        style={{
          padding: "16px 40px",
          borderRadius: 10,
          border: "1px solid #a78bfa",
          background: "transparent",
          color: "#e9d5ff",
          fontSize: 15,
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          cursor: "pointer",
        }}
      >
        Neon Pulse
      </motion.button>
    </div>
  );
}
