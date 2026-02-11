"use client"

import { motion, useAnimation } from "framer-motion"
import { useEffect } from "react"

export default function NarrativeHighlight() {
  const text = "Narrative Highlight"
  const words = text.split(" ")

  const controls = useAnimation()

  useEffect(() => {
    async function sequence() {
      for (let i = 0; i < words.length; i++) {
        await controls.start((index) => ({
          opacity: index <= i ? 1 : 0.3,
          filter: index === i ? "brightness(1.3)" : "brightness(1)",
          transition: { duration: 0.6, ease: "easeInOut" }
        }))
        await new Promise((r) => setTimeout(r, 700))
      }
    }

    sequence()
  }, [controls, words.length])

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0d0d12",
        fontFamily: "serif"
      }}
    >
      <div
        style={{
          fontSize: "4rem",
          fontWeight: 600,
          lineHeight: 1.3,
          color: "#cfcfd4",
          display: "flex",
          gap: "1rem",
          position: "relative"
        }}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            custom={i}
            initial={{ opacity: 0.3 }}
            animate={controls}
            style={{
              position: "relative",
              letterSpacing: "-0.02em",
              transition: "color 0.4s ease"
            }}
          >
            {word}

            {/* Moving underline glow */}
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{
                scaleX: 1,
                opacity: 0.6
              }}
              transition={{
                delay: i * 1.3,
                duration: 0.8,
                ease: "easeInOut"
              }}
              style={{
                position: "absolute",
                left: 0,
                bottom: -8,
                height: 4,
                width: "100%",
                background: "linear-gradient(90deg, transparent, #ffffff, transparent)",
                transformOrigin: "left",
                borderRadius: 4
              }}
            />
          </motion.span>
        ))}
      </div>
    </div>
  )
}
