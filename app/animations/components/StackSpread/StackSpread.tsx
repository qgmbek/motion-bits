"use client";

import { motion } from "framer-motion";

type Props = { items?: string[] };

export default function StackSpread({ items = ["One", "Two", "Three"] }: Props) {
  return (
    <motion.div initial="rest" whileHover="hover" style={{ position: "relative", height: 180, width: 280 }}>
      {items.slice(0, 3).map((item, i) => (
        <motion.div
          key={item}
          variants={{
            rest: { x: i * 5, y: i * 5, rotate: (i - 1) * 2 },
            hover: { x: i * (95 + i * 8), y: i % 2 ? 12 : -8, rotate: (i - 1) * 4 },
          }}
          style={{ position: "absolute", inset: 0, padding: 24, border: "1px solid currentColor", borderRadius: 14, background: "var(--background,#fff)" }}
        >
          {item}
        </motion.div>
      ))}
    </motion.div>
  );
}
