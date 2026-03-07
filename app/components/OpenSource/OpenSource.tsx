"use client";

import styles from "./OpenSource.module.css";
import { Github, StarIcon } from "lucide-react";

export default function OpenSource() {
  return (
    <section className={styles.section}>
      <div className={styles.box}>
        <Github size={28} />

        <h2 className={styles.title}>Open Source</h2>

        <p className={styles.text}>
          Motion Bits is free and open source.  
          Star the project on GitHub and help it grow.
        </p>

        <a
          href="https://github.com/qgmbek/motion-bits"
          target="_blank"
          className={styles.button}
        >
            <StarIcon /> Star on GitHub
        </a>
      </div>
    </section>
  );
}