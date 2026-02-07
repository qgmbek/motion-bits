"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Wednesday() {
  const [hoverEnabled, setHoverEnabled] = useState(false);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 60,
        letterSpacing: "0.6em",
        color: "#000000",
        textShadow: "0 0 25px rgba(0, 0, 0, 0.6)",
      }}
      animate={{
        opacity: 1,
        y: 0,
        letterSpacing: "0.15em",
        color: "#8b0000",
        textShadow: "0 0 25px rgba(139,0,0,0.6)",
      }}
      transition={{
        duration: 2.8,
        ease: [0.16, 1, 0.3, 1],
      }}
      onAnimationComplete={() => setHoverEnabled(true)}
      whileHover={
        hoverEnabled
          ? {
              color: "#8b0000",
              textShadow: "0 0 25px rgba(139,0,0,0.6)",
            }
          : {}
      }
      style={{
        fontFamily: `"Playfair Display", "Times New Roman", serif`,
        fontWeight: "400",
        // fontSize: "clamp(3rem, 10vw, 8rem)",
        textTransform: "uppercase",
        letterSpacing: "0.15em",
        position: "relative",
        cursor: hoverEnabled ? "pointer" : "default",
        textShadow: "0 0 12px rgba(255,255,255,0.05), 0 0 40px rgba(0,0,0,0.9)",
      }}
    >
      Wednesday
      <motion.span
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.2, duration: 1.2, ease: "easeOut" }}
        style={{
          position: "absolute",
          left: "10%",
          bottom: "-12px",
          width: "80%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, #8b0000, transparent)",
          transformOrigin: "center",
        }}
      />
    </motion.div>
  );
}
