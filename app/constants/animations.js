import { Type, Square } from 'lucide-react';

export const ANIMATIONS_DATA = {
  "text-animations": {
    title: "Text Animations",
    icon: <Type size={18} />,
    items: [
      { id: 'blur-text', name: 'Blur Text', description: 'Smooth blur-in effect.' },
      { id: 'shiny-text', name: 'Shiny Text', description: 'Metallic gradient sweep.' },
    ]
  },
  "components": {
    title: "Components",
    icon: <Square size={18} />,
    items: [
      { id: 'dock', name: 'MacOS Dock', description: 'Interactive dock magnification.' },
    ]
  }
};