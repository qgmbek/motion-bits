"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const f = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    addEventListener("keydown", f);
    return () => removeEventListener("keydown", f);
  }, []);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Command</button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1000,
              background: "rgba(0,0,0,.35)",
              backdropFilter: "blur(8px)",
              display: "grid",
              placeItems: "start center",
              paddingTop: "15vh",
            }}
          >
            <motion.div
              initial={{ y: 18, scale: 0.96, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 12, scale: 0.98, opacity: 0 }}
              style={{
                width: "min(640px, calc(100vw - 32px))",
                padding: 24,
                background: "var(--background,#fff)",
                borderRadius: 18,
              }}
            >
              <input
                autoFocus
                placeholder="Search commands..."
                style={{ width: "100%", boxSizing: "border-box", padding: 14, font: "inherit" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
