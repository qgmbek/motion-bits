"use client";

import { motion, useMotionValue, useMotionTemplate } from "framer-motion";

export default function CursorAwareHighlight() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  const background = useMotionTemplate`
    radial-gradient(
      180px circle at ${mouseX}px ${mouseY}px,
      rgba(255,255,255,0.9),
      rgba(255,255,255,0.15),
      transparent 70%
    )
  `;

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative flex items-center justify-center min-h-[300px] bg-black overflow-hidden"
    >
      {/* Highlight layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background }}
      />

      {/* Text */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative text-6xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text
                   bg-gradient-to-r from-white via-white/80 to-white/40"
      >
        Cursor-Aware Highlight
      </motion.h1>
    </div>
  );
}
