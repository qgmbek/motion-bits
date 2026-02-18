import BlurText from "./text/BlurText/BlurText";
import PerLetterBlur from "./text/PerLetterBlur/PerLetterBlur";
import WaveText from "./text/WaveText/WaveText";
import ElasticText from "./text/ElasticText/ElasticText";
import GravityDrop from "./text/GravityDrop/GravityDrop";
import SplitReveal from "./text/SplitReveal/SplitReveal";
import Typewriter from "./text/Typewriter/Typewriter";
import OnHoverSwap from "./text/OnHoverSwap/OnHoverSwap";
import KineticReveal from "./text/KineticReveal/KineticReveal";
import NarrativeText from "./text/NarrativeText/NarrativeText";
import ASCIIMorph from "./text/ASCIIMorph/ASCIIMorph";
import GlitchStabilize from "./text/GlitchStabilize/GlitchStabilize";
import GradientFlow from "./text/GradientFlow/GradientFlow";
import SoftGlowPulse from "./text/SoftGlowPulse/SoftGlowPulse";
import Wednesday from "./text/Wednesday/Wednesday";
import Counter from "./text/Counter/Counter";
import PerLetterHover from "./text/PerLetterHover/PerLetterHover";
import PerWordHover from "./text/PerWordHover/PerWordHover";

import BlueprintWireframe from "./text/BlueprintWireframe/BlueprintWireframe";
import LedText from "./text/LedText/LedText";
import DataStreamDecode from "./text/DataStreamDecode/DataStreamDecode";
import ScanlineReveal from "./text/ScanlineReveal/ScanlineReveal";
import DistortedText from "./text/DistortedText/DistortedText";
import WordMorph from "./text/WordMorph/WordMorph";

import blurTextCode from "./text/BlurText/BlurText.code";
import perLetterBlurCode from "./text/PerLetterBlur/PerLetterBlur.code";
import waveTextCode from "./text/WaveText/WaveText.code";
import elasticTextCode from "./text/ElasticText/ElasticText.code";
import gravityDrop from "./text/GravityDrop/GravityDrop.code";
import splitRevealCode from "./text/SplitReveal/SplitReveal.code";
import typewriterCode from "./text/Typewriter/Typewriter.code";
import onHoverSwapCode from "./text/OnHoverSwap/OnHoverSwap.code";
import kineticRevealCode from "./text/KineticReveal/KineticReveal.code";
import narrativeText from "./text/NarrativeText/NarrativeText.code";
import asmiiMorphCode from "./text/ASCIIMorph/ASCIIMorph.code";
import glitchStabilize from "./text/GlitchStabilize/GlitchStabilize.code";
import gradientFlow from "./text/GradientFlow/GradientFlow.code";
import softGlowPulse from "./text/SoftGlowPulse/SoftGlowPulse.code";
import wednesday from "./text/Wednesday/Wednesday.code";
import counter from "./text/Counter/Counter.code";
import perLetterHover from "./text/PerLetterHover/PerLetterHover.code";
import perWordHover from "./text/PerWordHover/PerWordHover.code";

// components
import CodeGrid from "./components/CodeGrid/CodeGrid";
import BorderShard from "./components/BorderShard/BorderShard";
import GradientBorder from "./components/GradientBorder/GradientBorder";
import GradientCard from "./components/GradientCard/GradientCard";

import codegrid from "./components/CodeGrid/CodeGrid.code";
import borderShard from "./components/BorderShard/BorderShard.code";
import gradientCard from "./components/GradientCard/GradientCard.code";

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
  "led-text": {
    component: LedText,
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
  "distored-text": {
    component: DistortedText,
    code: "",
  },
  "word-morph": {
    component: WordMorph,
    code: "",
  },
  "code-grid": {
    component: CodeGrid,
    code: codegrid,
  },
  "border-shard": {
    component: BorderShard,
    code: borderShard,
  },
  "gradient-border": {
    component: GradientBorder,
    code: "",
  },
  "gradient-card": {
    component: GradientCard,
    code: gradientCard,
  },
};
