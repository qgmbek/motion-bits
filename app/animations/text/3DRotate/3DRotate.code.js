const code = `"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type ThreeDRotateProps = {
  children?: ReactNode;
  perspective?: number;
};

export default function ThreeDRotate({
  children = "3D Rotate",
  perspective = 1000,
}: ThreeDRotateProps) {
  const text = typeof children === "string" ? children : "3D Rotate";
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      style={{
        letterSpacing: "-0.02em",
        perspective: \`\${perspective}px\`,
      }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          style={{
            display: "inline-block",
            whiteSpace: "pre",
            transformStyle: "preserve-3d",
          }}
          initial={{
            opacity: 0,
            rotateX: -90,
            rotateY: (i % 2 === 0 ? 1 : -1) * 45,
            scale: 0.5,
          }}
          whileInView={{
            opacity: 1,
            rotateX: 0,
            rotateY: 0,
            scale: 1,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: i * 0.1,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          animate={{
            rotateY: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 2,
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
