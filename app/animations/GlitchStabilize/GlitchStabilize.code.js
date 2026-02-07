const code = `"use client";

import { motion } from "framer-motion";

export default function GlitchStabilize() {
  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        overflow: "hidden",
      }}
    >
      <motion.div
        initial="glitch"
        animate="stable"
        variants={{
          glitch: {
            x: [0, -25, 30, -20, 20, -10, 10, 0],
            y: [0, 15, -15, 10, -10, 6, -6, 0],
            scale: [1, 1.05, 0.95, 1.02, 0.98, 1],
            skewX: [0, -12, 12, -6, 6, 0],
            opacity: [1, 0.3, 1, 0.2, 1, 0.6, 1],
            filter: [
              "blur(6px)",
              "blur(0px)",
              "blur(4px)",
              "blur(0px)",
            ],
            transition: {
              duration: 1.6,
              ease: "linear",
            },
          },
          stable: {
            x: 0,
            y: 0,
            scale: 1,
            skewX: 0,
            opacity: 1,
            filter: "blur(0px)",
            transition: {
              duration: 0.4,
              ease: "easeOut",
            },
          },
        }}
        style={{
          position: "relative",
          fontSize: "88px",
          fontWeight: 900,
          letterSpacing: "-0.05em",
        }}
      >
        {/* RED SLICE */}
        <motion.span
          aria-hidden
          initial={{ x: -40 }}
          animate={{
            x: [-40, 20, -30, 0],
            clipPath: [
              "inset(0 0 70% 0)",
              "inset(10% 0 40% 0)",
              "inset(0 0 0 0)",
            ],
            opacity: [1, 0.9, 0],
          }}
          transition={{ duration: 1.2, ease: "linear" }}
          style={{
            position: "absolute",
            inset: 0,
            color: "#ff003c",
            mixBlendMode: "screen",
          }}
        >
          Glitch Stabilize
        </motion.span>

        {/* BLUE SLICE */}
        <motion.span
          aria-hidden
          initial={{ x: 40 }}
          animate={{
            x: [40, -20, 30, 0],
            clipPath: [
              "inset(50% 0 0 0)",
              "inset(65% 0 10% 0)",
              "inset(0 0 0 0)",
            ],
            opacity: [1, 0.9, 0],
          }}
          transition={{ duration: 1.2, ease: "linear" }}
          style={{
            position: "absolute",
            inset: 0,
            color: "#00eaff",
            mixBlendMode: "screen",
          }}
        >
          Glitch Stabilize
        </motion.span>

        {/* GREEN TELEPORT FLICKER */}
        <motion.span
          aria-hidden
          animate={{
            opacity: [0, 1, 0, 1, 0],
            x: [0, -20, 20, -10, 0],
            y: [0, 10, -10, 0],
          }}
          transition={{
            duration: 1,
            times: [0, 0.15, 0.3, 0.45, 1],
          }}
          style={{
            position: "absolute",
            inset: 0,
            color: "#00ff88",
            mixBlendMode: "screen",
          }}
        >
          Glitch Stabilize
        </motion.span>

        {/* FINAL CLEAN TEXT */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.2 }}
          style={{
            position: "relative",
            zIndex: 1,
          }}
        >
          Glitch Stabilize
        </motion.span>
      </motion.div>
    </div>
  );
}
`;

export default code;
