import styles from "./Header.module.css";

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.headerLogo}>M/B</div>
        <span>MOTION BITS</span>
      </div>
      <div className={styles.fadingBorderTop} />
    </div>
  );
}
