"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Check, Copy, Github, RotateCcw } from "lucide-react";
import { SiteLinks } from "../Nav/Nav";
import { useSiteMotion } from "../SiteMotion";
import styles from "./Landing.module.css";

const MotionSculpture = dynamic(() => import("./MotionSculpture"), {
  ssr: false,
  loading: () => <div className={styles.sculpture}><div className={styles.artifactFallback} role="status"><small>Loading sculpture…</small></div></div>,
});

const repository = "https://github.com/qgmbek/motion-bits";
const colors = [
  { name: "Lime", value: "#d0ff71" },
  { name: "Iris", value: "#b9a1ff" },
  { name: "Ice", value: "#8ee9f3" },
];
const snippet = `import BlurText from "./components/BlurText";

export default function Hello() {
  return (
    <BlurText>
      Make it move.
    </BlurText>
  );
}`;

function Brand() {
  return (
    <span className={styles.brand}>
      <span className={styles.brandSymbol} aria-hidden="true"><i /><i /><i /></span>
      <span>motion<span className={styles.brandLight}>bits</span><span className={styles.brandPeriod}>.</span></span>
    </span>
  );
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(preference.matches);
    sync();
    preference.addEventListener("change", sync);
    return () => preference.removeEventListener("change", sync);
  }, []);
  return reduced;
}

