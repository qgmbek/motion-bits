"use client";
import styles from "./Hero.module.css";
import { Sparkles, Boxes, Code2 } from "lucide-react";

import PixelDissolveButton from "./PixelDissolveButton";
import { SpiderCursor } from "./SpiderCursor";

export default function Hero() {
  return (
    <div className={styles.main}>
      <SpiderCursor />
      <div className={styles.title}>
        <span>React</span>
        <Sparkles className={styles.icon} size={44} />
        <span>Animation</span>
        <Boxes className={styles.icon} size={44} />
        <span>Library</span>
      </div>

      <div className={styles.title}>
        <span>For</span>
        <Code2 className={styles.icon} size={44} />
        <span>Free</span>
      </div>

      <div className={styles.subtitle}>
        Easily adoptable animations that can be integrated into existing style
        vibes.
      </div>

      <PixelDissolveButton>Browse Collections</PixelDissolveButton>
    </div>
  );
}
