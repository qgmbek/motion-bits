const code = `"use client";

import { ReactNode, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type BreathingTypeProps = {
  children?: ReactNode;
  typeSpeed?: number;
};

export default function BreathingType({
  children = "Breathing Type",
  typeSpeed = 100,
}: BreathingTypeProps) {
  const text = typeof children === "string" ? children : "Breathing Type";
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(interval);
        setIsComplete(true);
      }
    }, typeSpeed);

    return () => clearInterval(interval);
  }, [text, typeSpeed]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      style={{
        letterSpacing: "-0.02em",
      }}
    >
      <AnimatePresence mode="wait">
        {displayedText.split("").map((char, i) => (
          <motion.span
            key={i}
            style={{
              display: "inline-block",
              whiteSpace: "pre",
            }}
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: isComplete ? [1, 1.03, 1] : 1,
            }}
            transition={{
              duration: 0.3,
              scale: {
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "easeInOut",
              },
            }}
          >
            {char === " " ? "\\u00A0" : char}
          </motion.span>
        ))}
      </AnimatePresence>
      
      {/* Cursor */}
      <motion.span
        animate={{
          opacity: [1, 0, 1],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          display: "inline-block",
          width: "2px",
          height: "1em",
          backgroundColor: "currentColor",
          marginLeft: "2px",
          verticalAlign: "middle",
        }}
      />
    </motion.div>
  );
}
`;

export default code;
