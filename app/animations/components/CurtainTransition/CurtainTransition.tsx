"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function CurtainTransition() {
  const [active, setActive] = useState(false);

  return (
    <>
      <button onClick={() => setActive(true)}>Curtain</button>
      {active && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          onAnimationComplete={() => setTimeout(() => setActive(false), 250)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2000,
            background: "currentColor",
            transformOrigin: "bottom",
          }}
        />
      )}
    </>
  );
}
