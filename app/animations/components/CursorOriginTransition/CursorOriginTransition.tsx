"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function CursorOriginTransition() {
  const [p, setP] = useState({ x: 50, y: 50 });
  const [active, setActive] = useState(false);

  return (
    <button
      onClick={(e) => {
        setP({ x: e.clientX, y: e.clientY });
        setActive(true);
      }}
    >
      Cursor Origin
      {active && (
        <motion.div
          initial={{ clipPath: `circle(0px at ${p.x}px ${p.y}px)` }}
          animate={{ clipPath: `circle(150vmax at ${p.x}px ${p.y}px)` }}
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
