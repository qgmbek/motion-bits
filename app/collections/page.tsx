"use client";

import { useState, useMemo } from "react";
import { RotateCcw } from "lucide-react";
import { Eye, Code } from "lucide-react";

import Header from "./layout/Header/Header";
import { Sidebar } from "./layout/Sidebar/Sidebar";
import CodeBlock from "../components/CodeBlock/CodeBlock";

import { ANIMATIONS_DATA } from "../constants/animations";
import { ANIMATIONS_REGISTRY } from "../animations/registry";
import styles from "./collections.module.css";

type AnimationSlug = keyof typeof ANIMATIONS_REGISTRY;

export default function CollectionsPage() {
  const [currentSlug, setCurrentSlug] = useState<AnimationSlug>("blur-text");
  const [tab, setTab] = useState("demo");
  const [replayKey, setReplayKey] = useState(0);

  const activeItem = useMemo(() => {
    const allItems = Object.values(ANIMATIONS_DATA).flatMap((cat) => cat.items);
    return allItems.find((item) => item.id === currentSlug) || allItems[0];
  }, [currentSlug]);

  const activeEntry = ANIMATIONS_REGISTRY[currentSlug];
  const ActiveDemo = activeEntry?.component;
  const activeCode = activeEntry?.code;

  return (
    <>
      <Header />
      <div className={styles.collectionContainer}>
        <Sidebar currentSlug={currentSlug} onNavigate={setCurrentSlug} />

        <div className={styles.collectionWrapper}>
          <h1 className={styles.collectionName}>{activeItem.name}</h1>
          <div className={styles.tab}>
            <button
              onClick={() => setTab("demo")}
              className={`${styles.tabButton} ${
                tab === "demo" ? styles.active : ""
              }`}
            >
              <Eye size={16} />
              Demo
            </button>
            <button
              onClick={() => setTab("code")}
              className={`${styles.tabButton} ${
                tab === "code" ? styles.active : ""
              }`}
            >
              <Code size={16} />
              Code
            </button>
          </div>

          {tab === "demo" && (
            <>
              <div className={styles.demo}>
                {ActiveDemo && (
                  <>
                    <ActiveDemo key={replayKey} />
                    <button
                      onClick={() => setReplayKey((k) => k + 1)}
                      className={styles.replayButton}
                    >
                      <RotateCcw size={16} />
                      <span>Replay</span>
                    </button>
                  </>
                )}
              </div>
            </>
          )}

          {tab === "code" && (
            <div className={styles.code}>
              <CodeBlock code={activeCode} language={activeEntry.language} />
            </div>
          )}

          <div className={styles.fadingBorderTop} />
          <div className={styles.footerContent}>
            Created with <span className={styles.heartIcon}>💜</span> by
            <a href="https://github.com/qgmbek" className={styles.userLink}>
              qgmbek
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
