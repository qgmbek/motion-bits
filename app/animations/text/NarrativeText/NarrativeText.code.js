const code = `"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type NarrativeTextProps = {
  children?: ReactNode;
};

export default function NarrativeText({
  children = "Narrative Cinematic Text Animation",
}: NarrativeTextProps) {
  const text =
    typeof children === "string"
      ? children
      : "Narrative Cinematic Text Animation";
  const words = text.split(" ");

  return (
    <div style={{ overflow: "hidden" }}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.18,
            },
          },
        }}
        style={{
          display: "flex",
          gap: "0.35em",
          fontSize: "36px",
          fontWeight: 400,
          lineHeight: 1.1,
        }}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: {
                opacity: 0,
                y: i === 0 ? 40 : 24,
                filter: "blur(8px)",
              },
              visible: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: {
                  duration: i === 0 ? 0.9 : 0.6,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
            style={{ display: "inline-block" }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
`;

export default code;
