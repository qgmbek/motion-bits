"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function FloatingLabel() {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");

  const active = focused || value.length > 0;

  return (
    <div style={{ width: "100%", maxWidth: 320, position: "relative" }}>
      <motion.label
        animate={{
          y: active ? -28 : 0,
          scale: active ? 0.85 : 1,
          color: active ? "#a78bfa" : "rgba(255,255,255,0.4)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          position: "absolute",
          left: 0,
          top: 14,
          transformOrigin: "left center",
          pointerEvents: "none",
          fontSize: 16,
        }}
      >
        Email address
      </motion.label>
      <input
        type="email"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          padding: "14px 0 10px",
          background: "transparent",
          border: "none",
          borderBottom: `2px solid ${active ? "#a78bfa" : "rgba(255,255,255,0.15)"}`,
          outline: "none",
          color: "inherit",
          fontSize: 16,
          transition: "border-color 0.3s",
        }}
      />
      <motion.div
        initial={false}
        animate={{ scaleX: active ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: "#a78bfa",
          transformOrigin: "left",
        }}
      />
    </div>
  );
}
