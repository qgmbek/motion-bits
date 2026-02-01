import BlurText from "./BlurText/BlurText";
import PerLetterBlur from "./PerLetterBlur/PerLetterBlur";
import WaveText from "./WaveText/WaveText";
import ElasticText from "./ElasticText/ElasticText";
import SplitReveal from "./SplitReveal/SplitReveal";
import Typewriter from "./Typewriter/Typewriter";
import OnHoverSwap from "./OnHoverSwap/OnHoverSwap";

import blurTextCode from "./BlurText/BlurText.code";
import perLetterBlurCode from "./PerLetterBlur/PerLetterBlur.code";
import waveTextCode from "./WaveText/WaveText.code";
import elasticTextCode from "./ElasticText/ElasticText.code";
import splitRevealCode from "./SplitReveal/SplitReveal.code";
import typewriterCode from "./Typewriter/Typewriter.code";
import onHoverSwapCode from "./OnHoverSwap/OnHoverSwap.code";

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
  "on-hover-swap": {
    component: OnHoverSwap,
    code: onHoverSwapCode,
    language: "jsx",
  },
};
