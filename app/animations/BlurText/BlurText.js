"use client";

import { motion } from "framer-motion";

export default function BlurText() {
  return (
    <div
      style={{
        padding: 40,
        minHeight: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <motion.h1
        initial={{
          opacity: 0,
          filter: "blur(16px)",
          y: 20,
        }}
        animate={{
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
        }}
        transition={{
          duration: 1.4,
          ease: [0.16, 1, 0.3, 1], // awwwards-style ease
        }}
        style={{
          fontSize: 56,
          fontWeight: 600,
          color: "#ffffff",
          letterSpacing: "-0.02em",
        }}
      >
        Blur Text Animation
      </motion.h1>
    </div>
  );
}
