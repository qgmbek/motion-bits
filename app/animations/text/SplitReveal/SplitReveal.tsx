"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type SplitRevealProps = {
  children?: ReactNode;
};

export default function SplitReveal({
  children = "Split Reveal",
}: SplitRevealProps) {
  const text = typeof children === "string" ? children : "Split Reveal";

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
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
            variants={{
              hidden: {
                y: "120%",
                filter: "blur(8px)",
              },
              visible: {
                y: "0%",
                filter: "blur(0px)",
              },
            }}
            transition={{
              duration: 0.2,
              ease: [0.22, 1, 0.36, 1],
              delay: i * 0.02,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}
