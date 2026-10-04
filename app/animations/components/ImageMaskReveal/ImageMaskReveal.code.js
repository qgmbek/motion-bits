const code = `"use client";

import { motion } from "framer-motion";

export default function ImageMaskReveal({ src = "", alt = "" }: { src?: string; alt?: string }) {
  return (
    <div style={{ overflow: "hidden", aspectRatio: "16/10" }}>
      <motion.img
        src={src}
        alt={alt}
        initial={{ scale: 1.15, clipPath: "inset(0 100% 0 0)" }}
        whileInView={{ scale: 1, clipPath: "inset(0 0% 0 0)" }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
}
`;

export default code;
