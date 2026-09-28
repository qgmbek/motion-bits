use client";

import { motion } from "framer-motion";

type Props = { children?: string };

export default function TextFold({ children = "Text Folding" }: Props) {
  return (
    <div style={{ perspective: 800, display: "inline-block" }}>
      {children.split("").map((char, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block", transformOrigin: "50% 100%" }}
          initial={{ rotateX: 90, y: 35, opacity: 0 }}
          whileInView={{ rotateX: 0, y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * .035, duration: .65, ease: [0.22, 1, .36, 1] }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
}