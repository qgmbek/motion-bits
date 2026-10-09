"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type TextSpinProps = {
  children?: ReactNode;
};

export default function TextSpin({
  children = "Text Spin",
}: TextSpinProps) {
  const text = typeof children === "string" ? children : "Text Spin";

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
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
            ease: "linear",
            delay: i * 0.1,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
}
