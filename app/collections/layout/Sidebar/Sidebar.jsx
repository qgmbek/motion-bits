import { ANIMATIONS_DATA } from "../../../constants/animations";
import styles from "./Sidebar.module.css";

export const Sidebar = ({ currentSlug, onNavigate }) => (
  <aside className={styles.sidebar}>
    

    <nav>
      {Object.entries(ANIMATIONS_DATA).map(([key, cat]) => (
        <div key={key} style={{ marginBottom: "2rem" }}>

          <div className={styles.categoryLabel}>
            {cat.icon} {cat.title}
          </div>

          {cat.items.map((item) => (
            <button
              key={item.id}
              className={`${styles.navItem} ${
                currentSlug === item.id ? styles.active : ""
              }`}
              onClick={() => onNavigate(item.id)}
            >
              {item.name}
              {currentSlug === item.id && (
                <div className={styles.navItemCircle} />
              )}
            </button>
          ))}
          
        </div>
      ))}
    </nav>
  </aside>
);
