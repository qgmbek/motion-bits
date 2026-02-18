"use client";

import { motion, useAnimationFrame } from "framer-motion";
import { useRef } from "react";

export default function DistortedText() {
  const turbulenceRef = useRef<SVGFETurbulenceElement | null>(null);

  useAnimationFrame((t) => {
    if (!turbulenceRef.current) return;

    const wave = 0.008 + Math.sin(t / 2000) * 0.0025;

    turbulenceRef.current.setAttribute("baseFrequency", `${wave} 0.01`);
  });

  return (
    <section>
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <filter id="distortionFilter">
          <feTurbulence
            ref={turbulenceRef}
            type="turbulence"
            baseFrequency="0.008 0.01"
            numOctaves="2"
            result="turbulence"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale="18"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
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
        Distorted Text
      </motion.h1>
    </section>
  );
}
