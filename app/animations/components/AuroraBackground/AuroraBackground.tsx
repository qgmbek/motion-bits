"use client";

import { motion } from "framer-motion";
import styles from "./auroraBackground.module.css";

export default function AuroraBackground() {
  return (
    <div className={styles.wrapper}>
      <motion.div
        className={`${styles.blob} ${styles.blob1}`}
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
        className={`${styles.blob} ${styles.blob2}`}
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
        className={`${styles.blob} ${styles.blob3}`}
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
