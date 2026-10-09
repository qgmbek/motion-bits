"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type TextBounceProps = {
  children?: ReactNode;
};

export default function TextBounce({
  children = "Text Bounce",
}: TextBounceProps) {
  const text = typeof children === "string" ? children : "Text Bounce";

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
            y: [0, -30, 0],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatDelay: 0.2,
            ease: "easeOut",
            delay: i * 0.08,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
}
