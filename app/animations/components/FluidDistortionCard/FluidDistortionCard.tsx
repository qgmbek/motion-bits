"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export default function FluidDistortionCard() {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

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

  const rotateX = useTransform(springY, [-150, 150], [8, -8]);
  const rotateY = useTransform(springX, [-150, 150], [-8, 8]);

  return (
    <div
      style={{
        height: "100%",
        minHeight: 300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#050508",
        perspective: 1000,
      }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleLeave}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 380,
          padding: 40,
          borderRadius: 20,
          background: "rgba(255, 255, 255, 0.03)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          overflow: "hidden",
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
      >
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 20,
            background: "radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(100, 200, 255, 0.15), transparent 60%)",
            pointerEvents: "none",
          }}
          animate={{
            ["--x" as string]: useTransform(springX, (v) => `${50 + v / 5}%`),
            ["--y" as string]: useTransform(springY, (v) => `${50 + v / 5}%`),
          }}
        />

        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 20,
            background: "linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, transparent 100%)",
            pointerEvents: "none",
          }}
        />

        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(100, 200, 255, 0.5), transparent)",
            opacity: 0,
          }}
          animate={{
            opacity: isHovered ? [0, 1, 0] : 0,
            y: isHovered ? [0, "100%"] : 0,
          }}
          transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
        />

        <motion.div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(100, 200, 255, 0.5), transparent)",
            opacity: 0,
          }}
          animate={{
            opacity: isHovered ? [0, 1, 0] : 0,
            y: isHovered ? [0, "-100%"] : 0,
          }}
          transition={{ duration: 2, repeat: isHovered ? Infinity : 0, delay: 1 }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <motion.h3
            style={{
              margin: 0,
              fontSize: 24,
              fontWeight: 700,
              color: "#ffffff",
              transform: "translateZ(30px)",
            }}
            animate={{
              textShadow: isHovered
                ? [
                    "0 0 20px rgba(100, 200, 255, 0.5)",
                    "0 0 40px rgba(100, 200, 255, 0.8)",
                    "0 0 20px rgba(100, 200, 255, 0.5)",
                  ]
                : "none",
            }}
            transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
          >
            Fluid Distortion
          </motion.h3>
          <motion.p
            style={{
              margin: "16px 0 0",
              fontSize: 15,
              lineHeight: 1.6,
              color: "rgba(255, 255, 255, 0.6)",
              transform: "translateZ(20px)",
            }}
          >
            Move your cursor to see the liquid-like distortion effect. The card
            responds with fluid motion and depth.
          </motion.p>
        </div>

        <motion.div
          style={{
            position: "absolute",
            inset: -2,
            borderRadius: 22,
            border: "1px solid rgba(100, 200, 255, 0.2)",
            opacity: 0,
            pointerEvents: "none",
          }}
          animate={{
            opacity: isHovered ? [0, 0.5, 0] : 0,
            scale: isHovered ? [1, 1.02, 1] : 1,
          }}
          transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
        />
      </motion.div>
    </div>
  );
}
