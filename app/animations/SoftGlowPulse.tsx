"use client";

import { motion } from "framer-motion";

export default function SoftGlowPulse() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0a",
      }}
    >
      <motion.h1
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{
          opacity: [0.6, 1, 0.8],
          textShadow: [
            "0 0 20px rgba(0,255,200,0.25)",
            "0 0 40px rgba(0,255,200,0.45)",
            "0 0 25px rgba(0,255,200,0.3)",
          ],
        }}
        transition={{
          duration: 3.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        }}
        style={{
          fontSize: "clamp(3rem, 8vw, 7rem)",
          fontWeight: 600,
          letterSpacing: "-0.02em",
          color: "#eafff9",
          filter: "blur(0.2px)", // kills harsh digital edges
        }}
      >
        Soft Glow Pulse
      </motion.h1>
    </div>
  );
}
