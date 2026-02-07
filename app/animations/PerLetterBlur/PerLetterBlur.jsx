"use client";

import { motion } from "framer-motion";

const text = "Per Letter Animation";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.035,
    },
  },
};

const letter = {
  hidden: {
    opacity: 0,
    filter: "blur(12px)",
    y: 12,
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function BlurText() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      style={{
        letterSpacing: "-0.02em",
      }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={letter}
          style={{
            display: "inline-block",
            whiteSpace: "pre",
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
}
