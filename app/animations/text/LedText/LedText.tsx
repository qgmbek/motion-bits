"use client";

import { motion } from "framer-motion";

export default function LedText() {
  const text = "Led Text";
  const letters = text.split("");

  return (
    <motion.div
      style={{
        color: "#00ffb4",
        display: "flex",
        gap: "0.1em",
        zIndex: 2,
      }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          style={{
            display: "inline-block",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: [0, 1, 1, 0.95, 1],
            y: 0,
            textShadow: [
              "0px 0px 0px rgba(0,255,180,0)",
              "0px 0px 8px rgba(0,255,180,0.6)",
              "0px 0px 16px rgba(0,255,180,0.8)",
              "0px 0px 12px rgba(0,255,180,0.5)",
              "0px 0px 18px rgba(0,255,180,1)",
            ],
          }}
          transition={{
            duration: 2,
            delay: index * 0.15,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
}
