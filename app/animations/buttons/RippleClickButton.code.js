const code = `"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Ripple = { id: number; x: number; y: number };

export default function RippleClickButton() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((prev) => [
      ...prev,
      { id, x: e.clientX - rect.left, y: e.clientY - rect.top },
    ]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 550);
  }, []);

  return (
    <div
      style={{
        height: "100%",
        minHeight: 280,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0a",
      }}
    >
      <button
        onClick={handleClick}
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "16px 44px",
          borderRadius: 12,
          border: "none",
          background: "#6366f1",
          color: "#fff",
          fontSize: 15,
          fontWeight: 600,
          letterSpacing: "0.06em",
          cursor: "pointer",
        }}
      >
        Click Me
        <AnimatePresence>
          {ripples.map((r) => (
            <motion.span
              key={r.id}
              initial={{ width: 0, height: 0, opacity: 0.45 }}
              animate={{ width: 280, height: 280, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              style={{
                position: "absolute",
                left: r.x,
                top: r.y,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.5)",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
              }}
            />
          ))}
        </AnimatePresence>
      </button>
    </div>
  );
}
`;

export default code;
