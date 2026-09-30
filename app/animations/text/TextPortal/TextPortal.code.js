const code = `"use client";

import { motion } from "framer-motion";

type Props = { children?: string };

export default function TextPortal({ children = "Text Portal" }: Props) {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0, letterSpacing: ".7em" }}
      whileInView={{ scaleX: 1, opacity: 1, letterSpacing: "-.02em" }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.16, 1, .3, 1] }}
      style={{ display: "inline-block", transformOrigin: "center" }}
    >
      {children}
    </motion.div>
  );
}
`;

export default code;
