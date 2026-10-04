const code = `"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { ReactNode, useRef } from "react";

type Props = { children?: ReactNode };

export default function MagneticCard({ children = "Magnetic Card" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 180, damping: 20 });
  const y = useSpring(useMotionValue(0), { stiffness: 180, damping: 20 });

  return (
    <motion.div
      ref={ref}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (r) {
          x.set((e.clientX - (r.left + r.width / 2)) * 0.06);
          y.set((e.clientY - (r.top + r.height / 2)) * 0.06);
        }
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x, y, padding: 28, border: "1px solid currentColor", borderRadius: 16 }}
    >
      {children}
    </motion.div>
  );
}
`;

export default code;
