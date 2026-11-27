"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { useSiteMotion } from "../SiteMotion";
import { usePageReveals } from "./usePageReveals";
import styles from "./Reveal.module.css";

export default function RevealMain({ className, children }: { className: string; children: ReactNode }) {
  const main = useRef<HTMLElement>(null);
  const { accent } = useSiteMotion();
  usePageReveals(main);

  return (
    <main ref={main} id="main" tabIndex={-1} className={`${className} ${styles.scope}`}
      style={{ "--accent": accent } as CSSProperties}>
      {children}
    </main>
  );
}
