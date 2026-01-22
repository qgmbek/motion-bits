"use client";

import { useState, useMemo } from "react";
import { Sidebar } from "./layout/Sidebar";

import { ANIMATIONS_DATA } from "../constants/animations";
import { DEMO_COMPONENTS } from "../animations/registry";
import styles from "./collections.module.css";

export default function CollectionsPage() {
  const [currentSlug, setCurrentSlug] = useState("blur-text");

  const activeItem = useMemo(() => {
    const allItems = Object.values(ANIMATIONS_DATA).flatMap((cat) => cat.items);
    return allItems.find((item) => item.id === currentSlug) || allItems[0];
  }, [currentSlug]);

  const ActiveDemo = DEMO_COMPONENTS[activeItem.id];

  return (
    <div className={styles.collectionContainer}>
      <Sidebar currentSlug={currentSlug} onNavigate={setCurrentSlug} />

      <div className={styles.collectionWrapper}>
        <h1 className={styles.collectionName}>{activeItem.name}</h1>
        <div className={styles.demo}>{ActiveDemo && <ActiveDemo />}</div>
      </div>
    </div>
  );
}
