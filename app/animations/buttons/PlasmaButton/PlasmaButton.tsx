"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function PlasmaButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        height: "100%",
        minHeight: 280,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#080008",
      }}
    >
      <motion.button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        style={{
          position: "relative",
          padding: "22px 52px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          overflow: "hidden",
        }}
      >
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 12,
            background: "linear-gradient(135deg, #ff006e, #8338ec, #3a86ff)",
            opacity: isHovered ? 0.2 : 0.1,
          }}
          animate={{
            background: isHovered
              ? [
                  "linear-gradient(135deg, #ff006e, #8338ec, #3a86ff)",
                  "linear-gradient(225deg, #8338ec, #3a86ff, #ff006e)",
                  "linear-gradient(315deg, #3a86ff, #ff006e, #8338ec)",
                  "linear-gradient(135deg, #ff006e, #8338ec, #3a86ff)",
                ]
              : "linear-gradient(135deg, #ff006e, #8338ec, #3a86ff)",
          }}
          transition={{ duration: 3, repeat: isHovered ? Infinity : 0, ease: "linear" }}
        />

        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 12,
            border: "2px solid transparent",
            background: "linear-gradient(135deg, #ff006e, #8338ec, #3a86ff) border-box",
            WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
          animate={{
            background: isHovered
              ? [
                  "linear-gradient(135deg, #ff006e, #8338ec, #3a86ff)",
                  "linear-gradient(225deg, #8338ec, #3a86ff, #ff006e)",
                  "linear-gradient(315deg, #3a86ff, #ff006e, #8338ec)",
                  "linear-gradient(135deg, #ff006e, #8338ec, #3a86ff)",
                ]
              : "linear-gradient(135deg, #ff006e, #8338ec, #3a86ff)",
          }}
          transition={{ duration: 3, repeat: isHovered ? Infinity : 0, ease: "linear" }}
        />

        <motion.div
          style={{
            position: "absolute",
            inset: -20,
            borderRadius: 20,
            background: "radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(255, 0, 110, 0.3), transparent 50%)",
            opacity: 0,
            pointerEvents: "none",
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
            ["--x" as string]: isHovered ? ["20%", "80%", "20%"] : "50%",
            ["--y" as string]: isHovered ? ["20%", "80%", "20%"] : "50%",
          }}
          transition={{ duration: 2, repeat: isHovered ? Infinity : 0, ease: "easeInOut" }}
        />

        <motion.div
          style={{
            position: "absolute",
            inset: -20,
            borderRadius: 20,
            background: "radial-gradient(circle at var(--x2, 50%) var(--y2, 50%), rgba(131, 56, 236, 0.3), transparent 50%)",
            opacity: 0,
            pointerEvents: "none",
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
            ["--x2" as string]: isHovered ? ["80%", "20%", "80%"] : "50%",
            ["--y2" as string]: isHovered ? ["80%", "20%", "80%"] : "50%",
          }}
          transition={{ duration: 2, repeat: isHovered ? Infinity : 0, ease: "easeInOut", delay: 0.5 }}
        />

        <motion.div
          style={{
            position: "absolute",
            inset: -20,
            borderRadius: 20,
            background: "radial-gradient(circle at var(--x3, 50%) var(--y3, 50%), rgba(58, 134, 255, 0.3), transparent 50%)",
            opacity: 0,
            pointerEvents: "none",
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
            ["--x3" as string]: isHovered ? ["50%", "50%", "50%"] : "50%",
            ["--y3" as string]: isHovered ? ["20%", "80%", "20%"] : "50%",
          }}
          transition={{ duration: 2, repeat: isHovered ? Infinity : 0, ease: "easeInOut", delay: 1 }}
        />

        <motion.span
          style={{
            position: "relative",
            zIndex: 10,
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#ffffff",
            textShadow: isHovered
              ? "0 0 20px rgba(255, 0, 110, 0.8), 0 0 40px rgba(131, 56, 236, 0.6)"
              : "0 0 10px rgba(255, 0, 110, 0.5)",
          }}
          animate={{
            textShadow: isHovered
              ? [
                  "0 0 20px rgba(255, 0, 110, 0.8), 0 0 40px rgba(131, 56, 236, 0.6)",
                  "0 0 30px rgba(131, 56, 236, 1), 0 0 50px rgba(58, 134, 255, 0.8)",
                  "0 0 20px rgba(255, 0, 110, 0.8), 0 0 40px rgba(131, 56, 236, 0.6)",
                ]
              : "0 0 10px rgba(255, 0, 110, 0.5)",
          }}
          transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
        >
          Plasma
        </motion.span>

        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 12,
            background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
            opacity: 0,
            pointerEvents: "none",
          }}
          animate={{
            opacity: isHovered ? [0, 1, 0] : 0,
            x: isHovered ? ["-100%", "100%"] : "-100%",
          }}
          transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
        />
      </motion.button>
    </div>
  );
}
