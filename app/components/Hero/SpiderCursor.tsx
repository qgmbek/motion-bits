"use client";

import { useEffect, useRef, type RefObject } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

type SpiderCursorProps = {
  scopeRef?: RefObject<HTMLElement | null>;
  accent?: string;
  paused?: boolean;
  className?: string;
};

export function SpiderCursor({
  scopeRef,
  accent = "#d2cefa",
  paused = false,
  className,
}: SpiderCursorProps = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const settings = useRef({ accent, paused });
  const invalidate = useRef<(() => void) | null>(null);

  useEffect(() => {
    settings.current = { accent, paused };
    invalidate.current?.();
  }, [accent, paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const scope = scopeRef?.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");
    let width = 1;
    let height = 1;
    let frame = 0;
    let previous = 0;
    let visible = true;
    let cursorStrength = 0;
    let particles: Particle[] = [];
    const mouse = { x: 0, y: 0, active: false, quiet: false };
    const eased = { x: 0, y: 0 };
    const isQuietTarget = (target: EventTarget | null) =>
      target instanceof Element && !!target.closest(
        "a, button, input, textarea, select, [contenteditable], pre, code, h1, h2, h3, p, [data-cursor-quiet]",
      );

    const resize = () => {
      const bounds = scope?.getBoundingClientRect();
      width = bounds?.width || window.innerWidth;
      height = bounds?.height || window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = Math.min(85, Math.max(32, Math.round(width * height / 13000)));
      particles = Array.from({ length: count }, (_, index) => ({
        x: ((Math.sin(index * 127.1 + 1) * 43758.5453) % 1 + 1) % 1 * width,
        y: ((Math.sin(index * 311.7 + 2) * 17381.287) % 1 + 1) % 1 * height,
        vx: Math.sin(index * 1.7) * 0.12,
        vy: Math.cos(index * 2.3) * 0.1,
        radius: index % 7 === 0 ? 1.5 : 0.75,
      }));
      requestDraw();
    };

    const draw = (now: number) => {
      frame = 0;
      ctx.clearRect(0, 0, width, height);
      if (!visible || document.hidden || !finePointer.matches || reducedMotion.matches) {
        previous = 0;
        return;
      }
      const config = settings.current;
      const step = previous ? Math.min((now - previous) / 16.67, 2) : 1;
      previous = now;
      const ease = 1 - Math.pow(0.84, step);
      const active = mouse.active && !config.paused;
      cursorStrength += ((active ? (mouse.quiet ? 0.13 : 1) : 0) - cursorStrength) * ease;
      eased.x += (mouse.x - eased.x) * ease;
      eased.y += (mouse.y - eased.y) * ease;
      const rgb = config.accent.slice(1).match(/.{2}/g)?.map((part) => parseInt(part, 16)).join(",") || "210,206,250";
      const reach = Math.min(210, width * 0.25);
      const nearby: { particle: Particle; distance: number }[] = [];

      particles.forEach((particle, index) => {
        if (!config.paused) {
          particle.x += particle.vx * step;
          particle.y += particle.vy * step;
          if (particle.x < 0 || particle.x > width) particle.vx *= -1;
          if (particle.y < 0 || particle.y > height) particle.vy *= -1;
        }
        const distance = Math.hypot(eased.x - particle.x, eased.y - particle.y);
        const proximity = Math.max(0, 1 - distance / reach) * cursorStrength;
        // Leave the headline readable; the open art area holds most of the web.
        const quietArea = scope && particle.x < width * 0.48 && particle.y < height * 0.8 ? 0.32 : 1;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius + proximity * 1.1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},${(0.12 + proximity * 0.65) * quietArea})`;
        ctx.fill();
        if (distance < reach && cursorStrength > 0.01) nearby.push({ particle, distance });

        for (let j = index + 1; j < particles.length; j++) {
          const other = particles[j];
          const length = Math.hypot(particle.x - other.x, particle.y - other.y);
          if (length > 115) continue;
          const alpha = (1 - length / 115) * (0.035 + proximity * 0.24) * quietArea;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = `rgba(${rgb},${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      });

      if (cursorStrength > 0.01) {
        nearby.sort((a, b) => a.distance - b.distance).slice(0, 8).forEach(({ particle, distance }) => {
          const strength = (1 - distance / reach) * cursorStrength;
          const gradient = ctx.createLinearGradient(eased.x, eased.y, particle.x, particle.y);
          gradient.addColorStop(0, `rgba(${rgb},${strength * 0.55})`);
          gradient.addColorStop(1, `rgba(${rgb},${strength * 0.12})`);
          ctx.beginPath();
          ctx.moveTo(eased.x, eased.y);
          ctx.lineTo(particle.x, particle.y);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        });
        ctx.beginPath();
        ctx.arc(eased.x, eased.y, 3, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${rgb},${cursorStrength * 0.7})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      if (!config.paused || cursorStrength > 0.01) frame = requestAnimationFrame(draw);
    };

    function requestDraw() {
      if (!frame && visible && !document.hidden) frame = requestAnimationFrame(draw);
    }
    invalidate.current = requestDraw;
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
      const bounds = scope?.getBoundingClientRect();
      const x = event.clientX - (bounds?.left || 0);
      const y = event.clientY - (bounds?.top || 0);
      const inside = x >= 0 && x <= width && y >= 0 && y <= height;
      if (!mouse.active && inside) { eased.x = x; eased.y = y; }
      mouse.x = x;
      mouse.y = y;
      mouse.active = inside;
      mouse.quiet = isQuietTarget(event.target);
      requestDraw();
    };
    const leave = () => { mouse.active = false; };
    const scroll = () => {
      if (scope) {
        mouse.active = false;
      } else if (mouse.active) {
        // The global web stays with the pointer as new sections scroll underneath.
        mouse.quiet = isQuietTarget(document.elementFromPoint(mouse.x, mouse.y));
      }
      requestDraw();
    };
    const visibility = () => { previous = 0; mouse.active = false; requestDraw(); };
    const resizeObserver = new ResizeObserver(resize);
    if (scope) resizeObserver.observe(scope);
    else window.addEventListener("resize", resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      previous = 0;
      if (visible) requestDraw();
    });
    intersectionObserver.observe(scope || canvas);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("blur", leave);
    window.addEventListener("scroll", scroll, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", visibility);
    reducedMotion.addEventListener("change", requestDraw);
    finePointer.addEventListener("change", requestDraw);
    resize();

    return () => {
      cancelAnimationFrame(frame);
      invalidate.current = null;
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("blur", leave);
      window.removeEventListener("scroll", scroll);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", visibility);
      reducedMotion.removeEventListener("change", requestDraw);
      finePointer.removeEventListener("change", requestDraw);
    };
  }, [scopeRef]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{ position: scopeRef ? "absolute" : "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: scopeRef ? 3 : 9999 }}
    />
  );
}
