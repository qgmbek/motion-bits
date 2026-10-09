const code = `"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type TextSquishProps = {
  children?: ReactNode;
};

export default function TextSquish({
  children = "Text Squish",
}: TextSquishProps) {
  const text = typeof children === "string" ? children : "Text Squish";

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
          whileHover={{
            scaleX: 1.5,
            scaleY: 0.7,
            color: "#ff6b6b",
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 15,
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
