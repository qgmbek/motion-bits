const code = `"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type TextWaveRevealProps = {
  children?: ReactNode;
};

export default function TextWaveReveal({
  children = "Text Wave Reveal",
}: TextWaveRevealProps) {
  const text = typeof children === "string" ? children : "Text Wave Reveal";

  return (
    <motion.div
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.08,
          },
        },
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      style={{
        letterSpacing: "-0.02em",
        display: "inline-block",
      }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: {
              y: 50,
              opacity: 0,
              rotateX: -90,
            },
            show: {
              y: 0,
              opacity: 1,
              rotateX: 0,
              transition: {
                type: "spring",
                damping: 12,
                stiffness: 200,
              },
            },
          }}
          style={{
            display: "inline-block",
            whiteSpace: "pre",
            transformOrigin: "bottom",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
}
`;

export default code;
