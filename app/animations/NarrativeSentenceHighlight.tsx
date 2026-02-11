"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export default function NarrativeSentenceHighlight() {
  const sentence =
    "How do you plan to live your life, Thorfinn? You haven't thought about it, right? Move forward already. Don't stay stuck in a damn boring place like this forever. Go far ahead. Go beyond the world where Thors went. You're Thors' son. Go. That's your real fight. Become a true warrior.";
  const words = sentence.split(" ");
  const controls = useAnimation();

  useEffect(() => {
    let current = 0;

    const animate = async () => {
      while (true) {
        await controls.start((i) => ({
          opacity: i === current ? 1 : 0.2,
          transition: {
            duration: 0.1,
            ease: [0.4, 0, 0.2, 1],
          },
        }));

        current = (current + 1) % words.length;

        await new Promise((r) => setTimeout(r, 700));
      }
    };

    animate();
  }, [controls, words.length]);

  return (
    <div
      style={{
        width: "80vw",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <motion.div
        style={{
          fontSize: "32px",
          color: "#fff",
          lineHeight: 1.2,
          letterSpacing: "-0.02em",
          display: "inline",
          wordWrap: "break-word",
        }}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            custom={i}
            initial={{ opacity: 0.3 }}
            animate={controls}
            style={{
              marginRight: "0.3rem",
              transition: "opacity 0.1s ease",
              display: "inline-block",
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
