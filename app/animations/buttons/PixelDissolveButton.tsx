"use client";

import { motion, useAnimation } from "framer-motion";
import { useState } from "react";

export default function PixelDissolveButton() {
  const controls = useAnimation();
  const [isHover, setIsHover] = useState(false);

  const gridSize = 6;
  const total = gridSize * gridSize;

  const handleClick = async () => {
    await controls.start("collapse");
    await controls.start("initial");
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0d0d0f",
      }}
    >
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
          padding: "18px 48px",
          fontSize: "18px",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          background: "transparent",
          color: "#ff0000",
          border: "1px solid rgba(255,255,255,0.2)",
          overflow: "hidden",
          cursor: "pointer",
          zIndex: 2,
        }}
      >
        Pixel Dissolve
        {/* Pixels */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            gridTemplateRows: `repeat(${gridSize}, 1fr)`,
            pointerEvents: "none",
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
                hover: () => ({
                  opacity: 1,
                  scale: 1,
                  transition: {
                    delay: Math.random() * 0.15,
                    duration: 0.25,
                    ease: [0.16, 1, 0.3, 1],
                  },
                }),
                collapse: () => ({
                  opacity: 0,
                  scale: 0,
                  transition: {
                    delay: Math.random() * 0.1,
                    duration: 0.2,
                  },
                }),
              }}
              initial="initial"
              animate={controls}
              style={{
                background: isHover
                  ? "rgba(255,255,255,0.9)"
                  : "rgba(255,255,255,0.7)",
                zIndex: -1,
              }}
            />
          ))}
        </div>
      </motion.button>
    </div>
  );
}
