"use client";

import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type PixelDissolveProps = {
  children?: ReactNode;
  pixelSize?: number;
};

export default function PixelDissolve({
  children = "Pixel Dissolve",
  pixelSize = 8,
}: PixelDissolveProps) {
  const text = typeof children === "string" ? children : "Pixel Dissolve";
  const [isAnimating, setIsAnimating] = useState(false);
  
  const letters = text.split("").map((char, i) => {
    if (char === " ") return { char: "\u00A0", index: i };
    return { char, index: i };
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      onAnimationComplete={() => setIsAnimating(true)}
      style={{
        letterSpacing: "-0.02em",
        display: "inline-block",
      }}
    >
      <AnimatePresence mode="wait">
        {letters.map(({ char, index }) => (
          <motion.span
            key={index}
            style={{
              display: "inline-block",
              whiteSpace: "pre",
            }}
            initial={{
              opacity: 0,
              filter: `blur(${pixelSize}px)`,
              scale: 2,
            }}
            whileInView={{
              opacity: 1,
              filter: "blur(0px)",
              scale: 1,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: index * 0.03,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {char}
          </motion.span>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
