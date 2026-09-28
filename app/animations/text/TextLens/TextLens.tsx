use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

type Props = { children?: string };

export default function TextLens({ children = "Text Lens" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(50), { stiffness: 180, damping: 22 });
  const y = useSpring(useMotionValue(50), { stiffness: 180, damping: 22 });

  function move(e: React.PointerEvent<HTMLDivElement>) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set(((e.clientX - r.left) / r.width) * 100);
    y.set(((e.clientY - r.top) / r.height) * 100);
  }

  return (
    <motion.div ref={ref} onPointerMove={move} style={{ position: "relative", display: "inline-block" }}>
      <span>{children}</span>
      <motion.span
        aria-hidden
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          clipPath: "circle(45px at var(--x) var(--y))",
          transform: "scale(1.14)", transformOrigin: "center",
          color: "inherit",
          ["--x" as string]: x.get() + "%",
          ["--y" as string]: y.get() + "%",
        }}
      >
        {children}
      </motion.span>
    </motion.div>
  );
}