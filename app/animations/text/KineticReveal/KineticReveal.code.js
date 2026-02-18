const code = `"use client";

import { motion } from "framer-motion";

const text = "Kinetic Reveal";

export default function KineticText() {
  return (
    <motion.div
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.04,
          },
        },
      }}
      initial="hidden"
      animate="show"
      style={{
        gap: "0.08em",
        letterSpacing: "-0.04em",
      }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: {
              y: "120%",
              rotate: 12,
              opacity: 0,
            },
            show: {
              y: "0%",
              rotate: 0,
              opacity: 1,
              transition: {
                type: "spring" as const,
                damping: 14,
                stiffness: 180,
                mass: 0.6,
              },
            },
          }}
          style={{
            display: "inline-block",
            willChange: "transform",
          }}
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            repeat: Infinity,
            repeatDelay: 3 + i * 0.15,
            duration: 1.6,
            ease: "easeInOut",
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
