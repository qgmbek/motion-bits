const code = `"use client";

import { motion } from "framer-motion";

type Props = { children?: string };

export default function RollingBaseline({ children = "Rolling Baseline" }: Props) {
  return (
    <div style={{ display: "inline-block" }}>
      {children.split("").map((char, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block" }}
          initial={{ y: i % 2 ? 45 : -45, rotate: i % 2 ? 8 : -8, opacity: 0 }}
          whileInView={{ y: 0, rotate: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: i * .045,
            duration: .8,
            ease: [0.22, 1, .36, 1],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
}
`;

export default code;
