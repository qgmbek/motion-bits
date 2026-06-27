"use client";

import { motion } from "framer-motion";

const ITEMS = [
  "Motion Design",
  "Framer Motion",
  "UI Components",
  "Scroll Animations",
  "Micro Interactions",
  "Creative Dev",
];

export default function MarqueeStrip() {
  const track = [...ITEMS, ...ITEMS];

  return (
    <div
      style={{
        width: "100%",
        overflow: "hidden",
        maskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
      }}
    >
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ display: "flex", gap: 32, width: "max-content" }}
      >
        {track.map((item, i) => (
          <span
            key={`${item}-${i}`}
            style={{
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              whiteSpace: "nowrap",
              opacity: 0.7,
            }}
          >
            {item}
            <span style={{ marginLeft: 32, opacity: 0.3 }}>·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
