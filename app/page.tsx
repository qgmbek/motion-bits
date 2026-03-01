import styles from "./page.module.css";
import Hero from "./components/Hero/Hero";
import BentoLayout from "./components/Numbers/Numbers";

export default function Home() {
  return (
    <div className={styles.page}>
      <Hero />
      <BentoLayout />
    </div>
  );
}
