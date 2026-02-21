"use client";

import { useEffect, useRef } from "react";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function HyperplexedShuffle() {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseOver = () => {
    const element = headingRef.current;
    if (!element) return;

    let iteration = 0;
    const originalText = element.dataset.value || "";

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      element.innerText = element.innerText
        .split("")
        .map((_, index) => {
          if (index < iteration) {
            return originalText[index];
          }

          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      if (iteration >= originalText.length) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }

      iteration += 1 / 3;
    }, 30);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <h1
      ref={headingRef}
      data-value="HYPERPLEXED"
      onMouseOver={handleMouseOver}
      style={{
        fontFamily: "monospace",
        fontSize: "4rem",
        cursor: "pointer",
        userSelect: "none",
        color: "#fff",
      }}
    >
      HYPERPLEXED
    </h1>
  );
}