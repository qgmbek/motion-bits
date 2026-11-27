import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Github } from "lucide-react";
import RevealMain from "../../components/Reveal/RevealMain";
import MotionSpecimen from "./MotionSpecimen";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About Motion Bits",
  description: "How Motion Bits is built, what’s in the library, and how to use its open source React animations.",
};

const repository = "https://github.com/qgmbek/motion-bits";
const examples = [
  { category: "Text", name: "Text Wave Reveal", slug: "text-wave-reveal", description: "Bring a line of type in with a wave of rotating letters." },
  { category: "Buttons", name: "Liquid Fill Button", slug: "liquid-fill-button", description: "Fill a button from the point where the pointer enters." },
  { category: "Interfaces", name: "Spotlight Card", slug: "spotlight-card", description: "Move a light across a card in response to the pointer." },
  { category: "Backgrounds", name: "Ambient Bloom", slug: "ambient-bloom", description: "Add a soft wash of color behind a section or demo." },
];

export default function About() {
  return (
    <RevealMain className={styles.page}>
      <div className={styles.layout}>
        <header className={styles.hero}>
          <div className={styles.heroCopy} data-cursor-quiet data-intro data-reveal="fade up">
            <h1>About <span>Motion Bits</span></h1>
            <p className={styles.lead} data-reveal="fade right" data-reveal-detail>
              Motion Bits is an open source library of React animations. Try an effect, read its source, and take the parts you need into your own project.
            </p>
            <Link href="/collections" className={styles.primaryLink} data-reveal="slide right" data-reveal-detail data-reveal-step="1">
              Browse the library <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <MotionSpecimen />
        </header>

        <section className={styles.chapter} aria-labelledby="library-title">
          <div className={styles.chapterHeading} data-reveal="fade up">
            <h2 id="library-title">What’s inside</h2>
            <p>The collection covers the small interactions you notice every day, from a heading coming into view to a button responding under your cursor.</p>
          </div>
          <ul className={styles.index} data-reveal="wipe down">
            {examples.map(({ category, name, slug, description }) => (
              <li key={slug}>
                <Link href={`/collections#${slug}`} className={styles.indexLink}>
                  <span className={styles.indexCategory}>{category}</span>
                  <span className={styles.indexCopy}><strong>{name}</strong><span>{description}</span></span>
                  <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.chapter} aria-labelledby="workflow-title">
          <div className={styles.chapterHeading} data-reveal="slide right">
            <h2 id="workflow-title">Using a component</h2>
            <p>Start in Collections. Each entry puts a live preview next to the source you’ll work with.</p>
          </div>
          <ol className={styles.steps} data-reveal="fade up">
            <li data-reveal="fade up" data-reveal-detail>
              <h3>Try the interaction</h3>
              <p>Use Preview to replay an entrance or try the hover and scroll behavior. Watch what happens when you use the component twice in a row.</p>
            </li>
            <li data-reveal="fade up" data-reveal-detail data-reveal-step="1">
              <h3>Copy the source</h3>
              <p>Switch to Code for the React component and any accompanying CSS. Copy the files into your app and add the dependencies listed in the imports.</p>
            </li>
            <li data-reveal="fade up" data-reveal-detail data-reveal-step="2">
              <h3>Fit it to the page</h3>
              <p>Try different copy, tune the timing, and check it on a narrow screen. Keep the content usable with a keyboard and with reduced motion turned on.</p>
            </li>
          </ol>
        </section>

        <section className={styles.note} aria-labelledby="note-title" data-reveal="fade up">
          <div className={styles.noteBody}>
            <h2 id="note-title">A note from the maintainer</h2>
            <p>
              I’m Khogambek Yersin, the maintainer of Motion Bits. I use the library to try ideas at the scale of a single component. I’m interested in how each effect holds up around real content, especially when the copy gets longer or the layout gets tighter.
            </p>
            <p data-reveal="fade up" data-reveal-detail>
              If a component clips text, feels awkward on touch, or breaks in a layout, an issue with the component name and a small example gives me something concrete to work on.
            </p>
            <a href="https://github.com/qgmbek" className={styles.inlineLink} data-reveal="fade right" data-reveal-detail>
              Khogambek on GitHub <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
          <div className={styles.projectLinks} data-reveal="slide left" data-reveal-detail data-reveal-step="1">
            <h3>Open source</h3>
            <p>The MIT license covers use, modification, and redistribution. Keep the license and copyright notice with copies of the source.</p>
            <a href={`${repository}/blob/main/LICENSE`} className={styles.inlineLink}>
              Read the MIT license <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <a href={repository} className={styles.inlineLink}>
              <Github size={16} aria-hidden="true" /> View the source
            </a>
            <a href={`${repository}/issues`} className={styles.inlineLink}>
              Report an issue <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <Link href="/us/donate" className={styles.inlineLink}>Support Motion Bits <ArrowRight size={15} aria-hidden="true" /></Link>
          </div>
        </section>
      </div>
    </RevealMain>
  );
}
