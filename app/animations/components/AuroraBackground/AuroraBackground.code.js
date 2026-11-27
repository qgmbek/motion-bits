const code = `"use client";

import { motion } from "framer-motion";
import styles from "./auroraBackground.module.css";

export default function AuroraBackground() {
  return (
    <div className={styles.wrapper}>
      <motion.div
        className={\`\${styles.blob} \${styles.blob1}\`}
        animate={{
          x: ["-10%", "15%", "-5%", "10%", "-10%"],
          y: ["-5%", "10%", "-10%", "5%", "-5%"],
          scale: [1, 1.2, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className={\`\${styles.blob} \${styles.blob2}\`}
        animate={{
          x: ["20%", "-15%", "10%", "-5%", "20%"],
          y: ["10%", "-15%", "5%", "-10%", "10%"],
          scale: [1.1, 0.95, 1.2, 1, 1.1],
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className={\`\${styles.blob} \${styles.blob3}\`}
        animate={{
          x: ["-5%", "10%", "-15%", "5%", "-5%"],
          y: ["15%", "-10%", "5%", "-5%", "15%"],
          scale: [0.9, 1.1, 1, 1.2, 0.9],
        }}
        transition={{
          duration: 55,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <h1 className={styles.text}>AuroraBackground</h1>
    </div>
  );
}
`;

export default code;

export const css = `.wrapper {
  position: relative;
  height: 100cqh;
  width: 100%;
  overflow: hidden;
  background: #040509;
  display: flex;
  align-items: center;
  justify-content: center;
}

.blob {
  position: absolute;
  width: 60cqw;
  height: 60cqw;
  filter: blur(clamp(32px, 13cqw, 140px));
  opacity: 0.5;
  mix-blend-mode: screen;
  pointer-events: none;
}

/* Different shapes via gradient centers */
.blob1 {
  background: radial-gradient(
    ellipse at 30% 60%,
    #00f5d4,
    #3a86ff,
    transparent 70%
  );
}

.blob2 {
  background: radial-gradient(
    ellipse at 70% 30%,
    #ff006e,
    #ffbe0b,
    transparent 70%
  );
}

.blob3 {
  background: radial-gradient(
    ellipse at 50% 80%,
    #8338ec,
    #00ffcc,
    transparent 70%
  );
}

.text {
  position: relative;
  font-size: clamp(1.25rem, 6cqw, 5rem);
  font-weight: 600;
  letter-spacing: 0.08em;
  color: white;
  z-index: 2;
}`;
