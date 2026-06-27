"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2 } from "lucide-react";

type State = "idle" | "loading" | "success";

export default function SuccessMorphButton() {
  const [state, setState] = useState<State>("idle");

  const handleClick = () => {
    if (state !== "idle") return;
    setState("loading");
    setTimeout(() => setState("success"), 1200);
    setTimeout(() => setState("idle"), 2800);
  };

  return (
    <div
      style={{
        height: "100%",
        minHeight: 280,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0a",
      }}
    >
      <motion.button
        onClick={handleClick}
        animate={{
          width: state === "success" ? 56 : 180,
          background: state === "success" ? "#22c55e" : "#6366f1",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        style={{
          height: 56,
          borderRadius: 999,
          border: "none",
          color: "#fff",
          fontSize: 15,
          fontWeight: 600,
          cursor: state === "loading" ? "wait" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <AnimatePresence mode="wait">
          {state === "idle" && (
            <motion.span
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Submit
            </motion.span>
          )}
          {state === "loading" && (
            <motion.span
              key="loading"
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ opacity: 1, rotate: 360 }}
              exit={{ opacity: 0 }}
              transition={{ rotate: { duration: 0.8, repeat: Infinity, ease: "linear" } }}
              style={{ display: "flex" }}
            >
              <Loader2 size={22} />
            </motion.span>
          )}
          {state === "success" && (
            <motion.span
              key="success"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              style={{ display: "flex" }}
            >
              <Check size={24} strokeWidth={3} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
