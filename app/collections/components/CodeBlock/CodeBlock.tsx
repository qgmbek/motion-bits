"use client";

import { useEffect, useState } from "react";
import { Copy, Check } from "lucide-react";
import styles from "./CodeBlock.module.css";

interface CodeBlockProps {
  code: string;
  language: "tsx" | "css";
  label: string;
}

export default function CodeBlock({ code, language, label }: CodeBlockProps) {
  const [html, setHtml] = useState("");
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/highlight", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, language }),
      signal: controller.signal,
    })
      .then((response) => response.ok ? response.json() : null)
      .then((result) => {
        if (!controller.signal.aborted && typeof result?.html === "string") setHtml(result.html);
      })
      .catch(() => {
        // The plain source stays visible when highlighting is unavailable.
      });
    return () => controller.abort();
  }, [code, language]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
  };

  return (
    <section className={styles.block} aria-label={`${label} source`}
      data-reveal={language === "tsx" ? "wipe right" : "wipe left"} data-reveal-detail data-intro>
      <div className={styles.toolbar}>
        <h2>{label}</h2>
        <div className={styles.copyControl} data-reveal="fade left" data-reveal-detail>
          <span className={styles.status} role="status">
            {copyStatus === "copied" && <span className={styles.srOnly}>Code copied.</span>}
            {copyStatus === "failed" && "Clipboard unavailable"}
          </span>
          <button type="button" className={styles.copy} onClick={handleCopy}>
            {copyStatus === "copied" ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
            {copyStatus === "copied" ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
      <div className={styles.source} role="region" tabIndex={0} aria-label={`${label} code`}
        data-reveal="fade up" data-reveal-detail data-reveal-step="1">
        {html ? <div dangerouslySetInnerHTML={{ __html: html }} /> : <pre><code>{code}</code></pre>}
      </div>
    </section>
  );
}
