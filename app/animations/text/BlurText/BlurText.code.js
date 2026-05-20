const code = `"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type BlurTextProps = {
  children?: ReactNode;
};

export default function BlurText({
  children = "Blur Text Animation",
}: BlurTextProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        filter: "blur(16px)",
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
      }}
      viewport={{ once: true }}
      transition={{
        duration: 1.4,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        letterSpacing: "-0.02em",
      }}
    >
      {children}
    </motion.div>
  );
}
`;

export default code;
