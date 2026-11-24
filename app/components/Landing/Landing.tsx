"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import {
  Atom, Check, Code2, Copy, Github, Layers3, Menu, MousePointer2,
  Pause, Play, RotateCcw, SlidersHorizontal, Sparkles, Star, Type as TypeGlyph, X,
} from "lucide-react";
import type { SculptureView } from "./MotionSculpture";
import { useSiteMotion } from "../SiteMotion";
import styles from "./Landing.module.css";

const MotionSculpture = dynamic(() => import("./MotionSculpture"), {
  ssr: false,
  loading: () => <div className={styles.sculpture}><div className={styles.artifactFallback} role="status"><span>MECHANICAL ANATOMY</span><small>Loading sculpture…</small></div></div>,
});

const repository = "https://github.com/qgmbek/motion-bits";
const colors = [
  { name: "Lime", value: "#d0ff71" },
  { name: "Iris", value: "#b9a1ff" },
  { name: "Ice", value: "#8ee9f3" },
];
const filters = ["All experiments", "Text", "Buttons", "Components"] as const;
type Filter = (typeof filters)[number];
const experiments = [
  { name: "Gradient Flow", slug: "gradient-flow", category: "Text", kind: "gradient", hint: "Always in its element" },
  { name: "Magnetic Field", slug: "magnetic-field-button", category: "Buttons", kind: "magnetic", hint: "A little attraction" },
  { name: "Ambient Bloom", slug: "ambient-bloom", category: "Components", kind: "bloom", hint: "Set the atmosphere" },
  { name: "Stack Spread", slug: "stack-spread", category: "Components", kind: "stack", hint: "A new perspective" },
  { name: "Blur Text", slug: "blur-text", category: "Text", kind: "blur", hint: "Make an entrance" },
  { name: "Spotlight Card", slug: "spotlight-card", category: "Components", kind: "spotlight", hint: "Follow your curiosity" },
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
      <span className={styles.demoEyebrow}>LET THE GOOD IDEAS</span>
      <span className={styles.flowText}>flow.</span>
      <span className={styles.demoCaption}>A little less static.</span>
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
        <span aria-live="polite">{pressed ? "Good chemistry." : "Come a little closer"}</span>
      </button>
      <span className={styles.demoHint}><MousePointer2 size={12} /> Hover & click</span>
    </div>
  );

  if (kind === "bloom") return (
    <div className={styles.bloomDemo}>
      <div className={styles.bloomOrb} aria-hidden="true"><i /><i /><i /></div>
      <span className={styles.bloomWord}>aura<span>✳</span></span>
      <span className={styles.demoHint}>A softer state of mind</span>
    </div>
  );

  if (kind === "stack") return (
    <button type="button" className={styles.stackDemo} onClick={() => setPressed((value) => !value)} aria-pressed={pressed} aria-label="Spread the glass cards" data-spread={pressed}>
      <span className={styles.stackCards} aria-hidden="true">
        <span className={styles.stackCard}><span className={styles.cardOrbit} /></span>
        <span className={styles.stackCard}><span className={styles.cardOrbit} /></span>
        <span className={styles.stackCard}><Layers3 size={24} /><span>Less surface.<br />More depth.</span><small>MOTION / MATERIAL</small></span>
      </span>
      <span className={styles.demoHint}>Hover to unfold. Click to hold.</span>
    </button>
  );

  if (kind === "blur") return (
    <button type="button" className={styles.blurDemo} onClick={() => setReplay((value) => value + 1)} aria-label="Replay the Blur Text preview">
      <span className={styles.demoEyebrow}>WORTH A SECOND LOOK</span>
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
      <span className={styles.spotlightText}>Find your<br /><strong>bright side.</strong></span>
      <span className={styles.demoHint}><MousePointer2 size={12} /> You are the light source</span>
    </button>
  );
}

