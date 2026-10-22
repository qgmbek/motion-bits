const code = `"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";

export default function NeonGridBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 25 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    mouseX.set(e.clientX - rect.left - centerX);
    mouseY.set(e.clientY - rect.top - centerY);
  };

  const gridX = useTransform(springX, [-200, 200], [-20, 20]);
  const gridY = useTransform(springY, [-200, 200], [-20, 20]);

  const gridSize = 40;
  const rows = 8;
  const cols = 12;

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      style={{
        height: "100%",
        minHeight: 400,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#020205",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          gridTemplateColumns: \`repeat(\${cols}, \${gridSize}px)\`,
          gridTemplateRows: \`repeat(\${rows}, \${gridSize}px)\`,
          gap: 1,
          opacity: 0.6,
          x: gridX,
          y: gridY,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 25 }}
      >
        {Array.from({ length: rows * cols }).map((_, i) => {
          const row = Math.floor(i / cols);
          const col = i % cols;
          const distance = Math.sqrt(
            Math.pow(col - cols / 2, 2) + Math.pow(row - rows / 2, 2)
          );
          const delay = distance * 0.05;

          return (
            <motion.div
              key={i}
              style={{
                border: "1px solid rgba(0, 255, 200, 0.2)",
                borderRadius: 2,
              }}
              animate={{
                borderColor: [
                  "rgba(0, 255, 200, 0.2)",
                  "rgba(0, 255, 200, 0.6)",
                  "rgba(255, 0, 150, 0.4)",
                  "rgba(0, 255, 200, 0.2)",
                ],
                boxShadow: [
                  "none",
                  "0 0 10px rgba(0, 255, 200, 0.3)",
                  "0 0 15px rgba(255, 0, 150, 0.2)",
                  "none",
                ],
                scale: [1, 1.05, 1.02, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </motion.div>

      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(0, 255, 200, 0.1), transparent 50%)",
          pointerEvents: "none",
        }}
        animate={{
          ["--x" as string]: useTransform(springX, (v) => \`\${50 + v / 4}%\`),
          ["--y" as string]: useTransform(springY, (v) => \`\${50 + v / 4}%\`),
        }}
      />

      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at var(--x2, 50%) var(--y2, 50%), rgba(255, 0, 150, 0.08), transparent 50%)",
          pointerEvents: "none",
        }}
        animate={{
          ["--x2" as string]: useTransform(springX, (v) => \`\${50 - v / 4}%\`),
          ["--y2" as string]: useTransform(springY, (v) => \`\${50 - v / 4}%\`),
        }}
      />

      <motion.h1
        style={{
          position: "relative",
          zIndex: 10,
          fontSize: 48,
          fontWeight: 800,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#ffffff",
          textShadow: "0 0 30px rgba(0, 255, 200, 0.5), 0 0 60px rgba(255, 0, 150, 0.3)",
        }}
        animate={{
          textShadow: [
            "0 0 30px rgba(0, 255, 200, 0.5), 0 0 60px rgba(255, 0, 150, 0.3)",
            "0 0 50px rgba(0, 255, 200, 0.8), 0 0 80px rgba(255, 0, 150, 0.5)",
            "0 0 30px rgba(0, 255, 200, 0.5), 0 0 60px rgba(255, 0, 150, 0.3)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        Neon Grid
      </motion.h1>

      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: "linear-gradient(90deg, transparent, rgba(0, 255, 200, 0.8), transparent)",
          opacity: 0.5,
        }}
        animate={{
          y: [0, "100%"],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 2,
          background: "linear-gradient(180deg, transparent, rgba(255, 0, 150, 0.8), transparent)",
          opacity: 0.5,
        }}
        animate={{
          x: [0, "100%"],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
`;

export default code;
