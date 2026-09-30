const code = `"use client";

import { motion } from "framer-motion";

type Props = { children?: string };

export default function TextTunnel({ children = "Perspective Tunnel" }: Props) {
  return (
    <div style={{ perspective: 700, display: "inline-block" }}>
      {children.split("").map((char, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block", transformOrigin: "50% 50%" }}
          initial={{ z: -900, scale: .05, opacity: 0, rotateX: 65 }}
          whileInView={{ z: 0, scale: 1, opacity: 1, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * .045, duration: 1.15, ease: [0.16, 1, .3, 1] }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
}
`;

export default code;
