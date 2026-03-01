import styles from "./numbers.module.css";

export default function Numbers() {
  return (
    <div className={styles.container}>
      <div className={styles.one}>
        <div className={styles.number}>30+</div>
        <div className={styles.numberName}>Cool Animations</div>
        <div className={styles.numberDesc}>blah blah blah</div>
      </div>
      <div className={styles.two}>
        <div className={styles.number}>30+</div>
        <div className={styles.numberName}>Cool Animations</div>
        <div className={styles.numberDesc}>blah blah blah</div>
      </div>
      <div className={styles.third}>
        <div className={styles.thirdTop}>
          <div className={styles.number}>30+</div>
          <div className={styles.numberName}>Cool Animations</div>
          <div className={styles.numberDesc}>blah blah blah</div>
        </div>
        <div className={styles.thirdBottom}>
          <div className={styles.number}>30+</div>
          <div className={styles.numberName}>Cool Animations</div>
          <div className={styles.numberDesc}>blah blah blah</div>
        </div>
      </div>
    </div>
  );
}
