import { Type, Square } from "lucide-react";

export const ANIMATIONS_DATA = {
  "text-animations": {
    title: "Text Animations",
    icon: <Type size={18} />,
    items: [
      { id: "blur-text", name: "Blur Text" },
      { id: "per-letter-blur", name: "Per Letter Blur" },
      { id: "split-reveal", name: "Split Reveal" },
      { id: "kinetic-reveal", name: "Kinetic Reveal" },
      { id: "narrative-text", name: "Narrative Text" },
      { id: "wave-text", name: "Wave Text" },
      { id: "elastic-text", name: "Elastic Text" },
      { id: "gravity-drop", name: "Gravity Drop" },
      { id: "typewriter", name: "Typewriter" },
      { id: "counter", name: "Counter" },
      { id: "ascii-morph", name: "ASCII Morph" },
      { id: "on-hover-swap", name: "On Hover Swap" },
      { id: "per-letter-hover", name: "Per Letter Hover" },
      { id: "per-word-hover", name: "Per Word Hover" },
      { id: "breathing-text", name: "Breathing Text" },
      { id: "soft-glow-pulse", name: "Soft Glow Pulse" },
      { id: "gradient-flow", name: "Gradient Flow" },
      { id: "wednesday", name: "Wednesday" },
      { id: "glitch-stabilize", name: "Glitch Stabilize" },
      { id: "starwars-text", name: "Star Wars Text" },
    ],
  },
  components: {
    title: "Components",
    icon: <Square size={18} />,
    items: [{ id: "dock", name: "MacOS Dock" }],
  },
};
