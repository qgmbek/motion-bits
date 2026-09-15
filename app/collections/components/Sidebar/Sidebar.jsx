import { useState } from "react";
import { Menu, X } from "lucide-react";

import { ANIMATIONS } from "../../../animations/registry";
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
          {Object.entries(ANIMATIONS).map(([key, cat]) => {
            const Icon = cat.icon;

            return (
              <div key={key} style={{ marginBottom: "2rem" }}>
                <div className={styles.categoryLabel}>
                  <Icon size={18} /> {cat.title}
                </div>

                {Object.entries(cat.items).map(([id, item]) => (
                  <button
                    key={id}
                    className={`${styles.navItem} ${
                      currentSlug === id ? styles.active : ""
                    }`}
                    onClick={() => handleNavigate(id)}
                  >
                    {item.name}
                    {currentSlug === id && (
                      <div className={styles.navItemCircle} />
                    )}
                  </button>
                ))}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
