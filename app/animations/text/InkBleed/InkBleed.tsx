use client";

import { motion } from "framer-motion";

type Props = { children?: string };

export default function InkBleed({ children = "Ink Bleed" }: Props) {
  return (
    <motion.div
      initial={{ clipPath: "circle(0% at 50% 50%)", filter: "blur(10px)" }}
      whileInView={{ clipPath: "circle(80% at 50% 50%)", filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 1.25, ease: [0.16, 1, .3, 1] }}
      style={{ display: "inline-block" }}
    >
      {children}
    </motion.div>
  );
}