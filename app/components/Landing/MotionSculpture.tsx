"use client";

import { useEffect, useRef, useState } from "react";
import {
  ACESFilmicToneMapping, AmbientLight, Box3, DirectionalLight,
  PCFSoftShadowMap, PerspectiveCamera, PlaneGeometry, Mesh,
  PMREMGenerator, Scene, ShadowMaterial, SRGBColorSpace, Vector3, WebGLRenderer,
} from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { createMechanicalSkull } from "./MechanicalSkull";
import styles from "./Landing.module.css";

export type SculptureView = "three-quarter" | "front";
type Props = { accent: string; light: number; view: SculptureView };

export default function MotionSculpture({ accent, light, view }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const settings = useRef({ accent, light, view });
  const invalidate = useRef<(() => void) | null>(null);
  const [ready, setReady] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const [contextVersion, setContextVersion] = useState(0);

  useEffect(() => {
    settings.current = { accent, light, view };
    invalidate.current?.();
  }, [accent, light, view]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
    } catch {
      setUnavailable(true);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;

    const scene = new Scene();
    const camera = new PerspectiveCamera(32, 1, 0.1, 50);
    const room = new RoomEnvironment();
    const pmrem = new PMREMGenerator(renderer);
    const environment = pmrem.fromScene(room, 0.04);
    scene.environment = environment.texture;
    scene.environmentIntensity = 0.45;
    room.dispose();
    pmrem.dispose();

    const artifact = createMechanicalSkull();
    scene.add(artifact.root);
    const neutralYaw = (selected: SculptureView) => selected === "front" ? 0 : -0.36;
    artifact.root.rotation.y = neutralYaw(settings.current.view);
    const bounds = new Box3().setFromObject(artifact.root);
    const size = bounds.getSize(new Vector3());
    artifact.root.position.y = -bounds.getCenter(new Vector3()).y;

    scene.add(new AmbientLight(0xc1d0dc, 0.3));
    const key = new DirectionalLight(0xe5edf3, 3.6);
    key.position.set(-3.5, 5, 5);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.left = -3;
    key.shadow.camera.right = 3;
    key.shadow.camera.top = 3;
    key.shadow.camera.bottom = -3;
    key.shadow.camera.near = 0.5;
    key.shadow.camera.far = 15;
    key.shadow.bias = -0.0002;
    key.shadow.normalBias = 0.012;
    key.shadow.radius = 3;
    scene.add(key);
    const fill = new DirectionalLight(0x93a9b9, 0.65);
    fill.position.set(4, 0.5, 3);
    scene.add(fill);
    const rim = new DirectionalLight(0xcadbe5, 2.6);
    rim.position.set(2, 3, -3);
    scene.add(rim);
    const accentRim = new DirectionalLight(accent, 0.3);
    accentRim.position.set(-3, -0.5, -2);
    scene.add(accentRim);

    const floorGeometry = new PlaneGeometry(12, 12);
    const floorMaterial = new ShadowMaterial({ opacity: 0.22 });
    const floor = new Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = bounds.min.y + artifact.root.position.y - 0.015;
    floor.receiveShadow = true;
    scene.add(floor);

    let frame = 0;
    let visible = true;
    let lost = false;
    let firstFrame = true;
    let currentView = settings.current.view;
    let currentAccent = "";
    let dragging: number | null = null;
    let downX = 0;
    let downY = 0;
    const rotation = { x: 0, y: neutralYaw(currentView) };

    // Render only when the view, lighting, or viewport changes. There is no idle animation.
    const render = () => {
      frame = 0;
      if (lost || !visible || document.hidden) return;
      const config = settings.current;
      if (config.view !== currentView) {
        currentView = config.view;
        rotation.x = 0;
        rotation.y = neutralYaw(currentView);
      }
      if (currentAccent !== config.accent) {
        accentRim.color.set(config.accent);
        artifact.setAccent(config.accent);
        currentAccent = config.accent;
      }
      artifact.root.rotation.set(rotation.x, rotation.y, 0);
      renderer.toneMappingExposure = config.light;
      renderer.render(scene, camera);
      if (firstFrame) {
        setReady(true);
        setUnavailable(false);
        firstFrame = false;
      }
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
      const tangent = Math.tan(camera.fov * Math.PI / 360);
      const distance = Math.max(size.y / (2 * tangent), size.x / (2 * tangent * camera.aspect));
      camera.position.set(0, 0.08, distance * 1.08 + size.z / 2);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
      requestRender();
    };
    const move = (event: PointerEvent) => {
      if (dragging !== event.pointerId) return;
      rotation.y += (event.clientX - downX) * 0.007;
      if (event.pointerType !== "touch") rotation.x = Math.max(-0.32, Math.min(0.32, rotation.x + (event.clientY - downY) * 0.005));
      downX = event.clientX;
      downY = event.clientY;
      requestRender();
    };
    const down = (event: PointerEvent) => {
      if (event.button !== 0 || dragging !== null) return;
      dragging = event.pointerId;
      downX = event.clientX;
      downY = event.clientY;
      canvas.setPointerCapture(event.pointerId);
      canvas.style.cursor = "grabbing";
    };
    const up = (event: PointerEvent) => {
      if (dragging !== event.pointerId) return;
      dragging = null;
      if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
      canvas.style.cursor = "grab";
    };
    const reset = () => {
      rotation.x = 0;
      rotation.y = neutralYaw(settings.current.view);
      requestRender();
    };
    const keydown = (event: KeyboardEvent) => {
      if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home"].includes(event.key)) return;
      event.preventDefault();
      if (event.key === "ArrowLeft") rotation.y -= 0.15;
      if (event.key === "ArrowRight") rotation.y += 0.15;
      if (event.key === "ArrowUp") rotation.x = Math.max(-0.32, rotation.x - 0.1);
      if (event.key === "ArrowDown") rotation.x = Math.min(0.32, rotation.x + 0.1);
      if (event.key === "Home") reset();
      requestRender();
    };
    const visibility = () => {
      if (dragging !== null && canvas.hasPointerCapture(dragging)) canvas.releasePointerCapture(dragging);
      dragging = null;
      canvas.style.cursor = "grab";
      if (!document.hidden) requestRender();
    };
    const contextLost = (event: Event) => {
      event.preventDefault();
      lost = true;
      cancelAnimationFrame(frame);
      frame = 0;
      setReady(false);
      setUnavailable(true);
    };
    const contextRestored = () => setContextVersion((version) => version + 1);
    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) requestRender();
    });
    resizeObserver.observe(canvas);
    intersectionObserver.observe(canvas);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("pointercancel", up);
    canvas.addEventListener("lostpointercapture", up);
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
      canvas.removeEventListener("dblclick", reset);
      canvas.removeEventListener("keydown", keydown);
      canvas.removeEventListener("webglcontextlost", contextLost);
      canvas.removeEventListener("webglcontextrestored", contextRestored);
      document.removeEventListener("visibilitychange", visibility);
      artifact.dispose();
      floorGeometry.dispose();
      floorMaterial.dispose();
      key.shadow.map?.dispose();
      scene.environment = null;
      environment.dispose();
      renderer.dispose();
    };
  }, [contextVersion]);

  return (
    <div className={styles.sculpture} data-ready={ready}>
      {!ready && <div className={styles.artifactFallback} role="status"><span>MECHANICAL ANATOMY</span><small>{unavailable ? "3D is unavailable in this browser." : "Loading sculpture…"}</small></div>}
      <canvas
        ref={canvasRef}
        className={styles.sculptureCanvas}
        tabIndex={0}
        role="img"
        aria-label="Mechanical skull with a monocle, exposed gears, fangs, and an open jaw on a pedestal. Drag or use arrow keys to inspect. Press Home to reset the view."
      />
    </div>
  );
}
