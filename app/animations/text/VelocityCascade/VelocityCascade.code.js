const code = `"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

type Props = { children?: string };

export default function VelocityCascade({ children = "Velocity Cascade" }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

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

  const letters = children.split("");

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
        {letters.map((letter, i) => {
          const delay = i * 0.03;
          const rotateY = useTransform(springX, [-200, 200], [-15 + i * 2, 15 - i * 2]);
          const translateY = useTransform(springY, [-200, 200], [-10 + i, 10 - i]);

          return (
            <motion.span
              key={i}
              style={{
                display: "inline-block",
                fontSize: 36,
                fontWeight: 800,
                color: "#ffffff",
                position: "relative",
              }}
              animate={{
                rotateY: isHovered ? rotateY : 0,
                translateY: isHovered ? translateY : 0,
                color: isHovered
                  ? [
                      "#ffffff",
                      `hsl(${(i * 30) % 360}, 80%, 60%)`,
                      "#ffffff",
                    ]
                  : "#ffffff",
                textShadow: isHovered
                  ? [
                      "none",
                      `0 0 20px hsl(${(i * 30) % 360}, 80%, 60%)`,
                      "none",
                    ]
                  : "none",
              }}
              transition={{
                duration: 0.4,
                delay: isHovered ? delay : 0,
                color: { duration: 0.8, repeat: isHovered ? Infinity : 0 },
                textShadow: { duration: 0.8, repeat: isHovered ? Infinity : 0 },
              }}
            >
              {letter === " " ? " " : letter}
            </motion.span>
          );
        })}

        <motion.div
          style={{
            position: "absolute",
            inset: -30,
            background: "radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(100, 200, 255, 0.15), transparent 60%)",
            pointerEvents: "none",
            opacity: 0,
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
            ["--x" as string]: useTransform(springX, (v) => \`\${50 + v / 4}%\`),
            ["--y" as string]: useTransform(springY, (v) => \`\${50 + v / 4}%\`),
          }}
        />

        <motion.div
          style={{
            position: "absolute",
            bottom: -20,
            left: 0,
            right: 0,
            height: 2,
            background: "linear-gradient(90deg, transparent, rgba(100, 200, 255, 0.8), transparent)",
            opacity: 0,
          }}
          animate={{
            opacity: isHovered ? [0, 1, 0] : 0,
            scaleX: isHovered ? [0, 1, 0] : 0,
          }}
          transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0 }}
        />
      </motion.div>
    </div>
  );
}
`;

export default code;
