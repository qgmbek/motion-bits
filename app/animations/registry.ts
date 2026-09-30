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
import NeonPulse from "./text/NeonPulse/NeonPulse";
import LiquidFloat from "./text/LiquidFloat/LiquidFloat";
import PixelDissolve from "./text/PixelDissolve/PixelDissolve";
import CyberDecode from "./text/CyberDecode/CyberDecode";
import ElasticBounce from "./text/ElasticBounce/ElasticBounce";
import HologramFlicker from "./text/HologramFlicker/HologramFlicker";
import ParticleAssemble from "./text/ParticleAssemble/ParticleAssemble";
import BreathingType from "./text/BreathingType/BreathingType";
import LiquidCursor from "./text/LiquidCursor/LiquidCursor";
import ThreeDRotate from "./text/3DRotate/3DRotate";
import CharacterOrbit from "./text/CharacterOrbit/CharacterOrbit";
import ChromaticSeparation from "./text/ChromaticSeparation/ChromaticSeparation";
import CursorDraw from "./text/CursorDraw/CursorDraw";
import DeformField from "./text/DeformField/DeformField";
import EchoTrail from "./text/EchoTrail/EchoTrail";
import GlyphMorph from "./text/GlyphMorph/GlyphMorph";
import InkBleed from "./text/InkBleed/InkBleed";
import MagneticRepulsion from "./text/MagneticRepulsion/MagneticRepulsion";
import PortalText from "./text/PortalText/PortalText";
import RollingBaseline from "./text/RollingBaseline/RollingBaseline";
import TextExplosion from "./text/TextExplosion/TextExplosion";
import TextFold from "./text/TextFold/TextFold";
import TextGravityFlip from "./text/TextGravityFlip/TextGravityFlip";
import TextGravityWell from "./text/TextGravityWell/TextGravityWell";
import TextMemoryType from "./text/TextMemoryType/TextMemoryType";
import TextPortal from "./text/TextPortal/TextPortal";
import TextSand from "./text/TextSand/TextSand";
import TextStretch from "./text/TextStretch/TextStretch";
import TextTumble from "./text/TextTumble/TextTumble";
import TextTunnel from "./text/TextTunnel/TextTunnel";
import TypographyShutter from "./text/TypographyShutter/TypographyShutter";
import VerticalCascade from "./text/VerticalCascade/VerticalCascade";

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
import neonPulseCode from "./text/NeonPulse/NeonPulse.code";
import liquidFloatCode from "./text/LiquidFloat/LiquidFloat.code";
import pixelDissolveCode from "./text/PixelDissolve/PixelDissolve.code";
import cyberDecodeCode from "./text/CyberDecode/CyberDecode.code";
import elasticBounceCode from "./text/ElasticBounce/ElasticBounce.code";
import hologramFlickerCode from "./text/HologramFlicker/HologramFlicker.code";
import particleAssembleCode from "./text/ParticleAssemble/ParticleAssemble.code";
import breathingTypeCode from "./text/BreathingType/BreathingType.code";
import liquidCursorCode from "./text/LiquidCursor/LiquidCursor.code";
import threeDRotateCode from "./text/3DRotate/3DRotate.code";
import characterOrbitCode from "./text/CharacterOrbit/CharacterOrbit.code";
import chromaticSeparationCode from "./text/ChromaticSeparation/ChromaticSeparation.code";
import cursorDrawCode from "./text/CursorDraw/CursorDraw.code";
import deformFieldCode from "./text/DeformField/DeformField.code";
import echoTrailCode from "./text/EchoTrail/EchoTrail.code";
import glyphMorphCode from "./text/GlyphMorph/GlyphMorph.code";
import inkBleedCode from "./text/InkBleed/InkBleed.code";
import magneticRepulsionCode from "./text/MagneticRepulsion/MagneticRepulsion.code";
import portalTextCode from "./text/PortalText/PortalText.code";
import rollingBaselineCode from "./text/RollingBaseline/RollingBaseline.code";
import textExplosionCode from "./text/TextExplosion/TextExplosion.code";
import textFoldCode from "./text/TextFold/TextFold.code";
import textGravityFlipCode from "./text/TextGravityFlip/TextGravityFlip.code";
import textGravityWellCode from "./text/TextGravityWell/TextGravityWell.code";
import textMemoryTypeCode from "./text/TextMemoryType/TextMemoryType.code";
import textPortalCode from "./text/TextPortal/TextPortal.code";
import textSandCode from "./text/TextSand/TextSand.code";
import textStretchCode from "./text/TextStretch/TextStretch.code";
import textTumbleCode from "./text/TextTumble/TextTumble.code";
import textTunnelCode from "./text/TextTunnel/TextTunnel.code";
import typographyShutterCode from "./text/TypographyShutter/TypographyShutter.code";
import verticalCascadeCode from "./text/VerticalCascade/VerticalCascade.code";

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
import NeonPulseButton from "./buttons/NeonPulseButton";
import GhostFillButton from "./buttons/GhostFillButton";
import SlideArrowButton from "./buttons/SlideArrowButton";
import SuccessMorphButton from "./buttons/SuccessMorphButton";
import ElasticPopButton from "./buttons/ElasticPopButton";
import RippleClickButton from "./buttons/RippleClickButton";
import borderRevealButtonCode from "./buttons/BorderRevealButton.code";
import pixelDissolveButtonCode from "./buttons/PixelDissolveButton.code";
import liquidFillButtonCode from "./buttons/LiquidFillButton.code";
import magneticFieldButtonCode from "./buttons/MagneticFieldButton.code";
import glitchHoverButtonCode from "./buttons/GlitchHoverButton.code";
import splitExpandButtonCode from "./buttons/SplitExpandButton.code";
import particleBurstButtonCode from "./buttons/ParticleBurstButton.code";
import neonPulseButtonCode from "./buttons/NeonPulseButton.code";
import ghostFillButtonCode from "./buttons/GhostFillButton.code";
import slideArrowButtonCode from "./buttons/SlideArrowButton.code";
import successMorphButtonCode from "./buttons/SuccessMorphButton.code";
import elasticPopButtonCode from "./buttons/ElasticPopButton.code";
import rippleClickButtonCode from "./buttons/RippleClickButton.code";

