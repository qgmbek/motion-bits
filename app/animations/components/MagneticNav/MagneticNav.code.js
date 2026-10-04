const code = `"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

type Item = { label: string; href?: string };
type Props = { items?: Item[] };

function Item({ item }: { item: Item }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 350, damping: 22 });
  const y = useSpring(useMotionValue(0), { stiffness: 350, damping: 22 });

  return (
    <motion.a
      ref={ref}
      href={item.href ?? "#"}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (r) {
          x.set((e.clientX - (r.left + r.width / 2)) * 0.12);
          y.set((e.clientY - (r.top + r.height / 2)) * 0.12);
        }
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x, y, display: "inline-block", padding: "8px 10px", color: "inherit", textDecoration: "none" }}
    >
      {item.label}
    </motion.a>
  );
}

export default function MagneticNav({ items = [{ label: "Work" }, { label: "About" }, { label: "Contact" }] }: Props) {
  return (
    <nav style={{ display: "flex", gap: 4 }}>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </nav>
  );
}
`;

export default code;
