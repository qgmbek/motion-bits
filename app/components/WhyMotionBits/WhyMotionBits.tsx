"use client";

import styles from "./WhyMotionBits.module.css";
import { Sparkles, Code2, Lightbulb, Layers } from "lucide-react";

import GravityDrop from "@/app/animations/text/GravityDrop/GravityDrop";
import KineticText from "@/app/animations/text/KineticReveal/KineticReveal";

export default function WhyMotionBits() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.left}>
          <h2 className={styles.title}>
            <GravityDrop>One place for UI motion</GravityDrop>
          </h2>

          <p className={styles.text}>
            Finding good UI animation inspiration usually means jumping between
            dozens of websites, design galleries, and code examples.
          </p>

          <p className={styles.text}>
            Motion Bits collects practical interface animations in one place —
            so you can explore ideas and directly use them in real projects.
          </p>
        </div>

        <div className={styles.cards}>
          <div className={`${styles.card} ${styles.card1}`}>
            <Sparkles size={26} />
            <h3>
              <KineticText>Animation Inspiration</KineticText>
            </h3>
            <p>Explore modern UI motion patterns used in real interfaces.</p>
          </div>

          <div className={`${styles.card} ${styles.card2}`}>
            <Code2 size={26} />
            <h3>
              <KineticText>Production Ready</KineticText>
            </h3>
            <p>Animations built for React and Next.js applications.</p>
          </div>

          <div className={`${styles.card} ${styles.card3}`}>
            <Lightbulb size={26} />
            <h3>
              <KineticText>Creative Ideas</KineticText>
            </h3>
            <p>Discover motion patterns you may not have considered before.</p>
          </div>

          <div className={`${styles.card} ${styles.card4}`}>
            <Layers size={26} />
            <h3>
              <KineticText>Reusable Components</KineticText>
            </h3>
            <p>Drop animations directly into your projects.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
