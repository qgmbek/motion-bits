const code = `"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = { children?: string };

export default function FluxTypewriter({ children = "Flux Typewriter" }: Props) {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDeleting) {
        if (currentIndex < children.length) {
          setDisplayText((prev) => prev + children[currentIndex]);
          setCurrentIndex((prev) => prev + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText((prev) => prev.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentIndex(0);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearInterval(interval);
  }, [currentIndex, isDeleting, displayText.length, children]);

  return (
    <div
      style={{
        height: "100%",
        minHeight: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#030305",
      }}
    >
      <motion.div
        style={{
          position: "relative",
          display: "inline-block",
        }}
      >
        <motion.h1
          style={{
            fontSize: 42,
            fontWeight: 800,
            letterSpacing: "0.05em",
            color: "#ffffff",
            margin: 0,
            textShadow: "0 0 30px rgba(100, 200, 255, 0.8), 0 0 60px rgba(100, 200, 255, 0.4)",
          }}
          animate={{
            textShadow: [
              "0 0 30px rgba(100, 200, 255, 0.8), 0 0 60px rgba(100, 200, 255, 0.4)",
              "0 0 50px rgba(100, 200, 255, 1), 0 0 80px rgba(100, 200, 255, 0.6)",
              "0 0 30px rgba(100, 200, 255, 0.8), 0 0 60px rgba(100, 200, 255, 0.4)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {displayText}
        </motion.h1>

        <AnimatePresence mode="wait">
          {!isDeleting && currentIndex < children.length && (
            <motion.span
              key="cursor"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: "absolute",
                right: -4,
                top: 0,
                bottom: 0,
                width: 3,
                background: "#64c8ff",
                borderRadius: 2,
                boxShadow: "0 0 10px rgba(100, 200, 255, 0.8)",
              }}
              transition={{ duration: 0.1 }}
            />
          )}
        </AnimatePresence>

        <motion.div
          style={{
            position: "absolute",
            inset: -30,
            background: "radial-gradient(circle at 50% 50%, rgba(100, 200, 255, 0.1), transparent 60%)",
            pointerEvents: "none",
            opacity: 0.5,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          style={{
            position: "absolute",
            bottom: -30,
            left: 0,
            right: 0,
            height: 2,
            background: "linear-gradient(90deg, transparent, rgba(100, 200, 255, 0.8), transparent)",
            opacity: 0.6,
          }}
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {displayText.split("").map((char, i) => {
          const isLastTyped = i === displayText.length - 1;
          return (
            <motion.span
              key={i}
              style={{
                position: "absolute",
                fontSize: 42,
                fontWeight: 800,
                letterSpacing: "0.05em",
                color: isLastTyped ? "#64c8ff" : "transparent",
                opacity: 0,
                pointerEvents: "none",
              }}
              animate={{
                opacity: isLastTyped ? [1, 0.5, 0] : 0,
                y: isLastTyped ? [0, -20, -40] : 0,
                scale: isLastTyped ? [1, 1.5, 2] : 1,
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {char}
            </motion.span>
          );
        })}
      </motion.div>
    </div>
  );
}
`;

export default code;
