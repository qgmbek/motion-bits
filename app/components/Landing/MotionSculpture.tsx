"use client";

import { useEffect, useRef, useState } from "react";
import {
  ACESFilmicToneMapping, AmbientLight, BufferGeometry, Color,
  DirectionalLight, Float32BufferAttribute, Group, Line, LineBasicMaterial,
  Mesh, MeshPhysicalMaterial, PerspectiveCamera, PMREMGenerator,
  PointLight, Scene, SRGBColorSpace, TorusKnotGeometry, WebGLRenderer,
} from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import styles from "./Landing.module.css";

export type SculptureMaterial = "chrome" | "glass";

type Props = {
  accent: string;
  speed: number;
  paused: boolean;
  material: SculptureMaterial;
};

export default function MotionSculpture({ accent, speed, paused, material }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const settings = useRef({ accent, speed, paused, material });
  const invalidate = useRef<(() => void) | null>(null);
  const [ready, setReady] = useState(false);
  const [contextVersion, setContextVersion] = useState(0);

  useEffect(() => {
    settings.current = { accent, speed, paused, material };
    invalidate.current?.();
  }, [accent, speed, paused, material]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    const scene = new Scene();
    const camera = new PerspectiveCamera(34, 1, 0.1, 50);
    camera.position.set(0, 0, 7.6);

    // An actual studio environment gives the metal broad, photographic reflections.
    const room = new RoomEnvironment();
    const pmrem = new PMREMGenerator(renderer);
    const environment = pmrem.fromScene(room, 0.04);
    scene.environment = environment.texture;
    room.dispose();
    pmrem.dispose();

    const sculpture = new Group();
    scene.add(sculpture);
    const geometry = new TorusKnotGeometry(1.13, 0.37, 320, 48, 2, 3);
    geometry.center();

    const chrome = new MeshPhysicalMaterial({
      color: 0xd9dce5,
      metalness: 1,
      roughness: 0.18,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
      iridescence: 0.65,
      iridescenceIOR: 1.32,
      iridescenceThicknessRange: [120, 360],
      envMapIntensity: 1.7,
    });
    const glass = new MeshPhysicalMaterial({
      color: 0xf5f3ff,
      metalness: 0.05,
      roughness: 0.08,
      transmission: 0.92,
      thickness: 0.65,
      ior: 1.45,
      clearcoat: 1,
      iridescence: 0.8,
      iridescenceIOR: 1.3,
      iridescenceThicknessRange: [150, 450],
      attenuationDistance: 4,
      envMapIntensity: 1.8,
    });
    const knot = new Mesh(geometry, chrome);
    sculpture.add(knot);

    // Follow two actual surface meridians: a fine accent, not a wireframe overlay.
    const seams: Line[] = [];
    const positions = geometry.getAttribute("position");
    for (const offset of [5, 28]) {
      const points: number[] = [];
      for (let ring = 0; ring <= 320; ring++) {
        const index = ring * 49 + offset;
        points.push(positions.getX(index) * 1.002, positions.getY(index) * 1.002, positions.getZ(index) * 1.002);
      }
      const lineGeometry = new BufferGeometry();
      lineGeometry.setAttribute("position", new Float32BufferAttribute(points, 3));
      const lineMaterial = new LineBasicMaterial({ color: accent, transparent: true, opacity: 0.28 });
      const line = new Line(lineGeometry, lineMaterial);
      sculpture.add(line);
      seams.push(line);
    }

    scene.add(new AmbientLight(0xe2e6ff, 0.5));
    const key = new DirectionalLight(0xffffff, 3.2);
    key.position.set(-3, 4, 5);
    scene.add(key);
    const violet = new PointLight(0xb6a3ff, 30, 12, 2);
    violet.position.set(-3.5, -0.2, 2);
    scene.add(violet);
    const rim = new PointLight(accent, 32, 12, 2);
    rim.position.set(3, 1, -1);
    scene.add(rim);
    const fill = new DirectionalLight(0xc4ddff, 1.4);
    fill.position.set(2, -3, 2);
    scene.add(fill);

    let frame = 0;
    let visible = true;
    let lost = false;
    let last = 0;
    let elapsed = 0;
    let firstFrame = true;
    let lastAccent = "";
    let lastMaterial: SculptureMaterial | null = null;
    let dragging = false;
    let downX = 0;
    let downY = 0;
    const pointer = { x: 0, y: 0 };
    const drift = { x: 0, y: 0 };
    const rotation = { x: 0, y: 0 };
    const accentColor = new Color();

    const render = (now: number) => {
      frame = 0;
      if (lost || !visible || document.hidden) { last = 0; return; }
      const config = settings.current;
      const delta = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;
      if (!config.paused && !dragging) elapsed += delta * config.speed;
      const damping = 1 - Math.exp(-delta * 4);
      drift.x += ((config.paused ? 0 : pointer.x) - drift.x) * damping;
      drift.y += ((config.paused ? 0 : pointer.y) - drift.y) * damping;

      sculpture.rotation.set(
        0.25 + rotation.x + Math.sin(elapsed * 0.22) * 0.12 + drift.y * 0.15,
        -0.35 + rotation.y + elapsed * 0.12 + drift.x * 0.2,
        -0.42 + Math.sin(elapsed * 0.16) * 0.08,
      );
      sculpture.position.y = 0.12 + Math.sin(elapsed * 0.7) * 0.07;

      if (lastAccent !== config.accent) {
        accentColor.set(config.accent);
        rim.color.copy(accentColor);
        glass.attenuationColor.copy(accentColor);
        for (const seam of seams) (seam.material as LineBasicMaterial).color.copy(accentColor);
        lastAccent = config.accent;
      }
      if (lastMaterial !== config.material) {
        knot.material = config.material === "glass" ? glass : chrome;
        seams.forEach((seam) => { seam.visible = config.material === "chrome"; });
        lastMaterial = config.material;
      }

      renderer.render(scene, camera);
      if (firstFrame) { setReady(true); firstFrame = false; }
      if (!config.paused || dragging) frame = requestAnimationFrame(render);
    };
    const requestRender = () => {
      if (!frame && visible && !document.hidden && !lost) frame = requestAnimationFrame(render);
    };
    invalidate.current = requestRender;

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      // Keep the entire sculpture framed in portrait layouts too.
      camera.position.z = camera.aspect < 0.9 ? 8.4 : 7.6;
      camera.updateProjectionMatrix();
      requestRender();
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch" && !dragging) return;
      const rect = canvas.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / rect.width - 0.5;
      pointer.y = (event.clientY - rect.top) / rect.height - 0.5;
      if (dragging) {
        rotation.y += (event.clientX - downX) * 0.008;
        // Horizontal touch drags rotate; vertical gestures keep native page scrolling.
        if (event.pointerType !== "touch") rotation.x += (event.clientY - downY) * 0.008;
        downX = event.clientX;
        downY = event.clientY;
      }
      requestRender();
    };
    const down = (event: PointerEvent) => {
      if (event.button !== 0) return;
      dragging = true;
      downX = event.clientX;
      downY = event.clientY;
      canvas.setPointerCapture(event.pointerId);
      canvas.style.cursor = "grabbing";
      requestRender();
    };
    const up = (event: PointerEvent) => {
      dragging = false;
      if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
      canvas.style.cursor = "grab";
    };
    const leave = () => { pointer.x = 0; pointer.y = 0; };
    const reset = () => { rotation.x = 0; rotation.y = 0; requestRender(); };
    const keydown = (event: KeyboardEvent) => {
      const keys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home"];
      if (!keys.includes(event.key)) return;
      event.preventDefault();
      if (event.key === "ArrowLeft") rotation.y -= 0.2;
      if (event.key === "ArrowRight") rotation.y += 0.2;
      if (event.key === "ArrowUp") rotation.x -= 0.2;
      if (event.key === "ArrowDown") rotation.x += 0.2;
      if (event.key === "Home") reset();
      requestRender();
    };
    const visibility = () => {
      last = 0;
      dragging = false;
      pointer.x = 0;
      pointer.y = 0;
      canvas.style.cursor = "grab";
      if (!document.hidden) requestRender();
    };
    const contextLost = (event: Event) => {
      event.preventDefault();
      lost = true;
      cancelAnimationFrame(frame);
      frame = 0;
      setReady(false);
    };
    const contextRestored = () => setContextVersion((version) => version + 1);
    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      last = 0;
      if (visible) requestRender();
    });
    resizeObserver.observe(canvas);
    intersectionObserver.observe(canvas);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("pointercancel", up);
    canvas.addEventListener("lostpointercapture", up);
    canvas.addEventListener("pointerleave", leave);
    canvas.addEventListener("dblclick", reset);
    canvas.addEventListener("keydown", keydown);
    canvas.addEventListener("webglcontextlost", contextLost);
    canvas.addEventListener("webglcontextrestored", contextRestored);
    document.addEventListener("visibilitychange", visibility);
    resize();

    return () => {
      cancelAnimationFrame(frame);
      invalidate.current = null;
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointercancel", up);
      canvas.removeEventListener("lostpointercapture", up);
      canvas.removeEventListener("pointerleave", leave);
      canvas.removeEventListener("dblclick", reset);
      canvas.removeEventListener("keydown", keydown);
      canvas.removeEventListener("webglcontextlost", contextLost);
      canvas.removeEventListener("webglcontextrestored", contextRestored);
      document.removeEventListener("visibilitychange", visibility);
      geometry.dispose();
      chrome.dispose();
      glass.dispose();
      seams.forEach((line) => {
        line.geometry.dispose();
        (line.material as LineBasicMaterial).dispose();
      });
      scene.environment = null;
      environment.dispose();
      renderer.dispose();
    };
  }, [contextVersion]);

  return (
    <div className={styles.sculpture} data-ready={ready}>
      {!ready && <div className={styles.sculptureFallback} aria-hidden="true"><i /><i /><i /></div>}
      <canvas
        ref={canvasRef}
        className={styles.sculptureCanvas}
        tabIndex={0}
        role="img"
        aria-label="Interactive iridescent sculpture. Drag to rotate, use arrow keys, or press Home to reset."
      />
    </div>
  );
}
