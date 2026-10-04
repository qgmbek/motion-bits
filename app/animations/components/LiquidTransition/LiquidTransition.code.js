const code = `"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function LiquidTransition() {
  const [active, setActive] = useState(false);

  return (
    <>
      <button onClick={() => setActive(true)}>Liquid</button>
      {active && (
        <motion.div
          initial={{ scale: 0.05, borderRadius: "50%" }}
          animate={{ scale: 8, borderRadius: "42%" }}
          transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
          onAnimationComplete={() => setActive(false)}
          style={{
            position: "fixed",
            width: "100vw",
            height: "100vw",
            left: "50%",
            top: "50%",
            translateX: "-50%",
            translateY: "-50%",
            zIndex: 2000,
            background: "currentColor",
          }}
        />
      )}
    </>
  );
}
`;

export default code;
