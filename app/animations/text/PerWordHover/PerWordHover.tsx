"use client";
import { ReactNode } from "react";
import { motion } from "framer-motion";

type PerWordHoverProps = {
  children?: ReactNode;
};

export default function PerWordHover({ children = "Per Word Hover" }: PerWordHoverProps) {
  const text = typeof children === "string" ? children : "Per Word Hover";

  return (
    <div>
      {text.split(" ").map((word, wi) => (
        <motion.span
          key={wi}
          style={{ marginRight: "1.2rem" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.02 }}
          whileHover={{ scale: 1.04, color: "rgb(208, 0, 255)" }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
