const code = `"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type ElasticTextProps = {
  children?: ReactNode;
};

export default function ElasticText({
  children = "Elastic Text",
}: ElasticTextProps) {
  const text = typeof children === "string" ? children : "Elastic Text";
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
          whileInView={{ y: -28, scaleY: 1.25 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 220,
            damping: 14,
            mass: 0.8,
            delay: i * 0.07,
            // !! uncomment below lines for infinitly repeated animation !!
            // repeat: Infinity,
            // repeatType: "mirror",
            // repeatDelay: 0.6,
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
