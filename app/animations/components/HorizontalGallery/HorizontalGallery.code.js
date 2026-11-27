const code = `"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type RefObject } from "react";

export default function HorizontalGallery({ items = ["01", "02", "03", "04"], scrollContainer }: {
  items?: string[];
  scrollContainer?: RefObject<HTMLDivElement | null>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const { scrollYProgress } = useScroll({ container: scrollContainer, target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  useEffect(() => {
    const viewport = windowRef.current;
    const cards = track.current;
    if (!viewport || !cards) return;

    const measure = () => setDistance(Math.max(0, cards.offsetWidth - viewport.clientWidth));
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(cards);
    measure();
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ height: "250cqh", position: "relative" }}>
      <div ref={windowRef} style={{ position: "sticky", top: 0, height: "100cqh", overflow: "clip", display: "flex", alignItems: "center" }}>
        <motion.div ref={track} style={{ x, display: "flex", flex: "none", width: "max-content", gap: 24, padding: "0 10cqw" }}>
          {items.map((i) => (
            <div
              key={i}
              style={{
                width: "55cqw",
                height: "55cqh",
                border: "1px solid currentColor",
                borderRadius: 20,
                display: "grid",
                placeItems: "center",
                fontSize: "8cqw",
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
`;

export default code;
