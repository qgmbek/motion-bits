import styles from "./numbers.module.css";
import { Sparkles, Blocks } from "lucide-react";

export default function Numbers() {
  return (
    <div className={styles.container}>
      <div className={styles.one}>
        <Sparkles className={styles.icon} />

        <div className={styles.number}>30+</div>
        <div className={styles.numberName}>Production Animations</div>
        <div className={styles.numberDesc}>
          Carefully crafted motion components ready for real-world interfaces.
        </div>
      </div>

      <div className={styles.two}>
        <Blocks className={styles.icon} />

        <div className={styles.number}>100%</div>
        <div className={styles.numberName}>Composable</div>
        <div className={styles.numberDesc}>
          Built with flexibility in mind — fully customizable and easy to
          extend.
        </div>
      </div>

      <div className={styles.third}>
        <div className={styles.thirdTop}>
          <div className={styles.number}>0kb</div>
          <div className={styles.numberName}>Bloat</div>
          <div className={styles.numberDesc}>
            Lightweight patterns designed to integrate without slowing you down.
          </div>
        </div>

        <div className={styles.thirdBottom}>
          <div className={styles.number}>∞</div>
          <div className={styles.numberName}>Creative Possibilities</div>
          <div className={styles.numberDesc}>
            Combine, remix, and build expressive motion systems your way.
          </div>
        </div>
      </div>
    </div>
  );
}
