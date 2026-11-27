"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ImageParallax({ src = "", alt = "" }: { src?: string; alt?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} style={{ overflow: "hidden", height: "min(420px, calc(100cqh - 2.5rem))", width: "min(100%, 680px)" }}>
      <motion.img src={src} alt={alt} style={{ y, width: "100%", height: "120%", objectFit: "cover" }} />
    </div>
  );
}
