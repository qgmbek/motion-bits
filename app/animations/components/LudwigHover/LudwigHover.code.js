const code = `// Hover effect by Hyperplexed: https://codepen.io/Hyperplexed/pen/poQmrEq
// Cover images are served by the Xbox Store.
"use client";

import { useState, type CSSProperties } from "react";
import "./LudwigHover.css";

type CardColor = "blue" | "green" | "brown";

interface CardData {
  color: CardColor;
  title: string;
  image: string;
}

const cards: CardData[] = [
  {
    color: "blue",
    title: "Fall Guys",
    image:
      "https://store-images.s-microsoft.com/image/apps.9916.14285042010965430.749d90f0-b4ea-409c-9c82-00ed83f65c96.96222148-9510-4dad-9cda-0570627fd146?q=90&w=540&h=810",
  },
  {
    color: "green",
    title: "Minecraft",
    image:
      "https://store-images.s-microsoft.com/image/apps.53095.13850085746326678.06e2dc5c-7997-46e9-a8e6-0e48b57cb13b.419e3c9d-9dd3-4a28-a9f3-a12350215871?q=90&w=540&h=810",
  },
  {
    color: "brown",
    title: "Tetris Effect: Connected",
    image:
      "https://store-images.s-microsoft.com/image/apps.60188.14331659527374482.41811e97-d335-41b1-beac-d5e74757cfb5.f18ff676-c837-4ff8-9ed6-78ad14d6d683?q=90&w=540&h=810",
  },
];

function CoverCard({ color, title, image, embedded }: CardData & { embedded: boolean }) {
  const [unavailable, setUnavailable] = useState(false);
  const style = { "--ldh-art": \`url("\${image}")\` } as CSSProperties;

  return (
    <div className="ldh-card" data-color={color} style={style} tabIndex={embedded ? undefined : 0}>
      <div className="ldh-card-front-image">
        {unavailable ? (
          <span className="ldh-card-image ldh-cover-fallback">{title}</span>
        ) : (
          <img className="ldh-card-image" src={image} width={540} height={810} alt={title} onError={() => setUnavailable(true)} />
        )}
      </div>
      {!unavailable && (
        <div className="ldh-card-faders" aria-hidden="true">
          {Array.from({ length: 8 }, (_, index) => <div key={index} className="ldh-card-fader" />)}
        </div>
      )}
    </div>
  );
}

export default function LudwigHover({ playing }: { playing?: boolean } = {}) {
  return (
    <div className="ldh-wrapper" data-playing={playing || undefined}>
      <div className="ldh-cards">
        {cards.map((card) => <CoverCard key={card.image} {...card} embedded={playing !== undefined} />)}
      </div>
    </div>
  );
}
`;

export default code;

export const css = `.ldh-wrapper {
  width: 100%;
  container-type: inline-size;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ldh-cards {
  --card-width: min(13.5rem, max(0px, calc((100cqh - 3rem) * 2 / 3)));
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, var(--card-width)));
  justify-content: center;
  gap: clamp(.75rem, 5.5cqi, 3.25rem);
  padding-inline: clamp(.625rem, 6cqi, 3.75rem);
}

.ldh-card {
  --cover: 83 175 242;
  --corner: clamp(.375rem, 1.15cqi, .75rem);
  position: relative;
  cursor: pointer;
  transition: scale 100ms;
}

.ldh-card[data-color="green"] { --cover: 118 178 83; }
.ldh-card[data-color="brown"] { --cover: 174 111 244; }

.ldh-card:is(:hover, :focus-visible) { z-index: 1; }
.ldh-card:focus-visible { outline: 2px solid rgb(var(--cover)); outline-offset: 4px; border-radius: var(--corner); }

.ldh-card:active {
  scale: 0.98;
}

.ldh-card-image {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 2 / 3;
  border-radius: var(--corner);
  object-fit: cover;
}

.ldh-cover-fallback {
  display: grid;
  place-items: center;
  padding: .4rem;
  background: linear-gradient(145deg, rgb(var(--cover) / 40%), #14151a);
  color: #fff;
  font: 700 clamp(10px, 3cqi, 19px) / 1.15 system-ui, sans-serif;
  overflow-wrap: anywhere;
}

.ldh-card-front-image {
  position: relative;
  z-index: 2;
  border-radius: var(--corner);
  box-shadow: 0 .9rem 1.6rem -.9rem #000, 0 0 0 1px rgb(255 255 255 / 14%);
  transition: transform 220ms ease, box-shadow 220ms ease;
}

.ldh-card:is(:hover, :focus-visible) .ldh-card-front-image {
  transform: translateY(-.25rem);
  box-shadow: 0 1rem 2rem -.85rem rgb(var(--cover) / 40%), 0 0 0 1px rgb(var(--cover) / 60%);
}

.ldh-card-faders {
  position: absolute;
  inset: 0;
  z-index: 1;
  opacity: 0;
  transition: opacity 1500ms;
  pointer-events: none;
}

.ldh-card:is(:hover, :focus-visible) .ldh-card-faders {
  opacity: 1;
}

.ldh-wrapper[data-playing="true"] .ldh-card:nth-child(2) .ldh-card-faders {
  animation: ldh-preview-trails 2s ease;
}

@keyframes ldh-preview-trails {
  0%, 100% { opacity: 0; }
  22%, 65% { opacity: 1; }
}

.ldh-card-fader {
  position: absolute;
  inset: 0;
  border-radius: var(--corner);
  background: var(--ldh-art) center / cover no-repeat;
}

.ldh-card-fader:nth-child(odd) {
  animation: ldh-fade-left 3s linear infinite;
}

.ldh-card-fader:nth-child(even) {
  animation: ldh-fade-right 3s linear infinite;
}

.ldh-card-fader:is(:nth-child(3), :nth-child(4)) {
  animation-delay: 750ms;
}

.ldh-card-fader:is(:nth-child(5), :nth-child(6)) {
  animation-delay: 1500ms;
}

.ldh-card-fader:is(:nth-child(7), :nth-child(8)) {
  animation-delay: 2250ms;
}

@keyframes ldh-fade-left {
  from {
    scale: 1;
    translate: 0%;
    opacity: 1;
  }
  to {
    scale: 0.8;
    translate: -30%;
    opacity: 0;
  }
}

@keyframes ldh-fade-right {
  from {
    scale: 1;
    translate: 0%;
    opacity: 1;
  }
  to {
    scale: 0.8;
    translate: 30%;
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ldh-card-faders { display: none; }
  .ldh-card-front-image { transition: none; }
}`;
