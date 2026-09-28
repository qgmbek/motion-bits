use client";

import { motion } from "framer-motion";

type Props = { children?: string };

export default function TextMemoryType({ children = "Memory Type" }: Props) {
  return (
    <div style={{ display: "inline-block" }}>
      {children.split("").map((char, i) => (
        <motion.span key={i} style={{ display: "inline-block" }}
          initial={{ opacity: 0, x: -18, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ delay: i * .055, duration: .45 }}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
}