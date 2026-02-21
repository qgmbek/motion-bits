// Credits to Hyperplexed
// https://www.youtube.com/@Hyperplexed
"use client";

import "./LudwigHover.css";

type CardColor = "blue" | "green" | "brown";

interface CardData {
  color: CardColor;
  image: string;
}

const cards: CardData[] = [
  {
    color: "blue",
    image:
      "https://assets.codepen.io/1468070/game+cover+-+fall+guys.png?format=auto&quality=80",
  },
  {
    color: "green",
    image:
      "https://assets.codepen.io/1468070/game+cover+-+minecraft.png?format=auto&quality=80",
  },
  {
    color: "brown",
    image:
      "https://assets.codepen.io/1468070/game+cover+-+tetris.png?format=auto&quality=80",
  },
];

export default function LudwigHover() {
  return (
    <div className="ldh-wrapper">
      <div id="ldh-cards">
        {cards.map((card, index) => (
          <div key={index} className="ldh-card" data-color={card.color}>
            <img
              className="ldh-card-front-image ldh-card-image"
              src={card.image}
              alt=""
            />

            <div className="ldh-card-faders">
              {Array.from({ length: 8 }).map((_, i) => (
                <img
                  key={i}
                  className="ldh-card-fader ldh-card-image"
                  src={card.image}
                  alt=""
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
