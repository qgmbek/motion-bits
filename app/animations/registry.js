import BlurText from "./BlurText/BlurText";
import PerLetterBlur from "./PerLetterBlur/PerLetterBlur"
import WaveText from "./WaveText/WaveText";
import ElasticText from "./ElasticText/ElasticText";

import blurTextCode from "./BlurText/BlurText.code";
import perLetterBlur from "./PerLetterBlur/PerLetterBlur.code"
import waveTextCode from "./WaveText/WaveText.code";
import elasticTextCode from "./ElasticText/ElasticText.code";

export const ANIMATIONS_REGISTRY = {
  "blur-text": {
    component: BlurText,
    code: blurTextCode,
    language: "jsx",
  },
  "per-letter-blur": {
    component: PerLetterBlur,
    code: perLetterBlur,
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
};
