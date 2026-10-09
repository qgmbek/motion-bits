"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type TextGlowProps = {
  children?: ReactNode;
  color?: string;
};

export default function TextGlow({
  children = "Text Glow",
  color = "#00ff88",
}: TextGlowProps) {
  const text = typeof children === "string" ? children : "Text Glow";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      style={{
        letterSpacing: "-0.02em",
        display: "inline-block",
      }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          style={{
            display: "inline-block",
            whiteSpace: "pre",
            textShadow: `0 0 20px ${color}`,
          }}
          animate={{
            textShadow: [
              `0 0 20px ${color}`,
              `0 0 40px ${color}, 0 0 60px ${color}`,
              `0 0 20px ${color}`,
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
            ease: "easeInOut",
            delay: i * 0.05,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
}
