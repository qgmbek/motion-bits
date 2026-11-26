"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import styles from "./donate.module.css";

export default function CopyIban({ iban }: { iban: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(iban);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  };

  return (
    <>
      <code className={styles.iban}>{iban}</code>
      <button type="button" className={styles.copy} onClick={copy}>
        {status === "copied" ? <Check size={13} aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
        {status === "copied" ? "Copied" : "Copy IBAN"}
      </button>
      <span className={status === "failed" ? styles.copyMessage : styles.srOnly} role="status">
        {status === "copied" && "IBAN copied."}
        {status === "failed" && "Select the IBAN to copy it manually."}
      </span>
    </>
  );
}
