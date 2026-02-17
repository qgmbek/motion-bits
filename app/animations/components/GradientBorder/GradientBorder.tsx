"use client";

import { motion } from "framer-motion";

export default function GradientBorder() {
  return (
    <div
      style={{
        position: "relative",
        width: "320px",
        height: "200px",
        borderRadius: "14px",
        overflow: "hidden",
        padding: "2px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          position: "absolute",
          width: "250%",
          height: "250%",
          background:
            "conic-gradient(from 0deg, #ff0000, #ff0080, #ff00ff, #8000ff, #0000ff, #0080ff, #00ffff, #00ff80, #00ff00, #80ff00, #ffff00, #ff8000, #ff0000)",
          filter: "blur(40px) brightness(1.2)",
          opacity: 0.8,
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0, 1)",
          borderRadius: "12px",
          boxShadow: "inset 0 0 20px rgba(0,0,0,0.5)",
        }}
      ></div>
    </div>
  );
}
