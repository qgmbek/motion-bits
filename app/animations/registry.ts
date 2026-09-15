import { Type, Square, MousePointerClick } from "lucide-react";
import type { ComponentType } from "react";

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
import Reveal from "./text/Reveal/Reveal";
import PositonalReveal from "./text/PositionalReveal/PositionalReveal";
import ClipPathReveal from "./text/ClipPathReveal/ClipPathReveal";
import ShimmerText from "./text/ShimmerText/ShimmerText";
import MagneticLetters from "./text/MagneticLetters/MagneticLetters";

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
import clipPathRevealCode from "./text/ClipPathReveal/ClipPathReveal.code";
import shimmerTextCode from "./text/ShimmerText/ShimmerText.code";
import magneticLettersCode from "./text/MagneticLetters/MagneticLetters.code";

import CodeGrid from "./components/CodeGrid/CodeGrid";
import BorderShard from "./components/BorderShard/BorderShard";
import GradientBorder from "./components/GradientBorder/GradientBorder";
import GradientCard from "./components/GradientCard/GradientCard";
import ScrambleScreen from "./components/ScrambleScreen/ScrambleScreen";
import LudwigHover from "./components/LudwigHover/LudwigHover";
import GlowStars from "./components/GlowStars/GlowStars";
import PurpleTrails from "./components/PurpleTrail/PurpleTrail";
import SpotlightCard from "./components/SpotlightCard/SpotlightCard";
import FlipCard from "./components/FlipCard/FlipCard";
import MarqueeStrip from "./components/MarqueeStrip/MarqueeStrip";
import RippleSurface from "./components/RippleSurface/RippleSurface";
import PulseRing from "./components/PulseRing/PulseRing";
import FloatingLabel from "./components/FloatingLabel/FloatingLabel";

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
import spotlightCardCode from "./components/SpotlightCard/SpotlightCard.code";
import flipCardCode from "./components/FlipCard/FlipCard.code";
import marqueeStripCode from "./components/MarqueeStrip/MarqueeStrip.code";
import rippleSurfaceCode from "./components/RippleSurface/RippleSurface.code";
import pulseRingCode from "./components/PulseRing/PulseRing.code";
import floatingLabelCode from "./components/FloatingLabel/FloatingLabel.code";

import BorderRevealButton from "./buttons/BorderRevealButton";
import PixelDissolveButton from "./buttons/PixelDissolveButton";
import LiquidFillButton from "./buttons/LiquidFillButton";
import MagneticFieldButton from "./buttons/MagneticFieldButton";
import GlitchHoverButton from "./buttons/GlitchHoverButton";
import SplitExpandButton from "./buttons/SplitExpandButton";
import ParticleBurstButton from "./buttons/ParticleBurstButton";
import borderRevealButtonCode from "./buttons/BorderRevealButton.code";
import pixelDissolveButtonCode from "./buttons/PixelDissolveButton.code";
import liquidFillButtonCode from "./buttons/LiquidFillButton.code";
import magneticFieldButtonCode from "./buttons/MagneticFieldButton.code";
import glitchHoverButtonCode from "./buttons/GlitchHoverButton.code";
import splitExpandButtonCode from "./buttons/SplitExpandButton.code";
import particleBurstButtonCode from "./buttons/ParticleBurstButton.code";

export type AnimationEntry = {
  name: string;
  component: ComponentType<any>;
  code: string;
  css?: string;
};

