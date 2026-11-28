"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { Fragment, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Check, Copy, Github, Play, RotateCcw } from "lucide-react";
import LiquidFillButton from "../../animations/buttons/LiquidFillButton/LiquidFillButton";
import AmbientBloom from "../../animations/components/AmbientBloom/AmbientBloom";
import LudwigHover from "../../animations/components/LudwigHover/LudwigHover";
import SpotlightCard from "../../animations/components/SpotlightCard/SpotlightCard";
import BlurText from "../../animations/text/BlurText/BlurText";
import GradientFlow from "../../animations/text/GradientFlow/GradientFlow";
import { useSiteMotion } from "../SiteMotion";
import { usePageReveals } from "../Reveal/usePageReveals";
import { CutGem, RhinestoneTrim, SilverFlare } from "./PreciousDetails";
import revealStyles from "../Reveal/Reveal.module.css";
import styles from "./Landing.module.css";

function SculpturePlaceholder() {
  return <div className={styles.sculpture}><div className={styles.artifactFallback} role="status"><small>Loading sculpture…</small></div></div>;
}

const MotionSculpture = dynamic(() => import("./MotionSculpture"), {
  ssr: false,
  loading: SculpturePlaceholder,
});

function HeroSculpture({ accent, light }: { accent: string; light: number }) {
  const [canMount, setCanMount] = useState(false);
  useEffect(() => {
    // Give the server-rendered text a paint before importing and constructing
    // the WebGL scene. No hero content depends on the model's ready state.
    let secondFrame = 0;
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => setCanMount(true));
    });
    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
    };
  }, []);
  return canMount ? <MotionSculpture accent={accent} light={light} /> : <SculpturePlaceholder />;
}

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

type Reveal = `${"fade" | "wipe" | "slide"} ${"up" | "down" | "left" | "right"}`;

