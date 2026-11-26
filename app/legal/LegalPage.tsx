import Link from "next/link";
import type { ReactNode } from "react";
import { lastUpdated, legalDocuments, type LegalDocument } from "./documents";
import styles from "./legal.module.css";

type Section = { id: string; title: string; content: ReactNode };

export function LegalContact() {
  const email = process.env.LEGAL_CONTACT_EMAIL?.trim();

  if (email && /^[a-z0-9.!_+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(email)) {
    return <p>Contact the Motion Bits maintainer at <a href={`mailto:${email}`}>{email}</a>.</p>;
  }

  return (
    <p>
      Reach the maintainer through <a href="https://github.com/qgmbek/motion-bits/issues">GitHub Issues</a>.
      Issues are public. For private matters, ask for a private contact channel before sharing details.
    </p>
  );
}

export default function LegalPage({ document, summary, sections }: {
  document: LegalDocument;
  summary: string;
  sections: Section[];
}) {
  const { title } = legalDocuments[document];

  return (
    <main id="main" tabIndex={-1} className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>{title}</h1>
          <p>{summary}</p>
          <p className={styles.date}>Updated <time dateTime={lastUpdated.iso}>{lastUpdated.label}</time></p>
        </header>

        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <nav className={styles.documents} aria-label="Legal documents">
              {Object.entries(legalDocuments).map(([id, item]) => (
                <Link key={id} href={item.href} aria-current={id === document ? "page" : undefined}>
                  {item.label}
                </Link>
              ))}
            </nav>
            <nav className={styles.contents} aria-label="On this page">
              <p>On this page</p>
              <ul>
                {sections.map(({ id, title }) => <li key={id}><a href={`#${id}`}>{title}</a></li>)}
              </ul>
            </nav>
          </aside>

          <article className={styles.document} aria-label={title}>
            {sections.map(({ id, title, content }) => (
              <section className={styles.section} key={id} id={id} aria-labelledby={`${id}-title`}>
                <h2 id={`${id}-title`}>{title}</h2>
                {content}
              </section>
            ))}
          </article>
        </div>
      </div>
    </main>
  );
}
