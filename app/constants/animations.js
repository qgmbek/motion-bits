import { Type, Square } from "lucide-react";

export const ANIMATIONS_DATA = {
  "text-animations": {
    title: "Text Animations",
    icon: <Type size={18} />,
    items: [
      { id: "blur-text", name: "Blur Text" },
      { id: "shiny-text", name: "Shiny Text" },
    ],
  },
  components: {
    title: "Components",
    icon: <Square size={18} />,
    items: [{ id: "dock", name: "MacOS Dock" }],
  },
};
