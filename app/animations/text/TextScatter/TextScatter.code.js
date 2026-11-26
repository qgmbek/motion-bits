const code = `"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type TextScatterProps = {
  children?: ReactNode;
};

export default function TextScatter({
  children = "Text Scatter",
}: TextScatterProps) {
  const text = typeof children === "string" ? children : "Text Scatter";

  return (
    <motion.div
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.03,
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
      {text.split("").map((char, i) => {
        const randomX = ((((i * 37 + 11) % 101) / 100) - 0.5) * 200;
        const randomY = ((((i * 53 + 17) % 101) / 100) - 0.5) * 200;
        const randomRotate = ((((i * 29 + 23) % 101) / 100) - 0.5) * 180;
        return (
          <motion.span
            key={i}
            variants={{
              hidden: {
                x: randomX,
                y: randomY,
                rotate: randomRotate,
                opacity: 0,
              },
              show: {
                x: 0,
                y: 0,
                rotate: 0,
                opacity: 1,
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
            {char === " " ? "\\u00A0" : char}
          </motion.span>
        );
      })}
    </motion.div>
  );
}
`;

export default code;
