const code = `"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type BlueprintWireframeProps = {
  children?: ReactNode;
};

export default function BlueprintWireframe({
  children = "Blueprint Wireframe Text",
}: BlueprintWireframeProps) {
  const text =
    typeof children === "string" ? children : "Blueprint Wireframe Text";

  return (
    <svg
      width="900"
      height="200"
      viewBox="0 0 900 200"
      style={{ overflow: "visible" }}
    >
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="monospace"
        fill="transparent"
        stroke="#5fb9ff"
        strokeWidth="2"
        strokeDasharray="600"
        strokeDashoffset="600"
        style={{
          filter: "drop-shadow(0 0 6px rgba(95,185,255,0.6))",
          letterSpacing: "2px",
        }}
        initial={{ strokeDashoffset: 600 }}
        whileInView={{ strokeDashoffset: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 2,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.text>

      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="monospace"
        fill="#e6f4ff"
        opacity={0}
        style={{
          letterSpacing: "2px",
          filter: "drop-shadow(0 0 12px rgba(95,185,255,0.35))",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          delay: 1.9,
          duration: 0.8,
          ease: "easeOut",
        }}
      >
        {text}
      </motion.text>
    </svg>
  );
}
`;

export default code;
