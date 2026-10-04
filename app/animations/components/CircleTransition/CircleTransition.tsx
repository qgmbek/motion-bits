"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function CircleTransition() {
  const [active, setActive] = useState(false);

  return (
    <>
      <button onClick={() => setActive(true)}>Circle</button>
      {active && (
        <motion.div
          initial={{ clipPath: "circle(0% at 50% 50%)" }}
          animate={{ clipPath: "circle(150% at 50% 50%)" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          onAnimationComplete={() => setActive(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2000,
            background: "currentColor",
          }}
        />
      )}
    </>
  );
}
