"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Check, Copy, Github, Play, RotateCcw } from "lucide-react";
import MagneticFieldButton from "../../animations/buttons/MagneticFieldButton/MagneticFieldButton";
import AmbientBloom from "../../animations/components/AmbientBloom/AmbientBloom";
import LudwigHover from "../../animations/components/LudwigHover/LudwigHover";
import SpotlightCard from "../../animations/components/SpotlightCard/SpotlightCard";
import BlurText from "../../animations/text/BlurText/BlurText";
import GradientFlow from "../../animations/text/GradientFlow/GradientFlow";
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

function BentoPreview({ name, category, className, reduced, children }: {
  name: string;
  category: string;
  className: string;
  reduced: boolean;
  children: (playing: boolean) => ReactNode;
}) {
  const [runs, setRuns] = useState(0);
  const action = runs ? "Replay" : "Play";
  const Icon = runs ? RotateCcw : Play;
  const play = () => setRuns((count) => count + 1);

  return (
    <figure className={className} onPointerEnter={(event) => {
      if (!reduced && event.pointerType === "mouse") play();
    }}>
      <div key={runs} className={styles.bentoArt} aria-hidden="true">
        {children(runs > 0 && !reduced)}
      </div>
      <figcaption className={styles.bentoCaption}>
        <div className={styles.bentoLabel}><span>{name}</span><small>{category}</small></div>
        <button type="button" aria-label={`${action} ${name} preview`} title={`${action} preview`}
          disabled={reduced} onClick={play}>
          <Icon size={15} aria-hidden="true" />
        </button>
      </figcaption>
    </figure>
  );
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
          <p>{reduced ? "Static previews with reduced motion enabled." : "Hover over a tile or press play."}</p>
          <div className={styles.bento}>
            <BentoPreview name="Gradient Flow" category="Text" className={styles.gradientDemo} reduced={reduced}>
              {(playing) => <div className={styles.flowWord}><GradientFlow playing={playing} speed={2.4}>flow.</GradientFlow></div>}
            </BentoPreview>
            <BentoPreview name="Magnetic Field Button" category="Buttons" className={styles.magneticDemo} reduced={reduced}>
              {(playing) => <MagneticFieldButton playing={playing} />}
            </BentoPreview>
            <BentoPreview name="Ambient Bloom" category="Components" className={styles.bloomDemo} reduced={reduced}>
              {(playing) => <AmbientBloom playing={playing} />}
            </BentoPreview>
            <BentoPreview name="Spotlight Card" category="Components" className={styles.spotlightDemo} reduced={reduced}>
              {(playing) => <SpotlightCard playing={playing} />}
            </BentoPreview>
            <BentoPreview name="Blur Text" category="Text" className={styles.blurDemo} reduced={reduced}>
              {(playing) => <div className={styles.blurWord}><BlurText playing={playing}>hello, world.</BlurText></div>}
            </BentoPreview>
            <BentoPreview name="Ludwig Hover" category="Components" className={styles.ludwigDemo} reduced={reduced}>
              {(playing) => <LudwigHover playing={playing} />}
            </BentoPreview>
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
          <div className={styles.openSourceBody}>
            <div>
              <h2 id="open-source-title">Open source</h2>
              <p>Free to use, modify, and share under the MIT license.</p>
              <a href={repository} target="_blank" rel="noreferrer" className={styles.githubButton}><Github size={17} /> View source</a>
            </div>
            <div className={styles.sourceArtwork} aria-hidden="true">
              <div className={styles.sourceOrbits}><i /><i /><i /></div>
              <div className={styles.sourceEmblem}><Github size={46} strokeWidth={1.35} /></div>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}
