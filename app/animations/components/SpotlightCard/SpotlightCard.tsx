"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function SpotlightCard() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 25 });
  const springY = useSpring(y, { stiffness: 200, damping: 25 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 360,
        padding: 32,
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.1)",
        background: "#111",
        overflow: "hidden",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 70%)",
          pointerEvents: "none",
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        <h3 style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>Spotlight Card</h3>
        <p style={{ margin: "12px 0 0", opacity: 0.6, fontSize: 14, lineHeight: 1.5 }}>
          Move your cursor to reveal a soft glow that follows your pointer.
        </p>
      </div>
    </motion.div>
  );
}
