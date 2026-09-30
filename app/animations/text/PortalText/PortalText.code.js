const code = `"use client";

import { motion } from "framer-motion";

type Props = { children?: string };

export default function PortalText({ children = "Portal Text" }: Props) {
  return (
    <motion.div
      initial={{ clipPath: "inset(0 50% 0 50%)", opacity: 0, scaleX: .2 }}
      whileInView={{ clipPath: "inset(0 0% 0 0%)", opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.16, 1, .3, 1] }}
      style={{ transformOrigin: "center", display: "inline-block" }}
    >
      {children}
    </motion.div>
  );
}
`;

export default code;
