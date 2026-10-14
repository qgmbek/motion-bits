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
import PrismaticShift from "./text/PrismaticShift/PrismaticShift";
import TextSquish from "./text/TextSquish/TextSquish";
import RainbowFlow from "./text/RainbowFlow/RainbowFlow";
import TextWaveReveal from "./text/TextWaveReveal/TextWaveReveal";
import MagneticFlow from "./text/MagneticFlow/MagneticFlow";
import TextBreath from "./text/TextBreath/TextBreath";
import TextGlow from "./text/TextGlow/TextGlow";
import TextBounce from "./text/TextBounce/TextBounce";
import TextSlide from "./text/TextSlide/TextSlide";
import TextSpin from "./text/TextSpin/TextSpin";
import TextJitter from "./text/TextJitter/TextJitter";
import TextPulse from "./text/TextPulse/TextPulse";
import TextFloat from "./text/TextFloat/TextFloat";
import TextScatter from "./text/TextScatter/TextScatter";
import TextGlitch from "./text/TextGlitch/TextGlitch";
import TextRevealWave from "./text/TextRevealWave/TextRevealWave";

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
import prismaticShiftCode from "./text/PrismaticShift/PrismaticShift.code.js";
import textSquishCode from "./text/TextSquish/TextSquish.code.js";
import rainbowFlowCode from "./text/RainbowFlow/RainbowFlow.code.js";
import textWaveRevealCode from "./text/TextWaveReveal/TextWaveReveal.code.js";
import magneticFlowCode from "./text/MagneticFlow/MagneticFlow.code.js";
import textBreathCode from "./text/TextBreath/TextBreath.code.js";
import textGlowCode from "./text/TextGlow/TextGlow.code.js";
import textBounceCode from "./text/TextBounce/TextBounce.code.js";
import textSlideCode from "./text/TextSlide/TextSlide.code.js";
import textSpinCode from "./text/TextSpin/TextSpin.code.js";
import textJitterCode from "./text/TextJitter/TextJitter.code.js";
import textPulseCode from "./text/TextPulse/TextPulse.code.js";
import textFloatCode from "./text/TextFloat/TextFloat.code.js";
import textScatterCode from "./text/TextScatter/TextScatter.code.js";
import textGlitchCode from "./text/TextGlitch/TextGlitch.code.js";
import textRevealWaveCode from "./text/TextRevealWave/TextRevealWave.code.js";

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
import BottomSheet from "./components/BottomSheet/BottomSheet";
import CircleTransition from "./components/CircleTransition/CircleTransition";
import CommandPalette from "./components/CommandPalette/CommandPalette";
import CursorOriginTransition from "./components/CursorOriginTransition/CursorOriginTransition";
import CurtainTransition from "./components/CurtainTransition/CurtainTransition";
import ExpandableCard from "./components/ExpandableCard/ExpandableCard";
import FullscreenMenu from "./components/FullscreenMenu/FullscreenMenu";
import HorizontalGallery from "./components/HorizontalGallery/HorizontalGallery";
import ImageMaskReveal from "./components/ImageMaskReveal/ImageMaskReveal";
import ImageParallax from "./components/ImageParallax/ImageParallax";
import LiquidTransition from "./components/LiquidTransition/LiquidTransition";
import MagneticCard from "./components/MagneticCard/MagneticCard";
import MagneticNav from "./components/MagneticNav/MagneticNav";
import MorphMenu from "./components/MorphMenu/MorphMenu";
import PhysicsModal from "./components/PhysicsModal/PhysicsModal";
import SharedElementCard from "./components/SharedElementCard/SharedElementCard";
import SlidingIndicator from "./components/SlidingIndicator/SlidingIndicator";
import StackSpread from "./components/StackSpread/StackSpread";
import TiltCard from "./components/TiltCard/TiltCard";
import VelocityImage from "./components/VelocityImage/VelocityImage";
import VelocitySkew from "./components/VelocitySkew/VelocitySkew";
import VideoHoverPreview from "./components/VideoHoverPreview/VideoHoverPreview";
import AmbientBloom from "./components/AmbientBloom/AmbientBloom";
import AuroraBackground from "./components/AuroraBackground/AuroraBackground";
import HoverImageSwitchCard from "./components/HoverImageSwitchCard/HoverImageSwitchCard";

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
import bottomSheetCode from "./components/BottomSheet/BottomSheet.code";
import circleTransitionCode from "./components/CircleTransition/CircleTransition.code";
import commandPaletteCode from "./components/CommandPalette/CommandPalette.code";
import cursorOriginTransitionCode from "./components/CursorOriginTransition/CursorOriginTransition.code";
import curtainTransitionCode from "./components/CurtainTransition/CurtainTransition.code";
import expandableCardCode from "./components/ExpandableCard/ExpandableCard.code";
import fullscreenMenuCode from "./components/FullscreenMenu/FullscreenMenu.code";
import horizontalGalleryCode from "./components/HorizontalGallery/HorizontalGallery.code";
import imageMaskRevealCode from "./components/ImageMaskReveal/ImageMaskReveal.code";
import imageParallaxCode from "./components/ImageParallax/ImageParallax.code";
import liquidTransitionCode from "./components/LiquidTransition/LiquidTransition.code";
import magneticCardCode from "./components/MagneticCard/MagneticCard.code";
import magneticNavCode from "./components/MagneticNav/MagneticNav.code";
import morphMenuCode from "./components/MorphMenu/MorphMenu.code";
import physicsModalCode from "./components/PhysicsModal/PhysicsModal.code";
import sharedElementCardCode from "./components/SharedElementCard/SharedElementCard.code";
import slidingIndicatorCode from "./components/SlidingIndicator/SlidingIndicator.code";
import stackSpreadCode from "./components/StackSpread/StackSpread.code";
import tiltCardCode from "./components/TiltCard/TiltCard.code";
import velocityImageCode from "./components/VelocityImage/VelocityImage.code";
import velocitySkewCode from "./components/VelocitySkew/VelocitySkew.code";
import videoHoverPreviewCode from "./components/VideoHoverPreview/VideoHoverPreview.code";
import ambientBloomCode from "./components/AmbientBloom/AmbientBloom.code";
import auroraBackgroundCode from "./components/AuroraBackground/AuroraBackground.code";
import hoverImageSwitchCardCode from "./components/HoverImageSwitchCard/HoverImageSwitchCard.code";

