const code = `"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useState } from "react";

type Props = { title?: string; children?: ReactNode };

export default function SharedElementCard({ title = "Shared Element", children = "Expanded surface." }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <AnimatePresence>
      {!open ? (
        <motion.div
          layoutId="mb-shared"
          onClick={() => setOpen(true)}
          style={{ padding: 24, border: "1px solid currentColor", borderRadius: 16, cursor: "pointer" }}
        >
          {title}
        </motion.div>
      ) : (
        <motion.div
          layoutId="mb-shared"
          onClick={() => setOpen(false)}
          style={{ padding: 32, minHeight: 180, border: "1px solid currentColor", borderRadius: 16, cursor: "pointer" }}
        >
          <h3>{title}</h3>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
`;

export default code;
