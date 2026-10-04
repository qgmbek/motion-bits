const code = `"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function FullscreenMenu() {
  const [open, setOpen] = useState(false);
  const items = ["Work", "Archive", "About", "Contact"];

  return (
    <>
      <button onClick={() => setOpen(true)}>Menu</button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(100% 0 0 0)" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1000,
              background: "var(--background,#fff)",
              padding: 40,
            }}
          >
            <button onClick={() => setOpen(false)}>Close</button>
            <div style={{ marginTop: 100, display: "grid", gap: 12 }}>
              {items.map((item, i) => (
                <motion.a
                  key={item}
                  href="#"
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.06 }}
                  style={{ fontSize: "clamp(2rem, 7vw, 6rem)", color: "inherit" }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
`;

export default code;
