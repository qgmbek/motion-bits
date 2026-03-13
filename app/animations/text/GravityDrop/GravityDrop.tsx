"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type GravityDropProps = {
  children?: ReactNode;
};

export default function GravityDrop({
  children = "Gravity Drop",
}: GravityDropProps) {
  const text = typeof children === "string" ? children : "Gravity Drop";
  return (
    <div
      style={{
        overflow: "hidden",
        letterSpacing: "-0.03em",
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
