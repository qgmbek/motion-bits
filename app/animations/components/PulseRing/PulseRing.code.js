const code = `"use client";

import { motion } from "framer-motion";

export default function PulseRing() {
  return (
    <div
      style={{
        position: "relative",
        width: 80,
        height: 80,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{ scale: [0.5, 2], opacity: [0.6, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
            delay: i * 0.6,
          }}
          style={{
            position: "absolute",
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "2px solid #a78bfa",
          }}
        />
      ))}
      <div
        style={{
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: "#a78bfa",
          boxShadow: "0 0 20px rgba(167,139,250,0.8)",
        }}
      />
    </div>
  );
}
`;

export default code;
