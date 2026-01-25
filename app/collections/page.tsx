"use client";

import { useState, useMemo } from "react";
import { RotateCcw } from "lucide-react";

import { Sidebar } from "./layout/Sidebar";
import CodeBlock from "../components/CodeBlock/CodeBlock";

import { ANIMATIONS_DATA } from "../constants/animations";
import { ANIMATIONS_REGISTRY } from "../animations/registry";
import styles from "./collections.module.css";

export default function CollectionsPage() {
  const [currentSlug, setCurrentSlug] = useState("blur-text");
  const [tab, setTab] = useState("demo");
  const [replayKey, setReplayKey] = useState(0);

  const activeItem = useMemo(() => {
    const allItems = Object.values(ANIMATIONS_DATA).flatMap((cat) => cat.items);
    return allItems.find((item) => item.id === currentSlug) || allItems[0];
  }, [currentSlug]);

  const activeEntry = ANIMATIONS_REGISTRY[activeItem.id];
  const ActiveDemo = activeEntry?.component;
  const activeCode = activeEntry?.code;

  return (
    <div className={styles.collectionContainer}>
      <Sidebar currentSlug={currentSlug} onNavigate={setCurrentSlug} />

      <div className={styles.collectionWrapper}>
        <h1 className={styles.collectionName}>{activeItem.name}</h1>
        <button onClick={() => setTab("demo")}>Demo</button>
        <button onClick={() => setTab("code")}>Code</button>

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
      </div>
    </div>
  );
}
