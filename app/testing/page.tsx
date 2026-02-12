"use client";

import { useEffect, useRef } from "react";
import "./CodeGrid.css";

const cardData = [
  {
    icon: "fa-apartment",
    title: "Apartments",
    subtitle: "Places to be apart. Wait, what?",
  },
  {
    icon: "fa-unicorn",
    title: "Unicorns",
    subtitle: "A single corn. Er, I mean horn.",
  },
  {
    icon: "fa-blender-phone",
    title: "Blender Phones",
    subtitle: "These absolutely deserve to exist.",
  },
  {
    icon: "fa-person-to-portal",
    title: "Adios",
    subtitle: "See you...",
  },
  {
    icon: "fa-person-from-portal",
    title: "I mean hello",
    subtitle: "...over here.",
  },
  {
    icon: "fa-otter",
    title: "Otters",
    subtitle: "Look at me, imma cute lil fella.",
  },
];

export default function CodeGrid() {
  const cardsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cardsContainer = cardsRef.current;
    if (!cardsContainer) return;

    const handleMouseMove = (e: MouseEvent) => {
      const cards = cardsContainer.querySelectorAll<HTMLDivElement>(".card");

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
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
            <div className="card-content">
              <div className="card-image">
                <i className={`fa-duotone ${card.icon}`}></i>
              </div>
              <div className="card-info-wrapper">
                <div className="card-info">
                  <i className={`fa-duotone ${card.icon}`}></i>
                  <div className="card-info-title">
                    <h3>{card.title}</h3>
                    <h4>{card.subtitle}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
