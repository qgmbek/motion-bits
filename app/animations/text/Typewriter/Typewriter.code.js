const code = `/* eslint-disable prefer-const */
"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type BackspaceMode = "none" | "word" | "full" | "smart";

type TypewriterProps = {
  array?: string[];
};

const PHRASES = [
  "Everyone has one - make yours nice.",
  "Everyone has one - make yours beautiful.",
  "Everyone has one - make yours unforgettable.",
];

export default function Typewriter({ array }: TypewriterProps) {
  const phrases = array ?? PHRASES;

  const [display, setDisplay] = useState("");
  const [cursor, setCursor] = useState(true);
  const phraseIndex = useRef(0);
  const prevWords = useRef<string[]>([]);

  const [backspaceMode] = useState<BackspaceMode>("smart");
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  /* Cursor blink */
  useEffect(() => {
    const blink = setInterval(() => setCursor((c) => !c), 500);
    return () => clearInterval(blink);
  }, []);

  /* Detect when element is in viewport */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  /* Typing effect */
  useEffect(() => {
    if (!inView) return;

    let timeout: NodeJS.Timeout;

    const type = async () => {
      phraseIndex.current = phraseIndex.current % phrases.length;
      const phrase = phrases[phraseIndex.current];
      const words = phrase.split(" ");

      let current = prevWords.current.join(" ");

      if (backspaceMode === "smart") {
        let i = 0;
        while (words[i] === prevWords.current[i]) i++;

        const unchanged = words.slice(0, i).join(" ");
        const changed = prevWords.current.slice(i).join(" ");

        for (let j = changed.length; j >= 0; j--) {
          setDisplay(unchanged + (unchanged ? " " : "") + changed.slice(0, j));
          await wait(random(20, 40));
        }

        current = unchanged;
      }

      for (let i = current.length; i < phrase.length; i++) {
        const char = phrase[i];
        setDisplay(phrase.slice(0, i + 1));

        if (",.—!".includes(char)) {
          await wait(350);
        } else {
          await wait(random(35, 90));
        }
      }

      prevWords.current = words;

      await wait(1400);

      phraseIndex.current = (phraseIndex.current + 1) % phrases.length;
      type();
    };

    timeout = setTimeout(type, 600);
    return () => clearTimeout(timeout);
  }, [inView, phrases]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      style={{
        // fontSize: "26px",
        fontWeight: 400,
        letterSpacing: "-0.02em",
        fontFamily: "ui-sans-serif, system-ui",
      }}
    >
      {display}
      <span style={{ opacity: cursor ? 1 : 0 }}>|</span>
    </motion.div>
  );
}

function wait(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}
`;

export default code;
