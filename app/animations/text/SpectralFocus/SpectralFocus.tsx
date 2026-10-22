"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

type Props = { children?: string };

export default function SpectralFocus({ children = "Spectral Focus" }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 200, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 25 });

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

  const rotateX = useTransform(springY, [-150, 150], [5, -5]);
  const rotateY = useTransform(springX, [-150, 150], [-5, 5]);

  const colors = [
    { color: "#ff6b6b", blur: 8 },
    { color: "#4ecdc4", blur: 6 },
    { color: "#45b7d1", blur: 4 },
    { color: "#96ceb4", blur: 3 },
  ];

  return (
    <div
      style={{
        height: "100%",
        minHeight: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#030305",
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
          display: "inline-block",
          cursor: "pointer",
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
      >
        {colors.map((layer, i) => (
          <motion.span
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              color: layer.color,
              pointerEvents: "none",
              opacity: isHovered ? 0.4 : 0.2,
              filter: `blur(${isHovered ? layer.blur : layer.blur * 2}px)`,
              mixBlendMode: "screen",
            }}
            animate={{
              filter: isHovered
                ? [`blur(${layer.blur}px)`, `blur(${layer.blur / 2}px)`, `blur(${layer.blur}px)`]
                : `blur(${layer.blur * 2}px)`,
              opacity: isHovered ? [0.4, 0.6, 0.4] : 0.2,
            }}
            transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
          >
            {children}
          </motion.span>
        ))}

        <motion.span
          style={{
            position: "relative",
            zIndex: 10,
            fontSize: 42,
            fontWeight: 800,
            letterSpacing: "0.05em",
            color: "#ffffff",
            filter: isHovered ? "blur(0px)" : "blur(2px)",
            textShadow: isHovered
              ? "0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(255, 255, 255, 0.4)"
              : "0 0 10px rgba(255, 255, 255, 0.3)",
          }}
          animate={{
            filter: isHovered
              ? ["blur(0px)", "blur(0.5px)", "blur(0px)"]
              : "blur(2px)",
            textShadow: isHovered
              ? [
                  "0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(255, 255, 255, 0.4)",
                  "0 0 50px rgba(255, 255, 255, 1), 0 0 80px rgba(255, 255, 255, 0.6)",
                  "0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(255, 255, 255, 0.4)",
                ]
              : "0 0 10px rgba(255, 255, 255, 0.3)",
          }}
          transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
        >
          {children}
        </motion.span>

        <motion.div
          style={{
            position: "absolute",
            inset: -20,
            background: "radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(255, 255, 255, 0.1), transparent 60%)",
            pointerEvents: "none",
            opacity: 0,
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
            ["--x" as string]: useTransform(springX, (v) => `${50 + v / 5}%`),
            ["--y" as string]: useTransform(springY, (v) => `${50 + v / 5}%`),
          }}
        />
      </motion.div>
    </div>
  );
}
