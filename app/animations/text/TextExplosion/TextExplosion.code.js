const code = `"use client";

import { motion } from "framer-motion";

type Props = { children?: string };

export default function TextExplosion({ children = "Explosion" }: Props) {
  return (
    <div style={{ display: "inline-block" }}>
      {children.split("").map((char, i) => {
        const angle = (i / Math.max(children.length - 1, 1)) * Math.PI * 2;
        return (
          <motion.span key={i} style={{ display: "inline-block" }}
            initial={{ x: Math.cos(angle) * 90, y: Math.sin(angle) * 70, rotate: (i % 2 ? 1 : -1) * 100, opacity: 0 }}
            whileInView={{ x: [Math.cos(angle) * 90, 0], y: [Math.sin(angle) * 70, 0], rotate: [(i % 2 ? 1 : -1) * 100, 0], opacity: [0, 1] }}
            viewport={{ once: true }}
            transition={{ delay: i * .035, duration: 1.15, ease: [0.16, 1, .3, 1] }}>
            {char === " " ? "\u00A0" : char}
          </motion.span>
        );
      })}
    </div>
  );
}
`;

export default code;
