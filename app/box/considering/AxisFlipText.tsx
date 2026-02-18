"use client";

import { motion } from "framer-motion";

export default function AxisFlipText() {
  const text = "Axis Flip Text";

  return (
    <div
      style={{
        perspective: "1000px",
        display: "inline-block",
      }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{
            rotateX: -90,
            opacity: 0,
          }}
          animate={{
            rotateX: 0,
            opacity: 1,
          }}
          whileHover={{
            rotateY: 180,
          }}
          transition={{
            duration: 0.7,
            delay: i * 0.06,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            display: "inline-block",
            transformStyle: "preserve-3d",
            fontSize: "clamp(3rem, 8vw, 6rem)",
            fontWeight: 700,
            letterSpacing: "0.04em",
            color: "#e5e5e5",
            marginRight: char === " " ? "0.4em" : "0",
            cursor: "default",
          }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}
