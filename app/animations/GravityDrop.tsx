"use client";

import { motion } from "framer-motion";

const text = "Gravity Drop";

export default function GravityDrop() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        overflow: "hidden",
        fontSize: "clamp(3rem, 8vw, 6rem)",
        fontWeight: 700,
        letterSpacing: "-0.04em",
        color: "#fff",
      }}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.06,
              delayChildren: 0.2,
            },
          },
        }}
        style={{ display: "flex" }}
      >
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: {
                y: -120,
                opacity: 0,
              },
              visible: {
                y: 0,
                opacity: 1,
                transition: {
                  type: "spring",
                  stiffness: 500,
                  damping: 18,
                  mass: 0.8,
                },
              },
            }}
            style={{
              display: "inline-block",
              marginRight: char === " " ? "0.35em" : "0",
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
