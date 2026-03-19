"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

type RevealProps = {
  children?: ReactNode;
};

export default function PositonalReveal({
  children = "Crafting immersive interfaces where motion feels intentional, not decorative.",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        overflow: "hidden",
        display: "inline-block",
      }}
    >
      <motion.div
        style={{
          fontSize: "1.5rem",
          lineHeight: 1.6,
          maxWidth: "600px",
          margin: 0,
        }}
        initial={{ opacity: 0, x: -40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>

      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, #0a0a0a 0%, #0a0a0a 40%, transparent 100%)",
          pointerEvents: "none",
        }}
        initial={{ x: "0%" }}
        animate={isInView ? { x: "100%" } : {}}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
    </div>
  );
}
