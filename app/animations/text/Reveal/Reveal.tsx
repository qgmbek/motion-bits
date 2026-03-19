"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type RevealProps = {
  text?: string;
};

export default function Reveal({
  text = "Crafting immersive interfaces where motion feels intentional, not decorative.",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const letters = text.split("");

  return (
    <div
      ref={ref}
      style={{
        display: "inline-block",
        fontSize: "1.5rem",
        lineHeight: 1.6,
        color: "#eaeaea",
        maxWidth: "600px",
      }}
    >
      {letters.map((char, i) => (
        <motion.span
          key={i}
          style={{
            display: "inline-block",
            whiteSpace: char === " " ? "pre" : "normal",
          }}
          initial={{ opacity: 0.2 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{
            duration: 0.4,
            delay: i * 0.03, // controls left→right flow
            ease: "linear",
          }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}