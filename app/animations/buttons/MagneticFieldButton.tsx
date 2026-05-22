"use client";

import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { useRef } from "react";

export default function MagneticFieldButton() {
  const ref = useRef<HTMLDivElement>(null);

  // Cursor inside button
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Magnetic translation springs
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  // Inner radial light
  const radialBackground = useMotionTemplate`
    radial-gradient(
      250px circle at ${mouseX}px ${mouseY}px,
      rgba(255,255,255,0.35),
      rgba(255,255,255,0.15) 40%,
      transparent 70%
    )
  `;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseX.set(x);
    mouseY.set(y);

    // Magnetic pull toward cursor
    const offsetX = x - rect.width / 2;
    const offsetY = y - rect.height / 2;

    springX.set(offsetX * 0.2);
    springY.set(offsetY * 0.2);
  }

  function handleMouseLeave() {
    mouseX.set(150);
    mouseY.set(60);
    springX.set(0);
    springY.set(0);
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0a",
      }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          x: springX,
          y: springY,
          position: "relative",
          padding: "24px 48px",
          borderRadius: "24px",
          cursor: "pointer",
          overflow: "hidden",
          display: "inline-block",
        }}
        whileTap={{
          scale: 0.94,
          transition: { type: "spring", stiffness: 400, damping: 18 },
        }}
      >
        {/* Inner Radial Light */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: radialBackground,
          }}
        />

        {/* Base Surface */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "24px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.15)",
            backdropFilter: "blur(10px)",
          }}
        />

        {/* Button Text */}
        <span
          style={{
            position: "relative",
            zIndex: 10,
            color: "#ffffff",
            fontSize: "18px",
            fontWeight: 500,
            letterSpacing: "0.15em",
          }}
        >
          MAGNETIC FIELD
        </span>
      </motion.div>
    </div>
  );
}
