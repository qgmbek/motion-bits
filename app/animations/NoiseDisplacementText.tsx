"use client";

import { motion, useAnimationFrame } from "framer-motion";
import { useRef } from "react";

export default function NoiseDisplacementText() {
  const text = "Noise Displacement Text";
  const letters = text.split("");

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0b0b0b",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(3rem, 8vw, 7rem)",
          fontWeight: 600,
          letterSpacing: "-0.02em",
          color: "#fff",
          display: "flex",
        }}
      >
        {letters.map((char, i) => (
          <NoiseLetter key={i} char={char} index={i} />
        ))}
      </h1>
    </div>
  );
}

function NoiseLetter({
  char,
  index,
}: {
  char: string;
  index: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useAnimationFrame((t) => {
    if (!ref.current) return;

    // pseudo-noise using layered sine waves
    const time = t * 0.001;

    const x =
      Math.sin(time * 2 + index * 10) * 1.2 +
      Math.sin(time * 0.7 + index * 3) * 0.6;

    const y =
      Math.cos(time * 1.6 + index * 8) * 1.1 +
      Math.cos(time * 0.9 + index * 2) * 0.5;

    ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  });

  return (
    <motion.span
      ref={ref}
      style={{
        display: "inline-block",
        willChange: "transform",
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.03,
        duration: 0.6,
        ease: "easeOut",
      }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}
