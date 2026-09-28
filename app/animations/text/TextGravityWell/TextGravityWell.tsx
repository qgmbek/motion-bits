"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

type Props = { children?: string };

export default function TextGravityWell({ children = "Gravity Well" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 180, damping: 18 });
  const y = useSpring(my, { stiffness: 180, damping: 18 });
  const text = children.split("");

  function move(e: React.PointerEvent<HTMLDivElement>) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(e.clientX - (r.left + r.width / 2));
    my.set(e.clientY - (r.top + r.height / 2));
  }

  function leave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div ref={ref} onPointerMove={move} onPointerLeave={leave}
      style={{ display: "inline-block", position: "relative" }}>
      {text.map((char, i) => {
        const angle = (i / Math.max(text.length - 1, 1) - .5) * Math.PI;
        const px = useTransform(x, v => Math.cos(angle) * v * .12);
        const py = useTransform(y, v => Math.sin(angle) * v * .12);
        return (
          <motion.span key={i} style={{ display: "inline-block", x: px, y: py }}>
            {char === " " ? "\u00A0" : char}
          </motion.span>
        );
      })}
    </motion.div>
  );
}