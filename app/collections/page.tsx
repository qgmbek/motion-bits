"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { RotateCcw, Eye, Code } from "lucide-react";

import { Sidebar } from "./components/Sidebar/Sidebar";
import CodeBlock from "./components/CodeBlock/CodeBlock";
import DemoStage from "./components/DemoStage";
import styles from "./collections.module.css";

import { ANIMATIONS, ANIMATIONS_BY_ID, type AnimationSlug } from "../animations/registry";
import { usePageReveals } from "../components/Reveal/usePageReveals";
import revealStyles from "../components/Reveal/Reveal.module.css";
import { useSiteMotion } from "../components/SiteMotion";

export default function CollectionsPage() {
  const { accent } = useSiteMotion();
  const pageRef = useRef<HTMLElement>(null);
  const [currentSlug, setCurrentSlug] = useState<AnimationSlug>("blur-text");
  const [tab, setTab] = useState<"demo" | "code">("demo");
  const [replayKey, setReplayKey] = useState(0);

  usePageReveals(pageRef, `${currentSlug}:${tab}`);

  useEffect(() => {
    const syncSelection = () => {
      const slug = window.location.hash.slice(1);
      if (Object.hasOwn(ANIMATIONS_BY_ID, slug)) {
        setCurrentSlug(slug as AnimationSlug);
        setTab("demo");
      }
    };
    syncSelection();
    window.addEventListener("hashchange", syncSelection);
    return () => window.removeEventListener("hashchange", syncSelection);
  }, []);

  const selectAnimation = (slug: AnimationSlug) => {
    setCurrentSlug(slug);
    window.history.replaceState(window.history.state, "", `#${slug}`);
  };

  const activeEntry = ANIMATIONS_BY_ID[currentSlug];
  const category = Object.values(ANIMATIONS).find(({ items }) => Object.hasOwn(items, currentSlug));
  const CategoryIcon = category?.icon;
  const scrollDemo = currentSlug === "horizontal-gallery";

  return (
    <main ref={pageRef} id="main" tabIndex={-1}
      className={`${styles.page} ${revealStyles.scope}`} style={{ "--accent": accent } as CSSProperties}>
      <div className={styles.layout}>
        <Sidebar currentSlug={currentSlug} onNavigate={selectAnimation} />
        <section className={styles.workspace} aria-labelledby="component-name">
          <div className={styles.heading}>
            <div key={currentSlug} data-reveal="wipe right" data-reveal-detail data-intro>
              <p className={styles.category} data-reveal="fade down" data-reveal-detail>
                {CategoryIcon && <CategoryIcon size={14} aria-hidden="true" />}
                {category?.title}
              </p>
              <h1 id="component-name">{activeEntry.name}</h1>
            </div>
            <div className={styles.switcher} role="group" aria-label="Component view" data-reveal="slide up" data-intro data-reveal-step="1">
              <button type="button" aria-pressed={tab === "demo"} aria-controls="component-view" onClick={() => setTab("demo")}
                data-reveal="fade right" data-reveal-detail>
                <Eye size={15} aria-hidden="true" /> Preview
              </button>
              <button type="button" aria-pressed={tab === "code"} aria-controls="component-view" onClick={() => setTab("code")}
                data-reveal="fade left" data-reveal-detail data-reveal-step="1">
                <Code size={15} aria-hidden="true" /> Code
              </button>
            </div>
          </div>
          <div id="component-view" data-cursor-quiet>
            {tab === "demo" ? (
              <div className={styles.preview} data-reveal="wipe down" data-intro data-reveal-step="1">
                <div className={styles.toolbar}>
                  <span className={styles.previewLabel} data-reveal="fade right" data-reveal-detail>{scrollDemo ? "Scroll inside to preview" : "Live preview"}</span>
                  <button type="button" className={styles.replayButton} onClick={() => setReplayKey((key) => key + 1)}
                    data-reveal="slide left" data-reveal-detail data-reveal-step="1">
                    <RotateCcw size={14} aria-hidden="true" /> Replay
                  </button>
                </div>
                <DemoStage key={currentSlug} slug={currentSlug} replayKey={replayKey} />
              </div>
            ) : (
              <div className={styles.code} key={currentSlug}>
                <CodeBlock code={activeEntry.code} language="tsx" label={activeEntry.css ? "React component" : "React"} />
                {activeEntry.css && <CodeBlock code={activeEntry.css} language="css" label="CSS" />}
              </div>
            )}
          </div>
          <footer className={styles.credit} data-reveal="fade left" data-reveal-detail>
            Motion Bits by <a href="https://github.com/qgmbek">qgmbek</a>
          </footer>
        </section>
      </div>
    </main>
  );
}
