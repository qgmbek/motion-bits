// Credits to Hyperplexed
// https://www.youtube.com/@Hyperplexed

import { useMemo } from "react";
import "./GradientCard.css";

export default function GradientCard() {
  const subtitleText =
    "But in a much more real sense, I have no idea what I'm doing.";

  const words = useMemo(() => {
    return subtitleText.split(" ");
  }, [subtitleText]);

  return (
    <div className="card-wrapper">
      <div className="card">
        <div className="card-content">
          <h3 className="card-title">I know exactly what Im doing</h3>

          <h4 className="card-subtitle">
            {words.map((word, index) => (
              <span
                key={index}
                className="card-subtitle-word"
                style={{
                  transitionDelay: `${index * 40}ms`,
                }}
              >
                {word + " "}
              </span>
            ))}
          </h4>
        </div>

        <i className="fa-solid fa-hat-witch card-icon" />
      </div>
    </div>
  );
}
