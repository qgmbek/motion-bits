"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type BackspaceMode = "none" | "word" | "full" | "smart";

const PHRASES = [
  "Everyone has one - make yours nice.",
  "Everyone has one - make yours beautiful.",
  "Everyone has one - make yours unforgettable.",
];

export default function Typewriter() {
  const [display, setDisplay] = useState("");
  const [cursor, setCursor] = useState(true);
  const phraseIndex = useRef(0);
  const prevWords = useRef<string[]>([]);

  const [backspaceMode] = useState<BackspaceMode>("smart");

  /* Cursor blink */
  useEffect(() => {
    const blink = setInterval(() => setCursor((c) => !c), 500);
    return () => clearInterval(blink);
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const type = async () => {
      const phrase = PHRASES[phraseIndex.current];
      const words = phrase.split(" ");

      let current = prevWords.current.join(" ");

      /* SMART BACKSPACE */
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

      /* FULL / WORD BACKSPACE */
      if (backspaceMode === "full") {
        for (let i = display.length; i >= 0; i--) {
          setDisplay(display.slice(0, i));
          await wait(15);
        }
        current = "";
      }

      if (backspaceMode === "word") {
        const parts = display.split(" ");
        while (parts.length) {
          parts.pop();
          setDisplay(parts.join(" "));
          await wait(80);
        }
        current = "";
      }

      /* TYPE */
      for (let i = current.length; i < phrase.length; i++) {
        const char = phrase[i];
        setDisplay(phrase.slice(0, i + 1));

        if (",.—!".includes(char)) {
          await wait(350); // punctuation pause
        } else {
          await wait(random(35, 90)); // variable speed
        }
      }

      prevWords.current = words;

      await wait(1400);

      phraseIndex.current = (phraseIndex.current + 1) % PHRASES.length;
      type();
    };

    timeout = setTimeout(type, 600);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        fontSize: "26px",
        fontWeight: 400,
        letterSpacing: "-0.02em",
        fontFamily: "ui-sans-serif, system-ui",
        color: "#fff",
      }}
    >
      {display}
      <span style={{ opacity: cursor ? 1 : 0 }}>|</span>
    </motion.div>
  );
}

/* utils */
function wait(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}
