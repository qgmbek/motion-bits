"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type ClipPathRevealProps = {
  children?: ReactNode;
};

export default function ClipPathReveal({
  children = "Clip Path Reveal",
}: ClipPathRevealProps) {
  return (
    <motion.div
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      whileInView={{ clipPath: "inset(0 0% 0 0)" }}
      viewport={{ once: true }}
      transition={{ duration: 1.1, ease: [0.77, 0, 0.175, 1] }}
      style={{ letterSpacing: "-0.03em", display: "inline-block" }}
    >
      {children}
    </motion.div>
  );
}
