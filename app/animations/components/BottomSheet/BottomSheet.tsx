"use client";

import { motion, useDragControls } from "framer-motion";
import { useState } from "react";

export default function BottomSheet() {
  const [open, setOpen] = useState(false);
  const controls = useDragControls();

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Sheet</button>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(0,0,0,.35)",
          }}
          onPointerDown={() => setOpen(false)}
        >
          <motion.div
            drag="y"
            dragControls={controls}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 500 }}
            dragElastic={0.15}
            onPointerDown={(e) => {
              e.stopPropagation();
              controls.start(e);
            }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120 || info.velocity.y > 600) setOpen(false);
            }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              minHeight: 240,
              padding: 28,
              background: "var(--background,#fff)",
              borderRadius: "20px 20px 0 0",
            }}
          >
            Drag me down
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
