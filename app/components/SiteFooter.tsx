"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { legalDocuments } from "../legal/documents";
import { Brand } from "./Nav/Nav";
import { useSiteMotion } from "./SiteMotion";
import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  const { accent } = useSiteMotion();

  return (
    <footer className={styles.footer} style={{ "--accent": accent } as CSSProperties}>
      <div className={styles.inner}>
        <Link href="/" className={styles.home} aria-label="Motion Bits home"><Brand /></Link>
        <nav aria-label="Legal">
          {Object.values(legalDocuments).map(({ href, label }) => <Link href={href} key={href}>{label}</Link>)}
        </nav>
      </div>
    </footer>
  );
}
