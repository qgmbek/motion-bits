"use client";

import { motion } from "framer-motion";

export default function BorderRevealButton() {
  const width = 240;
  const height = 64;
  const strokeWidth = 2;
  const radius = 12;

  const perimeter = 2 * (width - strokeWidth) + 2 * (height - strokeWidth);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#0e0e10",
      }}
    >
      <motion.button
        initial="initial"
        whileHover="hover"
        whileTap={{ scale: 0.98 }}
        style={{
          position: "relative",
          width: width,
          height: height,
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
      >
        <svg
          width={width}
          height={height}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          <motion.rect
            x={strokeWidth / 2}
            y={strokeWidth / 2}
            width={width - strokeWidth}
            height={height - strokeWidth}
            rx={radius}
            ry={radius}
            fill="transparent"
            stroke="#e6e6e6"
            strokeWidth={strokeWidth}
            strokeDasharray={perimeter}
            strokeDashoffset={perimeter}
            variants={{
              hover: {
                strokeDashoffset: 0,
                transition: {
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
          />
        </svg>

        <motion.span
          variants={{
            initial: {
              opacity: 0.4,
              y: 6,
              letterSpacing: "0.1em",
            },
            hover: {
              opacity: 1,
              y: 0,
              transition: {
                delay: 0.75,
                duration: 0.2,
                ease: "easeOut",
              },
            },
          }}
          style={{
            position: "relative",
            zIndex: 1,
            color: "#e6e6e6",
            fontSize: "14px",
            textTransform: "uppercase",
            fontWeight: 500,
            letterSpacing: "0.15em",
            fontFamily: "Inter, system-ui, -apple-system, sans-serif",
          }}
        >
          Border Reveal Button
        </motion.span>
      </motion.button>
    </div>
  );
}
