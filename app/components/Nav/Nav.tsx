"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github } from "lucide-react";
import type { CSSProperties } from "react";
import { useSiteMotion } from "../SiteMotion";
import styles from "./Nav.module.css";

const links = [
  { label: "Home", href: "/" },
  { label: "Collections", href: "/collections" },
  { label: "About", href: "/us/about" },
  { label: "Donate", href: "/us/donate" },
];

export function Brand() {
  return (
    <span className={styles.brand}>
      <span className={styles.brandSymbol} aria-hidden="true"><i /><i /><i /></span>
      <span>motion<span className={styles.brandLight}>bits</span><span className={styles.brandPeriod}>.</span></span>
    </span>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const { accent } = useSiteMotion();

  return (
    <header className={styles.header} style={{ "--accent": accent } as CSSProperties}>
      <a className={styles.skipLink} href="#main">Skip to content</a>
      <div className={styles.inner}>
        <Link className={styles.homeLink} href="/" aria-label="Motion Bits home"><Brand /></Link>
        <nav className={styles.nav} aria-label="Main navigation">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}>{label}</Link>
          ))}
        </nav>
        <a className={styles.githubLink} href="https://github.com/qgmbek/motion-bits" target="_blank" rel="noreferrer" aria-label="Motion Bits on GitHub">
          <Github size={17} aria-hidden="true" /><span>GitHub</span>
        </a>
      </div>
    </header>
  );
}
