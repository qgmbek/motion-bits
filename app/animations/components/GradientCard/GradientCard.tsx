// Credits to Hyperplexed
// https://www.youtube.com/@Hyperplexed

import "./GradientCard.css";

export default function GradientCard() {
  const subtitleText =
    "But in a much more real sense, I have no idea what I'm doing.";

  const words = subtitleText.split(" ");

  return (
    <div className="gc-wrapper">
      <div className="gc-card">
        <div className="gc-card-content">
          <h3 className="gc-card-title">I know exactly what Im doing</h3>

          <h4 className="gc-card-subtitle">
            {words.map((word, index) => (
              <span
                key={index}
                className="gc-card-subtitle-word"
                style={{
                  transitionDelay: `${index * 40}ms`,
                }}
              >
                {word}&nbsp;
              </span>
            ))}
          </h4>
        </div>
      </div>
    </div>
  );
}
