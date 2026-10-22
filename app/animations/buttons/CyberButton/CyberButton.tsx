"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CyberButton() {
  const [isHovered, setIsHovered] = useState(false);
  const [glitchIndex, setGlitchIndex] = useState(0);

  const handleHover = () => {
    setIsHovered(true);
    setGlitchIndex(Math.floor(Math.random() * 3));
  };

  return (
    <div
      style={{
        height: "100%",
        minHeight: 280,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0f",
      }}
    >
      <motion.button
        onMouseEnter={handleHover}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{
          position: "relative",
          padding: "20px 48px",
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
            border: "2px solid #00ff88",
            borderRadius: 4,
            opacity: isHovered ? 1 : 0.5,
          }}
          animate={{
            boxShadow: isHovered
              ? [
                  "0 0 20px rgba(0,255,136,0.3), inset 0 0 20px rgba(0,255,136,0.1)",
                  "0 0 40px rgba(0,255,136,0.5), inset 0 0 30px rgba(0,255,136,0.2)",
                  "0 0 20px rgba(0,255,136,0.3), inset 0 0 20px rgba(0,255,136,0.1)",
                ]
              : "none",
          }}
          transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0 }}
        />

        <AnimatePresence>
          {isHovered && (
            <>
              <motion.div
                key="glitch1"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1, repeat: 5 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  border: "2px solid #ff00ff",
                  borderRadius: 4,
                  transform: `translate(${glitchIndex * 2}px, ${glitchIndex * -1}px)`,
                }}
              />
              <motion.div
                key="glitch2"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1, repeat: 5, delay: 0.05 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  border: "2px solid #00ffff",
                  borderRadius: 4,
                  transform: `translate(${glitchIndex * -2}px, ${glitchIndex * 1}px)`,
                }}
              />
            </>
          )}
        </AnimatePresence>

        <motion.span
          style={{
            position: "relative",
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#00ff88",
            textShadow: isHovered
              ? "0 0 10px rgba(0,255,136,0.8), 0 0 20px rgba(0,255,136,0.4)"
              : "0 0 5px rgba(0,255,136,0.5)",
          }}
          animate={
            isHovered
              ? {
                  textShadow: [
                    "0 0 10px rgba(0,255,136,0.8), 0 0 20px rgba(0,255,136,0.4)",
                    "0 0 20px rgba(0,255,136,1), 0 0 40px rgba(0,255,136,0.6)",
                    "0 0 10px rgba(0,255,136,0.8), 0 0 20px rgba(0,255,136,0.4)",
                  ],
                }
              : {}
          }
          transition={{ duration: 0.3, repeat: isHovered ? Infinity : 0 }}
        >
          CYBER
        </motion.span>

        <motion.div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            background: "linear-gradient(90deg, #00ff88, #00ffff, #ff00ff, #00ff88)",
            backgroundSize: "300% 100%",
            opacity: isHovered ? 1 : 0,
          }}
          animate={{
            backgroundPosition: isHovered ? ["0% 50%", "100% 50%"] : "0% 50%",
          }}
          transition={{ duration: 2, repeat: isHovered ? Infinity : 0, ease: "linear" }}
        />
      </motion.button>
    </div>
  );
}
