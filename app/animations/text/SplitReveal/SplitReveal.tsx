"use client";

import { motion } from "framer-motion";

const text = "Split Reveal";

export default function SplitReveal() {
  return (
    <div
      style={{
        gap: "0.04em",
      }}
    >
      {text.split("").map((char, i) => (
        <span
          key={i}
          style={{
            overflow: "hidden",
            display: "inline-block",
          }}
        >
          <motion.span
            style={{ display: "inline-block" }}
            initial={{
              y: "120%",
              filter: "blur(8px)",
            }}
            animate={{
              y: "0%",
              filter: "blur(0px)",
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: i * 0.06,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </div>
  );
}
