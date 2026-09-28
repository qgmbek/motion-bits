use client";

import { motion } from "framer-motion";

type Props = { children?: string };

export default function EchoTrail({ children = "Echo Trail" }: Props) {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {[3, 2, 1].map(n => (
        <div key={n} aria-hidden style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          opacity: .06 * n, transform: `translate(${-n * 8}px, ${n * 2}px)`,
          filter: `blur(${n}px)`,
        }}>{children}</div>
      ))}
      <motion.div whileHover={{ x: 8 }} transition={{ type: "spring", stiffness: 260, damping: 18 }}>
        {children}
      </motion.div>
    </div>
  );
}