export default function Landing() {
  const pageRef = useRef<HTMLDivElement>(null);
  const { accent, setAccent, paused, setPaused } = useSiteMotion();
  const activeColor = colors.findIndex((color) => color.value === accent);
  const [view, setView] = useState<SculptureView>("three-quarter");
  const [light, setLight] = useState(1.1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState<Filter>("All experiments");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const [codeReplay, setCodeReplay] = useState(0);
  const copyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduced = useReducedMotion();
  const motionPaused = paused || reduced;
  const visibleExperiments = experiments.filter((item) => filter === "All experiments" || item.category === filter);

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

  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        document.getElementById("landing-menu-toggle")?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [menuOpen]);

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
        <nav className={styles.desktopNav} aria-label="Main navigation">
          <a href="#explore">The collection</a>
          <a href="#how-it-works">How it works</a>
          <a href="#open-source">Open source</a>
        </nav>
        <div className={styles.headerActions}>
          <a className={styles.githubLink} href={repository} target="_blank" rel="noreferrer"><Github size={16} /><span>Star on GitHub</span></a>
          <button id="landing-menu-toggle" className={styles.menuToggle} type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="landing-mobile-nav" onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
        {menuOpen && <nav id="landing-mobile-nav" className={styles.mobileNav} aria-label="Mobile navigation">
          <a href="#explore" onClick={() => setMenuOpen(false)}>Explore the collection</a>
          <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</a>
          <a href="#open-source" onClick={() => setMenuOpen(false)}>Open source</a>
          <Link href="/collections">Browse all components</Link>
        </nav>}
      </header>

      <main id="main">
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroGrid} aria-hidden="true" />
          <div className={styles.heroCopy} data-cursor-quiet>
            <div className={styles.heroEyebrow}><span className={styles.miniMark} aria-hidden="true" /> SMALL COMPONENTS. BIG FEELINGS.</div>
            <h1 id="hero-title"><span className={styles.titleLine}>Beyond</span><span className={styles.titleLine}><span className={styles.alive}>ordinary</span><span className={styles.titlePeriod}>.</span></span></h1>
            <p className={styles.heroDescription}>For the moments that make you stop scrolling.<br className={styles.desktopBreak} /> Expressive React animations, ready to make<br className={styles.desktopBreak} /> your next idea feel like <em>nothing else.</em></p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href="/collections"><Layers3 size={17} /> Explore components</Link>
              <a className={styles.secondaryButton} href="#explore"><Play size={12} fill="currentColor" /> See them in motion</a>
            </div>
            <div className={styles.heroFootnote}><span className={styles.componentGlyphs} aria-hidden="true"><TypeGlyph /><Layers3 size={12} /><MousePointer2 size={12} /></span><span><strong>130+</strong> ways to make it yours.</span><span className={styles.freeLabel}>Always free</span></div>
          </div>

          <div className={styles.heroStage} data-artifact="skull">
            <div className={styles.stageHalo} aria-hidden="true" />
            <div className={styles.stageCrosshair} aria-hidden="true" />
            <div className={styles.stageLabel}>MECHANICAL ANATOMY</div>
            <div className={styles.materialSwitch} role="group" aria-label="Skull viewing angle">
              <button type="button" aria-pressed={view === "three-quarter"} onClick={() => setView("three-quarter")}>Three-quarter</button>
              <button type="button" aria-pressed={view === "front"} onClick={() => setView("front")}>Front</button>
              <button type="button" aria-pressed={view === "profile"} onClick={() => setView("profile")}>Profile</button>
            </div>
            <MotionSculpture accent={accent} light={light} view={view} />
            <div className={styles.inspector}>
              <div className={styles.inspectorControls}>
                <div className={styles.colorControl}><span>Accent</span><div className={styles.swatches} role="group" aria-label="Sculpture accent color">{colors.map((color, index) => <button key={color.name} type="button" aria-label={color.name} aria-pressed={activeColor === index} style={{ "--swatch": color.value } as CSSProperties} onClick={() => setAccent(color.value)}>{activeColor === index && <Check size={11} strokeWidth={3} />}</button>)}</div></div>
                <div className={styles.controlDivider} />
                <label className={styles.speedControl}><span>Studio light <output>{light.toFixed(1)}</output></span><input aria-label="Studio light brightness" type="range" min="0.6" max="1.6" step="0.1" value={light} onChange={(event) => setLight(Number(event.target.value))} /></label>
              </div>
            </div>
            <div className={styles.stageNote}><MousePointer2 size={12} /> Drag to explore. Double-click to reset.</div>
          </div>
          <div className={styles.heroBottom}><span><span aria-hidden="true">✳</span> Built for the beautifully unnecessary.</span><a href="#explore">Scroll to discover <span className={styles.scrollTrack} aria-hidden="true"><i /></span></a><span>DESIGNED TO BE FELT</span></div>
        </section>

        <div className={styles.compatibility}>
          <span>GOOD COMPANY FOR YOUR STACK</span>
          <div className={styles.stackNames}><span><Atom size={23} />React</span><span><b className={styles.tsLogo}>TS</b>TypeScript</span><span><b className={styles.motionLogo}>ϟ</b>Motion</span><span className={styles.gsapLogo}>GSAP<span>↗</span></span><span><Code2 size={23} />Your imagination</span></div>
        </div>

        <section className={styles.showcase} id="explore" aria-labelledby="explore-title">
          <div className={styles.sectionHeading} data-reveal>
            <div><span className={styles.eyebrow}>A FEW OF OUR FAVORITE THINGS</span><h2 id="explore-title">You know it<br />when you <em>feel it.</em></h2></div>
            <p>A button that pulls you closer.<br />Type with a personality. A surface with soul.<br /><span>Go on. Get a little carried away.</span></p>
          </div>
          <div className={styles.galleryToolbar}>
            <div className={styles.filters} role="group" aria-label="Filter animation previews">{filters.map((item) => <button type="button" key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}{item === "All experiments" && <span>6</span>}</button>)}</div>
            <span className={styles.galleryHint}><MousePointer2 size={13} /> Made to be played with</span>
          </div>
          <div className={styles.experimentGrid} data-filtered={filter !== "All experiments"}>
            {visibleExperiments.map((experiment) => <article className={styles.experimentCard} data-kind={experiment.kind} key={experiment.slug} onPointerMove={(event) => {
              if (motionPaused || event.pointerType === "touch") return;
              const bounds = event.currentTarget.getBoundingClientRect();
              event.currentTarget.style.setProperty("--card-x", `${event.clientX - bounds.left}px`);
              event.currentTarget.style.setProperty("--card-y", `${event.clientY - bounds.top}px`);
            }}>
              <div className={styles.experimentPreview}><div className={styles.previewTop} aria-hidden="true"><span>{experiment.category}</span><span>Live preview</span></div><Experiment kind={experiment.kind} reduced={motionPaused} /></div>
              <Link href={`/collections#${experiment.slug}`} className={styles.experimentInfo} aria-label={`Explore ${experiment.name}`}>
                <div><h3>{experiment.name}</h3><p>{experiment.hint}</p></div><span className={styles.categoryLabel}>{experiment.category}</span>
              </Link>
            </article>)}
          </div>
          <div className={styles.galleryFooter}><span>This is just a little taste.</span><Link href="/collections">Discover all 130+ components <span className={styles.smallPlus}>+</span></Link></div>
        </section>

        <section className={styles.workflow} id="how-it-works" aria-labelledby="workflow-title" data-reveal>
          <div className={styles.workflowCopy}><span className={styles.eyebrow}>FROM “THAT’S COOL” TO “THAT’S MINE”</span><h2 id="workflow-title">Your next great<br />detail is a<br /><span>copy away.</span></h2><p>Find your favorite. Grab the source.<br />Make it fit your world.</p><div className={styles.workflowSteps}><div><span><Layers3 size={16} /></span><p><strong>Pick your moment</strong>Explore the live collection.</p></div><div><span><Code2 size={16} /></span><p><strong>Take the code</strong>The source is yours to keep.</p></div><div><span><SlidersHorizontal size={16} /></span><p><strong>Make it your own</strong>Your colors. Your timing. Your rules.</p></div></div></div>
          <div className={styles.codeWindow}>
            <div className={styles.windowBar}><div className={styles.windowDots} aria-hidden="true"><i /><i /><i /></div><span>your-next-idea.tsx</span><span className={styles.reactFile}>React</span></div>
            <div className={styles.codePreview}><span className={styles.previewLabel}>THE RESULT</span><span key={codeReplay} className={styles.codePreviewText}>Make it move<span>.</span></span><button type="button" aria-label="Replay text animation" onClick={() => setCodeReplay((value) => value + 1)}><RotateCcw size={14} /></button></div>
            <div className={styles.codeToolbar}><span><Code2 size={13} /> A FEW LINES. A WHOLE NEW FEELING.</span><button type="button" onClick={copyCode} aria-label="Copy usage example">{copyState === "copied" ? <Check size={14} /> : <Copy size={14} />}<span aria-live="polite">{copyState === "copied" ? "Copied" : copyState === "failed" ? "Select below" : "Copy"}</span></button></div>
            <pre className={styles.code}><code><span className={styles.codeLine}><span className={styles.syntaxPurple}>import</span> BlurText <span className={styles.syntaxPurple}>from</span> <span className={styles.syntaxGreen}>{'"./components/BlurText"'}</span>;</span><span className={styles.codeLine}>{" "}</span><span className={styles.codeLine}><span className={styles.syntaxPurple}>export default function</span> <span className={styles.syntaxBlue}>Hello</span>() {"{"}</span><span className={styles.codeLine}>{"  "}<span className={styles.syntaxPurple}>return</span> (</span><span className={styles.codeLine}>{"    "}<span className={styles.syntaxGreen}>{"<BlurText>"}</span></span><span className={styles.codeLine}>{"      Make it move."}</span><span className={styles.codeLine}>{"    "}<span className={styles.syntaxGreen}>{"</BlurText>"}</span></span><span className={styles.codeLine}>{"  );"}</span><span className={styles.codeLine}>{"}"}</span></code></pre>
            <div className={styles.codeWindowFooter}><span><Check size={12} /> Copy the component source first</span><Link href="/collections#blur-text">Get Blur Text</Link></div>
          </div>
        </section>

        <section className={styles.openSource} id="open-source" aria-labelledby="open-source-title" data-reveal>
          <div className={styles.openSourceGlow} aria-hidden="true" />
          <div className={styles.openSourceTop}><span className={styles.eyebrow}><Github size={14} /> OPEN SOURCE. OPEN POSSIBILITIES.</span><span className={styles.license}>MIT LICENSE</span></div>
          <div className={styles.openSourceBody}><div><h2 id="open-source-title">Good things<br />are better <span>shared.</span></h2><p>Free to use. Free to remix. Built for the love of making<br className={styles.desktopBreak} /> things a little more interesting.</p><a href={repository} target="_blank" rel="noreferrer" className={styles.githubButton}><Star size={16} /> Give us a star</a></div><div className={styles.communityArt} aria-hidden="true"><div className={styles.communityOrbit} /><div className={styles.communityOrbit} /><div className={styles.communityOrbit} /><span className={styles.communityCenter}><Github strokeWidth={1.2} /></span><span className={styles.communityStar}>✦</span><span className={styles.communityPlus}>+</span><span className={styles.communityCode}>{"</>"}</span></div></div>
        </section>

        <section className={styles.finalCta} aria-labelledby="cta-title" data-reveal><span className={styles.eyebrow}>THE WEB HAS ENOUGH ORDINARY.</span><h2 id="cta-title">Leave a little<br /><span>feeling behind.</span><span className={styles.ctaAsterisk} aria-hidden="true">✳</span></h2><Link className={styles.primaryButton} href="/collections"><Layers3 size={17} /> Make something memorable</Link><span className={styles.ctaFootnote}>Your next great detail is already here.</span></section>
      </main>

      <footer className={styles.footer}><div className={styles.footerTop}><Link href="/" aria-label="Motion Bits home"><Brand /></Link><p>A little motion goes a long way.</p><div><Link href="/collections">Collection</Link><Link href="/us/about">About</Link><a href={repository} target="_blank" rel="noreferrer">GitHub</a></div></div><div className={styles.footerBottom}><span>© {new Date().getFullYear()} Motion Bits</span><span>Made with feeling by <a href="https://github.com/qgmbek" target="_blank" rel="noreferrer">qgmbek</a></span><button type="button" aria-pressed={motionPaused} disabled={reduced} onClick={() => setPaused((value) => !value)}>{motionPaused ? <Play size={12} /> : <Pause size={12} />}{reduced ? "Reduced motion enabled" : paused ? "Play motion" : "Pause motion"}</button></div></footer>
    </div>
  );
}
