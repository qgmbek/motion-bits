"use client";

import { motion, useAnimation, useScroll } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";

export default function PhysicsBasedScatter() {
  const text = "Physics-Based Scatter";
  const letters = useMemo(() => text.split(""), [text]);

  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      if (latest > 80) {
        controls.start((i) => ({
          x: (Math.random() - 0.5) * 160,
          y: Math.random() * 120 + 40, // gravity ↓
          rotate: (Math.random() - 0.5) * 30,
          transition: {
            type: "spring",
            stiffness: 120,
            damping: 16,
            mass: 0.9,
          },
        }));
      } else {
        controls.start({
          x: 0,
          y: 0,
          rotate: 0,
          transition: {
            type: "spring",
            stiffness: 200,
            damping: 20,
            mass: 1,
          },
        });
      }
    });

    return () => unsubscribe();
  }, [controls, scrollY]);

  return (
    <>
      {/* Layout placeholder (keeps flow intact) */}
      <div
        ref={containerRef}
        style={{
          fontSize: "clamp(2.5rem, 6vw, 5rem)",
          fontWeight: 700,
          letterSpacing: "-0.04em",
          visibility: "hidden",
          height: "600vh",
        }}
      >
        {text}
      </div>

      {/* Overlay animated text */}
      <motion.div
        style={{
          position: "fixed",
          top: "30vh",
          left: "50%",
          transform: "translateX(-50%)",
          display: "inline-flex",
          fontSize: "clamp(2.5rem, 6vw, 5rem)",
          fontWeight: 700,
          letterSpacing: "-0.04em",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      >
        {letters.map((char, i) => (
          <motion.span
            key={i}
            custom={i}
            animate={controls}
            initial={{ x: 0, y: 0 }}
            style={{
              display: "inline-block",
              whiteSpace: "pre",
              color: "#fff",
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>
    </>
  );
}