export type AnimationEntry = {
  name: string;
  component: ComponentType<unknown>;
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
      "neon-pulse": {
        name: "Neon Pulse",
        component: NeonPulse,
        code: neonPulseCode,
      },
      "liquid-float": {
        name: "Liquid Float",
        component: LiquidFloat,
        code: liquidFloatCode,
      },
      "pixel-dissolve": {
        name: "Pixel Dissolve",
        component: PixelDissolve,
        code: pixelDissolveCode,
      },
      "cyber-decode": {
        name: "Cyber Decode",
        component: CyberDecode,
        code: cyberDecodeCode,
      },
      "elastic-bounce": {
        name: "Elastic Bounce",
        component: ElasticBounce,
        code: elasticBounceCode,
      },
      "hologram-flicker": {
        name: "Hologram Flicker",
        component: HologramFlicker,
        code: hologramFlickerCode,
      },
      "particle-assemble": {
        name: "Particle Assemble",
        component: ParticleAssemble,
        code: particleAssembleCode,
      },
      "breathing-type": {
        name: "Breathing Type",
        component: BreathingType,
        code: breathingTypeCode,
      },
      "liquid-cursor": {
        name: "Liquid Cursor",
        component: LiquidCursor,
        code: liquidCursorCode,
      },
      "3d-rotate": {
        name: "3D Rotate",
        component: ThreeDRotate,
        code: threeDRotateCode,
      },
      "character-orbit": {
        name: "Character Orbit",
        component: CharacterOrbit,
        code: characterOrbitCode,
      },
      "chromatic-separation": {
        name: "Chromatic Separation",
        component: ChromaticSeparation,
        code: chromaticSeparationCode,
      },
      "cursor-draw": {
        name: "Cursor Draw",
        component: CursorDraw,
        code: cursorDrawCode,
      },
      "deform-field": {
        name: "Deform Field",
        component: DeformField,
        code: deformFieldCode,
      },
      "echo-trail": {
        name: "Echo Trail",
        component: EchoTrail,
        code: echoTrailCode,
      },
      "glyph-morph": {
        name: "Glyph Morph",
        component: GlyphMorph,
        code: glyphMorphCode,
      },
      "ink-bleed": {
        name: "Ink Bleed",
        component: InkBleed,
        code: inkBleedCode,
      },
      "magnetic-repulsion": {
        name: "Magnetic Repulsion",
        component: MagneticRepulsion,
        code: magneticRepulsionCode,
      },
      "portal-text": {
        name: "Portal Text",
        component: PortalText,
        code: portalTextCode,
      },
      "rolling-baseline": {
        name: "Rolling Baseline",
        component: RollingBaseline,
        code: rollingBaselineCode,
      },
      "text-explosion": {
        name: "Text Explosion",
        component: TextExplosion,
        code: textExplosionCode,
      },
      "text-fold": {
        name: "Text Fold",
        component: TextFold,
        code: textFoldCode,
      },
      "text-gravity-flip": {
        name: "Text Gravity Flip",
        component: TextGravityFlip,
        code: textGravityFlipCode,
      },
      "text-gravity-well": {
        name: "Text Gravity Well",
        component: TextGravityWell,
        code: textGravityWellCode,
      },
      "text-memory-type": {
        name: "Text Memory Type",
        component: TextMemoryType,
        code: textMemoryTypeCode,
      },
      "text-portal": {
        name: "Text Portal",
        component: TextPortal,
        code: textPortalCode,
      },
      "text-sand": {
        name: "Text Sand",
        component: TextSand,
        code: textSandCode,
      },
      "text-stretch": {
        name: "Text Stretch",
        component: TextStretch,
        code: textStretchCode,
      },
      "text-tumble": {
        name: "Text Tumble",
        component: TextTumble,
        code: textTumbleCode,
      },
      "text-tunnel": {
        name: "Text Tunnel",
        component: TextTunnel,
        code: textTunnelCode,
      },
      "typography-shutter": {
        name: "Typography Shutter",
        component: TypographyShutter,
        code: typographyShutterCode,
      },
      "vertical-cascade": {
        name: "Vertical Cascade",
        component: VerticalCascade,
        code: verticalCascadeCode,
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
      "neon-pulse-button": {
        name: "Neon Pulse Button",
        component: NeonPulseButton,
        code: neonPulseButtonCode,
      },
      "ghost-fill-button": {
        name: "Ghost Fill Button",
        component: GhostFillButton,
        code: ghostFillButtonCode,
      },
      "slide-arrow-button": {
        name: "Slide Arrow Button",
        component: SlideArrowButton,
        code: slideArrowButtonCode,
      },
      "success-morph-button": {
        name: "Success Morph Button",
        component: SuccessMorphButton,
        code: successMorphButtonCode,
      },
      "elastic-pop-button": {
        name: "Elastic Pop Button",
        component: ElasticPopButton,
        code: elasticPopButtonCode,
      },
      "ripple-click-button": {
        name: "Ripple Click Button",
        component: RippleClickButton,
        code: rippleClickButtonCode,
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
