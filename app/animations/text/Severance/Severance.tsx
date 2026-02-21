"use client";

import { motion } from "framer-motion";

export default function Severance() {
  const text = "SEVERANCE";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4,
      },
    },
    severed: { opacity: 1 },
  };

  const wrapperVariants = {
    hidden: { opacity: 1 },
    visible: { opacity: 1 },
    severed: { opacity: 1 },
  };

  const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100%",
        overflow: "hidden",
        margin: 0,
      }}
    >
      <motion.div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "crosshair",
          fontSize: "88px",
          fontWeight: 600,
        }}
        variants={containerVariants}
        initial="hidden"
        animate={["visible", "severed"]}
      >
        {text.split("").map((char, index) => {
          const isLast = index === text.length - 1;

          return (
            <motion.div
              key={index}
              variants={wrapperVariants}
              style={{
                position: "relative",
                display: "inline-block",
                marginRight: isLast ? 0 : "5px",
              }}
            >
              <span
                style={{
                  lineHeight: 1,
                  userSelect: "none",
                  opacity: 0,
                }}
              >
                {char}
              </span>

              <motion.span
                style={{
                  textTransform: "uppercase",
                  lineHeight: 1,
                  userSelect: "none",
                  clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
                variants={{
                  hidden: { y: -30, opacity: 0, filter: "blur(12px)" },
                  visible: {
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    transition: { duration: 1.6, ease: customEase },
                  },
                  severed: {
                    x: -2,
                    filter: "blur(0.5px)",
                    transition: {
                      delay: 2.5,
                      duration: 1.2,
                      ease: "easeInOut",
                    },
                  },
                }}
              >
                {char}
              </motion.span>

              <motion.span
                style={{
                  textTransform: "uppercase",
                  lineHeight: 1,
                  userSelect: "none",
                  clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
                variants={{
                  hidden: { y: 30, opacity: 0, filter: "blur(12px)" },
                  visible: {
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    transition: { duration: 1.6, ease: customEase },
                  },
                  severed: {
                    x: 1,
                    transition: {
                      delay: 2.5,
                      duration: 1.2,
                      ease: "easeInOut",
                    },
                  },
                }}
              >
                {char}
              </motion.span>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
