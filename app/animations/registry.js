import BlurText from "./BlurText/BlurText";
import PerLetterBlur from "./PerLetterBlur/PerLetterBlur";
import WaveText from "./WaveText/WaveText";
import ElasticText from "./ElasticText/ElasticText";
import GravityDrop from "./GravityDrop/GravityDrop";
import SplitReveal from "./SplitReveal/SplitReveal";
import Typewriter from "./Typewriter/Typewriter";
import OnHoverSwap from "./OnHoverSwap/OnHoverSwap";
import BreathingText from "./BreathingText/BreathingText";
import KineticReveal from "./KineticReveal/KineticReveal";
import NarrativeText from "./NarrativeText/NarrativeText";
import ASCIIMorph from "./ASCIIMorph/ASCIIMorph";
import GlitchStabilize from "./GlitchStabilize/GlitchStabilize";
import GradientFlow from "./GradientFlow/GradientFlow";
import SoftGlowPulse from "./SoftGlowPulse/SoftGlowPulse";
import Wednesday from "./Wednesday/Wednesday";
import Counter from "./Counter/Counter";
import PerLetterHover from "./PerLetterHover/PerLetterHover";
import PerWordHover from "./PerWordHover/PerWordHover";

import BlueprintWireframe from "./BlueprintWireframe/BlueprintWireframe";
import DataStreamDecode from "./DataStreamDecode/DataStreamDecode";
import ScanlineReveal from "./ScanlineReveal/ScanlineReveal";
import StarWarsText from "./StarWarsText/StarWarsText";

import blurTextCode from "./BlurText/BlurText.code";
import perLetterBlurCode from "./PerLetterBlur/PerLetterBlur.code";
import waveTextCode from "./WaveText/WaveText.code";
import elasticTextCode from "./ElasticText/ElasticText.code";
import gravityDrop from "./GravityDrop/GravityDrop.code";
import splitRevealCode from "./SplitReveal/SplitReveal.code";
import typewriterCode from "./Typewriter/Typewriter.code";
import onHoverSwapCode from "./OnHoverSwap/OnHoverSwap.code";
import breathingTextCode from "./BreathingText/BreathingText.code";
import kineticRevealCode from "./KineticReveal/KineticReveal.code";
import narrativeText from "./NarrativeText/NarrativeText.code";
import asmiiMorphCode from "./ASCIIMorph/ASCIIMorph.code";
import glitchStabilize from "./GlitchStabilize/GlitchStabilize.code";
import gradientFlow from "./GradientFlow/GradientFlow.code";
import softGlowPulse from "./SoftGlowPulse/SoftGlowPulse.code";
import wednesday from "./Wednesday/Wednesday.code";
import counter from "./Counter/Counter.code";
import perLetterHover from "./PerLetterHover/PerLetterHover.code";
import perWordHover from "./PerWordHover/PerWordHover.code";

// components
import CodeGrid from "./components/CodeGrid/CodeGrid";

export const ANIMATIONS_REGISTRY = {
  "blur-text": {
    component: BlurText,
    code: blurTextCode,
  },
  "per-letter-blur": {
    component: PerLetterBlur,
    code: perLetterBlurCode,
  },
  "split-reveal": {
    component: SplitReveal,
    code: splitRevealCode,
  },
  "kinetic-reveal": {
    component: KineticReveal,
    code: kineticRevealCode,
  },
  "narrative-text": {
    component: NarrativeText,
    code: narrativeText,
  },
  "wave-text": {
    component: WaveText,
    code: waveTextCode,
  },
  "elastic-text": {
    component: ElasticText,
    code: elasticTextCode,
  },
  "gravity-drop": {
    component: GravityDrop,
    code: gravityDrop,
  },
  counter: {
    component: Counter,
    code: counter,
  },
  typewriter: {
    component: Typewriter,
    code: typewriterCode,
  },
  "ascii-morph": {
    component: ASCIIMorph,
    code: asmiiMorphCode,
  },
  "data-stream-decode": {
    component: DataStreamDecode,
    code: "",
  },
  "blueprint-wireframe": {
    component: BlueprintWireframe,
    code: "",
  },
  "scanline-reveal": {
    component: ScanlineReveal,
    code: "",
  },
  "on-hover-swap": {
    component: OnHoverSwap,
    code: onHoverSwapCode,
  },
  "per-letter-hover": {
    component: PerLetterHover,
    code: perLetterHover,
  },
  "per-word-hover": {
    component: PerWordHover,
    code: perWordHover,
  },
  "breathing-text": {
    component: BreathingText,
    code: breathingTextCode,
  },
  "soft-glow-pulse": {
    component: SoftGlowPulse,
    code: softGlowPulse,
  },
  "gradient-flow": {
    component: GradientFlow,
    code: gradientFlow,
  },
  wednesday: {
    component: Wednesday,
    code: wednesday,
  },
  "glitch-stabilize": {
    component: GlitchStabilize,
    code: glitchStabilize,
  },
  "starwars-text": {
    component: StarWarsText,
    code: "",
  },
  "code-grid": {
    component: CodeGrid,
    code: "",
  },
};
