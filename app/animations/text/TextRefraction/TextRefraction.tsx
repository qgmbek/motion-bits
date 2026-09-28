use client";

import { motion } from "framer-motion";

type Props = { children?: string };

export default function TextRefraction({ children = "Refraction" }: Props) {
  return (
    <motion.div style={{ display: "inline-block", position: "relative" }} whileHover="hover">
      <span>{children}</span>
      <motion.span
        variants={{ hover: { scale: 1.03, skewX: 3, opacity: .28 } }}
        transition={{ duration: .35 }}
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          color: "transparent", WebkitTextStroke: "1px currentColor",
          filter: "blur(1px)",
        }}
      >
        {children}
      </motion.span>
    </motion.div>
  );
}