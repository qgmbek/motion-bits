"use client";

import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

type Props = { children?: string };

const colors = [
  { color: "#ff0000", offset: -8 },
  { color: "#ff7f00", offset: -6 },
  { color: "#ffff00", offset: -4 },
  { color: "#00ff00", offset: -2 },
  { color: "#0000ff", offset: 2 },
  { color: "#4b0082", offset: 4 },
  { color: "#9400d3", offset: 6 },
];

function PrismLayer({ children, layer, springX, springY }: {
  children: string;
  layer: (typeof colors)[number];
  springX: MotionValue<number>;
  springY: MotionValue<number>;
}) {
  const x = useTransform(springX, (v) => v * (layer.offset / 20));
  const y = useTransform(springY, (v) => v * (layer.offset / 20));

  return (
    <motion.span style={{
      position: "absolute", inset: 0, color: layer.color,
      pointerEvents: "none", mixBlendMode: "screen",
      opacity: 0.4, filter: "blur(0.5px)", x, y,
    }}>
      {children}
    </motion.span>
  );
}

export default function PrismaticShift({ children = "Prismatic" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 200, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 20 });
  
  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    mouseX.set(e.clientX - rect.left - centerX);
    mouseY.set(e.clientY - rect.top - centerY);
  }
  
  function onPointerLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }
  
  const rotation = useTransform(springX, [-200, 200], [-3, 3]);
  
  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      whileHover="hover"
      style={{
        position: "relative",
        display: "inline-block",
        cursor: "pointer",
      }}
    >
      {colors.map((layer) => (
        <PrismLayer key={layer.color} layer={layer} springX={springX} springY={springY}>
          {children}
        </PrismLayer>
      ))}
      
      <motion.span
        style={{
          position: "relative",
          zIndex: 1,
          color: "#ffffff",
          textShadow: "0 0 40px rgba(255, 255, 255, 0.8)",
          rotate: rotation,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        {children}
      </motion.span>
      
      <motion.div
        style={{
          position: "absolute",
          inset: -10,
          background: "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.15), transparent 70%)",
          pointerEvents: "none",
          opacity: 0,
          ["--mouse-x" as string]: useTransform(springX, (v) => `${50 + v / 10}%`),
          ["--mouse-y" as string]: useTransform(springY, (v) => `${50 + v / 10}%`),
        }}
        variants={{
          hover: { opacity: 1 },
        }}
      />
    </motion.div>
  );
}
