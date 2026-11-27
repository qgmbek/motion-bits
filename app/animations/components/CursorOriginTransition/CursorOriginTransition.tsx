"use client";

import { motion } from "framer-motion";
import { useState, type RefObject } from "react";

export default function CursorOriginTransition({ viewport }: { viewport?: RefObject<HTMLDivElement | null> } = {}) {
  const [p, setP] = useState({ x: 50, y: 50 });
  const [active, setActive] = useState(false);

  return (
    <button
      onClick={(e) => {
        const frame = viewport?.current?.getBoundingClientRect();
        const button = e.currentTarget.getBoundingClientRect();
        const x = e.detail ? e.clientX : button.left + button.width / 2;
        const y = e.detail ? e.clientY : button.top + button.height / 2;
        setP({ x: x - (frame?.left ?? 0), y: y - (frame?.top ?? 0) });
        setActive(true);
      }}
    >
      Cursor Origin
      {active && (
        <motion.div
          initial={{ clipPath: `circle(0px at ${p.x}px ${p.y}px)` }}
          animate={{ clipPath: `circle(150cqmax at ${p.x}px ${p.y}px)` }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          onAnimationComplete={() => setActive(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2000,
            background: "currentColor",
            pointerEvents: "none",
          }}
        />
      )}
    </button>
  );
}
