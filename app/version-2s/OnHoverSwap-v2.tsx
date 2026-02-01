"use client";

import { motion } from "framer-motion";

export default function CharacterSwap() {
  const from = "Hover Character Swap";
  const to = "Design and Build";
  const maxLength = Math.max(from.length, to.length);

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      style={{
        display: "inline-flex",
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        fontSize: "32px",
        fontWeight: 500,
        color: "#fff",
        perspective: 800,
        lineHeight: 1,
        letterSpacing: 0.01,
      }}
    >
      {Array.from({ length: maxLength }).map((_, i) => {
        const fromChar = from[i] || " ";
        const toChar = to[i] || " ";

        return (
          <span
            key={i}
            style={{
              position: "relative",
              display: "inline-block",
              width: "1em",
              height: "1em",
            }}
          >
            {/* FROM CHARACTER */}
            <motion.span
              variants={{
                rest: { rotateX: 0, opacity: 1 },
                hover: { rotateX: 90, opacity: 0 },
              }}
              transition={{
                duration: 0.35,
                ease: [0.4, 0, 0.2, 1],
              }}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transformOrigin: "bottom",
                backfaceVisibility: "hidden",
              }}
            >
              {fromChar}
            </motion.span>

            {/* TO CHARACTER */}
            <motion.span
              variants={{
                rest: { rotateX: -90, opacity: 0 },
                hover: { rotateX: 0, opacity: 1 },
              }}
              transition={{
                duration: 0.35,
                ease: [0.4, 0, 0.2, 1],
              }}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transformOrigin: "top",
                backfaceVisibility: "hidden",
              }}
            >
              {toChar}
            </motion.span>
          </span>
        );
      })}
    </motion.div>
  );
}
