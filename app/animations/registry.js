import BlurText from "./BlurText/BlurText";
import PerLetterBlur from "./PerLetterBlur/PerLetterBlur";
import WaveText from "./WaveText/WaveText";
import ElasticText from "./ElasticText/ElasticText";
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
import StarWarsText from "./StarWarsText/StarWarsText";

import blurTextCode from "./BlurText/BlurText.code";
import perLetterBlurCode from "./PerLetterBlur/PerLetterBlur.code";
import waveTextCode from "./WaveText/WaveText.code";
import elasticTextCode from "./ElasticText/ElasticText.code";
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

export const ANIMATIONS_REGISTRY = {
  "blur-text": {
    component: BlurText,
    code: blurTextCode,
    language: "jsx",
  },
  "per-letter-blur": {
    component: PerLetterBlur,
    code: perLetterBlurCode,
    language: "jsx",
  },
  "split-reveal": {
    component: SplitReveal,
    code: splitRevealCode,
    language: "jsx",
  },
  "kinetic-reveal": {
    component: KineticReveal,
    code: kineticRevealCode,
    language: "jsx",
  },
  "narrative-text": {
    component: NarrativeText,
    code: narrativeText,
    language: "jsx",
  },
  "wave-text": {
    component: WaveText,
    code: waveTextCode,
    language: "jsx",
  },
  "elastic-text": {
    component: ElasticText,
    code: elasticTextCode,
    language: "jsx",
  },
  typewriter: {
    component: Typewriter,
    code: typewriterCode,
    language: "jsx",
  },
  "ascii-morph": {
    component: ASCIIMorph,
    code: asmiiMorphCode,
    language: "jsx",
  },
  "on-hover-swap": {
    component: OnHoverSwap,
    code: onHoverSwapCode,
    language: "jsx",
  },
  "breathing-text": {
    component: BreathingText,
    code: breathingTextCode,
    language: "jsx",
  },
  "soft-glow-pulse": {
    component: SoftGlowPulse,
    code: softGlowPulse,
    language: "jsx",
  },
  "gradient-flow": {
    component: GradientFlow,
    code: gradientFlow,
    language: "jsx",
  },
  "wednesday": {
    component: Wednesday,
    code: gradientFlow,   //// !!!!!!!!!!
    language: "jsx",
  },
  "glitch-stabilize": {
    component: GlitchStabilize,
    code: glitchStabilize,
    language: "jsx",
  },
  "starwars-text": {
    component: StarWarsText,
    code: glitchStabilize, /// !!!!
    language: "jsx",
  },
};
