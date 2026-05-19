const code = `"use client";

import { useEffect, useRef } from "react";
import "./CodeGrid.css";

const cardData = [{}, {}, {}, {}];

export default function CodeGrid() {
  const cardsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cardsContainer = cardsRef.current;
    if (!cardsContainer) return;

    const createDustParticle = (
      card: HTMLElement,
      mouseX: number,
      mouseY: number,
    ) => {
      const particle = document.createElement("span");

      const isGlobal = Math.random() < 0.25;
      const rect = card.getBoundingClientRect();

      let startX, startY;

      if (isGlobal) {
        startX = Math.random() * rect.width;
        startY = Math.random() * rect.height;
      } else {
        const dispersion = 40;
        startX = mouseX + (Math.random() - 0.5) * dispersion;
        startY = mouseY + (Math.random() - 0.5) * dispersion;
      }

      particle.style.position = "absolute";
      particle.style.left = \`\${startX}px\`;
      particle.style.top = \`\${startY}px\`;
      particle.style.width = \`\${Math.random() * 2 + 1}px\`;
      particle.style.height = particle.style.width;
      particle.style.backgroundColor = "rgba(100, 245, 255, 0.6)";
      particle.style.borderRadius = "50%";
      particle.style.pointerEvents = "none";
      particle.style.zIndex = "10";
      particle.style.boxShadow = "0 0 2px rgba(255, 255, 255, 0.4)";

      card.appendChild(particle);

      const destinationX = startX + (Math.random() - 0.5) * 50;
      const destinationY = startY - Math.random() * 80;

      const animation = particle.animate(
        [
          { transform: \`translate(0, 0)\`, opacity: Math.random() * 0.5 + 0.3 },
          {
            transform: \`translate(\${destinationX - startX}px, \${destinationY - startY}px)\`,
            opacity: 0,
          },
        ],
        {
          duration: Math.random() * 1000 + 1000,
          easing: "ease-out",
        },
      );

      animation.onfinish = () => {
        particle.remove();
      };
    };

    const handleMouseMove = (e: MouseEvent) => {
      const cards = cardsContainer.querySelectorAll<HTMLDivElement>(".card");

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", \`\${x}px\`);
        card.style.setProperty("--mouse-y", \`\${y}px\`);

        const isHovering =
          x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;

        if (isHovering) {
          if (card.style.overflow !== "hidden")
            card.style.overflow = "hidden";

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
    <div>
      <div id="cards" ref={cardsRef}>
        {cardData.map((card, index) => (
          <div className="card" key={index}>
            <div className="card-content"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
`;

export default code;

export const css = `#cards {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  max-width: 500px;
}

#cards:hover > .card::after {
  opacity: 1;
}

.card {
  position: relative;
  height: 220px;
  width: 240px;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.1);
}

.card:hover::before {
  opacity: 1;
}

.card::before,
.card::after {
  content: "";
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  border-radius: inherit;
  opacity: 0;
  transition: opacity 300ms;
}

/* .card::before {
  background: radial-gradient(
    800px circle at var(--mouse-x) var(--mouse-y),
    rgba(0, 255, 255, 0.1),
    transparent 50%
  );
  z-index: 3;
} */

.card::after {
  background: radial-gradient(
    600px circle at var(--mouse-x) var(--mouse-y),
    rgba(0, 255, 255, 0.2),
    transparent 40%
  );
  z-index: 1;
}

.card > .card-content {
  position: absolute;
  background-color: #060606;
  border-radius: inherit;
  inset: 1px;
  z-index: 2;
}

@media (max-width: 1000px) {
  body {
    align-items: flex-start;
    overflow: auto;
  }

  #cards {
    max-width: 1000px;
    padding: 10px 0px;
  }

  .card {
    flex-shrink: 1;
    width: calc(50% - 4px);
  }
}

@media (max-width: 500px) {
  .card {
    height: 180px;
  }
}

@media (max-width: 320px) {
  .card {
    width: 100%;
  }
}`;
