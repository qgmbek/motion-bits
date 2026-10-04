"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function VelocityImage({ src = "", alt = "" }: { src?: string; alt?: string }) {
  const skew = useSpring(useMotionValue(0), { stiffness: 150, damping: 22 });

  useEffect(() => {
    let last = scrollY;
    const f = () => {
      const v = scrollY - last;
      last = scrollY;
      skew.set(Math.max(-4, Math.min(4, v * 0.06)));
    };
    addEventListener("scroll", f, { passive: true });
    return () => removeEventListener("scroll", f);
  }, [skew]);

  return <motion.img src={src} alt={alt} style={{ width: "100%", display: "block", skewY: skew }} />;
}
