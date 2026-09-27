"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type ParticleAssembleProps = {
  children?: ReactNode;
  particleCount?: number;
};

export default function ParticleAssemble({
  children = "Particle Assemble",
  particleCount = 20,
}: ParticleAssembleProps) {
  const text = typeof children === "string" ? children : "Particle Assemble";
  
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
            opacity: 0,
            scale: 0,
            rotate: Math.random() * 360,
            x: (Math.random() - 0.5) * 200,
            y: (Math.random() - 0.5) * 200,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
            rotate: 0,
            x: 0,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 1.5,
            delay: i * 0.1,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeInOut",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
}
