"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function MorphMenu() {
  const [open, setOpen] = useState(false);

  return (
    <button
      aria-label="Toggle menu"
      onClick={() => setOpen(!open)}
      style={{
        width: 52,
        height: 52,
        border: "1px solid currentColor",
        background: "transparent",
        borderRadius: "50%",
        cursor: "pointer",
        position: "relative",
      }}
    >
      <motion.span
        animate={{ rotate: open ? 45 : 0, y: open ? 0 : -5 }}
        style={{ position: "absolute", left: 14, right: 14, top: "50%", height: 2, background: "currentColor" }}
      />
      <motion.span
        animate={{ rotate: open ? -45 : 0, y: open ? 0 : 5 }}
        style={{ position: "absolute", left: 14, right: 14, top: "50%", height: 2, background: "currentColor" }}
      />
    </button>
  );
}
