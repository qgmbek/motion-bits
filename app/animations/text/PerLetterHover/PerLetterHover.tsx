"use client";
import { motion } from "framer-motion";

export default function PerLetterHover() {
  const text = "Per Letter Hover";

  return (
    <div>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          style={{
            display: "inline-block",
            cursor: "pointer",
            marginRight: char === " " ? "0.5rem" : "0",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 + i * 0.01, duration: 0.2 }}
          whileHover={{
            scale: 1.1,
            y: -3,
            textShadow: "0 0 20px currentColor",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
}
