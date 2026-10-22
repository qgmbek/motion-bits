"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

type Props = { children?: string };

export default function ChromaHologram({ children = "Chroma Hologram" }: Props) {
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

  const channels = [
    { color: "#ff0000", xOffset: -4, yOffset: 0 },
    { color: "#00ff00", xOffset: 0, yOffset: 0 },
    { color: "#0000ff", xOffset: 4, yOffset: 0 },
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
        }}
      >
        {channels.map((channel, i) => {
          const x = useTransform(springX, (v) => v * (channel.xOffset / 30));
          const y = useTransform(springY, (v) => v * (channel.yOffset / 30));

          return (
            <motion.span
              key={i}
              style={{
                position: "absolute",
                inset: 0,
                color: channel.color,
                pointerEvents: "none",
                mixBlendMode: "screen",
                opacity: isHovered ? 0.6 : 0.3,
                filter: "blur(0.5px)",
              }}
              animate={{
                x: isHovered ? x : 0,
                y: isHovered ? y : 0,
                opacity: isHovered ? [0.6, 0.8, 0.6] : 0.3,
              }}
              transition={{ duration: 0.3, opacity: { duration: 1, repeat: isHovered ? Infinity : 0 } }}
            >
              {children}
            </motion.span>
          );
        })}

        <motion.span
          style={{
            position: "relative",
            zIndex: 10,
            fontSize: 40,
            fontWeight: 800,
            letterSpacing: "0.05em",
            color: "#ffffff",
            textShadow: isHovered
              ? "0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(255, 255, 255, 0.4)"
              : "0 0 10px rgba(255, 255, 255, 0.3)",
          }}
          animate={{
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
            inset: -40,
            background: "radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(255, 255, 255, 0.08), transparent 60%)",
            pointerEvents: "none",
            opacity: 0,
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
            ["--x" as string]: useTransform(springX, (v) => `${50 + v / 4}%`),
            ["--y" as string]: useTransform(springY, (v) => `${50 + v / 4}%`),
          }}
        />

        <motion.div
          style={{
            position: "absolute",
            inset: -20,
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: 8,
            opacity: 0,
            pointerEvents: "none",
          }}
          animate={{
            opacity: isHovered ? [0, 0.5, 0] : 0,
            scale: isHovered ? [1, 1.05, 1] : 1,
          }}
          transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
        />

        <motion.div
          style={{
            position: "absolute",
            inset: -10,
            border: "1px solid rgba(255, 0, 0, 0.1)",
            borderRadius: 4,
            opacity: 0,
            pointerEvents: "none",
          }}
          animate={{
            opacity: isHovered ? [0, 0.3, 0] : 0,
            scale: isHovered ? [1, 1.02, 1] : 1,
          }}
          transition={{ duration: 2, repeat: isHovered ? Infinity : 0, delay: 0.5 }}
        />
      </motion.div>
    </div>
  );
}
