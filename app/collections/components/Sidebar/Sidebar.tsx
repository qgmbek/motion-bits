import { useEffect, useRef, useState } from "react";
import { ChevronRight, PanelLeft, Search, X } from "lucide-react";
import { ANIMATIONS, type AnimationSlug } from "../../../animations/registry";
import styles from "./Sidebar.module.css";

const categories = Object.entries(ANIMATIONS).map(([id, category]) => ({
  id,
  title: category.title,
  Icon: category.icon,
  items: Object.entries(category.items).map(([slug, { name }]) => ({ slug: slug as AnimationSlug, name })),
}));

type SidebarProps = {
  currentSlug: AnimationSlug;
  onNavigate: (slug: AnimationSlug) => void;
};

type ComponentListProps = SidebarProps & {
  query: string;
  onSearch: (query: string) => void;
  onClose?: () => void;
  visible: boolean;
};

function ComponentList({ currentSlug, onNavigate, query, onSearch, onClose, visible }: ComponentListProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const search = query.trim().toLowerCase();
  const matches = categories.map((category) => ({
    ...category,
    items: category.title.toLowerCase().includes(search)
      ? category.items
      : category.items.filter(({ name, slug }) => name.toLowerCase().includes(search) || slug.includes(search)),
  })).filter(({ items }) => items.length > 0);

  useEffect(() => {
    const list = listRef.current;
    if (!list || !visible) return;

    if (search) {
      list.scrollTop = 0;
      return;
    }

    const selected = list.querySelector('[aria-current="true"]');
    if (!selected) return;

    const viewport = list.getBoundingClientRect();
    const row = selected.getBoundingClientRect();
    if (row.top < viewport.top || row.bottom > viewport.bottom) {
      list.scrollTop += row.top - viewport.top - list.clientHeight / 3;
    }
  }, [currentSlug, search, visible]);

  return (
    <>
      <div className={styles.head}>
        <div className={styles.titleRow}>
          <h2>Components</h2>
          {onClose && (
            <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Close component list">
              <X size={19} aria-hidden="true" />
            </button>
          )}
        </div>
        <label className={styles.search}>
          <Search size={15} aria-hidden="true" />
          <input type="search" placeholder="Find a component" aria-label="Find a component" value={query} onChange={(event) => onSearch(event.target.value)} />
        </label>
      </div>
      <div className={styles.list} ref={listRef}>
        {matches.length === 0 && <p className={styles.empty} role="status">No matching components.</p>}
        {matches.map(({ id, title, Icon, items }) => (
          <div key={id} className={styles.group}>
            <h3><Icon size={14} aria-hidden="true" /> {title}</h3>
            <ul>
              {items.map(({ slug, name }) => (
                <li key={slug}>
                  <button type="button" aria-current={currentSlug === slug ? "true" : undefined} onClick={() => onNavigate(slug)}>
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

export function Sidebar({ currentSlug, onNavigate }: SidebarProps) {
  const [query, setQuery] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawer = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia("(width > 52rem)");
    const closeOnDesktop = () => {
      if (desktop.matches && drawer.current?.open) drawer.current.close();
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  const closeDrawer = () => drawer.current?.close();

  return (
    <>
      <aside className={styles.sidebar} aria-label="Component library">
        <ComponentList currentSlug={currentSlug} onNavigate={onNavigate} query={query} onSearch={setQuery} visible />
      </aside>
      <button
        type="button"
        className={styles.mobileToggle}
        aria-haspopup="dialog"
        aria-controls="component-drawer"
        aria-expanded={drawerOpen}
        onClick={() => { drawer.current?.showModal(); setDrawerOpen(true); }}
      >
        <PanelLeft size={17} aria-hidden="true" /> Browse components <ChevronRight size={16} aria-hidden="true" />
      </button>
      <dialog
        ref={drawer}
        id="component-drawer"
        className={styles.drawer}
        aria-label="Browse components"
        onClose={() => setDrawerOpen(false)}
        onClick={(event) => { if (event.target === event.currentTarget) closeDrawer(); }}
      >
        <div className={styles.drawerPanel}>
          <ComponentList
            currentSlug={currentSlug}
            onNavigate={(slug) => { onNavigate(slug); closeDrawer(); }}
            query={query}
            onSearch={setQuery}
            onClose={closeDrawer}
            visible={drawerOpen}
          />
        </div>
      </dialog>
    </>
  );
}
