import { useState } from "react";
import { Menu, X } from "lucide-react";

import { ANIMATIONS_DATA } from "../../../constants/animations";
import styles from "./Sidebar.module.css";

export const Sidebar = ({ currentSlug, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = (id) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className={styles.mobileToggle}
        onClick={() => setIsOpen(true)}
      >
        <Menu size={16} />
        <span>Animations</span>
      </button>

      <aside
        className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={() => setIsOpen(false)}
        >
          <X size={16} />
        </button>

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
                  onClick={() => handleNavigate(item.id)}
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
    </>
  );
}
