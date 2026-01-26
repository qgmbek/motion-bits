import styles from "./Header.module.css";

export default function Header() {
  return (
    <div className={styles.sidebarHeader}>
      <div className={styles.sidebarContent}>
        <div className={styles.sidebarLogo}>M/B</div>
        <span>MOTION BITS</span>
      </div>
      <div className={styles.fadingBorderTop} />
    </div>
  );
}
