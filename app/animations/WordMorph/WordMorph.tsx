"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORDS = ["Good", "Bad", "Devil", "Doom", "Hell", "Angel"];

const TRANSITION_DURATION = 0.8;
const STAGGER_DELAY = 0.025;

export default function WordMorph() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % WORDS.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getCharacters = (word: string) => {
    const chars = word.split("");
    const charCounts: Record<string, number> = {};

    return chars.map((char, i) => {
      const count = charCounts[char] || 0;
      charCounts[char] = count + 1;

      return {
        id: `${char}-${count}`,
        char,
        index: i,
      };
    });
  };

  const characters = getCharacters(WORDS[index]);

  return (
    <div
      style={{
        letterSpacing: "-0.025em",
        lineHeight: "1",
        margin: "0",
        position: "relative",
        zIndex: 10,
      }}
    >
      <span
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: "0",
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          borderWidth: "0",
        }}
      >
        {WORDS[index]}
      </span>

      <AnimatePresence mode="popLayout">
        {characters.map((item) => (
          <motion.span
            key={item.id}
            layoutId={item.id}
            initial={{
              opacity: 0,
              y: 50,
              filter: "blur(10px)",
              scale: 1.5,
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -50,
              filter: "blur(10px)",
              scale: 0.5,
            }}
            transition={{
              duration: TRANSITION_DURATION,
              ease: [0.32, 0.72, 0, 1],
              delay: item.index * STAGGER_DELAY,
            }}
            style={{
              display: "inline-block",
              position: "relative",
              willChange: "transform, opacity, filter",
            }}
          >
            {item.char}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
