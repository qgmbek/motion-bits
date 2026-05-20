const code = `"use client";

import { motion, useAnimationFrame } from "framer-motion";
import { ReactNode, useRef } from "react";
import { useInView } from "framer-motion";

type DistortedTextProps = {
  children?: ReactNode;
};

export default function DistortedText({
  children = "Distorted Text",
}: DistortedTextProps) {
  const text = typeof children === "string" ? children : "Distorted Text";
  const turbulenceRef = useRef<SVGFETurbulenceElement | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useAnimationFrame((t) => {
    if (!isInView || !turbulenceRef.current) return;
    const wave = 0.008 + Math.sin(t / 2000) * 0.0025;
    turbulenceRef.current.setAttribute("baseFrequency", \`\${wave} 0.01\`);
  });

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <filter id="distortionFilter">
          <feTurbulence
            ref={turbulenceRef}
            type="turbulence"
            baseFrequency="0.008 0.01"
            numOctaves={2}
            result="turbulence"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale={18}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          fontWeight: 700,
          letterSpacing: "-0.04em",
          filter: "url(#distortionFilter)",
        }}
      >
        {text}
      </motion.h1>
    </div>
  );
}
`;

export default code;
