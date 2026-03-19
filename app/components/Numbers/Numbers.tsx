import styles from "./numbers.module.css";
import { Sparkles, Blocks } from "lucide-react";

import Counter from "@/app/animations/text/Counter/Counter";
import GravityDrop from "@/app/animations/text/GravityDrop/GravityDrop";
import PositonalReveal from "@/app/animations/text/PositionalReveal/PositionalReveal";

export default function Numbers() {
  return (
    <div className={styles.container}>
      <div className={styles.one}>
        <Sparkles className={styles.icon} />

        <div className={styles.number}>
          <Counter value={30} />+
        </div>
        <div className={styles.numberName}>
          <GravityDrop>Production Animations</GravityDrop>
        </div>
        <PositonalReveal>
          <div className={styles.numberDesc}>
            Carefully crafted motion components ready for real-world interfaces.
          </div>
        </PositonalReveal>
      </div>

      <div className={styles.two}>
        <Blocks className={styles.icon} />

        <div className={styles.number}>
          <Counter value={100} />%
        </div>
        <div className={styles.numberName}>
          <GravityDrop>Composable</GravityDrop>
        </div>
        <PositonalReveal>
          <div className={styles.numberDesc}>
            Built with flexibility in mind — fully customizable and easy to
            extend.
          </div>
        </PositonalReveal>
      </div>

      <div className={styles.third}>
        <div className={styles.thirdTop}>
          <div className={styles.number}>
            <Counter value={0} />
            kb
          </div>
          <div className={styles.numberName}>
            <GravityDrop>Bloat</GravityDrop>
          </div>
          <PositonalReveal>
            <div className={styles.numberDesc}>
              Lightweight patterns designed to integrate without slowing you
              down.
            </div>
          </PositonalReveal>
        </div>

        <div className={styles.thirdBottom}>
          <div className={styles.number}>∞</div>
          <div className={styles.numberName}>
            <GravityDrop>Creative Possibilities</GravityDrop>
          </div>
          <PositonalReveal>
            <div className={styles.numberDesc}>
              Combine, remix, and build expressive motion systems your way.
            </div>
          </PositonalReveal>
        </div>
      </div>
    </div>
  );
}
