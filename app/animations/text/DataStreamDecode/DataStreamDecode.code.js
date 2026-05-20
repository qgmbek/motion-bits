const code = `"use client";
import { ReactNode, useEffect, useMemo, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const FINAL_TEXT = "Data Stream Decode";
const CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*";

type DataStreamDecodeProps = {
  children?: ReactNode;
};

export default function DataStreamDecode({
  children = FINAL_TEXT,
}: DataStreamDecodeProps) {
  const finalText = useMemo(
    () => (typeof children === "string" ? children : FINAL_TEXT),
    [children],
  );
  const [displayText, setDisplayText] = useState(
    finalText.split("").map(() => ""),
  );

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    setDisplayText(finalText.split("").map(() => ""));
    let frame = 0;
    const totalFrames = 40;
    const interval = setInterval(() => {
      setDisplayText(() =>
        finalText.split("").map((char, i) => {
          if (char === " ") return " ";

          if (frame / totalFrames > i / finalText.length) {
            return char;
          }

          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }),
      );

      frame++;
      if (frame > totalFrames) clearInterval(interval);
    }, 40);

    return () => clearInterval(interval);
  }, [finalText, isInView]);

  return (
    <div
      ref={ref}
      style={{
        fontFamily: "monospace",
      }}
    >
      <motion.h1
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
        style={{
          fontSize: "56px",
          fontWeight: "300",
          letterSpacing: "0.1em",
          // uncomment lines below for colors
          // color: "#00f0ff",
          // textShadow:
          //   "0 0 8px rgba(0,255,255,0.7), 0 0 20px rgba(0,255,255,0.5)",
        }}
      >
        {displayText.map((char, index) => (
          <motion.span
            key={index}
            animate={
              isInView
                ? {
                    opacity: [0.6, 1, 0.8, 1],
                  }
                : {}
            }
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatType: "mirror",
              delay: index * 0.03,
            }}
            style={{
              display: "inline-block",
            }}
          >
            {char === " " ? "\\u00A0" : char}
          </motion.span>
        ))}
      </motion.h1>
    </div>
  );
}
`;

export default code;
