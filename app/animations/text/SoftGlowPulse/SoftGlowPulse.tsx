"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type SoftGlowPulseProps = {
  children?: ReactNode;
};

export default function SoftGlowPulse({
  children = "Soft Glow Pulse",
}: SoftGlowPulseProps) {
  const text = typeof children === "string" ? children : "Soft Glow Pulse";
  return (
    <motion.div
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
        letterSpacing: "-0.02em",
        color: "#eafff9",
        filter: "blur(0.2px)", // kills harsh digital edges
      }}
    >
      {text}
    </motion.div>
  );
}
