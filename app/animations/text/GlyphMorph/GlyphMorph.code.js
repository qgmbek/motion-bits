const code = `"use client";

import { motion } from "framer-motion";

type Props = { from?: string; to?: string };

export default function GlyphMorph({ from = "A", to = "B" }: Props) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: .4, rotate: -25 }}
      whileInView={{ opacity: 1, scale: [1.3, .95, 1], rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.16, 1, .3, 1] }}
      style={{ display: "inline-block" }}
    >
      {from}
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: [0, 1] }}
        viewport={{ once: true }}
        transition={{ duration: .4, delay: .45 }}
        style={{ position: "absolute" }}
      >
        {to}
      </motion.span>
    </motion.span>
  );
}
`;

export default code;
