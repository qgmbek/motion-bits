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

import Severance from "./text/Severance/Severance";
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
import dataStreamDecodeCode from "./text/DataStreamDecode/DataStreamDecode.code";
import blueprintWireframeCode from "./text/BlueprintWireframe/BlueprintWireframe.code";
import ledTextCode from "./text/LedText/LedText.code";
import scanlineRevealCode from "./text/ScanlineReveal/ScanlineReveal.code";
import distortedTextCode from "./text/DistortedText/DistortedText.code";
import wordMorphCode from "./text/WordMorph/WordMorph.code";
import revealCode from "./text/Reveal/Reveal.code";
import positionalRevealCode from "./text/PositionalReveal/PositionalReveal.code";
import severanceCode from "./text/Severance/Severance.code";

import Reveal from "./text/Reveal/Reveal";
import PositonalReveal from "./text/PositionalReveal/PositionalReveal";

// components
import CodeGrid from "./components/CodeGrid/CodeGrid";
import BorderShard from "./components/BorderShard/BorderShard";
import GradientBorder from "./components/GradientBorder/GradientBorder";
import GradientCard from "./components/GradientCard/GradientCard";
import ScrambleScreen from "./components/ScrambleScreen/ScrambleScreen";
import LudwigHover from "./components/LudwigHover/LudwigHover";
import GlowStars from "./components/GlowStars/GlowStars";
import PurpleTrails from "./components/PurpleTrail/PurpleTrail";

import codegrid, {
  css as codegridCss,
} from "./components/CodeGrid/CodeGrid.code";
import borderShard, {
  css as borderShardCss,
} from "./components/BorderShard/BorderShard.code";
import gradientBorder from "./components/GradientBorder/GradientBorder.code";
import gradientCard, {
  css as gradientCardCss,
} from "./components/GradientCard/GradientCard.code";
import scrambleScreen, {
  css as scrambleScreenCss,
} from "./components/ScrambleScreen/ScrambleScreen.code";
import ludwigHover, {
  css as ludwigHoverCss,
} from "./components/LudwigHover/LudwigHover.code";
import glowStarsCode from "./components/GlowStars/GlowStars.code";
import purpleTrailCode from "./components/PurpleTrail/PurpleTrail.code";

// buttons
import BorderRevealButton from "./buttons/BorderRevealButton";
import PixelDissolveButton from "./buttons/PixelDissolveButton";
import LiquidFillButton from "./buttons/LiquidFillButton";
import MagneticFieldButton from "./buttons/MagneticFieldButton";
import borderRevealButtonCode from "./buttons/BorderRevealButton.code";
import pixelDissolveButtonCode from "./buttons/PixelDissolveButton.code";
import liquidFillButtonCode from "./buttons/LiquidFillButton.code";
import magneticFieldButtonCode from "./buttons/MagneticFieldButton.code";

type RegistryEntry = {
  component: React.ComponentType<any>;
  code: string;
  css?: string;
};

export const ANIMATIONS_REGISTRY: Record<string, RegistryEntry> = {
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
    code: dataStreamDecodeCode,
  },
  "blueprint-wireframe": {
    component: BlueprintWireframe,
    code: blueprintWireframeCode,
  },
  "led-text": {
    component: LedText,
    code: ledTextCode,
  },
  "scanline-reveal": {
    component: ScanlineReveal,
    code: scanlineRevealCode,
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
  severance: {
    component: Severance,
    code: severanceCode,
  },
  "glitch-stabilize": {
    component: GlitchStabilize,
    code: glitchStabilize,
  },
  "distored-text": {
    component: DistortedText,
    code: distortedTextCode,
  },
  "word-morph": {
    component: WordMorph,
    code: wordMorphCode,
  },
  reveal: {
    component: Reveal,
    code: revealCode,
  },
  "positional-reveal": {
    component: PositonalReveal,
    code: positionalRevealCode,
  },
  "code-grid": {
    component: CodeGrid,
    code: codegrid,
    css: codegridCss,
  },
  "border-shard": {
    component: BorderShard,
    code: borderShard,
    css: borderShardCss,
  },
  "gradient-border": {
    component: GradientBorder,
    code: gradientBorder,
  },
  "gradient-card": {
    component: GradientCard,
    code: gradientCard,
    css: gradientCardCss,
  },
  "scramble-screen": {
    component: ScrambleScreen,
    code: scrambleScreen,
    css: scrambleScreenCss,
  },
  "ludwig-hover": {
    component: LudwigHover,
    code: ludwigHover,
    css: ludwigHoverCss,
  },
  "glow-stars": {
    component: GlowStars,
    code: glowStarsCode,
  },
  "purple-trails": {
    component: PurpleTrails,
    code: purpleTrailCode,
  },
  "border-reveal-button": {
    component: BorderRevealButton,
    code: borderRevealButtonCode,
  },
  "pixel-dissolve-button": {
    component: PixelDissolveButton,
    code: pixelDissolveButtonCode,
  },
  "liquid-fill-button": {
    component: LiquidFillButton,
    code: liquidFillButtonCode,
  },
  "magnetic-field-button": {
    component: MagneticFieldButton,
    code: magneticFieldButtonCode,
  },
};
