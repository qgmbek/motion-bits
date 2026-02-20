"use client";

import React, { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

const GalacticMouseTrail: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();
  const dimensionsRef = useRef({ width: 0, height: 0 });

  // Color palette
  const colors = [
    "rgba(255, 120, 255, {alpha})", // pink
    "rgba(180, 100, 255, {alpha})", // purple
    "rgba(100, 200, 255, {alpha})", // cyan
    "rgba(255, 200, 100, {alpha})", // gold
    "rgba(255, 100, 150, {alpha})", // coral
  ];

  const createParticle = useCallback((x: number, y: number, baseLife: number): Particle => {
    const maxLife = baseLife * (0.8 + Math.random() * 0.4);
    const colorTemplate = colors[Math.floor(Math.random() * colors.length)];
    return {
      x,
      y,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5 - 0.5,
      life: maxLife,
      maxLife,
      size: 3 + Math.random() * 8,
      color: colorTemplate,
    };
  }, [colors]);

  const addParticles = useCallback((x: number, y: number, count: number) => {
    for (let i = 0; i < count; i++) {
      particlesRef.current.push(createParticle(x, y, 0.9 + Math.random() * 0.6));
    }
  }, [createParticle]);

  // Resize handler
  const handleResize = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const width = container.clientWidth;
    const height = container.clientHeight;
    canvas.width = width;
    canvas.height = height;
    dimensionsRef.current = { width, height };
  }, []);

  // Mouse move handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const { width, height } = dimensionsRef.current;
    if (!ctx || width === 0 || height === 0) {
      animationFrameRef.current = requestAnimationFrame(animate);
      return;
    }

    // Smooth mouse interpolation
    lastMouseRef.current.x += (mouseRef.current.x - lastMouseRef.current.x) * 0.3;
    lastMouseRef.current.y += (mouseRef.current.y - lastMouseRef.current.y) * 0.3;

    // Emit particles at interpolated mouse position (if mouse moved recently)
    if (Math.hypot(mouseRef.current.x - lastMouseRef.current.x, mouseRef.current.y - lastMouseRef.current.y) > 0.1) {
      addParticles(lastMouseRef.current.x, lastMouseRef.current.y, 2);
    }

    // Update particles
    const particles = particlesRef.current;
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.008;
      p.vx += (Math.random() - 0.5) * 0.1;
      p.vy += (Math.random() - 0.5) * 0.05;
      if (p.life <= 0 || p.x < -50 || p.x > width + 50 || p.y < -50 || p.y > height + 50) {
        particles.splice(i, 1);
      }
    }

    // Draw background
    ctx.clearRect(0, 0, width, height);
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "#0a0a1a");
    gradient.addColorStop(1, "#1a1a2e");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Draw static stars (background sparkles)
    ctx.shadowBlur = 0;
    for (let i = 0; i < 100; i++) {
      const sx = (i * 31) % width;
      const sy = (i * 17) % height;
      const brightness = Math.sin(Date.now() * 0.001 + i) * 0.3 + 0.7;
      ctx.fillStyle = `rgba(255, 255, 255, ${brightness * 0.3})`;
      ctx.beginPath();
      ctx.arc(sx, sy, 1, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw particles with glow
    for (const p of particles) {
      const alpha = (p.life / p.maxLife) * 0.9;
      const color = p.color.replace("{alpha}", alpha.toString());
      ctx.shadowBlur = 20;
      ctx.shadowColor = color.replace("rgba", "rgb").replace(/, [^,]+\)/, ")");
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * (p.life / p.maxLife) * 1.2, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.fill();
    }

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [addParticles]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Initialize dimensions
    handleResize();

    // Add a burst of particles on mount to show something immediately
    const { width, height } = dimensionsRef.current;
    if (width > 0 && height > 0) {
      for (let i = 0; i < 30; i++) {
        addParticles(width / 2 + (Math.random() - 0.5) * 100, height / 2 + (Math.random() - 0.5) * 100, 1);
      }
    }

    // Set initial mouse position to center
    mouseRef.current = { x: width / 2, y: height / 2 };
    lastMouseRef.current = { x: width / 2, y: height / 2 };

    window.addEventListener("resize", handleResize);
    container.addEventListener("mousemove", handleMouseMove);
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [handleResize, handleMouseMove, animate, addParticles]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        // cursor: "none", // Uncomment to hide cursor after testing
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
    </div>
  );
};

export default GalacticMouseTrail;