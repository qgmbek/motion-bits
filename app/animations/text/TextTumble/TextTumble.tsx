"use client";

import { motion } from "framer-motion";

type Props = { children?: string };

export default function TextTumble({ children = "Letter Tumble" }: Props) {
  return (
    <div style={{ display: "inline-block" }}>
      {children.split("").map((char, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block", transformOrigin: "50% 100%" }}
          initial={{ y: -90, rotate: i % 2 ? 45 : -55, opacity: 0 }}
          whileInView={{ y: 0, rotate: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: i * .045,
            duration: .75,
            type: "spring",
            stiffness: 230,
            damping: 15,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
}