function BentoPreview({ name, category, className, reduced, reveal, step, playOnTileHover = true, jeweled = false, children }: {
  name: string;
  category: string;
  className: string;
  reduced: boolean;
  reveal: Reveal;
  step?: 1 | 2;
  playOnTileHover?: boolean;
  jeweled?: boolean;
  children: (playing: boolean) => ReactNode;
}) {
  const [runs, setRuns] = useState(0);
  const artRef = useRef<HTMLDivElement>(null);
  const queuedHover = useRef(false);
  const action = runs ? "Replay" : "Play";
  const Icon = runs ? RotateCcw : Play;
  const play = () => {
    queuedHover.current = false;
    setRuns((count) => count + 1);
  };

  return (
    <figure className={className} data-jeweled={jeweled || undefined} data-reveal={reveal} data-reveal-step={step}
      onPointerEnter={(event) => {
        if (!playOnTileHover || reduced || event.pointerType !== "mouse") return;
        const state = artRef.current?.dataset.revealState;
        if (state && state !== "settled") queuedHover.current = true;
        else play();
      }}
      onPointerLeave={() => { queuedHover.current = false; }}>
      {jeweled && <div className={styles.cardJewels} aria-hidden="true"><RhinestoneTrim className={styles.cardTrim} /><CutGem className={styles.cardGem} /></div>}
      <div ref={artRef} className={styles.bentoArt} aria-hidden="true" data-reveal="fade up" data-reveal-detail
        onAnimationEnd={(event) => {
          if (event.target === event.currentTarget && queuedHover.current && !reduced) play();
        }}>
        <Fragment key={runs}>{children(runs > 0 && !reduced)}</Fragment>
      </div>
      <figcaption className={styles.bentoCaption}>
        <div className={styles.bentoLabel} data-reveal="fade right" data-reveal-detail data-reveal-step="1"><span>{name}</span><small>{category}</small></div>
        <button type="button" aria-label={`${action} ${name} preview`} title={`${action} preview`}
          disabled={reduced} onClick={play} data-reveal="slide left" data-reveal-detail data-reveal-step="2">
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

  usePageReveals(pageRef);

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
    <div ref={pageRef} className={`${styles.page} ${revealStyles.scope}`} style={{ "--accent": accent } as CSSProperties}>
      <div className={styles.pageAtmosphere} aria-hidden="true" />
      <main id="main" tabIndex={-1}>
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroCopy} data-cursor-quiet>
            <SilverFlare className={styles.heroFlare} />
            <h1 id="hero-title">
              <span className={`${styles.titleLine} ${styles.paveTitle}`}>Motion</span>{" "}
              <span className={styles.titleLine}>in pieces<span className={styles.titlePeriod}>.</span></span>
            </h1>
            <p className={styles.heroDescription}>Open source React animations for text, buttons, and interfaces.</p>
            <Link className={styles.primaryButton} href="/collections">Browse components</Link>
          </div>

          <div className={styles.heroStage} data-cursor-quiet>
            <HeroSculpture accent={accent} light={light} />
            <p className={styles.comingSoon}>Animated 3D <span>Components coming soon</span></p>
            <div className={styles.inspector} role="group" aria-label="Sculpture appearance">
              <SilverFlare className={styles.inspectorFlare} />
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
                  style={{ "--light-fill": `${Math.round((light - .6) * 100)}%` } as CSSProperties}
                  value={light} onChange={(event) => setLight(Number(event.target.value))} />
              </label>
            </div>
          </div>
          <RhinestoneTrim className={styles.heroTrim} />
        </section>

        <section className={styles.showcase} id="explore" aria-labelledby="explore-title">
          <header className={styles.showcaseHeader} data-reveal="fade up">
            <h2 id="explore-title">Component previews</h2>
            <p data-reveal="fade right" data-reveal-detail>{reduced ? "Static previews with reduced motion enabled." : "Hover a demo or press play."}</p>
            <div className={styles.sectionJewels} aria-hidden="true"><CutGem className={styles.sectionGem} /><SilverFlare className={styles.sectionFlare} /></div>
          </header>
          <div className={styles.bento}>
            <BentoPreview name="Gradient Flow" category="Text" className={styles.gradientDemo} reduced={reduced} reveal="wipe right" jeweled>
              {(playing) => <div className={styles.flowWord}><GradientFlow playing={playing} speed={2.4}>flow.</GradientFlow></div>}
            </BentoPreview>
            <BentoPreview name="Liquid Fill Button" category="Buttons" className={styles.liquidDemo} reduced={reduced} reveal="slide down" step={1} playOnTileHover={false}>
              {(playing) => <LiquidFillButton playing={playing} reducedMotion={reduced} />}
            </BentoPreview>
            <BentoPreview name="Ambient Bloom" category="Components" className={styles.bloomDemo} reduced={reduced} reveal="fade left" step={2}>
              {(playing) => <AmbientBloom playing={playing} />}
            </BentoPreview>
            <BentoPreview name="Spotlight Card" category="Components" className={styles.spotlightDemo} reduced={reduced} reveal="fade right">
              {(playing) => <SpotlightCard playing={playing} />}
            </BentoPreview>
            <BentoPreview name="Blur Text" category="Text" className={styles.blurDemo} reduced={reduced} reveal="slide left" step={1}>
              {(playing) => <div className={styles.blurWord}><BlurText playing={playing}>hello, world.</BlurText></div>}
            </BentoPreview>
            <BentoPreview name="Ludwig Hover" category="Components" className={styles.ludwigDemo} reduced={reduced} reveal="wipe left" step={2} jeweled>
              {(playing) => <LudwigHover playing={playing} />}
            </BentoPreview>
          </div>
        </section>

        <section className={styles.workflow} id="how-it-works" aria-labelledby="workflow-title">
          <div className={styles.workflowCopy} data-reveal="slide right">
            <h2 id="workflow-title">Use a component</h2>
            <p data-reveal="fade up" data-reveal-detail>Copy the source from Collections and import it into your React app.</p>
          </div>
          <div className={styles.codeWindow} data-reveal="wipe down" data-reveal-step="1">
            <RhinestoneTrim className={styles.codeTrim} />
            <div className={styles.windowBar}>
              <span className={styles.codeFilename}><CutGem className={styles.codeGem} />Example.tsx</span>
              <button type="button" onClick={copyCode} aria-label="Copy usage example" data-reveal="fade left" data-reveal-detail>
                {copyState === "copied" ? <Check size={14} /> : <Copy size={14} />}
                <span aria-live="polite">{copyState === "copied" ? "Copied" : copyState === "failed" ? "Select code" : "Copy"}</span>
              </button>
            </div>
            <div className={styles.codePreview}>
              <span className={styles.codePreviewText} data-reveal="blur up" data-reveal-step="1" data-reveal-state={codeReplay ? "settled" : undefined}>
                <span key={codeReplay} className={styles.codePreviewLine} data-replay={codeReplay > 0 || undefined}>Make it move<span>.</span></span>
              </span>
              <button type="button" aria-label="Replay text animation" onClick={() => setCodeReplay((value) => value + 1)}
                data-reveal="fade left" data-reveal-detail data-reveal-step="2"><RotateCcw size={14} /></button>
            </div>
            <pre className={styles.code} data-reveal="wipe right" data-reveal-detail data-reveal-step="2"><code><span className={styles.codeLine}><span className={styles.syntaxPurple}>import</span> BlurText <span className={styles.syntaxPurple}>from</span> <span className={styles.syntaxGreen}>{'"./components/BlurText"'}</span>;</span><span className={styles.codeLine}>{" "}</span><span className={styles.codeLine}><span className={styles.syntaxPurple}>export default function</span> <span className={styles.syntaxBlue}>Hello</span>() {"{"}</span><span className={styles.codeLine}>{"  "}<span className={styles.syntaxPurple}>return</span> (</span><span className={styles.codeLine}>{"    "}<span className={styles.syntaxGreen}>{"<BlurText>"}</span></span><span className={styles.codeLine}>{"      Make it move."}</span><span className={styles.codeLine}>{"    "}<span className={styles.syntaxGreen}>{"</BlurText>"}</span></span><span className={styles.codeLine}>{"  );"}</span><span className={styles.codeLine}>{"}"}</span></code></pre>
            <div className={styles.codeWindowFooter} data-reveal="slide up" data-reveal-detail data-reveal-step="3"><Link href="/collections#blur-text">Get Blur Text</Link></div>
          </div>
        </section>

        <section className={styles.openSource} id="open-source" aria-labelledby="open-source-title" data-reveal="fade up">
          <div className={styles.openSourceGlow} aria-hidden="true" />
          <div className={styles.sourceCorner} aria-hidden="true"><RhinestoneTrim /><CutGem /></div>
          <div className={styles.openSourceBody}>
            <div>
              <h2 id="open-source-title" data-reveal="wipe up" data-reveal-detail>Open source</h2>
              <p data-reveal="fade right" data-reveal-detail data-reveal-step="1">Free to use, modify, and share under the MIT license.</p>
              <a href={repository} target="_blank" rel="noreferrer" className={styles.githubButton}
                data-reveal="slide up" data-reveal-detail data-reveal-step="2"><Github size={17} /> View source</a>
            </div>
            <div className={styles.sourceArtwork} data-reveal="slide up" data-reveal-detail data-reveal-step="1" aria-hidden="true">
              <div className={styles.sourceOrbits}><i /><i /><i /><CutGem className={styles.orbitGem} /></div>
              <div className={styles.sourceEmblem}><Github size={46} strokeWidth={1.35} /><RhinestoneTrim className={styles.emblemTrim} /></div>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}
