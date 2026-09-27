"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type HologramFlickerProps = {
  children?: ReactNode;
  color?: string;
};

export default function HologramFlicker({
  children = "Hologram Flicker",
  color = "#00bfff",
}: HologramFlickerProps) {
  const text = typeof children === "string" ? children : "Hologram Flicker";
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      style={{
        letterSpacing: "-0.02em",
        position: "relative",
      }}
    >
      {/* Scanline effect */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 191, 255, 0.03) 2px,
            rgba(0, 191, 255, 0.03) 4px
          )`,
          pointerEvents: "none",
          zIndex: 1,
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          style={{
            display: "inline-block",
            whiteSpace: "pre",
            color: color,
            textShadow: `
              0 0 5px ${color},
              0 0 10px ${color},
              0 0 20px ${color}
            `,
            position: "relative",
            zIndex: 2,
          }}
          animate={{
            opacity: [1, 0.8, 1, 0.9, 1, 0.85, 1],
            textShadow: [
              `0 0 5px ${color}, 0 0 10px ${color}, 0 0 20px ${color}`,
              `0 0 3px ${color}, 0 0 6px ${color}, 0 0 12px ${color}`,
              `0 0 5px ${color}, 0 0 10px ${color}, 0 0 20px ${color}`,
              `0 0 4px ${color}, 0 0 8px ${color}, 0 0 16px ${color}`,
              `0 0 5px ${color}, 0 0 10px ${color}, 0 0 20px ${color}`,
              `0 0 3px ${color}, 0 0 6px ${color}, 0 0 12px ${color}`,
              `0 0 5px ${color}, 0 0 10px ${color}, 0 0 20px ${color}`,
            ],
          }}
          transition={{
            duration: 0.08 + Math.random() * 0.05,
            repeat: Infinity,
            repeatDelay: 0.5 + Math.random() * 1.5,
            ease: "easeInOut",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
}
