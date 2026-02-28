"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import styles from "./hoverImageSwitchCard.module.css";

export default function HoverImageSwitchCard() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={styles.card}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={false}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {/* First Image */}
      <motion.img
        src="https://images.unsplash.com/photo-1608889175123-8ee362201f36?q=80&w=1400&auto=format&fit=crop"
        alt="Anime 1"
        className={styles.image}
        animate={{
          opacity: isHovered ? 0 : 1,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Second Image */}
      <motion.img
        src="https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=1400&auto=format&fit=crop"
        alt="Anime 2"
        className={styles.image}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 1.1,
        }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Gradient Overlay */}
      <motion.div
        className={styles.overlay}
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Title */}
      <motion.div
        className={styles.content}
        animate={{
          y: isHovered ? 0 : 40,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2>Shōnen Shift</h2>
        <p>Dual Identity Motion</p>
      </motion.div>
    </motion.div>
  );
}