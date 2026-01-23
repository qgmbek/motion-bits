"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const text = "Scroll Wave";

export default function ScrollWaveText() {
  const { scrollYProgress } = useScroll();

  return (
    <div
      style={{
        height: "200vh", // gives scroll room
        paddingTop: "40vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          fontSize: 56,
          fontWeight: 600,
          letterSpacing: "-0.03em",
          display: "flex",
        }}
      >
        {text.split("").map((char, i) => {
          // phase offset per letter
          const wave = useTransform(
            scrollYProgress,
            [0, 1],
            [0, -60 + i * 6]
          );

          // physical smoothing
          const y = useSpring(wave, {
            stiffness: 120,
            damping: 20,
            mass: 0.8,
          });

          return (
            <motion.span
              key={i}
              style={{
                y,
                display: "inline-block",
                whiteSpace: "pre",
              }}
            >
              {char}
            </motion.span>
          );
        })}
      </div>
    </div>
  );
}
