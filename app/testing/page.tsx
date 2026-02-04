"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

export default function CursorAwareHighlight() {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth, premium lag (this is the magic)
  const x = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const y = useSpring(mouseY, { stiffness: 120, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      style={{
        display: "inline-block",
        position: "relative",
        cursor: "default",
      }}
    >
      {/* Base text */}
      <span
        style={{
          fontSize: "clamp(3rem, 8vw, 6rem)",
          fontWeight: 800,
          letterSpacing: "-0.04em",
          color: "#2b2b2b",
        }}
      >
        Cursor-Aware Highlight
      </span>

      {/* Cursor-aware highlight layer */}
      <motion.span
        style={{
          pointerEvents: "none",
          position: "absolute",
          inset: 0,
          fontSize: "clamp(3rem, 8vw, 6rem)",
          fontWeight: 800,
          letterSpacing: "-0.04em",
          background: `radial-gradient(
            120px circle at ${x}px ${y}px,
            #7c3aed,
            #22d3ee,
            transparent 70%
          )`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          filter: "drop-shadow(0 0 20px rgba(124,58,237,0.35))",
        }}
      >
        Cursor-Aware Highlight
      </motion.span>
    </div>
  );
}
