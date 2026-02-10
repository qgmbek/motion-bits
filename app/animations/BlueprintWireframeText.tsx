"use client";

import { motion } from "framer-motion";

export default function BlueprintWireframeText() {
  const text = "Blueprint Wireframe Text";

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#050b14",
      }}
    >
      <svg
        width="900"
        height="200"
        viewBox="0 0 900 200"
        style={{ overflow: "visible" }}
      >
        {/* OUTLINE */}
        <motion.text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="72"
          fontFamily="monospace"
          fill="transparent"
          stroke="#5fb9ff"
          strokeWidth="2"
          strokeDasharray="600"
          strokeDashoffset="600"
          style={{
            filter: "drop-shadow(0 0 6px rgba(95,185,255,0.6))",
            letterSpacing: "2px",
          }}
          animate={{
            strokeDashoffset: 0,
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
          }}
        >
          {text}
        </motion.text>

        {/* FILL */}
        <motion.text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="72"
          fontFamily="monospace"
          fill="#e6f4ff"
          opacity={0}
          style={{
            letterSpacing: "2px",
            filter: "drop-shadow(0 0 12px rgba(95,185,255,0.35))",
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1.9,
            duration: 0.8,
            ease: "easeOut",
          }}
        >
          {text}
        </motion.text>
      </svg>
    </div>
  );
}
