// Credits to Hyperplexed
// https://www.youtube.com/@Hyperplexed

"use client";

import "./ScrambleScreen.css";

export default function ScrambleScreen() {
  return (
    <div className="scramble-screen-wrapper">
      <div className="screen">
        <div className="screen-image" />
        <div className="screen-overlay" />
        <div className="screen-content"></div>
      </div>
    </div>
  );
}
