const code = `"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type WaveTextProps = {
  children?: ReactNode;
};

export default function WaveText({
  children = "Wave Text Animation",
}: WaveTextProps) {
  const text = typeof children === "string" ? children : "Wave Text Animation";
  return (
    <div
      style={{
        letterSpacing: "-0.02em",
      }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          style={{
            display: "inline-block",
            whiteSpace: "pre",
          }}
          whileInView={{
            y: [0, -20, 0],
            rotate: [0, -4, 0],
            opacity: [0.7, 1, 0.7],
          }}
          viewport={{ once: true }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.08,
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
