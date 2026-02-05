"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const ASCII = "!<>-_\\/[]{}—=+*^?#________";

export default function ASCIIMorph() {
  const text = "ASCII Morph";
  const [output, setOutput] = useState(text);

  useEffect(() => {
    let frame = 0;
    const totalFrames = 40;

    const interval = setInterval(() => {
      setOutput(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";

            const progress = frame / totalFrames;
            if (progress > i / text.length) return char;

            return ASCII[Math.floor(Math.random() * ASCII.length)];
          })
          .join("")
      );

      frame++;
      if (frame > totalFrames) clearInterval(interval);
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(8px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        fontFamily: "monospace",
        fontSize: "clamp(2rem, 6vw, 4rem)",
        fontWeight: "400",
        letterSpacing: "0.12em",
        color: "#00ffcc",
        textShadow: "0 0 8px rgba(0,255,200,0.4)",
        userSelect: "none",
      }}
    >
      {output}
    </motion.div>
  );
}
