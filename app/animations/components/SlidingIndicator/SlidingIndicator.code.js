const code = `"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function SlidingIndicator({ items = ["Work", "About", "Contact"] }: { items?: string[] }) {
  const [active, setActive] = useState(0);

  return (
    <nav style={{ display: "flex", gap: 18 }}>
      {items.map((item, i) => (
        <button
          key={item}
          onClick={() => setActive(i)}
          style={{ position: "relative", border: 0, background: "none", padding: "8px 0", cursor: "pointer", font: "inherit" }}
        >
          {item}
          {active === i && <motion.span layoutId="mb-indicator" style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 2, background: "currentColor" }} />}
        </button>
      ))}
    </nav>
  );
}
`;

export default code;
