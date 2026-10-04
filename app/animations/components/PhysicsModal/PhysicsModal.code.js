const code = `"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function PhysicsModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Modal</button>
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
              display: "grid",
              placeItems: "center",
              background: "rgba(0,0,0,.35)",
            }}
          >
            <motion.div
              initial={{ y: 30, scale: 0.92 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 20, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
              style={{
                padding: 32,
                width: "min(500px, calc(100vw - 32px))",
                background: "var(--background,#fff)",
                borderRadius: 18,
              }}
            >
              <button onClick={() => setOpen(false)}>Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
`;

export default code;
