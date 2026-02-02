import styles from "./Header.module.css";

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <img src="/logo.png" alt="" className={styles.headerLogo} />
      </div>
      <div className={styles.fadingBorderTop} />
    </div>
  );
}
