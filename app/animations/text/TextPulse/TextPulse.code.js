const code = `"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type TextPulseProps = {
  children?: ReactNode;
  color?: string;
};

export default function TextPulse({
  children = "Text Pulse",
  color = "#ff6b6b",
}: TextPulseProps) {
  const text = typeof children === "string" ? children : "Text Pulse";

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
            opacity: [1, 0.3, 1],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 0.5,
            ease: "easeInOut",
            delay: i * 0.08,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
}
`;

export default code;
