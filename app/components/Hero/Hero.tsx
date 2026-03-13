"use client";
import styles from "./Hero.module.css";
import { Sparkles, Boxes, Code2 } from "lucide-react";

import PixelDissolveButton from "./PixelDissolveButton";
import { SpiderCursor } from "./SpiderCursor";
import Link from "next/link";
import BlurText from "../../animations/text/BlurText/BlurText";

export default function Hero() {
  return (
    <div className={styles.main}>
      <SpiderCursor />
      <BlurText>
        <div className={styles.title}>
          <span>React</span>
          <Sparkles className={styles.icon} size={44} />
          <span>Animation</span>
          <Boxes className={styles.icon} size={44} />
          <span>Library</span>
        </div>
      </BlurText>

      <BlurText>
        <div className={styles.title}>
          <span>For</span>
          <Code2 className={styles.icon} size={44} />
          <span>Free</span>
        </div>
      </BlurText>

      <div className={styles.subtitle}>
        Production-ready animations that blend seamlessly into your design
        system.
      </div>
      <Link href="./collections">
        <PixelDissolveButton>Browse Collections</PixelDissolveButton>
      </Link>
    </div>
  );
}