export default function Landing() {
  const pageRef = useRef<HTMLDivElement>(null);
  const { accent, setAccent } = useSiteMotion();
  const activeColor = colors.findIndex((color) => color.value === accent);
  const [light, setLight] = useState(1.1);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const [codeReplay, setCodeReplay] = useState(0);
  const copyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const elements = pageRef.current?.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!elements) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        (entry.target as HTMLElement).dataset.visible = "true";
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
    elements.forEach((element) => {
      element.dataset.visible = element.getBoundingClientRect().top < window.innerHeight * 0.92 ? "true" : "false";
      observer.observe(element);
    });
    return () => {
      observer.disconnect();
      elements.forEach((element) => { element.dataset.visible = "true"; });
    };
  }, [reduced]);

  useEffect(() => () => {
    if (copyTimeout.current) clearTimeout(copyTimeout.current);
  }, []);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
    if (copyTimeout.current) clearTimeout(copyTimeout.current);
    copyTimeout.current = setTimeout(() => setCopyState("idle"), 2600);
  };

  return (
    <div ref={pageRef} className={styles.page} style={{ "--accent": accent } as CSSProperties}>
      <div className={styles.pageAtmosphere} aria-hidden="true" />
      <a className={styles.skipLink} href="#main">Skip to content</a>
      <header className={styles.header}>
        <Link href="/" aria-label="Motion Bits home"><Brand /></Link>
        <nav className={styles.siteNav} aria-label="Main navigation">
          <SiteLinks />
        </nav>
        <a className={styles.githubLink} href={repository} target="_blank" rel="noreferrer" aria-label="Motion Bits on GitHub"><Github size={17} /><span>GitHub</span></a>
      </header>

      <main id="main" tabIndex={-1}>
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroCopy} data-cursor-quiet>
            <h1 id="hero-title">Motion<br /><span>in pieces<span className={styles.titlePeriod}>.</span></span></h1>
            <p className={styles.heroDescription}>Open source React animations for text, buttons, and interfaces.</p>
            <Link className={styles.primaryButton} href="/collections">Browse components</Link>
          </div>

          <div className={styles.heroStage} data-cursor-quiet>
            <MotionSculpture accent={accent} light={light} />
            <p className={styles.comingSoon}>Animated 3D <span>Coming Soon</span></p>
            <div className={styles.inspector} role="group" aria-label="Sculpture appearance">
              <div className={styles.colorControl}>
                <span>Accent</span>
                <div className={styles.swatches} role="group" aria-label="Sculpture accent color">
                  {colors.map((color, index) => (
                    <button key={color.name} type="button" aria-label={color.name} aria-pressed={activeColor === index}
                      style={{ "--swatch": color.value } as CSSProperties} onClick={() => setAccent(color.value)}>
                      {activeColor === index && <Check size={11} strokeWidth={3} aria-hidden="true" />}
                    </button>
                  ))}
                </div>
              </div>
              <label className={styles.lightControl}>
                <span>Studio light <output>{light.toFixed(1)}</output></span>
                <input aria-label="Studio light brightness" type="range" min="0.6" max="1.6" step="0.1"
                  value={light} onChange={(event) => setLight(Number(event.target.value))} />
              </label>
            </div>
          </div>
        </section>

        <section className={styles.showcase} id="explore" aria-labelledby="explore-title">
          <h2 id="explore-title">Component previews</h2>
          <div className={styles.bento}>
            <figure className={styles.gradientDemo}>
              <div className={styles.bentoArt} aria-hidden="true">
                <div className={styles.flowLoops}><i /><i /><i /></div>
                <span className={styles.flowWord}>flow.</span>
              </div>
              <figcaption className={styles.bentoCaption}><span>Gradient Flow</span><small>Text</small></figcaption>
            </figure>
            <figure className={styles.magneticDemo}>
              <div className={styles.bentoArt} aria-hidden="true">
                <div className={styles.fieldLines}><i /><i /><i /></div>
                <span className={styles.magneticCore} />
              </div>
              <figcaption className={styles.bentoCaption}><span>Magnetic Field</span><small>Buttons</small></figcaption>
            </figure>
            <figure className={styles.bloomDemo}>
              <div className={styles.bentoArt} aria-hidden="true">
                <div className={styles.bloomOrb}><i /><i /><i /></div>
                <span className={styles.bloomCore} />
                <span className={styles.bloomWord}>aura</span>
              </div>
              <figcaption className={styles.bentoCaption}><span>Ambient Bloom</span><small>Components</small></figcaption>
            </figure>
            <figure className={styles.stackDemo}>
              <div className={styles.bentoArt} aria-hidden="true">
                <div className={styles.stackCards}><i /><i /><i /></div>
              </div>
              <figcaption className={styles.bentoCaption}><span>Stack Spread</span><small>Components</small></figcaption>
            </figure>
            <figure className={styles.blurDemo}>
              <div className={styles.bentoArt} aria-hidden="true">
                <div className={styles.blurForms}><i /><i /><i /></div>
                <span className={styles.blurWord}>hello, world.</span>
              </div>
              <figcaption className={styles.bentoCaption}><span>Blur Text</span><small>Text</small></figcaption>
            </figure>
            <figure className={styles.spotlightDemo}>
              <div className={styles.bentoArt} aria-hidden="true">
                <div className={styles.spotlightGrid} />
                <div className={styles.spotlightLens} />
                <span className={styles.spotlightWord}>Spotlight</span>
              </div>
              <figcaption className={styles.bentoCaption}><span>Spotlight Card</span><small>Components</small></figcaption>
            </figure>
          </div>
        </section>

        <section className={styles.workflow} id="how-it-works" aria-labelledby="workflow-title" data-reveal>
          <div className={styles.workflowCopy}><h2 id="workflow-title">Use a component</h2><p>Copy the source from Collections and import it into your React app.</p></div>
          <div className={styles.codeWindow}>
            <div className={styles.windowBar}><span>Example.tsx</span><button type="button" onClick={copyCode} aria-label="Copy usage example">{copyState === "copied" ? <Check size={14} /> : <Copy size={14} />}<span aria-live="polite">{copyState === "copied" ? "Copied" : copyState === "failed" ? "Select code" : "Copy"}</span></button></div>
            <div className={styles.codePreview}><span key={codeReplay} className={styles.codePreviewText}>Make it move<span>.</span></span><button type="button" aria-label="Replay text animation" onClick={() => setCodeReplay((value) => value + 1)}><RotateCcw size={14} /></button></div>
            <pre className={styles.code}><code><span className={styles.codeLine}><span className={styles.syntaxPurple}>import</span> BlurText <span className={styles.syntaxPurple}>from</span> <span className={styles.syntaxGreen}>{'"./components/BlurText"'}</span>;</span><span className={styles.codeLine}>{" "}</span><span className={styles.codeLine}><span className={styles.syntaxPurple}>export default function</span> <span className={styles.syntaxBlue}>Hello</span>() {"{"}</span><span className={styles.codeLine}>{"  "}<span className={styles.syntaxPurple}>return</span> (</span><span className={styles.codeLine}>{"    "}<span className={styles.syntaxGreen}>{"<BlurText>"}</span></span><span className={styles.codeLine}>{"      Make it move."}</span><span className={styles.codeLine}>{"    "}<span className={styles.syntaxGreen}>{"</BlurText>"}</span></span><span className={styles.codeLine}>{"  );"}</span><span className={styles.codeLine}>{"}"}</span></code></pre>
            <div className={styles.codeWindowFooter}><Link href="/collections#blur-text">Get Blur Text</Link></div>
          </div>
        </section>

        <section className={styles.openSource} id="open-source" aria-labelledby="open-source-title" data-reveal>
          <div className={styles.openSourceGlow} aria-hidden="true" />
          <div className={styles.openSourceBody}><div><h2 id="open-source-title">Open source</h2><p>MIT license for personal and commercial projects.</p></div><a href={repository} target="_blank" rel="noreferrer" className={styles.githubButton}><Github size={17} /> View source</a></div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <Link href="/" aria-label="Motion Bits home"><Brand /></Link>
          <nav aria-label="Footer navigation">
            <Link href="/collections">Collections</Link>
            <Link href="/us/about">About</Link>
            <Link href="/us/donate">Donate</Link>
          </nav>
        </div>
        <div className={styles.footerBottom}>
          <span>© {new Date().getFullYear()} Motion Bits</span>
          <a href="https://github.com/qgmbek" target="_blank" rel="noreferrer">qgmbek</a>
        </div>
      </footer>
    </div>
  );
}
