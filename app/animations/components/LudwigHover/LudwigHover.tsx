// Hover effect by Hyperplexed: https://codepen.io/Hyperplexed/pen/poQmrEq
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
  const style = { "--ldh-art": `url("${image}")` } as CSSProperties;

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
