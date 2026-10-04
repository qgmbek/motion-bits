"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { ReactNode, useEffect, useRef } from "react";

export default function VelocitySkew({ children = "Velocity Skew" }: { children?: ReactNode }) {
  const skew = useSpring(useMotionValue(0), { stiffness: 180, damping: 25 });
  const last = useRef(0);

  useEffect(() => {
    const f = () => {
      const c = scrollY;
      const v = c - last.current;
      last.current = c;
      skew.set(Math.max(-5, Math.min(5, v * 0.08)));
    };
    addEventListener("scroll", f, { passive: true });
    return () => removeEventListener("scroll", f);
  }, [skew]);

  return <motion.div style={{ skewY: skew }}>{children}</motion.div>;
}
