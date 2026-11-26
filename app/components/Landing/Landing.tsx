"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import {
  Check, Copy, Github, Layers3, MousePointer2,
  Pause, Play, RotateCcw, Sparkles,
} from "lucide-react";
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
const filters = ["All", "Text", "Buttons", "Components"] as const;
type Filter = (typeof filters)[number];
const experiments = [
  { name: "Gradient Flow", slug: "gradient-flow", category: "Text", kind: "gradient" },
  { name: "Magnetic Field", slug: "magnetic-field-button", category: "Buttons", kind: "magnetic" },
  { name: "Ambient Bloom", slug: "ambient-bloom", category: "Components", kind: "bloom" },
  { name: "Stack Spread", slug: "stack-spread", category: "Components", kind: "stack" },
  { name: "Blur Text", slug: "blur-text", category: "Text", kind: "blur" },
  { name: "Spotlight Card", slug: "spotlight-card", category: "Components", kind: "spotlight" },
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

function Experiment({ kind, reduced }: { kind: string; reduced: boolean }) {
  const [replay, setReplay] = useState(0);
  const [pressed, setPressed] = useState(false);
  const pressTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (pressTimeout.current) clearTimeout(pressTimeout.current);
  }, []);

  const magneticMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (reduced || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${(event.clientX - rect.left - rect.width / 2) * 0.22}px`);
    event.currentTarget.style.setProperty("--my", `${(event.clientY - rect.top - rect.height / 2) * 0.22}px`);
  };

  if (kind === "gradient") return (
    <div className={styles.gradientDemo}>
      <span className={styles.flowText}>flow.</span>
    </div>
  );

  if (kind === "magnetic") return (
    <div className={styles.magneticDemo}>
      <div className={styles.fieldLines} aria-hidden="true"><i /><i /><i /></div>
      <button
        type="button"
        className={styles.magneticButton}
        onPointerMove={magneticMove}
        onPointerLeave={(event) => {
          event.currentTarget.style.setProperty("--mx", "0px");
          event.currentTarget.style.setProperty("--my", "0px");
        }}
        onClick={() => {
          setPressed(true);
          if (pressTimeout.current) clearTimeout(pressTimeout.current);
          pressTimeout.current = setTimeout(() => setPressed(false), 1400);
        }}
      >
        {pressed ? <Check size={16} /> : <Sparkles size={16} />}
        <span aria-live="polite">{pressed ? "Pressed" : "Magnetic button"}</span>
      </button>
      <span className={styles.demoHint}><MousePointer2 size={12} /> Hover & click</span>
    </div>
  );

  if (kind === "bloom") return (
    <div className={styles.bloomDemo}>
      <div className={styles.bloomOrb} aria-hidden="true"><i /><i /><i /></div>
      <span className={styles.bloomWord}>aura<span>✳</span></span>
    </div>
  );

  if (kind === "stack") return (
    <button type="button" className={styles.stackDemo} onClick={() => setPressed((value) => !value)} aria-pressed={pressed} aria-label="Spread the glass cards" data-spread={pressed}>
      <span className={styles.stackCards} aria-hidden="true">
        <span className={styles.stackCard}><span className={styles.cardOrbit} /></span>
        <span className={styles.stackCard}><span className={styles.cardOrbit} /></span>
        <span className={styles.stackCard}><Layers3 size={24} /><span>Stack spread</span></span>
      </span>
      <span className={styles.demoHint}>Hover to unfold. Click to hold.</span>
    </button>
  );

  if (kind === "blur") return (
    <button type="button" className={styles.blurDemo} onClick={() => setReplay((value) => value + 1)} aria-label="Replay the Blur Text preview">
      <span key={replay} className={styles.blurWords} aria-hidden="true">
        {"hello, world.".split("").map((letter, index) => <span key={index} style={{ "--i": index } as CSSProperties}>{letter === " " ? "\u00a0" : letter}</span>)}
      </span>
      <span className={styles.demoHint}><RotateCcw size={12} /> Click to replay</span>
    </button>
  );

  return (
    <button
      type="button"
      className={styles.spotlightDemo}
      aria-label="Move the spotlight, or click to change its position"
      onPointerMove={(event) => {
        if (reduced) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty("--spot-x", `${event.clientX - bounds.left}px`);
        event.currentTarget.style.setProperty("--spot-y", `${event.clientY - bounds.top}px`);
      }}
      onClick={(event) => {
        setPressed((value) => !value);
        event.currentTarget.style.setProperty("--spot-x", pressed ? "30%" : "70%");
        event.currentTarget.style.setProperty("--spot-y", pressed ? "30%" : "65%");
      }}
    >
      <span className={styles.spotlightGrid} aria-hidden="true" />
      <span className={styles.spotlightGlyph} aria-hidden="true">✳</span>
      <span className={styles.spotlightText}>Spotlight</span>
    </button>
  );
}

export default function Landing() {
  const pageRef = useRef<HTMLDivElement>(null);
  const { accent, setAccent, paused, setPaused } = useSiteMotion();
  const activeColor = colors.findIndex((color) => color.value === accent);
  const [light, setLight] = useState(1.1);
  const [filter, setFilter] = useState<Filter>("All");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const [codeReplay, setCodeReplay] = useState(0);
  const copyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduced = useReducedMotion();
  const motionPaused = paused || reduced;
  const visibleExperiments = experiments.filter((item) => filter === "All" || item.category === filter);

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
    <div ref={pageRef} className={styles.page} style={{ "--accent": accent } as CSSProperties} data-motion={motionPaused ? "paused" : "playing"}>
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
            <p className={styles.heroDescription}>Open-source React animations for text, buttons, and interfaces.</p>
            <Link className={styles.primaryButton} href="/collections">Browse components</Link>
          </div>

          <div className={styles.heroStage} data-cursor-quiet>
            <div className={styles.stageHalo} aria-hidden="true" />
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
          <div className={styles.sectionHeading} data-reveal>
            <h2 id="explore-title">Component previews</h2>
          </div>
          <div className={styles.galleryToolbar}>
            <div className={styles.filters} role="group" aria-label="Filter animation previews">
              {filters.map((item) => (
                <button type="button" key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>
              ))}
            </div>
            <Link className={styles.collectionLink} href="/collections">View collection</Link>
          </div>
          <div className={styles.experimentGrid} data-filtered={filter !== "All"}>
            {visibleExperiments.map((experiment) => <article className={styles.experimentCard} data-kind={experiment.kind} key={experiment.slug} onPointerMove={(event) => {
              if (motionPaused || event.pointerType === "touch") return;
              const bounds = event.currentTarget.getBoundingClientRect();
              event.currentTarget.style.setProperty("--card-x", `${event.clientX - bounds.left}px`);
              event.currentTarget.style.setProperty("--card-y", `${event.clientY - bounds.top}px`);
            }}>
              <div className={styles.experimentPreview}><Experiment kind={experiment.kind} reduced={motionPaused} /></div>
              <Link href={`/collections#${experiment.slug}`} className={styles.experimentInfo} aria-label={`Explore ${experiment.name}`}>
                <h3>{experiment.name}</h3><span className={styles.categoryLabel}>{experiment.category}</span>
              </Link>
            </article>)}
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
          <div className={styles.openSourceBody}><div><h2 id="open-source-title">Open source</h2><p>MIT-licensed for personal and commercial projects.</p></div><a href={repository} target="_blank" rel="noreferrer" className={styles.githubButton}><Github size={17} /> View source</a></div>
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
          <button type="button" aria-pressed={motionPaused} disabled={reduced} onClick={() => setPaused((value) => !value)}>
            {motionPaused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}
            {reduced ? "Reduced motion enabled" : paused ? "Play motion" : "Pause motion"}
          </button>
        </div>
      </footer>
    </div>
  );
}
