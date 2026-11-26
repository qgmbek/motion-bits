"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  visibility: number;
}

const pointerReach = 146;
const threadReach = 102;
const ink = "178, 177, 174";
const thread = "197, 201, 207";

export function SpiderCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const preference = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const quietRegions = Array.from(document.querySelectorAll<HTMLElement>("[data-cursor-quiet]"));
    const particles: Particle[] = [];
    let quietBounds: DOMRect[] = [];
    let boundsDirty = true;
    let frame = 0;
    let previousTime: number | null = null;
    let width = 0;
    let height = 0;

    const mouse: { x: number | null; y: number | null } = { x: null, y: null };
    const eased = { x: 0, y: 0 };

    const invalidateBounds = () => { boundsDirty = true; };
    const resize = () => {
      const nextWidth = window.innerWidth;
      const nextHeight = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(nextWidth * ratio);
      canvas.height = Math.round(nextHeight * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      if (width && height) {
        for (const particle of particles) {
          particle.x *= nextWidth / width;
          particle.y *= nextHeight / height;
        }
      }
      width = nextWidth;
      height = nextHeight;
      const count = Math.max(49, Math.min(98, Math.round(width * height / 19700)));
      if (particles.length > count) particles.length = count;
      while (particles.length < count) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * .62,
          vy: (Math.random() - 0.5) * .62,
          radius: .9 + Math.random() * .55,
          visibility: 1,
        });
      }
      invalidateBounds();
    };

    const visibilityAt = (x: number, y: number) => {
      let visibility = 1;
      for (const bounds of quietBounds) {
        const inside = Math.min(x - bounds.left, bounds.right - x, y - bounds.top, bounds.bottom - y);
        const strength = Math.max(0, Math.min(1, (inside + 22) / 65));
        visibility = Math.min(visibility, 1 - .58 * strength);
      }
      return visibility;
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (mouse.x === null || mouse.y === null) {
        eased.x = event.clientX;
        eased.y = event.clientY;
      }
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const clearPointer = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleMouseOut = (event: MouseEvent) => {
      if (event.relatedTarget === null) clearPointer();
    };

    const draw = (now: number) => {
      const delta = previousTime === null ? 1000 / 60 : Math.min(now - previousTime, 32);
      previousTime = now;
      const step = delta / (1000 / 60);
      ctx.clearRect(0, 0, width, height);

      if (boundsDirty) {
        quietBounds = quietRegions.map((region) => region.getBoundingClientRect());
        boundsDirty = false;
      }
      const hasPointer = mouse.x !== null && mouse.y !== null;
      if (mouse.x !== null && mouse.y !== null) {
        // A light, frame-rate-independent ease with a short leash for fast moves.
        const ease = 1 - Math.exp(-delta / 28);
        eased.x += (mouse.x - eased.x) * ease;
        eased.y += (mouse.y - eased.y) * ease;
        const dx = mouse.x - eased.x;
        const dy = mouse.y - eased.y;
        const lag = Math.hypot(dx, dy);
        if (lag > 24) {
          eased.x = mouse.x - (dx / lag) * 24;
          eased.y = mouse.y - (dy / lag) * 24;
        }
      }

      for (const p of particles) {
        p.x += p.vx * step;
        p.y += p.vy * step;
        if (p.x < 0 || p.x > width) {
          p.x = Math.max(0, Math.min(width, p.x));
          p.vx *= -1;
        }
        if (p.y < 0 || p.y > height) {
          p.y = Math.max(0, Math.min(height, p.y));
          p.vy *= -1;
        }
        p.visibility = visibilityAt(p.x, p.y);
      }

      const pointerVisibility = hasPointer ? .36 + .64 * visibilityAt(eased.x, eased.y) : 0;
      particles.forEach((p, index) => {
        const distance = hasPointer ? Math.hypot(eased.x - p.x, eased.y - p.y) : Infinity;
        const proximity = Math.max(0, 1 - distance / pointerReach);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(" + ink + ", " + ((.39 + .21 * proximity) * p.visibility) + ")";
        ctx.fill();

        if (proximity > 0) {
          ctx.beginPath();
          ctx.moveTo(eased.x, eased.y);
          ctx.lineTo(p.x, p.y);
          const opacity = .48 * proximity * pointerVisibility * (.45 + .55 * p.visibility);
          ctx.strokeStyle = "rgba(" + thread + ", " + opacity + ")";
          ctx.lineWidth = .8;
          ctx.stroke();
        }

        for (let j = index + 1; j < particles.length; j++) {
          const other = particles[j];
          const distanceSquared = (p.x - other.x) ** 2 + (p.y - other.y) ** 2;
          if (distanceSquared >= threadReach * threadReach) continue;

          const visibility = Math.min(p.visibility, other.visibility);
          const opacity = .22 * (1 - Math.sqrt(distanceSquared) / threadReach) * visibility;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = "rgba(" + ink + ", " + opacity + ")";
          ctx.lineWidth = .65;
          ctx.stroke();
        }
      });

      frame = requestAnimationFrame(draw);
    };

    const syncActivity = () => {
      cancelAnimationFrame(frame);
      previousTime = null;
      if (preference.matches && !document.hidden) {
        frame = requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, width, height);
        clearPointer();
      }
    };

    resize();
    const observer = new ResizeObserver(invalidateBounds);
    quietRegions.forEach((region) => observer.observe(region));
    preference.addEventListener("change", syncActivity);
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", invalidateBounds, { passive: true });
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("blur", clearPointer);
    document.addEventListener("visibilitychange", syncActivity);
    syncActivity();

    return () => {
      observer.disconnect();
      preference.removeEventListener("change", syncActivity);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", invalidateBounds);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("blur", clearPointer);
      document.removeEventListener("visibilitychange", syncActivity);
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        mixBlendMode: "screen",
        zIndex: 4,
      }}
    />
  );
}
