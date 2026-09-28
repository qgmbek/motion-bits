use client";

import { motion } from "framer-motion";

type Props = { children?: string };

export default function TextSand({ children = "Text Sand" }: Props) {
  return (
    <motion.div
      style={{ display: "inline-block" }}
      initial={{ opacity: 0, y: -8, filter: "blur(8px)" }}
      whileInView={{ opacity: [0, 1, .7, 1], y: [20, 0, 5, 0], filter: ["blur(8px)", "blur(0px)"] }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}