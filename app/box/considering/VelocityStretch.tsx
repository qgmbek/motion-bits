"use client";

import { motion, useScroll, useVelocity, useSpring, useTransform } from "framer-motion";

export default function VelocityStretch() {
  const { scrollY } = useScroll();

  // Raw scroll velocity
  const velocity = useVelocity(scrollY);

  // Smooth it (important for premium feel)
  const smoothVelocity = useSpring(velocity, {
    damping: 50,
    stiffness: 400,
  });

  // Map velocity to visual distortion
  const scaleX = useTransform(smoothVelocity, [-1000, 0, 1000], [1.4, 1, 1.4]);
  const skewX = useTransform(smoothVelocity, [-1000, 0, 1000], [-12, 0, 12]);
  const letterSpacing = useTransform(
    smoothVelocity,
    [-1000, 0, 1000],
    ["0.15em", "0em", "0.15em"]
  );

  return (
    <div
      style={{
        height: "200vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0b0b0d",
      }}
    >
      <motion.h1
        style={{
          scaleX,
          skewX,
          letterSpacing,
          fontSize: "clamp(3rem, 10vw, 10rem)",
          fontWeight: 800,
          textTransform: "uppercase",
          color: "white",
          willChange: "transform",
        }}
      >
        Velocity Stretch
      </motion.h1>
    </div>
  );
}
