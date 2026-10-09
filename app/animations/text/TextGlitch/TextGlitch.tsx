"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type TextGlitchProps = {
  children?: ReactNode;
};

export default function TextGlitch({
  children = "Text Glitch",
}: TextGlitchProps) {
  const text = typeof children === "string" ? children : "Text Glitch";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      style={{
        letterSpacing: "-0.02em",
        display: "inline-block",
        position: "relative",
      }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          style={{
            display: "inline-block",
            whiteSpace: "pre",
            position: "relative",
          }}
          animate={{
            x: [0, -2, 2, -1, 1, 0],
            textShadow: [
              "none",
              "2px 0 #ff0000, -2px 0 #00ffff",
              "none",
              "-2px 0 #ff0000, 2px 0 #00ffff",
              "none",
            ],
          }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "steps(1)",
            delay: i * 0.05,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
}
