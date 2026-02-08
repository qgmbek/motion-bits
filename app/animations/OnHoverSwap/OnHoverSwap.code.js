const code = `"use client";

import { motion } from "framer-motion";

export default function OnHoverSwap() {
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
        lineHeight: 1,
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
            {/* FROMs */}
            <motion.span
              variants={{
                rest: { opacity: 1 },
                hover: { opacity: 0 },
              }}
              transition={{
                duration: 0.25,
                ease: "easeInOut",
              }}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {fromChar}
            </motion.span>

            {/* TO */}
            <motion.span
              variants={{
                rest: { opacity: 0 },
                hover: { opacity: 1 },
              }}
              transition={{
                duration: 0.25,
                ease: "easeInOut",
              }}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
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
`;

export default code;
