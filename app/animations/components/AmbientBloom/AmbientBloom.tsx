"use client";

import { motion } from "framer-motion";
import styles from "./AmbientBloom.module.css";

export default function AmbientBloom({ playing }: { playing?: boolean } = {}) {
  return (
    <div className={styles.container} data-embedded={playing !== undefined}>
      <motion.div
        className={styles.blob}
        animate={playing === false ? undefined : {
          x: [0, 20, -15, 0],
          y: [0, -15, 10, 0],
        }}
        transition={{
          duration: playing === undefined ? 20 : 2.6,
          repeat: playing === undefined ? Infinity : 0,
          ease: "easeInOut",
        }}
      />
      <div className={styles.noise} />
    </div>
  );
}
