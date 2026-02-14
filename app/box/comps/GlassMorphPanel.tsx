"use client";

import { motion } from "framer-motion";

export default function GlassMorphPanel() {
  // SVG Noise Texture Data URI
  const noiseImage = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3%3Cfilter id='noiseFilter'%3%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

  return (
    <motion.div
      style={{
        position: "relative",
        width: "400px",
        height: "250px",
        borderRadius: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        cursor: "pointer",
        // The "Glass" Core
        background: "rgba(255, 255, 255, 0.03)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        // Thin "Refraction" Edge
        border: "1px solid rgba(255, 255, 255, 0.12)",
        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        boxShadow:
          "0 0 40px rgba(255, 255, 255, 0.1), 0 8px 32px 0 rgba(0, 0, 0, 0.5)",
        borderColor: "rgba(255, 255, 255, 0.2)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/*  The subtle grain texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: noiseImage,
          opacity: 0.06,
          pointerEvents: "none",
        }}
      />

      {/* The animated light reflection sweep */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: "-100%",
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent)",
          transform: "skewX(-20deg)",
          pointerEvents: "none",
        }}
        animate={{
          left: ["-100%", "200%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeInOut",
        }}
      />

      <h2
        style={{
          color: "#fff",
          fontFamily: "system-ui, sans-serif",
          fontWeight: 500,
          letterSpacing: "-0.5px",
          zIndex: 1,
          textShadow: "0 2px 10px rgba(0,0,0,0.2)",
        }}
      >
        Glass Panel
      </h2>
    </motion.div>
  );
}
