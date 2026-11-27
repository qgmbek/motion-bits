const code = `"use client";

import { useEffect, useRef } from "react";
import "./CodeGrid.css";

const cardData = [{}, {}, {}, {}];

export default function CodeGrid() {
  const cardsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cardsContainer = cardsRef.current;
    if (!cardsContainer) return;

    // Helper to create a single dust particle
    const createDustParticle = (
      card: HTMLElement,
      mouseX: number,
      mouseY: number,
    ) => {
      const particle = document.createElement("span");

      // We want most particles near the mouse (Gaussian-ish), but some randomly everywhere.
      const isGlobal = Math.random() < 0.25; // 25% chance to appear anywhere on the card
      const rect = card.getBoundingClientRect();

      let startX, startY;

      if (isGlobal) {
        startX = Math.random() * rect.width;
        startY = Math.random() * rect.height;
      } else {
        // Localized "dust" dispersion (mostly within 40px of cursor)
        const dispersion = 40;
        startX = mouseX + (Math.random() - 0.5) * dispersion;
        startY = mouseY + (Math.random() - 0.5) * dispersion;
      }

      particle.style.position = "absolute";
      particle.style.left = \`\${startX}px\`;
      particle.style.top = \`\${startY}px\`;
      particle.style.width = \`\${Math.random() * 2 + 1}px\`; // Random size 1px-3px
      particle.style.height = particle.style.width;
      particle.style.backgroundColor = "rgba(100, 245, 255, 0.6)";
      particle.style.borderRadius = "50%";
      particle.style.pointerEvents = "none"; // Essential so it doesn't block mouse events
      particle.style.zIndex = "10";
      particle.style.boxShadow = "0 0 2px rgba(255, 255, 255, 0.4)";

      card.appendChild(particle);

      const destinationX = startX + (Math.random() - 0.5) * 50;
      const destinationY = startY - Math.random() * 80; // Tendency to float up

      const animation = particle.animate(
        [
          { transform: \`translate(0, 0)\`, opacity: Math.random() * 0.5 + 0.3 },
          {
            transform: \`translate(\${destinationX - startX}px, \${destinationY - startY}px)\`,
            opacity: 0,
          },
        ],
        {
          duration: Math.random() * 1000 + 1000, // Random duration
          easing: "ease-out",
        },
      );

      // Remove element from DOM immediately after animation finishes
      animation.onfinish = () => {
        particle.remove();
      };
    };

    const handleMouseMove = (e: MouseEvent) => {
      const cards = cardsContainer.querySelectorAll<HTMLDivElement>(".code-grid-card");

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // spotlight logic
        card.style.setProperty("--mouse-x", \`\${x}px\`);
        card.style.setProperty("--mouse-y", \`\${y}px\`);

        // Only spawn particles if the mouse is actually INSIDE this specific card
        const isHovering =
          x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;

        if (isHovering) {
          // Apply overflow hidden dynamically to ensure dust doesn't fly out of borders
          if (card.style.overflow !== "hidden") card.style.overflow = "hidden";

          // Spawn rate: only spawn occasionally to prevent lag, or multiple per frame for density.
          // Spawning 2 particles per move event creates a nice trail.
          createDustParticle(card, x, y);
          createDustParticle(card, x, y);
        }
      });
    };

    cardsContainer.addEventListener("mousemove", handleMouseMove);

    return () => {
      cardsContainer.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="code-grid" ref={cardsRef}>
      {cardData.map((_, index) => (
        <div className="code-grid-card" key={index}>
          <div className="code-grid-content" />
        </div>
      ))}
    </div>
  );
}
`;

export default code;

export const css = `.code-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  width: min(100%, 488px);
}

.code-grid-card {
  position: relative;
  height: min(220px, calc((100cqh - 3rem) / 2));
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.1);
}

.code-grid-card::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  opacity: 0;
  transition: opacity 300ms;
  background: radial-gradient(
    600px circle at var(--mouse-x) var(--mouse-y),
    rgba(0, 255, 255, 0.2),
    transparent 40%
  );
}

.code-grid:hover .code-grid-card::after { opacity: 1; }

.code-grid-content {
  position: absolute;
  inset: 1px;
  z-index: 2;
  border-radius: inherit;
  background-color: #060606;
}`;