import BorderRevealButton from "./buttons/BorderRevealButton/BorderRevealButton";
import PixelDissolveButton from "./buttons/PixelDissolveButton/PixelDissolveButton";
import LiquidFillButton from "./buttons/LiquidFillButton/LiquidFillButton";
import MagneticFieldButton from "./buttons/MagneticFieldButton/MagneticFieldButton";
import GlitchHoverButton from "./buttons/GlitchHoverButton/GlitchHoverButton";
import SplitExpandButton from "./buttons/SplitExpandButton/SplitExpandButton";
import ParticleBurstButton from "./buttons/ParticleBurstButton/ParticleBurstButton";
import NeonPulseButton from "./buttons/NeonPulseButton/NeonPulseButton";
import GhostFillButton from "./buttons/GhostFillButton/GhostFillButton";
import SlideArrowButton from "./buttons/SlideArrowButton/SlideArrowButton";
import SuccessMorphButton from "./buttons/SuccessMorphButton/SuccessMorphButton";
import ElasticPopButton from "./buttons/ElasticPopButton/ElasticPopButton";
import RippleClickButton from "./buttons/RippleClickButton/RippleClickButton";
import MorphShadeButton from "./buttons/MorphShadeButton/MorphShadeButton";
import TwistButton from "./buttons/TwistButton/TwistButton";
import ScaleSweepButton from "./buttons/ScaleSweepButton/ScaleSweepButton";
import PressGlowButton from "./buttons/PressGlowButton/PressGlowButton";
import SlideFillButton from "./buttons/SlideFillButton/SlideFillButton";
import borderRevealButtonCode from "./buttons/BorderRevealButton/BorderRevealButton.code";
import pixelDissolveButtonCode from "./buttons/PixelDissolveButton/PixelDissolveButton.code";
import liquidFillButtonCode from "./buttons/LiquidFillButton/LiquidFillButton.code";
import magneticFieldButtonCode from "./buttons/MagneticFieldButton/MagneticFieldButton.code";
import glitchHoverButtonCode from "./buttons/GlitchHoverButton/GlitchHoverButton.code";
import splitExpandButtonCode from "./buttons/SplitExpandButton/SplitExpandButton.code";
import particleBurstButtonCode from "./buttons/ParticleBurstButton/ParticleBurstButton.code";
import neonPulseButtonCode from "./buttons/NeonPulseButton/NeonPulseButton.code";
import ghostFillButtonCode from "./buttons/GhostFillButton/GhostFillButton.code";
import slideArrowButtonCode from "./buttons/SlideArrowButton/SlideArrowButton.code";
import successMorphButtonCode from "./buttons/SuccessMorphButton/SuccessMorphButton.code";
import elasticPopButtonCode from "./buttons/ElasticPopButton/ElasticPopButton.code";
import rippleClickButtonCode from "./buttons/RippleClickButton/RippleClickButton.code";
import morphShadeButtonCode from "./buttons/MorphShadeButton/MorphShadeButton.code.js";
import twistButtonCode from "./buttons/TwistButton/TwistButton.code.js";
import scaleSweepButtonCode from "./buttons/ScaleSweepButton/ScaleSweepButton.code.js";
import pressGlowButtonCode from "./buttons/PressGlowButton/PressGlowButton.code.js";
import slideFillButtonCode from "./buttons/SlideFillButton/SlideFillButton.code.js";

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
      "prismatic-shift": {
        name: "Prismatic Shift",
        component: PrismaticShift,
        code: prismaticShiftCode,
      },
      "text-squish": {
        name: "Text Squish",
        component: TextSquish,
        code: textSquishCode,
      },
      "rainbow-flow": {
        name: "Rainbow Flow",
        component: RainbowFlow,
        code: rainbowFlowCode,
      },
      "text-wave-reveal": {
        name: "Text Wave Reveal",
        component: TextWaveReveal,
        code: textWaveRevealCode,
      },
      "magnetic-flow": {
        name: "Magnetic Flow",
        component: MagneticFlow,
        code: magneticFlowCode,
      },
      "text-breath": {
        name: "Text Breath",
        component: TextBreath,
        code: textBreathCode,
      },
      "text-glow": {
        name: "Text Glow",
        component: TextGlow,
        code: textGlowCode,
      },
      "text-bounce": {
        name: "Text Bounce",
        component: TextBounce,
        code: textBounceCode,
      },
      "text-slide": {
        name: "Text Slide",
        component: TextSlide,
        code: textSlideCode,
      },
      "text-spin": {
        name: "Text Spin",
        component: TextSpin,
        code: textSpinCode,
      },
      "text-jitter": {
        name: "Text Jitter",
        component: TextJitter,
        code: textJitterCode,
      },
      "text-pulse": {
        name: "Text Pulse",
        component: TextPulse,
        code: textPulseCode,
      },
      "text-float": {
        name: "Text Float",
        component: TextFloat,
        code: textFloatCode,
      },
      "text-scatter": {
        name: "Text Scatter",
        component: TextScatter,
        code: textScatterCode,
      },
      "text-glitch": {
        name: "Text Glitch",
        component: TextGlitch,
        code: textGlitchCode,
      },
      "text-reveal-wave": {
        name: "Text Reveal Wave",
        component: TextRevealWave,
        code: textRevealWaveCode,
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
      "bottom-sheet": {
        name: "Bottom Sheet",
        component: BottomSheet,
        code: bottomSheetCode,
      },
      "circle-transition": {
        name: "Circle Transition",
        component: CircleTransition,
        code: circleTransitionCode,
      },
      "command-palette": {
        name: "Command Palette",
        component: CommandPalette,
        code: commandPaletteCode,
      },
      "cursor-origin-transition": {
        name: "Cursor Origin Transition",
        component: CursorOriginTransition,
        code: cursorOriginTransitionCode,
      },
      "curtain-transition": {
        name: "Curtain Transition",
        component: CurtainTransition,
        code: curtainTransitionCode,
      },
      "expandable-card": {
        name: "Expandable Card",
        component: ExpandableCard,
        code: expandableCardCode,
      },
      "fullscreen-menu": {
        name: "Fullscreen Menu",
        component: FullscreenMenu,
        code: fullscreenMenuCode,
      },
      "horizontal-gallery": {
        name: "Horizontal Gallery",
        component: HorizontalGallery,
        code: horizontalGalleryCode,
      },
      "image-mask-reveal": {
        name: "Image Mask Reveal",
        component: ImageMaskReveal,
        code: imageMaskRevealCode,
      },
      "image-parallax": {
        name: "Image Parallax",
        component: ImageParallax,
        code: imageParallaxCode,
      },
      "liquid-transition": {
        name: "Liquid Transition",
        component: LiquidTransition,
        code: liquidTransitionCode,
      },
      "magnetic-card": {
        name: "Magnetic Card",
        component: MagneticCard,
        code: magneticCardCode,
      },
      "magnetic-nav": {
        name: "Magnetic Nav",
        component: MagneticNav,
        code: magneticNavCode,
      },
      "morph-menu": {
        name: "Morph Menu",
        component: MorphMenu,
        code: morphMenuCode,
      },
      "physics-modal": {
        name: "Physics Modal",
        component: PhysicsModal,
        code: physicsModalCode,
      },
      "shared-element-card": {
        name: "Shared Element Card",
        component: SharedElementCard,
        code: sharedElementCardCode,
      },
      "sliding-indicator": {
        name: "Sliding Indicator",
        component: SlidingIndicator,
        code: slidingIndicatorCode,
      },
      "stack-spread": {
        name: "Stack Spread",
        component: StackSpread,
        code: stackSpreadCode,
      },
      "tilt-card": {
        name: "Tilt Card",
        component: TiltCard,
        code: tiltCardCode,
      },
      "velocity-image": {
        name: "Velocity Image",
        component: VelocityImage,
        code: velocityImageCode,
      },
      "velocity-skew": {
        name: "Velocity Skew",
        component: VelocitySkew,
        code: velocitySkewCode,
      },
      "video-hover-preview": {
        name: "Video Hover Preview",
        component: VideoHoverPreview,
        code: videoHoverPreviewCode,
      },
      "ambient-bloom": {
        name: "Ambient Bloom",
        component: AmbientBloom,
        code: ambientBloomCode,
      },
      "aurora-background": {
        name: "Aurora Background",
        component: AuroraBackground,
        code: auroraBackgroundCode,
      },
      "hover-image-switch-card": {
        name: "Hover Image Switch Card",
        component: HoverImageSwitchCard,
        code: hoverImageSwitchCardCode,
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
      "morph-shade-button": {
        name: "Morph Shade Button",
        component: MorphShadeButton,
        code: morphShadeButtonCode,
      },
      "twist-button": {
        name: "Twist Button",
        component: TwistButton,
        code: twistButtonCode,
      },
      "scale-sweep-button": {
        name: "Scale Sweep Button",
        component: ScaleSweepButton,
        code: scaleSweepButtonCode,
      },
      "press-glow-button": {
        name: "Press Glow Button",
        component: PressGlowButton,
        code: pressGlowButtonCode,
      },
      "slide-fill-button": {
        name: "Slide Fill Button",
        component: SlideFillButton,
        code: slideFillButtonCode,
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
