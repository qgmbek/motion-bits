"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const FINAL_TEXT = "Data Stream Decode";
const CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*";

export default function DataStreamDecode() {
  const [displayText, setDisplayText] = useState(
    FINAL_TEXT.split("").map(() => ""),
  );

  useEffect(() => {
    let frame = 0;
    const totalFrames = 40;
    const interval = setInterval(() => {
      setDisplayText(() =>
        FINAL_TEXT.split("").map((char, i) => {
          if (char === " ") return " ";

          if (frame / totalFrames > i / FINAL_TEXT.length) {
            return char; // lock character
          }

          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }),
      );

      frame++;
      if (frame > totalFrames) clearInterval(interval);
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        fontFamily: "monospace",
      }}
    >
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          fontSize: "56px",
          fontWeight: "300",
          letterSpacing: "0.1em",
          // uncomment lines below for colors
          // color: "#00f0ff",
          // textShadow:
          //   "0 0 8px rgba(0,255,255,0.7), 0 0 20px rgba(0,255,255,0.5)",
        }}
      >
        {displayText.map((char, index) => (
          <motion.span
            key={index}
            animate={{
              opacity: [0.6, 1, 0.8, 1],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatType: "mirror",
              delay: index * 0.03,
            }}
            style={{
              display: "inline-block",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.h1>
    </div>
  );
}
