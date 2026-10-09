const code = `"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type TextFloatProps = {
  children?: ReactNode;
};

export default function TextFloat({
  children = "Text Float",
}: TextFloatProps) {
  const text = typeof children === "string" ? children : "Text Float";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      style={{
        letterSpacing: "-0.02em",
        display: "inline-block",
      }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          style={{
            display: "inline-block",
            whiteSpace: "pre",
          }}
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 0.5,
            ease: "easeInOut",
            delay: i * 0.15,
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
