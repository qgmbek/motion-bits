"use client";

import { motion } from "framer-motion";

const text = "Blur Text Animation";

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
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function BlurText() {
  return (
    <div
      style={{
        minHeight: "150vh",
        background: "#0a0a0a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <motion.h1
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        style={{
          fontSize: 56,
          fontWeight: 600,
          letterSpacing: "-0.02em",
          display: "flex",
        }}
      >
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            variants={letter}
            style={{
              position: "relative",
              display: "inline-block",
              whiteSpace: "pre",
            }}
          >
            {/* Red channel */}
            <motion.span
              aria-hidden
              initial={{
                filter: "blur(14px)",
                x: -6,
                opacity: 0.6,
              }}
              animate={{
                filter: "blur(0px)",
                x: 0,
                opacity: 0,
              }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                position: "absolute",
                inset: 0,
                color: "#ff4d4d",
                pointerEvents: "none",
              }}
            >
              {char}
            </motion.span>

            {/* Blue channel */}
            <motion.span
              aria-hidden
              initial={{
                filter: "blur(14px)",
                x: 6,
                opacity: 0.6,
              }}
              animate={{
                filter: "blur(0px)",
                x: 0,
                opacity: 0,
              }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                position: "absolute",
                inset: 0,
                color: "#4d7cff",
                pointerEvents: "none",
              }}
            >
              {char}
            </motion.span>

            {/* Main letter */}
            <motion.span
              initial={{
                filter: "blur(12px)",
              }}
              animate={{
                filter: "blur(0px)",
              }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                color: "#ffffff",
                position: "relative",
              }}
            >
              {char}
            </motion.span>
          </motion.span>
        ))}
      </motion.h1>
    </div>
  );
}
