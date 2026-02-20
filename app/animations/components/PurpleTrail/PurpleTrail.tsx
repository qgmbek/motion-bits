import { useEffect, useRef } from "react";

type Point = {
  x: number;
  y: number;
  life: number;
};

export default function PurpleTrails() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    canvas.width = width;
    canvas.height = height;

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", resize);

    const mouse = { x: width / 2, y: height / 2 };
    const points: Point[] = [];

    const config = {
      trailLife: 0.6,
      starLife: 0.5,
      interpolation: 0.2,
    };

    const lastStarPos = { ...mouse };

    const addTrailPoint = (x: number, y: number) => {
      points.push({ x, y, life: config.trailLife });
    };

    const addStar = (x: number, y: number) => {
      points.push({ x, y, life: config.starLife });
    };

    const distance = (a: typeof mouse, b: typeof mouse) =>
      Math.hypot(b.x - a.x, b.y - a.y);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth interpolation
      lastStarPos.x += (mouse.x - lastStarPos.x) * config.interpolation;
      lastStarPos.y += (mouse.y - lastStarPos.y) * config.interpolation;

      addTrailPoint(lastStarPos.x, lastStarPos.y);

      if (distance(lastStarPos, mouse) < 5) {
        addStar(mouse.x, mouse.y);
      }

      for (let i = points.length - 1; i >= 0; i--) {
        const p = points[i];
        p.life -= 0.02;

        if (p.life <= 0) {
          points.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(239, 42, 201, ${p.life})`;
        ctx.shadowBlur = 20;
        ctx.shadowColor = "rgba(239, 42, 201, 0.8)";
        ctx.fill();
      }

      requestAnimationFrame(animate);
    };

    const handleMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    container.addEventListener("mousemove", handleMove);
    requestAnimationFrame(animate);

    return () => {
      container.removeEventListener("mousemove", handleMove);
      window.removeEventListener("resize", resize);
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
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
        }}
      />
    </div>
  );
}
