"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useMotionValue, useSpring } from "framer-motion";

export default function SpotlightCard({ playing }: { playing?: boolean } = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const embedded = playing !== undefined;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 25 });
  const springY = useSpring(y, { stiffness: 200, damping: 25 });

  useEffect(() => {
    if (!playing || !ref.current) return;
    const { offsetWidth: width, offsetHeight: height } = ref.current;
    const sweepX = animate(x, [width * .08, width * .9, width * .57], { duration: 1.55, ease: "easeInOut" });
    const sweepY = animate(y, [height * .22, height * .71, height * .46], { duration: 1.55, ease: "easeInOut" });
    return () => { sweepX.stop(); sweepY.stop(); };
  }, [playing, x, y]);

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.stop();
    y.stop();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={playing === false ? undefined : handleMove}
      style={{
        position: "relative",
        width: embedded ? "86%" : "100%",
        maxWidth: 360,
        padding: embedded ? "clamp(14px, 2vw, 26px)" : 32,
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.1)",
        background: "#111",
        overflow: "hidden",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 70%)",
          pointerEvents: "none",
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        <h3 style={{ margin: 0, fontSize: embedded ? 17 : 20, fontWeight: 600 }}>Spotlight Card</h3>
        <p style={{ margin: "12px 0 0", opacity: 0.6, fontSize: embedded ? 12 : 14, lineHeight: 1.5 }}>
          Move your cursor to reveal a soft glow that follows your pointer.
        </p>
      </div>
    </motion.div>
  );
}
