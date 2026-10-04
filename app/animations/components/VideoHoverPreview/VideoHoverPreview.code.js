const code = `"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

export default function VideoHoverPreview({ src, poster = "" }: { src: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  return (
    <motion.div
      onHoverStart={() => ref.current?.play()}
      onHoverEnd={() => {
        ref.current?.pause();
        if (ref.current) ref.current.currentTime = 0;
      }}
      style={{ overflow: "hidden", aspectRatio: "16/10" }}
    >
      <motion.video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        whileHover={{ scale: 1.04 }}
        transition={{ duration: 0.6 }}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </motion.div>
  );
}
`;

export default code;
