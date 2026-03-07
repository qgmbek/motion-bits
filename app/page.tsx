import styles from "./page.module.css";
import Hero from "./components/Hero/Hero";
import Numbers from "./components/Numbers/Numbers";
import WhyMotionBits from "./components/WhyMotionBits/WhyMotionBits";
import OpenSource from "./components/OpenSource/OpenSource";
import { Heart } from "lucide-react";

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <div className={styles.page}>
      <img src="/logo.png" alt="logo" className={styles.logo} />
      <Hero />
      <Numbers />
      <WhyMotionBits />
      <OpenSource />
      <div className={styles.fadingBorderTop} />

      <footer className={styles.footer}>
        <div className={styles.left}>
          <img src="/logo.png" alt="logo" className={styles.footerLogo} />

          <div className={styles.footerContent}>
            Created with <Heart size={16} className={styles.heartIcon} /> by{" "}
            <a
              href="https://github.com/qgmbek"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.userLink}
            >
              qgmbek
            </a>
          </div>

          <div className={styles.date}>© {year} Motion Bits</div>
        </div>

        <div className={styles.right}>
          <a
            href="https://github.com/qgmbek"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            Github
          </a>

          <a href="/collections" target="_blank" className={styles.footerLink}>
            Collections
          </a>
          <a
            href="https://www.instagram.com/qgbek9/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            Instagram
          </a>
          <a
            href="https://www.facebook.com/khogam.bek"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            Facebook
          </a>
        </div>
      </footer>
    </div>
  );
}
