"use client";

import { animate, motion, useMotionValue, useSpring, useMotionTemplate, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export default function MagneticFieldButton({ playing }: { playing?: boolean } = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const embedded = playing !== undefined;

  // Cursor inside button
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Magnetic translation springs
  const offsetX = useTransform(mouseX, (x) => (x - (ref.current?.offsetWidth ?? 0) / 2) * 0.2);
  const offsetY = useTransform(mouseY, (y) => (y - (ref.current?.offsetHeight ?? 0) / 2) * 0.2);
  const springX = useSpring(offsetX, { stiffness: 150, damping: 15 });
  const springY = useSpring(offsetY, { stiffness: 150, damping: 15 });

  useEffect(() => {
    if (!playing || !ref.current) return;
    const { offsetWidth: width, offsetHeight: height } = ref.current;
    const sweepX = animate(mouseX, [width * .5, width * .99, width * .18, width * .5], { duration: 1.55, ease: "easeInOut" });
    const sweepY = animate(mouseY, [height * .5, height * .12, height * .75, height * .5], { duration: 1.55, ease: "easeInOut" });
    return () => { sweepX.stop(); sweepY.stop(); };
  }, [mouseX, mouseY, playing]);

  // Inner radial light
  const radialBackground = useMotionTemplate`
    radial-gradient(
      250px circle at ${mouseX}px ${mouseY}px,
      rgba(255,255,255,0.35),
      rgba(255,255,255,0.15) 40%,
      transparent 70%
    )
  `;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseX.stop();
    mouseY.stop();
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set((ref.current?.offsetWidth ?? 0) / 2);
    mouseY.set((ref.current?.offsetHeight ?? 0) / 2);
  }

  return (
    <div
      style={{
        height: embedded ? "auto" : "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <motion.div
        ref={ref}
        onMouseMove={playing === false ? undefined : handleMouseMove}
        onMouseLeave={playing === false ? undefined : handleMouseLeave}
        style={{
          x: springX,
          y: springY,
          position: "relative",
          padding: embedded ? "13px 14px" : "24px 48px",
          borderRadius: "24px",
          cursor: "pointer",
          overflow: "hidden",
          display: "inline-block",
        }}
        whileTap={playing === false ? undefined : {
          scale: 0.94,
          transition: { type: "spring", stiffness: 400, damping: 18 },
        }}
      >
        {/* Inner Radial Light */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: radialBackground,
          }}
        />

        {/* Base Surface */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "24px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.15)",
            backdropFilter: "blur(10px)",
          }}
        />

        {/* Button Text */}
        <span
          style={{
            position: "relative",
            zIndex: 10,
            color: "#ffffff",
            fontSize: embedded ? "clamp(9px, 1.35vw, 13px)" : "18px",
            fontWeight: 500,
            letterSpacing: "0.15em",
          }}
        >
          MAGNETIC FIELD
        </span>
      </motion.div>
    </div>
  );
}
