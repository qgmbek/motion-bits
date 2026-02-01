"use client";

import { motion } from "framer-motion";

function CharacterSwap() {
  const from = "Character Swap";
  const to = "Design → Build";
  const maxLength = Math.max(from.length, to.length);

  return (
    <motion.div
      style={{ perspective: 1000, color: "#fff" }}
      className="inline-flex cursor-pointer text-5xl font-extrabold tracking-tight"
      initial="rest"
      whileHover="hover"
    >
      {Array.from({ length: maxLength }).map((_, i) => {
        const fromChar = from[i] || "";
        const toChar = to[i] || "";

        return (
          <span key={i} className="relative inline-block w-[1ch] h-[1em]">
            <motion.span
              className="absolute inset-0"
              variants={{
                rest: { rotateX: 0, opacity: 1 },
                hover: { rotateX: 90, opacity: 0 },
              }}
              transition={{ duration: 0.35 }}
              style={{ transformOrigin: "bottom" }}
            >
              {fromChar}
            </motion.span>

            <motion.span
              className="absolute inset-0"
              variants={{
                rest: { rotateX: -90, opacity: 0 },
                hover: { rotateX: 0, opacity: 1 },
              }}
              transition={{ duration: 0.35 }}
              style={{ transformOrigin: "top" }}
            >
              {toChar}
            </motion.span>
          </span>
        );
      })}
    </motion.div>
  );
}

export default function Page() {
  return (
    <div className="p-20">
      <CharacterSwap />
    </div>
  );
}
