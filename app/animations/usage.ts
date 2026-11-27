import type { AnimationSlug } from "./registry";

type UsageExample = {
  fileName: string;
  code: string;
};

function example(
  componentName: string,
  jsx = `<${componentName} />`,
  options: { imports?: string; setup?: string } = {},
): UsageExample {
  const indent = (source: string, spaces: number) =>
    source.split("\n").map((line) => `${" ".repeat(spaces)}${line}`).join("\n");

  return {
    fileName: `${componentName}.tsx`,
    code: `"use client";

${options.imports ? `${options.imports}\n` : ""}import ${componentName} from "./${componentName}";

export default function Example() {
${options.setup ? `${indent(options.setup, 2)}\n\n` : ""}  return (
${indent(jsx, 4)}
  );
}`,
  };
}

function textExample(componentName: string, text = "Make something move.", props = "") {
  return example(componentName, `<${componentName}${props ? ` ${props}` : ""}>${text}</${componentName}>`);
}

function imageExample(componentName: string) {
  return example(componentName, `<${componentName}
  src="https://images.unsplash.com/photo-1515266591878-f93e32bc5937?auto=format&fit=crop&w=1000&q=80"
  alt="Modern architecture"
/>`);
}

// Keep examples explicit so they match the props in the copyable component source.
export const ANIMATION_USAGE: Record<AnimationSlug, UsageExample> = {
  "blur-text": textExample("BlurText"),
  "per-letter-blur": textExample("PerLetterBlur"),
  "split-reveal": textExample("SplitReveal"),
  "kinetic-reveal": textExample("KineticReveal"),
  "narrative-text": textExample("NarrativeText", "Every great story starts with a little motion."),
  "wave-text": textExample("WaveText"),
  "elastic-text": textExample("ElasticText"),
  "gravity-drop": textExample("GravityDrop"),
  typewriter: example("Typewriter", '<Typewriter array={["Design", "Build", "Create"]} />'),
  counter: example("Counter", "<Counter value={250} />"),
  "ascii-morph": textExample("ASCIIMorph"),
  "data-stream-decode": textExample("DataStreamDecode"),
  "blueprint-wireframe": textExample("BlueprintWireframe"),
  "led-text": textExample("LedText"),
  "scanline-reveal": textExample("ScanlineReveal"),
  "on-hover-swap": textExample("OnHoverSwap", "Hover over me|Hello there"),
  "per-letter-hover": textExample("PerLetterHover"),
  "per-word-hover": textExample("PerWordHover"),
  "soft-glow-pulse": textExample("SoftGlowPulse"),
  "gradient-flow": example("GradientFlow", '<GradientFlow text="Follow the flow" speed={6} direction="right" />'),
  wednesday: textExample("Wednesday"),
  severance: textExample("Severance", "SEVERANCE"),
  "glitch-stabilize": textExample("GlitchStabilize"),
  "distored-text": textExample("DistortedText"),
  "word-morph": example("WordMorph", "<WordMorph />", {
    setup: "// Edit WORDS in WordMorph.tsx to change the sequence.",
  }),
  reveal: example("Reveal", '<Reveal text="Bring your next idea to life with motion." />'),
  "positional-reveal": textExample("PositionalReveal", "Bring your next idea to life with motion."),
  "clip-path-reveal": textExample("ClipPathReveal"),
  "shimmer-text": textExample("ShimmerText"),
  "magnetic-letters": textExample("MagneticLetters"),
  "neon-pulse": textExample("NeonPulse", "Stay bright", 'color="#00ffff"'),
  "liquid-float": textExample("LiquidFloat"),
  "pixel-dissolve": textExample("PixelDissolve", "Pixel perfect", "pixelSize={8}"),
  "cyber-decode": textExample("CyberDecode", "Access granted", "speed={50}"),
  "elastic-bounce": textExample("ElasticBounce"),
  "hologram-flicker": textExample("HologramFlicker", "Hello, future", 'color="#00bfff"'),
  "particle-assemble": textExample("ParticleAssemble"),
  "breathing-type": textExample("BreathingType", "Take a breath", "typeSpeed={100}"),
  "liquid-cursor": textExample("LiquidCursor", "Go with the flow", "viscosity={0.15}"),
  "3d-rotate": textExample("ThreeDRotate", "A new perspective", "perspective={1000}"),
  "character-orbit": textExample("CharacterOrbit"),
  "chromatic-separation": textExample("ChromaticSeparation"),
  "cursor-draw": textExample("CursorDraw"),
  "deform-field": textExample("DeformField"),
  "echo-trail": textExample("EchoTrail"),
  "glyph-morph": example("GlyphMorph", '<GlyphMorph from="A" to="B" />'),
  "ink-bleed": textExample("InkBleed"),
  "magnetic-repulsion": textExample("MagneticRepulsion"),
  "portal-text": textExample("PortalText"),
  "rolling-baseline": textExample("RollingBaseline"),
  "text-explosion": textExample("TextExplosion"),
  "text-fold": textExample("TextFold"),
  "text-gravity-flip": textExample("TextGravityFlip"),
  "text-gravity-well": textExample("TextGravityWell"),
  "text-memory-type": textExample("TextMemoryType"),
  "text-portal": textExample("TextPortal"),
  "text-sand": textExample("TextSand"),
  "text-stretch": textExample("TextStretch"),
  "text-tumble": textExample("TextTumble"),
  "text-tunnel": textExample("TextTunnel"),
  "typography-shutter": textExample("TypographyShutter"),
  "vertical-cascade": textExample("VerticalCascade"),
  "prismatic-shift": textExample("PrismaticShift"),
  "text-squish": textExample("TextSquish"),
  "rainbow-flow": textExample("RainbowFlow"),
  "text-wave-reveal": textExample("TextWaveReveal"),
  "magnetic-flow": textExample("MagneticFlow"),
  "text-breath": textExample("TextBreath"),
  "text-glow": textExample("TextGlow", "Let it glow", 'color="#00ff88"'),
  "text-bounce": textExample("TextBounce"),
  "text-slide": textExample("TextSlide"),
  "text-spin": textExample("TextSpin"),
  "text-jitter": textExample("TextJitter"),
  "text-pulse": textExample("TextPulse", "Feel the rhythm", 'color="#ff6b6b"'),
  "text-float": textExample("TextFloat"),
  "text-scatter": textExample("TextScatter"),
  "text-glitch": textExample("TextGlitch"),
  "text-reveal-wave": textExample("TextRevealWave"),

  "code-grid": example("CodeGrid"),
  "border-shard": example("BorderShard"),
  "gradient-border": example("GradientBorder"),
  "gradient-card": example("GradientCard"),
  "scramble-screen": example("ScrambleScreen"),
  "ludwig-hover": example("LudwigHover"),
  "glow-stars": example("GlowStars"),
  "purple-trails": example("PurpleTrails"),
  "spotlight-card": example("SpotlightCard"),
  "flip-card": example("FlipCard"),
  "marquee-strip": example("MarqueeStrip"),
  "ripple-surface": example("RippleSurface"),
  "pulse-ring": example("PulseRing"),
  "floating-label": example("FloatingLabel"),
  "bottom-sheet": example("BottomSheet"),
  "circle-transition": example("CircleTransition"),
  "command-palette": example("CommandPalette"),
  "cursor-origin-transition": example("CursorOriginTransition"),
  "curtain-transition": example("CurtainTransition"),
  "expandable-card": example("ExpandableCard", `<ExpandableCard title="Project details">
  <p>Click the card to reveal more about your project.</p>
</ExpandableCard>`),
  "fullscreen-menu": example("FullscreenMenu"),
  "horizontal-gallery": example("HorizontalGallery", `<div
  ref={scrollContainer}
  style={{ height: 500, overflowY: "auto", containerType: "size" }}
>
  <HorizontalGallery
    items={["Design", "Build", "Launch", "Repeat"]}
    scrollContainer={scrollContainer}
  />
</div>`, {
    imports: 'import { useRef } from "react";',
    setup: "const scrollContainer = useRef<HTMLDivElement>(null);",
  }),
  "image-mask-reveal": imageExample("ImageMaskReveal"),
  "image-parallax": imageExample("ImageParallax"),
  "liquid-transition": example("LiquidTransition"),
  "magnetic-card": example("MagneticCard", `<MagneticCard>
  <h2>Move a little closer</h2>
  <p>This card follows your cursor.</p>
</MagneticCard>`),
  "magnetic-nav": example("MagneticNav", `<MagneticNav
  items={[
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ]}
/>`),
  "morph-menu": example("MorphMenu"),
  "physics-modal": example("PhysicsModal"),
  "shared-element-card": example("SharedElementCard", `<SharedElementCard title="Explore the project">
  <p>The card expands into a detailed view.</p>
</SharedElementCard>`),
  "sliding-indicator": example("SlidingIndicator", '<SlidingIndicator items={["Overview", "Features", "Pricing"]} />'),
  "stack-spread": example("StackSpread", '<StackSpread items={["Design", "Develop", "Deliver"]} />'),
  "tilt-card": example("TiltCard", `<TiltCard>
  <h2>A fresh perspective</h2>
  <p>Hover to tilt the card.</p>
</TiltCard>`),
  "velocity-image": imageExample("VelocityImage"),
  "velocity-skew": example("VelocitySkew", `<VelocitySkew>
  <h2>Keep scrolling</h2>
</VelocitySkew>`),
  "video-hover-preview": example("VideoHoverPreview", `<VideoHoverPreview
  src="https://mdn.github.io/shared-assets/videos/flower.mp4"
  poster="https://mdn.github.io/shared-assets/images/examples/flowers.jpg"
/>`),
  "ambient-bloom": example("AmbientBloom"),
  "aurora-background": example("AuroraBackground"),
  "hover-image-switch-card": example("HoverImageSwitchCard"),

  "border-reveal-button": example("BorderRevealButton"),
  "pixel-dissolve-button": example("PixelDissolveButton"),
  "liquid-fill-button": example("LiquidFillButton"),
  "magnetic-field-button": example("MagneticFieldButton"),
  "glitch-hover-button": example("GlitchHoverButton"),
  "split-expand-button": example("SplitExpandButton"),
  "particle-burst-button": example("ParticleBurstButton"),
  "neon-pulse-button": example("NeonPulseButton"),
  "ghost-fill-button": example("GhostFillButton"),
  "slide-arrow-button": example("SlideArrowButton"),
  "success-morph-button": example("SuccessMorphButton"),
  "elastic-pop-button": example("ElasticPopButton"),
  "ripple-click-button": example("RippleClickButton"),
  "morph-shade-button": example("MorphShadeButton"),
  "twist-button": example("TwistButton"),
  "scale-sweep-button": example("ScaleSweepButton"),
  "press-glow-button": example("PressGlowButton"),
  "slide-fill-button": example("SlideFillButton"),
};
