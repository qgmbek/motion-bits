"use client";

import { motion } from "framer-motion";

export default function MorphingGradient() {
  return (
    <div
      style={{
        height: "100%",
        minHeight: 400,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#020205",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          width: "150%",
          height: "150%",
          top: "-25%",
          left: "-25%",
          background: "conic-gradient(from 0deg, #ff006e, #8338ec, #3a86ff, #06ffa5, #ff006e)",
          opacity: 0.4,
          filter: "blur(60px)",
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      <motion.div
        style={{
          position: "absolute",
          width: "120%",
          height: "120%",
          top: "-10%",
          left: "-10%",
          background: "conic-gradient(from 180deg, #ffbe0b, #fb5607, #ff006e, #8338ec, #ffbe0b)",
          opacity: 0.3,
          filter: "blur(80px)",
        }}
        animate={{
          rotate: [360, 0],
          scale: [1.1, 0.9, 1.1],
        }}
        transition={{
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          scale: { duration: 10, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      <motion.div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle at 30% 30%, rgba(255, 0, 110, 0.3), transparent 50%)",
          opacity: 0.5,
        }}
        animate={{
          background: [
            "radial-gradient(circle at 30% 30%, rgba(255, 0, 110, 0.3), transparent 50%)",
            "radial-gradient(circle at 70% 70%, rgba(131, 56, 236, 0.3), transparent 50%)",
            "radial-gradient(circle at 30% 70%, rgba(58, 134, 255, 0.3), transparent 50%)",
            "radial-gradient(circle at 70% 30%, rgba(6, 255, 165, 0.3), transparent 50%)",
            "radial-gradient(circle at 30% 30%, rgba(255, 0, 110, 0.3), transparent 50%)",
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        style={{
          position: "absolute",
          width: "80%",
          height: "80%",
          top: "10%",
          left: "10%",
          background: "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1), transparent 60%)",
          opacity: 0.3,
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.h1
        style={{
          position: "relative",
          zIndex: 10,
          fontSize: 56,
          fontWeight: 900,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#ffffff",
          textShadow: "0 0 40px rgba(255, 255, 255, 0.5)",
        }}
        animate={{
          textShadow: [
            "0 0 40px rgba(255, 255, 255, 0.5)",
            "0 0 60px rgba(255, 0, 110, 0.6), 0 0 80px rgba(131, 56, 236, 0.4)",
            "0 0 40px rgba(255, 255, 255, 0.5)",
          ],
          scale: [1, 1.02, 1],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        Morphing Gradient
      </motion.h1>

      <motion.div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 200,
          background: "linear-gradient(to top, #020205, transparent)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
