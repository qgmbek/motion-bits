"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const text = "Random Walk Letters";

export default function RandomWalkLetters() {
  const letters = text.split("");

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(circle at center, #0f172a 0%, #020617 100%)",
        overflow: "hidden",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(2.5rem, 6vw, 6rem)",
          fontWeight: 600,
          letterSpacing: "-0.03em",
          color: "#e2e8f0",
          display: "flex",
          gap: "0.02em",
        }}
      >
        {letters.map((letter, index) => (
          <RandomLetter key={index} letter={letter} index={index} />
        ))}
      </h1>
    </div>
  );
}

function RandomLetter({ letter, index }: { letter: string; index: number }) {
  const [randomX] = useState(() => (Math.random() - 0.5) * 60);
  const [randomY] = useState(() => (Math.random() - 0.5) * 60);
  const [randomRotate] = useState(() => (Math.random() - 0.5) * 20);

  return (
    <motion.span
      initial={{
        x: randomX,
        y: randomY,
        rotate: randomRotate,
        opacity: 0,
        filter: "blur(8px)",
      }}
      animate={{
        x: [randomX, randomX * 0.6, randomX * 0.3, 0],
        y: [randomY, randomY * 0.6, randomY * 0.3, 0],
        rotate: [randomRotate, randomRotate * 0.5, 0],
        opacity: [0, 1, 1],
        filter: ["blur(8px)", "blur(2px)", "blur(0px)"],
      }}
      transition={{
        duration: 3,
        delay: index * 0.05,
        ease: "easeOut",
      }}
      style={{
        display: "inline-block",
        whiteSpace: "pre",
        textShadow: "0 0 20px rgba(255,255,255,0.08)",
      }}
    >
      {letter === " " ? "\u00A0" : letter}
    </motion.span>
  );
}
