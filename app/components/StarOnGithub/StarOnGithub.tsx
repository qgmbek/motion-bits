import { StarIcon } from "lucide-react";
import styles from "./StarOnGithub.module.css";

export default function StarOnGithub() {
  return (
    <div className={styles.starOnGithub}>
      <a
        href="https://github.com/qgmbek/motion-bits"
        target="_blank"
        className={styles.button}
      >
        <StarIcon className={styles.icon}/> Star on GitHub
      </a>
    </div>
  );
}
