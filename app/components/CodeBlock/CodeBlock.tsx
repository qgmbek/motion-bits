"use client";

import { useEffect, useState } from "react";
import { Copy, Check } from "lucide-react";
import "./CodeBlock.css";

function addLineNumbers(html) {
  return html.replace(/<span class="line">/g, (match, offset, full) => {
    const index =
      full.slice(0, offset).match(/<span class="line">/g)?.length || 0;
    return `<span class="line"><span class="line-number">${index + 1}</span>`;
  });
}

export default function CodeBlock({ code, language }) {
  const [html, setHtml] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch("/api/highlight", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, language }),
    })
      .then((res) => res.json())
      .then((data) => {
        setHtml(addLineNumbers(data.html));
      });
  }, [code, language]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    // setTimeout(() => setCopied(false), 10000);
  };

  return (
    <div className="codeblock-container">
      <button
        className="copy-button"
        onClick={handleCopy}
        aria-label="Copy code"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
        <span>{copied ? "Copied" : "Copy"}</span>
      </button>

      <div
        className="shiki-wrapper"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
