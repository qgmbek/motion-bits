use client";

import { motion } from "framer-motion";

type Props = { children?: string };

export default function TypographyShutter({ children = "Shutter Reveal" }: Props) {
  return (
    <div style={{ position: "relative", display: "inline-block", overflow: "hidden" }}>
      <motion.div initial={{ y: 30 }} whileInView={{ y: 0 }} viewport={{ once: true }}
        transition={{ duration: .7, ease: [0.22, 1, .36, 1] }}>
        {children}
      </motion.div>
      <motion.div initial={{ scaleY: 1 }} whileInView={{ scaleY: 0 }} viewport={{ once: true }}
        transition={{ duration: .7, ease: [0.22, 1, .36, 1] }}
        style={{ position: "absolute", inset: 0, background: "currentColor", transformOrigin: "top" }} />
    </div>
  );
}