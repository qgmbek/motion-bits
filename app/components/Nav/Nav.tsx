"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Nav.module.css";

const links = [
  { label: "Home", href: "/" },
  { label: "Collections", href: "/collections" },
  { label: "About", href: "/us/about" },
  { label: "Donate", href: "/us/donate" },
];

export function SiteLinks({ activeClassName }: { activeClassName?: string }) {
  const pathname = usePathname();

  return links.map((link) => (
    <Link
      key={link.href}
      href={link.href}
      aria-current={pathname === link.href ? "page" : undefined}
      className={pathname === link.href ? activeClassName : undefined}
    >
      {link.label}
    </Link>
  ));
}

export default function Nav() {
  return (
    <div className={styles.navWrap}>
      <div className={`${styles.bubble} ${styles.active}`}></div>
      <div className={`${styles.bubble} ${styles.hover}`}></div>

      <nav className={styles.nav} aria-label="Main navigation">
        <SiteLinks activeClassName={styles.activeLink} />
      </nav>
    </div>
  );
}
