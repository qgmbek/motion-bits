const code = `"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type TextRevealWaveProps = {
  children?: ReactNode;
};

export default function TextRevealWave({
  children = "Text Reveal Wave",
}: TextRevealWaveProps) {
  const text = typeof children === "string" ? children : "Text Reveal Wave";

  return (
    <motion.div
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.06,
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
              opacity: 0,
              scale: 0,
              rotate: -180,
            },
            show: {
              opacity: 1,
              scale: 1,
              rotate: 0,
              transition: {
                type: "spring",
                damping: 15,
                stiffness: 200,
              },
            },
          }}
          style={{
            display: "inline-block",
            whiteSpace: "pre",
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
