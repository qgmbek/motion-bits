"use client";

import { motion } from "framer-motion";

type Props = { items?: string[]; playing?: boolean };

export default function StackSpread({ items = ["One", "Two", "Three"], playing }: Props) {
  const embedded = playing !== undefined;
  return (
    <motion.div initial="rest" animate={playing ? "hover" : undefined} whileHover={embedded ? undefined : "hover"}
      style={{ position: "relative", height: embedded ? 86 : 180, width: embedded ? 86 : 280 }}>
      {items.slice(0, 3).map((item, i) => (
        <motion.div
          key={item}
          variants={{
            rest: { x: i * 5, y: i * 5, rotate: (i - 1) * 2 },
            hover: { x: embedded ? (i - 1) * 22 : i * (95 + i * 8), y: i % 2 ? 12 : -8, rotate: (i - 1) * (embedded ? 12 : 4) },
          }}
          style={{ position: "absolute", inset: 0, padding: embedded ? 12 : 24, border: "1px solid currentColor", borderRadius: 14,
            background: embedded ? "#252b37" : "var(--background,#fff)" }}
        >
          {item}
        </motion.div>
      ))}
    </motion.div>
  );
}
