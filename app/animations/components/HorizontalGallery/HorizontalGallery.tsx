"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HorizontalGallery({ items = ["01", "02", "03", "04"] }: { items?: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

  return (
    <div ref={ref} style={{ height: "250vh", position: "relative" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", display: "flex", alignItems: "center" }}>
        <motion.div style={{ x, display: "flex", gap: 24, padding: "0 10vw" }}>
          {items.map((i) => (
            <div
              key={i}
              style={{
                flex: "0 0 55vw",
                height: "55vh",
                border: "1px solid currentColor",
                borderRadius: 20,
                display: "grid",
                placeItems: "center",
                fontSize: "8vw",
              }}
            >
              {i}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
