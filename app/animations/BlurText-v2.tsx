"use client";

import { motion, type Easing } from "framer-motion";

// on scroll blur
export default function BlurText() {
  const text = "Blur Text Animation";
  const ease: Easing = [0.16, 1, 0.3, 1];

  return (
    <div
      style={{
        minHeight: "250vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <motion.h1
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        style={{
          position: "relative",
          fontSize: 56,
          fontWeight: 600,
          letterSpacing: "-0.02em",
          color: "#fff",
        }}
      >
        <motion.span
          variants={{
            hidden: { filter: "blur(14px)", x: -5, opacity: 0.5 },
            visible: { filter: "blur(0px)", x: 0, opacity: 0 },
          }}
          transition={{ duration: 0.9, ease }}
          style={{ position: "absolute", inset: 0, color: "#ff4d4d" }}
        >
          {text}
        </motion.span>

        {/* Blue channel */}
        <motion.span
          variants={{
            hidden: { filter: "blur(14px)", x: 5, opacity: 0.5 },
            visible: { filter: "blur(0px)", x: 0, opacity: 0 },
          }}
          transition={{ duration: 0.9, ease }}
          style={{ position: "absolute", inset: 0, color: "#4d7cff" }}
        >
          {text}
        </motion.span>

        <motion.span
          variants={{
            hidden: { filter: "blur(12px)", y: 12, opacity: 0 },
            visible: { filter: "blur(0px)", y: 0, opacity: 1 },
          }}
          transition={{ duration: 0.9, ease }}
          style={{ position: "relative", display: "inline-block" }}
        >
          {text}
        </motion.span>
      </motion.h1>
    </div>
  );
}
