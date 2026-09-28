use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useState } from "react";

type Props = { children?: string };

export default function TextStretch({ children = "Stretch Me" }: Props) {
  const [active, setActive] = useState<number | null>(null);
  return (
    <div style={{ display: "inline-block" }}>
      {children.split("").map((char, i) => {
        const dist = active == null ? 0 : Math.max(0, 1 - Math.abs(active - i) / 3);
        return (
          <motion.span key={i} onPointerEnter={() => setActive(i)} onPointerLeave={() => setActive(null)}
            animate={{ scaleX: 1 + dist * .55, y: -dist * 10 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            style={{ display: "inline-block", transformOrigin: "center" }}>
            {char === " " ? "\u00A0" : char}
          </motion.span>
        );
      })}
    </div>
  );
}