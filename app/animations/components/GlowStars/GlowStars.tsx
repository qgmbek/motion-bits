import { useEffect, useRef } from "react";

type Position = {
  x: number;
  y: number;
};

export default function GlowStars() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef<Position>({ x: 0, y: 0 });
  const renderRef = useRef<Position>({ x: 0, y: 0 });
  const lastRef = useRef<Position>({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const config = {
      starDuration: 600,
      glowDuration: 80, // slightly longer for smoother trail
      minDistance: 60,
      spacing: 6, // denser glow trail
      colors: ["249 146 253", "252 254 255"],
      sizes: ["1.2rem", "0.9rem", "0.6rem"],
      animations: ["fall-1", "fall-2", "fall-3"],
    };

    let animIndex = 0;

    const rand = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    const selectRandom = <T,>(arr: T[]): T => arr[rand(0, arr.length - 1)];

    const distance = (a: Position, b: Position) =>
      Math.hypot(b.x - a.x, b.y - a.y);

    const lerp = (start: number, end: number, amount: number) =>
      start + (end - start) * amount;

    const createStar = (pos: Position) => {
      const star = document.createElement("span");
      const color = selectRandom(config.colors);

      star.innerHTML = "✦";
      star.style.position = "absolute";
      star.style.left = `${pos.x}px`;
      star.style.top = `${pos.y}px`;
      star.style.fontSize = selectRandom(config.sizes);
      star.style.color = `rgb(${color})`;
      star.style.textShadow = `0 0 1rem rgb(${color} / 0.6)`;
      star.style.pointerEvents = "none";
      star.style.animationName =
        config.animations[animIndex++ % config.animations.length];
      star.style.animationDuration = `${config.starDuration}ms`;
      star.style.animationFillMode = "forwards";

      container.appendChild(star);
      setTimeout(() => star.remove(), config.starDuration);
    };

    const createGlowPoint = (pos: Position) => {
      const glow = document.createElement("div");

      glow.style.position = "absolute";
      glow.style.left = `${pos.x}px`;
      glow.style.top = `${pos.y}px`;
      glow.style.width = "5px";
      glow.style.height = "5px";
      glow.style.borderRadius = "50%";
      glow.style.background = "rgb(239 42 201)";
      glow.style.boxShadow = "0 0 12px 6px rgb(239 42 201)";
      glow.style.pointerEvents = "none";
      glow.style.opacity = "0.8";

      container.appendChild(glow);
      setTimeout(() => glow.remove(), config.glowDuration);
    };

    const createTrail = (from: Position, to: Position) => {
      const dist = distance(from, to);
      const quantity = Math.max(Math.floor(dist / config.spacing), 1);

      const dx = (to.x - from.x) / quantity;
      const dy = (to.y - from.y) / quantity;

      for (let i = 0; i < quantity; i++) {
        createGlowPoint({
          x: from.x + dx * i,
          y: from.y + dy * i,
        });
      }
    };

    const animate = () => {
      const target = mouseRef.current;
      const current = renderRef.current;

      // smooth follow
      current.x = lerp(current.x, target.x, 0.65);
      current.y = lerp(current.y, target.y, 0.65);

      createTrail(lastRef.current, current);

      if (distance(lastRef.current, current) > config.minDistance) {
        createStar(current);
        lastRef.current = { ...current };
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    const handleMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    container.addEventListener("mousemove", handleMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      container.removeEventListener("mousemove", handleMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    />
  );
}

// usage example
// import GlowStars from "./GlowStars";

// function App() {
//   return (
//     <>
//       <GlowStars />
//       <div>Your content here</div>
//     </>
//   );
// }
