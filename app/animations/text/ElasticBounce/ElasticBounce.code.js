const code = `"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type ElasticBounceProps = {
  children?: ReactNode;
};

export default function ElasticBounce({
  children = "Elastic Bounce",
}: ElasticBounceProps) {
  const text = typeof children === "string" ? children : "Elastic Bounce";
  
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
            y: -200,
            opacity: 0,
            scale: 0.3,
          }}
          whileInView={{
            y: 0,
            opacity: 1,
            scale: 1,
          }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            damping: 8,
            stiffness: 200,
            mass: 0.8,
            delay: i * 0.08,
          }}
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 3 + i * 0.2,
            ease: "easeInOut",
          }}
        >
          {char === " " ? "\\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
}
`;

export default code;
