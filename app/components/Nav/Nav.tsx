"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Nav.module.css";

const links = [
  { label: "Home", href: "/" },
  { label: "Collections", href: "/collections" },
  { label: "About", href: "/about" },
  { label: "Donate", href: "/donate" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <div className={styles.navWrap}>
      <div className={`${styles.bubble} ${styles.active}`}></div>
      <div className={`${styles.bubble} ${styles.hover}`}></div>

      <nav className={styles.nav}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={pathname === link.href ? styles.activeLink : ""}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}