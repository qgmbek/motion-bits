use client";

import { motion } from "framer-motion";
import { useState } from "react";

type Props = { children?: string };

export default function DeformField({ children = "Displacement Field" }: Props) {
  const [active, setActive] = useState(false);

  return (
    <motion.div onHoverStart={() => setActive(true)} onHoverEnd={() => setActive(false)}
      style={{ display: "inline-block" }}>
      {children.split("").map((char, i) => {
        const center = (children.length - 1) / 2;
        const distance = Math.abs(i - center) / Math.max(center, 1);
        return (
          <motion.span key={i} style={{ display: "inline-block" }}
            animate={active ? { y: Math.sin(i * 1.7) * 12 * (1 - distance), rotate: Math.sin(i) * 5 } : { y: 0, rotate: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 18, delay: distance * .04 }}>
            {char === " " ? "\u00A0" : char}
          </motion.span>
        );
      })}
    </motion.div>
  );
}