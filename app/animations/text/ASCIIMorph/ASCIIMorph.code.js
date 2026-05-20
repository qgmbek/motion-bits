const code = `"use client";

import { motion, useInView } from "framer-motion";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";

const ASCII = "!<>-_\\\\/[]{}—=+*^?#________";

type ASCIIMorphProps = {
  children?: ReactNode;
};

export default function ASCIIMorph({
  children = "ASCII Morph",
}: ASCIIMorphProps) {
  const text = useMemo(
    () => (typeof children === "string" ? children : "ASCII Morph"),
    [children],
  );
  const [output, setOutput] = useState(text);

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    setOutput(text);
    let frame = 0;
    const totalFrames = 40;

    const interval = setInterval(() => {
      setOutput(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            const progress = frame / totalFrames;
            if (progress > i / text.length) return char;
            return ASCII[Math.floor(Math.random() * ASCII.length)];
          })
          .join(""),
      );

      frame++;
      if (frame > totalFrames) clearInterval(interval);
    }, 40);

    return () => clearInterval(interval);
  }, [isInView, text]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, filter: "blur(8px)" }}
      animate={isInView ? { opacity: 1, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        fontFamily: "monospace",
        letterSpacing: "0.12em",
        color: "#00ffcc",
        textShadow: "0 0 8px rgba(0,255,200,0.4)",
        userSelect: "none",
      }}
    >
      {output}
    </motion.div>
  );
}
`;

export default code;
