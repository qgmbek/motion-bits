"use client";

import { motion, useAnimation } from "framer-motion";
import { useState } from "react";

export default function PixelDissolveButton({
  children,
}: {
  children: string;
}) {
  const controls = useAnimation();
  const [isHover, setIsHover] = useState(false);

  const gridSize = 6;
  const total = gridSize * gridSize;

  const handleClick = async () => {
    await controls.start("collapse");
    await controls.start("initial");
  };

  return (
    <motion.button
      onHoverStart={() => {
        setIsHover(true);
        controls.start("hover");
      }}
      onHoverEnd={() => {
        setIsHover(false);
        controls.start("initial");
      }}
      onClick={handleClick}
      style={{
        position: "relative",
        padding: "clamp(12px, 2.8vw, 18px) clamp(28px, 6vw, 48px)",
        marginTop: "clamp(20px, 6vw, 30px)",
        fontSize: "clamp(20px, 1.8vw, 18px)",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        fontWeight: "400",
        background: "transparent",
        color: isHover ? "#000" : "var(--main-white)",
        border: "1px solid var(--main-white)",
        borderRadius: "200px",
        overflow: "hidden",
        cursor: "pointer",
        zIndex: 2,
      }}
    >
      <span
        style={{
          position: "relative",
          zIndex: 2,
          display: "inline-flex",
        }}
      >
        {children.split("").map((char, i) => (
          <span
            key={i}
            style={{
              display: "inline-block",
              overflow: "hidden",
              height: "1.2em",
              lineHeight: "1.2em",
              verticalAlign: "top",
            }}
          >
            <motion.span
              initial={{
                y: "100%",
                opacity: 0,
              }}
              animate={{
                y: "0%",
                opacity: 1,
              }}
              transition={{
                delay: 0.3 + i * 0.06,
                duration: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                display: "inline-block",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          </span>
        ))}
      </span>

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`,
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        {Array.from({ length: total }).map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={{
              initial: {
                opacity: 0,
                scale: 0.4,
              },

              hover: {
                opacity: 1,
                scale: 1,
                transition: {
                  delay: Math.random() * 0.15,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                },
              },

              collapse: {
                opacity: 0,
                scale: 0,
                transition: {
                  delay: Math.random() * 0.1,
                  duration: 0.2,
                },
              },
            }}
            initial="initial"
            animate={controls}
            style={{
              background: "rgb(255, 255, 255)",
            }}
          />
        ))}
      </div>
    </motion.button>
  );
}