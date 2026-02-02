"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function BreathingText() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0.95, scale: 0.995 }}
      animate={
        reduceMotion
          ? { opacity: 1, scale: 1 }
          : {
              opacity: [0.85, 1, 0.85],
              scale: [0.91, 1, 0.91],
            }
      }
      transition={{
        duration: 4,
        ease: "easeInOut",
        repeat: reduceMotion ? 0 : Infinity,
      }}
      style={{
        fontSize: "52px",
        fontWeight: 400,
        letterSpacing: "-0.02em",
        color: "#fff",
        display: "inline-block",
      }}
    >
      Breathing Text
    </motion.div>
  );
}
