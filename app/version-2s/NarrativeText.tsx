"use client";

import { motion } from "framer-motion";

const text = "Narrative Text unfolds like a quiet film subtitle";

export default function NarrativeText() {
  const words = text.split(" ");

  return (
    <div
      style={{
        fontSize: "36px",
        fontWeight: 500,
        letterSpacing: "-0.02em",
      }}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.18, // story pacing
            },
          },
        }}
        style={{ display: "flex", gap: "12px" }}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: {
                opacity: 0,
                y: 24,
              },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1], // cinematic easeOut
                  delay: i === 0 ? 0 : 0.4, // first word leads
                },
              },
            }}
            style={{
              display: "inline-block",
              whiteSpace: "nowrap",
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
