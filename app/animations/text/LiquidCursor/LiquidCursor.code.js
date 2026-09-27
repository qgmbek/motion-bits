const code = `"use client";

import { ReactNode, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type LiquidCursorProps = {
  children?: ReactNode;
  viscosity?: number;
};

export default function LiquidCursor({
  children = "Liquid Cursor",
  viscosity = 0.15,
}: LiquidCursorProps) {
  const text = typeof children === "string" ? children : "Liquid Cursor";
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);

  const handleMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
    setIsHovering(true);
  };

  const handleLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovering(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ 
        display: "inline-flex", 
        letterSpacing: "-0.02em", 
        cursor: "default",
      }}
    >
      {text.split("").map((char, i) => (
        <LiquidChar 
          key={i} 
          char={char} 
          mouseX={mouseX} 
          mouseY={mouseY} 
          index={i}
          viscosity={viscosity}
          isHovering={isHovering}
        />
      ))}
    </div>
  );
}

function LiquidChar({
  char,
  mouseX,
  mouseY,
  index,
  viscosity,
  isHovering,
}: {
  char: string;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
  index: number;
  viscosity: number;
  isHovering: boolean;
}) {
  const distance = Math.abs(index - 5);
  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  
  const x = useSpring(
    useTransform(mouseX, (v) => v * viscosity * (1 - distance * 0.1)),
    springConfig
  );
  const y = useSpring(
    useTransform(mouseY, (v) => v * viscosity * (1 - distance * 0.1)),
    springConfig
  );

  return (
    <motion.span
      style={{ 
        x, 
        y, 
        display: "inline-block",
        color: isHovering ? \`hsl(\${200 + index * 10}, 80%, 60%)\` : "currentColor",
      }}
      transition={{
        color: { duration: 0.3 }
      }}
    >
      {char === " " ? "\\u00A0" : char}
    </motion.span>
  );
}
`;

export default code;
