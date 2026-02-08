const code = `"use client";

import { motion } from "framer-motion";

const text = "Per Letter Animation";

export default function PerLetterBlur() {
  return (
    <motion.div
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.035,
          },
        },
      }}
      initial="hidden"
      animate="visible"
      style={{
        letterSpacing: "-0.02em",
      }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: {
              opacity: 0,
              filter: "blur(12px)",
              y: 12,
            },
            visible: {
              opacity: 1,
              filter: "blur(0px)",
              y: 0,
              transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              },
            },
          }}
          style={{
            display: "inline-block",
            whiteSpace: "pre",
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
}
`;

export default code;
