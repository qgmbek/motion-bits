const code = `"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type NeonPulseProps = {
  children?: ReactNode;
  color?: string;
};

export default function NeonPulse({
  children = "Neon Pulse",
  color = "#00ffff",
}: NeonPulseProps) {
  const text = typeof children === "string" ? children : "Neon Pulse";
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      style={{
        letterSpacing: "-0.02em",
        fontWeight: "bold",
      }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          style={{
            display: "inline-block",
            whiteSpace: "pre",
            color: color,
            textShadow: \`
              0 0 5px \${color},
              0 0 10px \${color},
              0 0 20px \${color},
              0 0 40px \${color}
            \`,
          }}
          animate={{
            opacity: [1, 0.8, 1, 0.9, 1, 0.85, 1],
            textShadow: [
              \`0 0 5px \${color}, 0 0 10px \${color}, 0 0 20px \${color}, 0 0 40px \${color}\`,
              \`0 0 3px \${color}, 0 0 6px \${color}, 0 0 12px \${color}, 0 0 24px \${color}\`,
              \`0 0 5px \${color}, 0 0 10px \${color}, 0 0 20px \${color}, 0 0 40px \${color}\`,
              \`0 0 4px \${color}, 0 0 8px \${color}, 0 0 16px \${color}, 0 0 32px \${color}\`,
              \`0 0 5px \${color}, 0 0 10px \${color}, 0 0 20px \${color}, 0 0 40px \${color}\`,
              \`0 0 3px \${color}, 0 0 6px \${color}, 0 0 12px \${color}, 0 0 24px \${color}\`,
              \`0 0 5px \${color}, 0 0 10px \${color}, 0 0 20px \${color}, 0 0 40px \${color}\`,
            ],
          }}
          transition={{
            duration: 0.5 + Math.random() * 0.3,
            repeat: Infinity,
            repeatDelay: 2 + Math.random() * 3,
            ease: "easeInOut",
          }}
        >
          {char === " " ? "\\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
}
`;

export default code;
