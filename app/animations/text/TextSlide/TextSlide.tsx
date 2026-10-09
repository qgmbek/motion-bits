"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type TextSlideProps = {
  children?: ReactNode;
};

export default function TextSlide({
  children = "Text Slide",
}: TextSlideProps) {
  const text = typeof children === "string" ? children : "Text Slide";

  return (
    <motion.div
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.05,
          },
        },
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      style={{
        letterSpacing: "-0.02em",
        display: "inline-block",
      }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: {
              x: -100,
              opacity: 0,
            },
            show: {
              x: 0,
              opacity: 1,
              transition: {
                type: "spring",
                damping: 20,
                stiffness: 300,
              },
            },
          }}
          style={{
            display: "inline-block",
            whiteSpace: "pre",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
}
