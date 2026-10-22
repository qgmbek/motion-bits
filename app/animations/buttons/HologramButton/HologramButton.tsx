"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HologramButton() {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(springY, [-100, 100], [10, -10]);
  const rotateY = useTransform(springX, [-100, 100], [-10, 10]);

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    mouseX.set(e.clientX - rect.left - centerX);
    mouseY.set(e.clientY - rect.top - centerY);
  };

  const handleLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      style={{
        height: "100%",
        minHeight: 280,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#030305",
        perspective: 1000,
      }}
    >
      <motion.button
        ref={ref}
        onMouseMove={handleMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleLeave}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: "relative",
          padding: "24px 56px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            border: "1px solid rgba(0, 200, 255, 0.3)",
            borderRadius: 8,
            background: "rgba(0, 200, 255, 0.05)",
            backdropFilter: "blur(10px)",
          }}
          animate={{
            opacity: isHovered ? [0.3, 0.6, 0.3] : 0.3,
            borderColor: isHovered
              ? ["rgba(0, 200, 255, 0.3)", "rgba(0, 200, 255, 0.8)", "rgba(0, 200, 255, 0.3)"]
              : "rgba(0, 200, 255, 0.3)",
          }}
          transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
        />

        <motion.div
          style={{
            position: "absolute",
            inset: -4,
            border: "1px solid rgba(0, 200, 255, 0.2)",
            borderRadius: 10,
            opacity: 0,
            transform: "translateZ(-20px)",
          }}
          animate={{
            opacity: isHovered ? [0, 0.5, 0] : 0,
            scale: isHovered ? [1, 1.1, 1] : 1,
          }}
          transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
        />

        <motion.div
          style={{
            position: "absolute",
            inset: -8,
            border: "1px solid rgba(0, 200, 255, 0.1)",
            borderRadius: 12,
            opacity: 0,
            transform: "translateZ(-40px)",
          }}
          animate={{
            opacity: isHovered ? [0, 0.3, 0] : 0,
            scale: isHovered ? [1, 1.2, 1] : 1,
          }}
          transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0, delay: 0.2 }}
        />

        <motion.span
          style={{
            position: "relative",
            zIndex: 10,
            fontSize: 17,
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#00c8ff",
            textShadow: isHovered
              ? "0 0 20px rgba(0, 200, 255, 0.8), 0 0 40px rgba(0, 200, 255, 0.4)"
              : "0 0 10px rgba(0, 200, 255, 0.5)",
            transform: "translateZ(20px)",
          }}
          animate={{
            textShadow: isHovered
              ? [
                  "0 0 20px rgba(0, 200, 255, 0.8), 0 0 40px rgba(0, 200, 255, 0.4)",
                  "0 0 30px rgba(0, 200, 255, 1), 0 0 60px rgba(0, 200, 255, 0.6)",
                  "0 0 20px rgba(0, 200, 255, 0.8), 0 0 40px rgba(0, 200, 255, 0.4)",
                ]
              : "0 0 10px rgba(0, 200, 255, 0.5)",
          }}
          transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
        >
          Hologram
        </motion.span>

        <motion.div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0, 200, 255, 0.15) 0%, transparent 70%)",
            transform: "translate(-50%, -50%) translateZ(-10px)",
            pointerEvents: "none",
            opacity: 0,
          }}
          animate={{
            opacity: isHovered ? [0, 0.8, 0] : 0,
            scale: isHovered ? [0.8, 1.2, 0.8] : 0.8,
          }}
          transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
        />

        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, transparent 0%, rgba(0, 200, 255, 0.1) 50%, transparent 100%)",
            opacity: 0,
            pointerEvents: "none",
          }}
          animate={{
            opacity: isHovered ? [0, 0.3, 0] : 0,
            y: isHovered ? ["-100%", "100%"] : "-100%",
          }}
          transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
        />
      </motion.button>
    </div>
  );
}
