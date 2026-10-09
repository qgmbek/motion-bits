"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type TextJitterProps = {
  children?: ReactNode;
};

export default function TextJitter({
  children = "Text Jitter",
}: TextJitterProps) {
  const text = typeof children === "string" ? children : "Text Jitter";

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
          }}
          animate={{
            x: [0, -3, 3, -2, 2, 0],
            y: [0, 2, -2, 1, -1, 0],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 1.5,
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
