"use client";

import { useEffect, useState } from "react";
import { ANIMATIONS_BY_ID, type AnimationSlug } from "../../animations/registry";
import { ANIMATION_USAGE } from "../../animations/usage";
import CodeBlock from "./CodeBlock/CodeBlock";
import styles from "../collections.module.css";

type HighlightedCode = {
  code: string;
  css: string | null;
  usage: string;
};

export default function CodePanel({ slug }: { slug: AnimationSlug }) {
  const [highlighted, setHighlighted] = useState<HighlightedCode | null>(null);
  const animation = ANIMATIONS_BY_ID[slug];
  const usage = ANIMATION_USAGE[slug];

  useEffect(() => {
    const controller = new AbortController();
    // Resolve under the current collection URL, including any deployment base path.
    const collectionPath = window.location.pathname.replace(/\/$/, "");
    fetch(`${collectionPath}/snippets/${slug}/code.json`, { signal: controller.signal })
      .then((response) => response.ok ? response.json() : null)
      .then((result) => {
        if (!controller.signal.aborted && typeof result?.code === "string" && typeof result?.usage === "string") {
          setHighlighted({
            code: result.code,
            css: typeof result.css === "string" ? result.css : null,
            usage: result.usage,
          });
        }
      })
      .catch(() => {
        // Copyable plain source remains available if the static file cannot load.
      });
    return () => controller.abort();
  }, [slug]);

  return (
    <div className={styles.code}>
      <CodeBlock code={animation.code} language="tsx" label={animation.css ? "React component" : "React"} html={highlighted?.code} />
      {animation.css && <CodeBlock code={animation.css} language="css" label="CSS" html={highlighted?.css ?? undefined} />}
      <p className={styles.codeHint} data-reveal="fade up" data-reveal-detail data-intro>
        Save the component above as <code>{usage.fileName}</code>, then import it into your page as shown here.
        {animation.css && " Save the CSS alongside it using the filename in the component’s import."}
      </p>
      <CodeBlock code={usage.code} language="tsx" label="Usage" html={highlighted?.usage} />
    </div>
  );
}
