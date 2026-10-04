const code = `"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useState } from "react";

type Props = { title?: string; children?: ReactNode };

export default function ExpandableCard({
  title = "Expandable Card",
  children = "Additional content.",
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      layout
      onClick={() => setOpen(!open)}
      style={{ cursor: "pointer", padding: 24, border: "1px solid currentColor", borderRadius: 16 }}
    >
      <motion.div layout="position">{title}</motion.div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0, y: 8 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: 8 }}
            style={{ overflow: "hidden", paddingTop: 16 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
`;

export default code;
