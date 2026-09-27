"use client";

import { ReactNode, useState, useEffect } from "react";
import { motion } from "framer-motion";

const CYBER_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

type CyberDecodeProps = {
  children?: ReactNode;
  speed?: number;
};

export default function CyberDecode({
  children = "Cyber Decode",
  speed = 50,
}: CyberDecodeProps) {
  const text = typeof children === "string" ? children : "Cyber Decode";
  const [decodedText, setDecodedText] = useState<string[]>(text.split("").map(() => ""));
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex >= text.length) {
        clearInterval(interval);
        setIsComplete(true);
        return;
      }

      const iterations = 5 + Math.floor(Math.random() * 5);
      let iterationCount = 0;

      const charInterval = setInterval(() => {
        setDecodedText((prev) => {
          const newText = [...prev];
          if (iterationCount < iterations - 1) {
            newText[currentIndex] = CYBER_CHARS[Math.floor(Math.random() * CYBER_CHARS.length)];
          } else {
            newText[currentIndex] = text[currentIndex];
          }
          return newText;
        });

        iterationCount++;
        if (iterationCount >= iterations) {
          clearInterval(charInterval);
          currentIndex++;
        }
      }, speed);

      return () => clearInterval(charInterval);
    }, speed * 6);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        letterSpacing: "-0.02em",
        fontFamily: "monospace",
        color: "#00ff00",
        textShadow: "0 0 10px rgba(0, 255, 0, 0.5)",
      }}
    >
      {decodedText.map((char, i) => (
        <motion.span
          key={i}
          style={{
            display: "inline-block",
            whiteSpace: "pre",
          }}
          animate={{
            opacity: isComplete && char === text[i] ? [1, 0.7, 1] : 1,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
}
