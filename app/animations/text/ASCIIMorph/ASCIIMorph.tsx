"use client";

import { motion } from "framer-motion";
import { ReactNode, useEffect, useMemo, useState } from "react";

const ASCII = "!<>-_\\/[]{}—=+*^?#________";

type ASCIIMorphProps = {
  children?: ReactNode;
};

export default function ASCIIMorph({ children = "ASCII Morph" }: ASCIIMorphProps) {
  const text = useMemo(
    () => (typeof children === "string" ? children : "ASCII Morph"),
    [children],
  );
  const [output, setOutput] = useState(text);

  useEffect(() => {
    setOutput(text);
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
          .join(""),
      );

      frame++;
      if (frame > totalFrames) clearInterval(interval);
    }, 40);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(8px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        fontFamily: "monospace",
        // fontSize: "48px",
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
