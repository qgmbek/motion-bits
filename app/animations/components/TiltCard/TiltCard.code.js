const code = `"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

type Props = { children?: ReactNode };

export default function TiltCard({ children = "Tilt Card" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useSpring(useMotionValue(0.5), { stiffness: 220, damping: 22 });
  const py = useSpring(useMotionValue(0.5), { stiffness: 220, damping: 22 });

  const rx = useTransform(py, [0, 1], [8, -8]);
  const ry = useTransform(px, [0, 1], [-8, 8]);

  return (
    <motion.div
      ref={ref}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (r) {
          px.set((e.clientX - r.left) / r.width);
          py.set((e.clientY - r.top) / r.height);
        }
      }}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900, padding: 28, border: "1px solid currentColor", borderRadius: 16 }}
    >
      {children}
    </motion.div>
  );
}
`;

export default code;
