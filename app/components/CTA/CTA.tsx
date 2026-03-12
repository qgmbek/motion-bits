"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import styles from "./CTA.module.css";

export default function CTA() {
  return (
    <section className={styles.section}>
      <div className={styles.bg} />

      <svg
        className={styles.noiseSvg}
      >
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.55"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      <div className={styles.content}>
        <h2 className={styles.title}>Explore</h2>

        <p className={styles.text}>
          Stop searching. All UI animations in one place.
        </p>

        <Link
          href="/collections"
          className={styles.button}
        >
          Browse Components <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
