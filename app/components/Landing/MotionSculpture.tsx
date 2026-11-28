"use client";

import { useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import {
  ACESFilmicToneMapping, AmbientLight, Box3, DirectionalLight,
  OrthographicCamera, PCFShadowMap, PlaneGeometry, Mesh,
  PMREMGenerator, Scene, ShadowMaterial, SRGBColorSpace, Vector3, WebGLRenderer,
} from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { createMechanicalSkull } from "./MechanicalSkull";
import { createMetalEnvironment } from "./metalStudio";
import { loadSkullAnatomy, type SkullAnatomy } from "./skullAnatomy";
import { sampleSkullPerformance, skullPerformanceDuration } from "./skullPerformance";
import styles from "./Landing.module.css";

type Props = { accent: string; light: number };
const initialYaw = -0.08;
const restPose = sampleSkullPerformance(0);

export default function MotionSculpture({ accent, light }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const settings = useRef({ accent, light });
  const invalidate = useRef<(() => void) | null>(null);
  const replay = useRef<(() => void) | null>(null);
  const [ready, setReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const [contextVersion, setContextVersion] = useState(0);
  const [anatomy, setAnatomy] = useState<SkullAnatomy | null>(null);

  useEffect(() => {
    settings.current = { accent, light };
    invalidate.current?.();
  }, [accent, light]);

  useEffect(() => {
    const controller = new AbortController();
    let loaded: SkullAnatomy | undefined;
    function release(model: SkullAnatomy) {
      model.cranium.dispose();
      model.mandible.dispose();
      model.upperTeeth?.dispose();
      model.lowerTeeth.dispose();
    }
    loadSkullAnatomy(controller.signal).then((model) => {
      if (controller.signal.aborted) {
        release(model);
        return;
      }
      loaded = model;
      setAnatomy(model);
    }).catch(() => {
      if (!controller.signal.aborted) setUnavailable(true);
    });
    return () => {
      controller.abort();
      if (loaded) release(loaded);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !anatomy) return;
    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
    } catch {
      const frame = requestAnimationFrame(() => setUnavailable(true));
      return () => cancelAnimationFrame(frame);
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFShadowMap;

    const scene = new Scene();
    const camera = new OrthographicCamera(-3, 3, 3, -3, 0.1, 30);
    const room = new RoomEnvironment();
    const pmrem = new PMREMGenerator(renderer);
    const environment = pmrem.fromScene(room, 0.04);
    const metalEnvironment = createMetalEnvironment(pmrem);
    scene.environment = environment.texture;
    scene.environmentIntensity = 0.45;
    room.dispose();
    pmrem.dispose();

    const artifact = createMechanicalSkull(anatomy, metalEnvironment.texture);
    artifact.setPose(restPose);
    scene.add(artifact.root);
    const bounds = new Box3().setFromObject(artifact.root);
    const size = bounds.getSize(new Vector3());
    artifact.root.position.y = -bounds.getCenter(new Vector3()).y;

    scene.add(new AmbientLight(0xc1cad6, 0.23));
    const key = new DirectionalLight(0xfff3e7, 3.25);
    key.position.set(-3.5, 5, 5);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.left = -3;
    key.shadow.camera.right = 3;
    key.shadow.camera.top = 3;
    key.shadow.camera.bottom = -3;
    key.shadow.camera.near = 0.5;
    key.shadow.camera.far = 15;
    key.shadow.camera.updateProjectionMatrix();
    key.shadow.bias = -0.0002;
    key.shadow.normalBias = 0.012;
    key.shadow.radius = 3;
    scene.add(key);
    const fill = new DirectionalLight(0xafc1d5, 0.52);
    fill.position.set(4, 0.5, 3);
    scene.add(fill);
    const rim = new DirectionalLight(0xc9d9eb, 2.2);
    rim.position.set(2, 3, -3);
    scene.add(rim);
    const accentRim = new DirectionalLight(settings.current.accent, 0.3);
    accentRim.position.set(-3, -0.5, -2);
    scene.add(accentRim);

    const floorGeometry = new PlaneGeometry(12, 12);
    const floorMaterial = new ShadowMaterial({ opacity: 0.14 });
    const floor = new Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = bounds.min.y + artifact.root.position.y - 0.015;
    floor.receiveShadow = true;
    scene.add(floor);

    let frame = 0;
    let visible = false;
    let lost = false;
    let firstFrame = true;
    let currentAccent = "";
    let dragging: number | null = null;
    let downX = 0;
    let downY = 0;
    const rotation = { x: 0, y: initialYaw };
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let playing = !motionPreference.matches;
    let elapsed = -0.35; // Let the canvas appear before the optic makes its first move.
    let previousTimestamp: number | null = null;

    const stopPerformance = () => {
      if (!playing) return;
      playing = false;
      previousTimestamp = null;
      setIsPlaying(false);
    };
    const suspendFrame = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      previousTimestamp = null;
    };
    const requestRender = () => {
      if (!frame && visible && !document.hidden && !lost) frame = requestAnimationFrame(render);
    };
    function render(timestamp: number) {
      frame = 0;
      if (lost || !visible || document.hidden) return;
      if (playing) {
        if (previousTimestamp !== null) {
          elapsed = Math.min(skullPerformanceDuration, elapsed + (timestamp - previousTimestamp) / 1000);
        }
        previousTimestamp = timestamp;
        artifact.setPose(sampleSkullPerformance(elapsed));
        if (elapsed === skullPerformanceDuration) stopPerformance();
      }
      const config = settings.current;
      if (currentAccent !== config.accent) {
        accentRim.color.set(config.accent);
        artifact.setAccent(config.accent);
        currentAccent = config.accent;
      }
      artifact.root.rotation.y = rotation.y;
      const pitch = 0.035 + rotation.x;
      camera.position.set(0, Math.sin(pitch) * 9, Math.cos(pitch) * 9);
      camera.lookAt(0, 0, 0);
      renderer.toneMappingExposure = config.light;
      renderer.render(scene, camera);
      if (firstFrame) {
        setIsPlaying(playing);
        setReady(true);
        setUnavailable(false);
        firstFrame = false;
      }
      if (playing) requestRender();
    }
    invalidate.current = requestRender;

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      const aspect = width / height;
      const halfHeight = Math.max(size.y * 0.532, Math.max(size.x, size.z) * 0.585 / aspect);
      camera.left = -halfHeight * aspect;
      camera.right = halfHeight * aspect;
      camera.top = halfHeight;
      camera.bottom = -halfHeight;
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
      stopPerformance();
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
      stopPerformance();
      rotation.x = 0;
      rotation.y = initialYaw;
      artifact.setPose(restPose);
      requestRender();
    };
    replay.current = () => {
      if (playing || lost) return;
      reset();
      elapsed = 0;
      playing = true;
      setIsPlaying(true);
    };
    const keydown = (event: KeyboardEvent) => {
      if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home"].includes(event.key)) return;
      event.preventDefault();
      stopPerformance();
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
      if (document.hidden) suspendFrame();
      else requestRender();
    };
    const changeMotionPreference = (event: MediaQueryListEvent) => {
      if (!event.matches || !playing) return;
      stopPerformance();
      artifact.setPose(restPose);
      requestRender();
    };
    const contextLost = (event: Event) => {
      event.preventDefault();
      lost = true;
      suspendFrame();
      setReady(false);
      setUnavailable(true);
    };
    const contextRestored = () => setContextVersion((version) => version + 1);
    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) requestRender();
      else suspendFrame();
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
    motionPreference.addEventListener("change", changeMotionPreference);
    resize();

    return () => {
      suspendFrame();
      invalidate.current = null;
      replay.current = null;
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
      motionPreference.removeEventListener("change", changeMotionPreference);
      artifact.dispose();
      floorGeometry.dispose();
      floorMaterial.dispose();
      key.shadow.map?.dispose();
      scene.environment = null;
      environment.dispose();
      metalEnvironment.dispose();
      renderer.dispose();
    };
  }, [anatomy, contextVersion]);

  return (
    <div className={styles.sculpture} data-ready={ready}>
      {!ready && <div className={styles.artifactFallback} role="status"><small>{unavailable ? "Sculpture unavailable." : "Loading sculpture…"}</small></div>}
      <canvas
        ref={canvasRef}
        className={styles.sculptureCanvas}
        tabIndex={0}
        role="img"
        aria-label="Mechanical skull with a crystal-set monocle, jeweled armor, exposed gears, fangs, and an open jaw on a pedestal. Drag or use arrow keys to inspect. Press Home to reset the view."
      />
      {ready && !isPlaying && (
        <button
          type="button"
          className={styles.sculptureReplay}
          onClick={(event) => {
            replay.current?.();
            if (event.detail === 0) canvasRef.current?.focus({ preventScroll: true });
          }}
          aria-label="Replay skull animation"
        >
          <RotateCcw size={14} aria-hidden="true" />
          Replay
        </button>
      )}
    </div>
  );
}
