use client";

import { motion } from "framer-motion";

type Props = { children?: string };

export default function CharacterOrbit({ children = "Character Orbit" }: Props) {
  return (
    <div style={{ display: "inline-block" }}>
      {children.split("").map((char, i) => (
        <motion.span key={i} style={{ display: "inline-block" }}
          initial={{ x: 0, y: 0, rotate: 0 }}
          whileInView={{ x: [0, 12, -8, 0], y: [0, -18, 10, 0], rotate: [0, 90, -35, 0] }}
          viewport={{ once: true }}
          transition={{ delay: i * .04, duration: 1.1, ease: "easeInOut" }}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
}