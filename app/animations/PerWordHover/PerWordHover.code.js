const code = `"use client";
import { motion } from "framer-motion";

export default function PerWordHover() {
  const text = "Per Word Hover";

  return (
    <div>
      {text.split(" ").map((word, wi) => (
        <motion.span
          key={wi}
          style={{ marginRight: "0.4rem" }}
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
`;

export default code;
