"use client";

import { motion } from "framer-motion";

const text = "Wave Text Animation";

export default function WaveText() {
  return (
    <div
      style={{
        letterSpacing: "-0.02em",
      }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          style={{
            display: "inline-block",
            whiteSpace: "pre",
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, -4, 0],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.08,
          }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}
