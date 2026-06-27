const code = `"use client";

import { ReactNode, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type MagneticLettersProps = {
  children?: ReactNode;
};

export default function MagneticLetters({
  children = "Magnetic Letters",
}: MagneticLettersProps) {
  const text = typeof children === "string" ? children : "Magnetic Letters";
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ display: "inline-flex", letterSpacing: "-0.02em", cursor: "default" }}
    >
      {text.split("").map((char, i) => (
        <MagneticChar key={i} char={char} mouseX={mouseX} mouseY={mouseY} index={i} />
      ))}
    </div>
  );
}

function MagneticChar({
  char,
  mouseX,
  mouseY,
  index,
}: {
  char: string;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
  index: number;
}) {
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const x = useSpring(useTransform(mouseX, (v) => v * (0.08 + (index % 5) * 0.02)), springConfig);
  const y = useSpring(useTransform(mouseY, (v) => v * (0.08 + (index % 3) * 0.02)), springConfig);

  return (
    <motion.span
      style={{ x, y, display: "inline-block" }}
      whileHover={{ scale: 1.2, color: "#a78bfa" }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {char === " " ? "\\u00A0" : char}
    </motion.span>
  );
}
`;

export default code;
