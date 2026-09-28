use client";

import { motion, useMotionValue } from "framer-motion";
import { useRef } from "react";

type Props = { children?: string };

export default function CursorDraw({ children = "Draw The Type" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  function move(e: React.PointerEvent<HTMLDivElement>) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  }

  return (
    <div ref={ref} onPointerMove={move} style={{ position: "relative", display: "inline-block" }}>
      <span style={{ opacity: .15 }}>{children}</span>
      <motion.span style={{
        position: "absolute", inset: 0, overflow: "hidden",
        clipPath: "circle(45px at var(--x) var(--y))",
        ["--x" as string]: x,
        ["--y" as string]: y,
      }}>{children}</motion.span>
    </div>
  );
}