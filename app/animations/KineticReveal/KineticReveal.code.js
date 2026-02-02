const code = `"use client";

import { motion } from "framer-motion";

const text = "Kinetic Text";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const letter = {
  hidden: {
    y: "120%",
    rotate: 12,
    opacity: 0,
  },
  show: {
    y: "0%",
    rotate: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 14,
      stiffness: 180,
      mass: 0.6,
    },
  },
};

export default function KineticText() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0b0b0b",
        overflow: "hidden",
      }}
    >
      <motion.h1
        variants={container}
        initial="hidden"
        animate="show"
        style={{
          display: "flex",
          gap: "0.08em",
          fontSize: "clamp(3rem, 10vw, 8rem)",
          fontWeight: 700,
          letterSpacing: "-0.04em",
          color: "#fff",
        }}
      >
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            variants={letter}
            style={{
              display: "inline-block",
              willChange: "transform",
            }}
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              repeat: Infinity,
              repeatDelay: 3 + i * 0.15,
              duration: 1.6,
              ease: "easeInOut",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.h1>
    </div>
  );
}
`;

export default code;
