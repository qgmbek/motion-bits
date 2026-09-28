use client";

import { motion } from "framer-motion";

type Props = { children?: string };

export default function TextGravityFlip({ children = "Gravity Flip" }: Props) {
  return (
    <div style={{ perspective: 700, display: "inline-block" }}>
      {children.split("").map((char, i) => (
        <motion.span key={i} style={{ display: "inline-block", transformOrigin: "50% 100%" }}
          initial={{ y: -100, rotate: 180, opacity: 0 }}
          whileInView={{ y: 0, rotate: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * .055, duration: .9, type: "spring", stiffness: 190, damping: 13 }}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
}