const code = `"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type ShimmerTextProps = {
  children?: ReactNode;
};

export default function ShimmerText({
  children = "Shimmer Text",
}: ShimmerTextProps) {
  return (
    <motion.span
      animate={{ backgroundPosition: ["200% center", "-200% center"] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      style={{
        display: "inline-block",
        backgroundImage:
          "linear-gradient(90deg, #888 0%, #888 40%, #fff 50%, #888 60%, #888 100%)",
        backgroundSize: "200% auto",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        color: "transparent",
        WebkitTextFillColor: "transparent",
        letterSpacing: "-0.03em",
      }}
    >
      {children}
    </motion.span>
  );
}
`;

export default code;
