"use client";

import { motion } from "framer-motion";
import styles from "./AmbientBloom.module.css";

export default function AmbientBloom() {
  return (
    <div className={styles.container}>
      <motion.div
        className={styles.blob}
        animate={{
          x: [0, 20, -15, 0],
          y: [0, -15, 10, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <div className={styles.noise} />
    </div>
  );
}