"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import { ArrowRight, ArrowUpRight, Focus, Github, RotateCcw, SlidersHorizontal } from "lucide-react";
import BlurText from "../../animations/text/BlurText/BlurText";
import { useSiteMotion } from "../../components/SiteMotion";
import styles from "./about.module.css";

const repository = "https://github.com/qgmbek/motion-bits";

function MotionPreview() {
  const [runs, setRuns] = useState(0);

  const replay = () => {
    if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
      setRuns((count) => count + 1);
    }
  };

  return (
    <figure className={styles.specimen} data-cursor-quiet>
      <div className={styles.art} aria-hidden="true" onPointerEnter={(event) => {
        if (event.pointerType === "mouse") replay();
      }}>
        <div className={styles.reticle} />
        <span className={styles.echo}>Focus</span>
        <span className={styles.echo}>Focus</span>
        <span className={styles.still}>Focus</span>
        <div className={styles.motion}>
          <BlurText key={runs} playing={runs > 0}>Focus</BlurText>
        </div>
      </div>
      <figcaption className={styles.specimenCaption}>
        <Link href="/collections#blur-text" className={styles.specimenLink}>
          Blur Text <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
        <button type="button" className={styles.replay} onClick={replay} aria-label="Replay Blur Text preview">
          <RotateCcw size={14} aria-hidden="true" /> Replay
        </button>
      </figcaption>
    </figure>
  );
}

export default function About() {
  const { accent } = useSiteMotion();

  return (
    <main id="main" tabIndex={-1} className={styles.page} style={{ "--accent": accent } as CSSProperties}>
      <div className={styles.layout}>
        <section className={styles.hero} aria-labelledby="about-title">
          <div className={styles.heroCopy} data-cursor-quiet>
            <p className={styles.eyebrow}>About Motion Bits</p>
            <h1 id="about-title">Motion <em>with intent<span>.</span></em></h1>
            <p className={styles.lead}>An open source library of React animations for the details that make an interface feel alive.</p>
            <Link href="/collections" className={styles.primaryLink}>
              Browse collections <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <MotionPreview />
        </section>

        <section className={styles.principles} aria-labelledby="principles-title">
          <h2 id="principles-title">How it’s <em>built.</em></h2>
          <div className={styles.principleList}>
            <article className={styles.principle}>
              <span className={styles.principleIcon}><Focus size={21} strokeWidth={1.5} aria-hidden="true" /></span>
              <div>
                <h3>Give motion a job.</h3>
                <p>A reveal sets the reading order. A transition shows what changed. A button confirms the click.</p>
              </div>
            </article>
            <article className={styles.principle}>
              <span className={styles.principleIcon}><SlidersHorizontal size={20} strokeWidth={1.5} aria-hidden="true" /></span>
              <div>
                <h3>Make it yours.</h3>
                <p>Try a component in Collections, copy its source, and tune the timing or styling for your own interface.</p>
              </div>
            </article>
          </div>
        </section>

        <footer className={styles.credits}>
          <div className={styles.creator}>
            <span className={styles.monogram} aria-hidden="true">KY</span>
            <div>
              <p className={styles.creditLabel}>Created by</p>
              <a href="https://github.com/qgmbek" className={styles.creatorLink}>
                Khogambek Yersin <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className={styles.source}>
            <div>
              <h2>Open source</h2>
              <p>Released under the MIT license.</p>
            </div>
            <a href={repository} className={styles.sourceLink}>
              <Github size={17} aria-hidden="true" /> View on GitHub
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}
