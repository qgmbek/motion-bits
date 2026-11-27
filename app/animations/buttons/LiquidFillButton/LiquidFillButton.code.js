const code = `"use client";

import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect } from "react";

const hoverSpring = { type: "spring" as const, stiffness: 200, damping: 20 };

export default function LiquidFillButton({ playing, reducedMotion = false }: { playing?: boolean; reducedMotion?: boolean } = {}) {
  const embedded = playing !== undefined;
  const fillX = useMotionValue("28%");
  const fillY = useMotionValue("60%");
  const fillScale = useMotionValue(0);

  useEffect(() => {
    if (reducedMotion) {
      fillScale.jump(0);
    } else if (playing) {
      fillX.set("28%");
      fillY.set("60%");
      animate(fillScale, [0, 35, 35, 0], { duration: 1.5, times: [0, .36, .64, 1], ease: "easeInOut" });
    }
    return () => fillScale.stop();
  }, [playing, reducedMotion, fillScale, fillX, fillY]);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    fillX.set(\`\${e.clientX - rect.left}px\`);
    fillY.set(\`\${e.clientY - rect.top}px\`);
  };

  return (
    <div
      style={{
        minHeight: embedded ? 0 : "var(--preview-content-height, 100vh)",
        width: embedded ? "100%" : undefined,
        paddingInline: embedded ? 10 : undefined,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button
        type="button"
        tabIndex={embedded ? -1 : undefined}
        onMouseMove={reducedMotion ? undefined : handleMouseMove}
        onMouseEnter={reducedMotion ? undefined : (event) => {
          handleMouseMove(event);
          animate(fillScale, 35, hoverSpring);
        }}
        onMouseLeave={reducedMotion ? undefined : () => { animate(fillScale, 0, hoverSpring); }}
        style={{
          position: "relative",
          overflow: "hidden",
          maxWidth: "100%",
          padding: embedded ? "12px clamp(10px, 1.9vw, 22px)" : "16px 48px",
          fontSize: embedded ? "clamp(10px, 1.1vw, 14px)" : "18px",
          letterSpacing: embedded ? ".09em" : "2px",
          textTransform: "uppercase",
          border: "1px solid white",
          background: "transparent",
          color: "white",
          cursor: "pointer",
          outline: "none",
        }}
      >
        {/* Liquid layer */}
        <motion.span
          style={{
            position: "absolute",
            top: fillY,
            left: fillX,
            scale: fillScale,
            width: "20px",
            height: "20px",
            background: "white",
            borderRadius: "50%",
            pointerEvents: "none",
            translate: "-50% -50%",
          }}
        />

        {/* Text */}
        <span
          style={{
            position: "relative",
            zIndex: 2,
            mixBlendMode: "difference",
          }}
        >
          Liquid Fill Button
        </span>
      </button>
    </div>
  );
}
`;

export default code;
