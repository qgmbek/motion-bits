const code = `"use client";

import { motion } from "framer-motion";

type Props = { children?: string };

export default function ChromaticSeparation({ children = "Chromatic" }: Props) {
  return (
    <motion.div whileHover="hover" style={{ position: "relative", display: "inline-block" }}>
      {[
        { c: "#ff3158", x: -4 },
        { c: "#36e7ff", x: 4 },
      ].map((layer, i) => (
        <motion.span key={i} variants={{ hover: { x: layer.x, opacity: .65 } }}
          initial={{ x: 0, opacity: 0 }} animate={{ x: 0, opacity: 0 }}
          transition={{ duration: .25 }}
          style={{ position: "absolute", inset: 0, color: layer.c, pointerEvents: "none" }}>
          {children}
        </motion.span>
      ))}
      <span>{children}</span>
    </motion.div>
  );
}
`;

export default code;