export const ANIMATIONS = {
  "text-animations": {
    title: "Text Animations",
    icon: Type,
    items: {
      "blur-text": {
        name: "Blur Text",
        component: BlurText,
        code: blurTextCode,
      },
      "per-letter-blur": {
        name: "Per Letter Blur",
        component: PerLetterBlur,
        code: perLetterBlurCode,
      },
      "split-reveal": {
        name: "Split Reveal",
        component: SplitReveal,
        code: splitRevealCode,
      },
      "kinetic-reveal": {
        name: "Kinetic Reveal",
        component: KineticReveal,
        code: kineticRevealCode,
      },
      "narrative-text": {
        name: "Narrative Text",
        component: NarrativeText,
        code: narrativeText,
      },
      "wave-text": {
        name: "Wave Text",
        component: WaveText,
        code: waveTextCode,
      },
      "elastic-text": {
        name: "Elastic Text",
        component: ElasticText,
        code: elasticTextCode,
      },
      "gravity-drop": {
        name: "Gravity Drop",
        component: GravityDrop,
        code: gravityDrop,
      },
      typewriter: {
        name: "Typewriter",
        component: Typewriter,
        code: typewriterCode,
      },
      counter: {
        name: "Counter",
        component: Counter,
        code: counter,
      },
      "ascii-morph": {
        name: "ASCII Morph",
        component: ASCIIMorph,
        code: asmiiMorphCode,
      },
      "data-stream-decode": {
        name: "Data Stream Decode",
        component: DataStreamDecode,
        code: dataStreamDecodeCode,
      },
      "blueprint-wireframe": {
        name: "Blueprint Wireframe Text",
        component: BlueprintWireframe,
        code: blueprintWireframeCode,
      },
      "led-text": {
        name: "Led Text",
        component: LedText,
        code: ledTextCode,
      },
      "scanline-reveal": {
        name: "Scanline Reveal",
        component: ScanlineReveal,
        code: scanlineRevealCode,
      },
      "on-hover-swap": {
        name: "On Hover Swap",
        component: OnHoverSwap,
        code: onHoverSwapCode,
      },
      "per-letter-hover": {
        name: "Per Letter Hover",
        component: PerLetterHover,
        code: perLetterHover,
      },
      "per-word-hover": {
        name: "Per Word Hover",
        component: PerWordHover,
        code: perWordHover,
      },
      "soft-glow-pulse": {
        name: "Soft Glow Pulse",
        component: SoftGlowPulse,
        code: softGlowPulse,
      },
      "gradient-flow": {
        name: "Gradient Flow",
        component: GradientFlow,
        code: gradientFlow,
      },
      wednesday: {
        name: "Wednesday",
        component: Wednesday,
        code: wednesday,
      },
      severance: {
        name: "Severance",
        component: Severance,
        code: severanceCode,
      },
      "glitch-stabilize": {
        name: "Glitch Stabilize",
        component: GlitchStabilize,
        code: glitchStabilize,
      },
      "distored-text": {
        name: "Distorted Text",
        component: DistortedText,
        code: distortedTextCode,
      },
      "word-morph": {
        name: "Word Morph",
        component: WordMorph,
        code: wordMorphCode,
      },
      reveal: {
        name: "Reveal",
        component: Reveal,
        code: revealCode,
      },
      "positional-reveal": {
        name: "Positional Reveal",
        component: PositonalReveal,
        code: positionalRevealCode,
      },
      "clip-path-reveal": {
        name: "Clip Path Reveal",
        component: ClipPathReveal,
        code: clipPathRevealCode,
      },
      "shimmer-text": {
        name: "Shimmer Text",
        component: ShimmerText,
        code: shimmerTextCode,
      },
      "magnetic-letters": {
        name: "Magnetic Letters",
        component: MagneticLetters,
        code: magneticLettersCode,
      },
    },
  },
  components: {
    title: "Components",
    icon: Square,
    items: {
      "code-grid": {
        name: "Code Grid",
        component: CodeGrid,
        code: codegrid,
        css: codegridCss,
      },
      "border-shard": {
        name: "Border Shard",
        component: BorderShard,
        code: borderShard,
        css: borderShardCss,
      },
      "gradient-border": {
        name: "Gradient Border",
        component: GradientBorder,
        code: gradientBorder,
      },
      "gradient-card": {
        name: "Gradient Card",
        component: GradientCard,
        code: gradientCard,
        css: gradientCardCss,
      },
      "scramble-screen": {
        name: "Scramble Screen",
        component: ScrambleScreen,
        code: scrambleScreen,
        css: scrambleScreenCss,
      },
      "ludwig-hover": {
        name: "Ludwig Hover",
        component: LudwigHover,
        code: ludwigHover,
        css: ludwigHoverCss,
      },
      "glow-stars": {
        name: "Glow Stars",
        component: GlowStars,
        code: glowStarsCode,
      },
      "purple-trails": {
        name: "Purple Trails",
        component: PurpleTrails,
        code: purpleTrailCode,
      },
      "spotlight-card": {
        name: "Spotlight Card",
        component: SpotlightCard,
        code: spotlightCardCode,
      },
      "flip-card": {
        name: "Flip Card",
        component: FlipCard,
        code: flipCardCode,
      },
      "marquee-strip": {
        name: "Marquee Strip",
        component: MarqueeStrip,
        code: marqueeStripCode,
      },
      "ripple-surface": {
        name: "Ripple Surface",
        component: RippleSurface,
        code: rippleSurfaceCode,
      },
      "pulse-ring": {
        name: "Pulse Ring",
        component: PulseRing,
        code: pulseRingCode,
      },
      "floating-label": {
        name: "Floating Label",
        component: FloatingLabel,
        code: floatingLabelCode,
      },
    },
  },
  buttons: {
    title: "Buttons",
    icon: MousePointerClick,
    items: {
      "border-reveal-button": {
        name: "Border Reveal Button",
        component: BorderRevealButton,
        code: borderRevealButtonCode,
      },
      "pixel-dissolve-button": {
        name: "Pixel Dissolve Button",
        component: PixelDissolveButton,
        code: pixelDissolveButtonCode,
      },
      "liquid-fill-button": {
        name: "Liquid Fill Button",
        component: LiquidFillButton,
        code: liquidFillButtonCode,
      },
      "magnetic-field-button": {
        name: "Magnetic Field Button",
        component: MagneticFieldButton,
        code: magneticFieldButtonCode,
      },
      "glitch-hover-button": {
        name: "Glitch Hover Button",
        component: GlitchHoverButton,
        code: glitchHoverButtonCode,
      },
      "split-expand-button": {
        name: "Split Expand Button",
        component: SplitExpandButton,
        code: splitExpandButtonCode,
      },
      "particle-burst-button": {
        name: "Particle Burst Button",
        component: ParticleBurstButton,
        code: particleBurstButtonCode,
      },
    },
  },
};

export type AnimationSlug = {
  [Category in keyof typeof ANIMATIONS]: keyof (typeof ANIMATIONS)[Category]["items"];
}[keyof typeof ANIMATIONS];

export const ANIMATIONS_BY_ID = Object.fromEntries(
  Object.values(ANIMATIONS).flatMap((category) =>
    Object.entries(category.items),
  ),
) as Record<AnimationSlug, AnimationEntry>;
