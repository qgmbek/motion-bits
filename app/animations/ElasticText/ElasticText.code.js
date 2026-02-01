const code = `"use client";

import { motion } from "framer-motion";

const text = "Elastic Text";

export default function ElasticText() {
  return (
    <div
      style={{
        letterSpacing: "-0.03em",
      }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          style={{
            display: "inline-block",
            whiteSpace: "pre",
          }}
          initial={{ y: 0, scaleY: 1 }}
          animate={{ y: -28, scaleY: 1.25 }}
          transition={{
            type: "spring",
            stiffness: 220,
            damping: 14,
            mass: 0.8,
            delay: i * 0.07,
          }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}
`;

export default code;
