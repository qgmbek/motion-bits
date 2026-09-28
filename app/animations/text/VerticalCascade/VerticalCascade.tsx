use client";

import { motion } from "framer-motion";

type Props = { children?: string };

export default function VerticalCascade({ children = "Vertical Cascade" }: Props) {
  return (
    <div style={{ display: "inline-block" }}>
      {children.split("").map((char, i) => (
        <motion.span key={i} style={{ display: "inline-block" }}
          initial={{ y: -40, rotate: -90, opacity: 0 }}
          whileInView={{ y: 0, rotate: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * .05, duration: .7, ease: [0.22, 1, .36, 1] }}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
}