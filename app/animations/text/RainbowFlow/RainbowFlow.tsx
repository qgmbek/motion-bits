"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type RainbowFlowProps = {
  children?: ReactNode;
};

const colors = [
  "#ff0000",
  "#ff7f00",
  "#ffff00",
  "#00ff00",
  "#0000ff",
  "#4b0082",
  "#9400d3",
];

export default function RainbowFlow({
  children = "Rainbow Flow",
}: RainbowFlowProps) {
  const text = typeof children === "string" ? children : "Rainbow Flow";

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
            color: colors[i % colors.length],
          }}
          animate={{
            color: colors,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
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
