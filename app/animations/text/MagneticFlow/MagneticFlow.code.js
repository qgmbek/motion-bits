const code = `"use client";

import { ReactNode, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type MagneticFlowProps = {
  children?: ReactNode;
};

export default function MagneticFlow({
  children = "Magnetic Flow",
}: MagneticFlowProps) {
  const text = typeof children === "string" ? children : "Magnetic Flow";
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        letterSpacing: "-0.02em",
        display: "inline-block",
        cursor: "default",
      }}
    >
      {text.split("").map((char, i) => (
        <MagneticChar key={i} char={char} index={i} isHovered={isHovered} />
      ))}
    </motion.div>
  );
}

function MagneticChar({
  char,
  index,
  isHovered,
}: {
  char: string;
  index: number;
  isHovered: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotateX = useTransform(springY, [-100, 100], [30, -30]);
  const rotateY = useTransform(springX, [-100, 100], [-30, 30]);

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      style={{
        display: "inline-block",
        whiteSpace: "pre",
        perspective: 1000,
      }}
      animate={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        scale: isHovered ? 1.2 : 1,
        color: isHovered ? "#00d4ff" : "#ffffff",
      }}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 300,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}
`;

export default code;
