"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";

export default function LiquidFillButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;

    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f0f0f",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button
        ref={buttonRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "16px 48px",
          fontSize: "18px",
          letterSpacing: "2px",
          textTransform: "uppercase",
          border: "1px solid white",
          background: "transparent",
          color: "white",
          cursor: "pointer",
          outline: "none",
        }}
      >
        {/* Liquid layer */}
        <motion.span
          style={{
            position: "absolute",
            top: coords.y,
            left: coords.x,
            width: "20px",
            height: "20px",
            background: "white",
            borderRadius: "50%",
            pointerEvents: "none",
            transform: "translate(-50%, -50%)",
          }}
          initial={{ scale: 0 }}
          animate={{ scale: hovered ? 35 : 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            duration: 30,
          }}
        />

        {/* Text */}
        <span
          style={{
            position: "relative",
            zIndex: 2,
            mixBlendMode: "difference",
          }}
        >
          Liquid Fill Button
        </span>
      </button>
    </div>
  );
}
