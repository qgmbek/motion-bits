use client";

import { motion } from "framer-motion";
import { useState } from "react";

type Props = { children?: string };

export default function MagneticRepulsion({ children = "Attract / Repel" }: Props) {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div style={{ display: "inline-block" }}>
      {children.split("").map((char, i) => {
        const d = hover == null ? 0 : Math.max(0, 1 - Math.abs(hover - i) / 2.5);
        return (
          <motion.span key={i} onPointerEnter={() => setHover(i)} onPointerLeave={() => setHover(null)}
            animate={{ x: hover === i ? (i % 2 ? 18 : -18) : (i - (hover ?? i)) * d * -3, scale: 1 + d * .12 }}
            transition={{ type: "spring", stiffness: 320, damping: 20 }}
            style={{ display: "inline-block" }}>
            {char === " " ? "\u00A0" : char}
          </motion.span>
        );
      })}
    </div>
  );
}