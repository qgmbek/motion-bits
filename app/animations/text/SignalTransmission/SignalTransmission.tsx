use client";

import { motion } from "framer-motion";

type Props = { children?: string };

export default function SignalTransmission({ children = "Signal Transmission" }: Props) {
  return (
    <div style={{ display: "inline-block" }}>
      {children.split("").map((char, i) => (
        <motion.span key={i} style={{ display: "inline-block" }}
          initial={{ opacity: .35, filter: "blur(2px)" }}
          whileInView={{ opacity: [0.35, 1, .35], filter: ["blur(2px)", "blur(0px)", "blur(2px)"] }}
          viewport={{ once: true }}
          transition={{ delay: i * .08, duration: .5, ease: "easeInOut" }}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
}