import { BufferAttribute, Mesh, type BufferGeometry, type Material } from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

type Point = [number, number, number];

type SurfaceProfile = {
  width: number;
  rows: number;
  maxTheta: number;
  origin: Point;
  radii: number[];
};

export type SkullAnatomy = {
  cranium: BufferGeometry;
  mandible: BufferGeometry;
  upperTeeth: BufferGeometry;
  lowerTeeth: BufferGeometry;
  hinge: Point;
  skullPoint: (theta: number, phi: number, clearance?: number) => Point;
};

export async function loadSkullAnatomy(signal: AbortSignal): Promise<SkullAnatomy> {
  const response = await fetch("/models/hero-skull-anatomy.glb", { signal });
  if (!response.ok) throw new Error("Unable to load the skull anatomy");
  const { scene } = await new GLTFLoader().parseAsync(await response.arrayBuffer(), "");
  const cranium = scene.getObjectByName("cranium");
  const mandible = scene.getObjectByName("mandible");
  const upperTeeth = scene.getObjectByName("upper-teeth");
  const lowerTeeth = scene.getObjectByName("lower-teeth");
  const profile = scene.userData.surfaceProfile as SurfaceProfile | undefined;
  const hinge = scene.userData.jawHinge as Point | undefined;

  const materials = new Set<Material>();
  scene.traverse((object) => {
    if (!(object instanceof Mesh)) return;
    for (const material of Array.isArray(object.material) ? object.material : [object.material]) {
      materials.add(material);
    }
  });
  materials.forEach((material) => material.dispose());

  if (
    !(cranium instanceof Mesh) || !(mandible instanceof Mesh) ||
    !(upperTeeth instanceof Mesh) || !(lowerTeeth instanceof Mesh) || !profile || !hinge
  ) {
    scene.traverse((object) => { if (object instanceof Mesh) object.geometry.dispose(); });
    throw new Error("The skull is missing an anatomy part or its fitting data");
  }

  scene.updateMatrixWorld(true);
  for (const part of [cranium, mandible, upperTeeth, lowerTeeth]) {
    part.geometry.applyMatrix4(part.matrixWorld);
  }
  for (const { geometry } of [cranium, mandible]) {
    if (!geometry.hasAttribute("_bone_occlusion")) {
      geometry.setAttribute("_bone_occlusion", new BufferAttribute(new Uint8Array(geometry.getAttribute("position").count * 2), 2, true));
    }
  }

  // The asset stores radial samples of the outside of the cranium. Use them to
  // seat the armor against the bone, including where the profile curves rearward.
  const { width, rows, maxTheta, origin, radii } = profile;
  function skullPoint(theta: number, phi: number, clearance = 0): Point {
    const u = ((phi / (2 * Math.PI) % 1 + 1) % 1) * width;
    const v = Math.max(0, Math.min(1, theta / maxTheta)) * (rows - 1);
    const col = Math.floor(u), row = Math.floor(v);
    const nextCol = (col + 1) % width, nextRow = Math.min(rows - 1, row + 1);
    const mix = (a: number, b: number, fraction: number) => a + (b - a) * fraction;
    const upper = mix(radii[row * width + col], radii[row * width + nextCol], u - col);
    const lower = mix(radii[nextRow * width + col], radii[nextRow * width + nextCol], u - col);
    const radius = mix(upper, lower, v - row) + clearance;
    const lateral = radius * Math.sin(theta);
    return [
      origin[0] + lateral * Math.sin(phi),
      origin[1] + radius * Math.cos(theta),
      origin[2] + lateral * Math.cos(phi),
    ];
  }

  return {
    cranium: cranium.geometry,
    mandible: mandible.geometry,
    upperTeeth: upperTeeth.geometry,
    lowerTeeth: lowerTeeth.geometry,
    hinge,
    skullPoint,
  };
}
