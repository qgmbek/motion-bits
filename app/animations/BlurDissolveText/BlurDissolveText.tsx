"use client";

import { motion, type Easing } from "framer-motion";

export default function BlurDissolveText() {
  const text = "Blur Dissolve Transition";
  const ease: Easing = [0.16, 1, 0.3, 1];

  return (
      <motion.h1
        initial="visible"
        whileInView="hidden"
        viewport={{ once: true, margin: "-120px" }}
        style={{
          fontSize: 56,
          fontWeight: 600,
          letterSpacing: "-0.02em",
          color: "#fff",
        }}
      >
        <motion.span
          variants={{
            visible: {
              filter: "blur(0px)",
              opacity: 1,
              y: 0,
            },
            hidden: {
              filter: "blur(16px)",
              opacity: 0,
              y: -16,
            },
          }}
          transition={{
            duration: 1,
            ease,
          }}
          style={{
            display: "inline-block",
          }}
        >
          {text}
        </motion.span>
      </motion.h1>
  );
}
