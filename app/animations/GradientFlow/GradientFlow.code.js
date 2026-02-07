const code = `"use client";

import { motion } from "framer-motion";

type Direction = "left" | "right" | "up" | "down";

interface GradientFlowProps {
  text?: string;
  speed?: number; // seconds
  direction?: Direction;
}

export default function GradientFlow({
  text = "Gradient Flow",
  speed = 6,
  direction = "right",
}: GradientFlowProps) {
  const directionMap: Record<Direction, string[]> = {
    right: ["0%", "200%"],
    left: ["200%", "0%"],
    down: ["0%", "0%"],
    up: ["0%", "0%"],
  };

  const backgroundPosition =
    direction === "up" || direction === "down"
      ? {
          backgroundPositionY:
            direction === "down" ? ["0%", "200%"] : ["200%", "0%"],
        }
      : {
          backgroundPositionX: directionMap[direction],
        };

  return (
    <motion.div
      animate={backgroundPosition}
      transition={{
        duration: speed,
        ease: "linear",
        repeat: Infinity,
      }}
      style={{
        fontSize: "54px",
        fontWeight: 500,
        letterSpacing: "-0.04em",
        lineHeight: 1,
        backgroundImage:
          "linear-gradient(120deg, #7F00FF, #00C6FF, #00F5A0, #7F00FF)",
        backgroundSize: "200% 200%",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        color: "transparent",
        WebkitTextFillColor: "transparent",
        willChange: "background-position",
      }}
    >
      {text}
    </motion.div>
  );
}
`;

export default code;
