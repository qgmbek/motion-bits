const code = `"use client";

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
}`;

export default code;

export const css = `.card {
  position: relative;
  width: min(420px, 100%, calc((100cqh - 2rem) * 420 / 550));
  aspect-ratio: 420 / 550;
  border-radius: 24px;
  overflow: hidden;
  cursor: pointer;
  background: #111;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6);
}

.image {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  top: 0;
  left: 0;
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.2) 0%,
    rgba(0, 0, 0, 0.8) 100%
  );
}

.content {
  position: absolute;
  bottom: 7%;
  left: 9%;
  right: 9%;
  color: white;
  z-index: 10;
}

.content h2 {
  font-size: clamp(20px, 5cqi, 32px);
  font-weight: 700;
  letter-spacing: -0.5px;
  margin: 0;
}

.content p {
  font-size: 14px;
  opacity: 0.7;
  margin-top: 6px;
}`;
