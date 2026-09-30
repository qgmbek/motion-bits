const code = `"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Particle = { id: number; angle: number; dist: number };

export default function ParticleBurstButton() {
  const [particles, setParticles] = useState<Particle[]>([]);

  const burst = useCallback(() => {
    const batch = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      angle: (360 / 12) * i + Math.random() * 20,
      dist: 40 + Math.random() * 30,
    }));
    setParticles((prev) => [...prev, ...batch]);
    setTimeout(
      () => setParticles((prev) => prev.filter((p) => !batch.find((b) => b.id === p.id))),
      600
    );
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
      <motion.button
        onClick={burst}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: "relative",
          padding: "16px 40px",
          borderRadius: 12,
          border: "none",
          background: "linear-gradient(135deg, #8b5cf6, #d946ef)",
          color: "#fff",
          fontSize: 15,
          fontWeight: 600,
          letterSpacing: "0.06em",
          cursor: "pointer",
          overflow: "visible",
        }}
      >
        Burst
        <AnimatePresence>
          {particles.map((p) => (
            <motion.span
              key={p.id}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{
                x: Math.cos((p.angle * Math.PI) / 180) * p.dist,
                y: Math.sin((p.angle * Math.PI) / 180) * p.dist,
                opacity: 0,
                scale: 0,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#fff",
                pointerEvents: "none",
              }}
            />
          ))}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
`;

export default code;
