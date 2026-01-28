"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export default function BlurText() {
  const ref = useRef<HTMLHeadingElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const blur = useTransform(mouseX, (x) => {
    if (!ref.current) return "blur(0px)";
    const rect = ref.current.getBoundingClientRect();
    const dx = x - (rect.left + rect.width / 2);
    const dy = mouseY.get() - (rect.top + rect.height / 2);
    const distance = Math.sqrt(dx * dx + dy * dy);

    return `blur(${Math.min(distance / 80, 10)}px)`;
  });

  const chroma = useTransform(mouseX, (x) => {
    if (!ref.current) return 0;
    const rect = ref.current.getBoundingClientRect();
    const dx = x - (rect.left + rect.width / 2);
    return Math.max(Math.min(dx / 40, 6), -6);
  });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <motion.h1
      ref={ref}
      style={{
        fontSize: 56,
        fontWeight: 600,
        letterSpacing: "-0.02em",
        color: "#fff",
        position: "relative",
      }}
    >
      {/* Red channel */}
      <motion.span
        style={{
          position: "absolute",
          inset: 0,
          color: "#ff4d4d",
          x: chroma,
          filter: blur,
          opacity: 0.4,
          pointerEvents: "none",
        }}
      >
        Blur Text Animation
      </motion.span>

      {/* Blue channel */}
      <motion.span
        style={{
          position: "absolute",
          inset: 0,
          color: "#4d7cff",
          x: chroma,
          filter: blur,
          opacity: 0.4,
          pointerEvents: "none",
        }}
      >
        Blur Text Animation
      </motion.span>

      <motion.span
        style={{
          position: "relative",
          filter: blur,
        }}
      >
        Blur Text Animation
      </motion.span>
    </motion.h1>
  );
}
