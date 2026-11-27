"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, RotateCcw } from "lucide-react";
import TextWaveReveal from "../../animations/text/TextWaveReveal/TextWaveReveal";
import styles from "./about.module.css";

export default function MotionSpecimen() {
  const [runs, setRuns] = useState(0);

  const replay = () => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRuns((count) => count + 1);
    }
  };

  return (
    <figure className={styles.specimen} data-cursor-quiet data-intro data-reveal="wipe left" data-reveal-step="1"
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget && runs === 0) replay();
      }}>
      <figcaption className={styles.specimenCaption}>
        <Link href="/collections#text-wave-reveal" className={styles.specimenLink}>
          Text Wave Reveal <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
        <button className={styles.replay} type="button" onClick={replay} aria-label="Replay Text Wave Reveal preview"
          data-reveal="fade left" data-reveal-detail data-reveal-step="1">
          <RotateCcw size={14} aria-hidden="true" /> Replay
        </button>
      </figcaption>
      <div className={styles.specimenArt} aria-hidden="true" data-playing={runs > 0 || undefined}
        onPointerEnter={(event) => {
          const state = event.currentTarget.parentElement?.dataset.revealState;
          if (event.pointerType === "mouse" && (!state || state === "settled")) replay();
        }}>
        <span className={styles.specimenStill}>Type moves<span>.</span></span>
        {runs > 0 && (
          <div className={styles.specimenWave}>
            <TextWaveReveal key={runs}>Type moves.</TextWaveReveal>
          </div>
        )}
      </div>
    </figure>
  );
}
