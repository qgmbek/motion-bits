const code = `"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type LiquidFloatProps = {
  children?: ReactNode;
};

export default function LiquidFloat({
  children = "Liquid Float",
}: LiquidFloatProps) {
  const text = typeof children === "string" ? children : "Liquid Float";
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
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
          initial={{
            y: 100,
            opacity: 0,
            scale: 0.5,
            rotate: ((i * 37 + 11) % 101) / 100 * 20 - 10,
          }}
          whileInView={{
            y: 0,
            opacity: 1,
            scale: 1,
            rotate: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
            delay: i * 0.05,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <motion.span
            style={{ display: "inline-block" }}
            whileInView={{ y: [0, -3, 0], rotate: [0, 1, 0] }}
            viewport={{ once: true }}
            transition={{
              duration: 2 + ((i * 53 + 17) % 101) / 100,
              repeat: Infinity,
              repeatDelay: 1 + ((i * 29 + 23) % 101) / 100,
              ease: "easeInOut",
            }}
          >
            {char === " " ? "\\u00A0" : char}
          </motion.span>
        </motion.span>
      ))}
    </motion.div>
  );
}
`;

export default code;
