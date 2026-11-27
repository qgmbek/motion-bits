import { BufferAttribute, MathUtils, Mesh, Vector3, type BufferGeometry, type Material } from "three";
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
  upperTeeth?: BufferGeometry;
  lowerTeeth: BufferGeometry;
  hinge: Point;
  skullPoint: (theta: number, phi: number, clearance?: number) => Point;
};

const lowerIncisorContacts = [-0.084, 0, 0.086];

function lowerSocketLift(x: number, y: number, z: number) {
  const acrossArch = 1 - MathUtils.smoothstep(Math.abs(x), 0.12, 0.176);
  const nearCrest = MathUtils.smoothstep(y, -1.205, -1.118);
  const underCrowns = MathUtils.smoothstep(z, 0.493, 0.55) * (1 - MathUtils.smoothstep(z, 0.607, 0.664));
  const contact = lowerIncisorContacts.reduce((height, center) =>
    height + 1 - MathUtils.smoothstep(Math.abs(x - center), 0.008, 0.033), 0);

  return acrossArch * nearCrest * underCrowns * (0.006 + contact * 0.049);
}

function seatLowerIncisors(geometry: BufferGeometry) {
  const position = geometry.getAttribute("position");
  if (!geometry.hasAttribute("normal")) geometry.computeVertexNormals();
  const normals = geometry.getAttribute("normal");
  const occlusion = geometry.getAttribute("_bone_occlusion");
  const normal = new Vector3();
  const step = 0.001;

  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i), y = position.getY(i), z = position.getZ(i);
    const lift = lowerSocketLift(x, y, z);

    if (lift > 0) {
      // Raise the existing bone between the roots and carry its normals along.
      const dx = (lowerSocketLift(x + step, y, z) - lowerSocketLift(x - step, y, z)) / (2 * step);
      const dy = (lowerSocketLift(x, y + step, z) - lowerSocketLift(x, y - step, z)) / (2 * step);
      const dz = (lowerSocketLift(x, y, z + step) - lowerSocketLift(x, y, z - step)) / (2 * step);
      normal.fromBufferAttribute(normals, i);
      const normalY = normal.y / (1 + dy);
      normal.set(normal.x - dx * normalY, normalY, normal.z - dz * normalY).normalize();
      normals.setXYZ(i, normal.x, normal.y, normal.z);
      position.setY(i, y + lift);
    }

    // The baked crevice shadows are too strong along the lower socket join.
    const socketRim = (1 - MathUtils.smoothstep(Math.abs(x), 0.29, 0.43)) *
      MathUtils.smoothstep(y, -1.33, -1.185) * (1 - MathUtils.smoothstep(y, -1.055, -0.95)) *
      MathUtils.smoothstep(z, 0.41, 0.54);
    if (socketRim > 0) {
      occlusion.setXY(i, occlusion.getX(i) * (1 - socketRim * 0.58), occlusion.getY(i) * (1 - socketRim * 0.78));
    }
  }
}

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
    !(lowerTeeth instanceof Mesh) || !profile || !hinge ||
    (!(upperTeeth instanceof Mesh) && !cranium.geometry.hasAttribute("_bone_enamel"))
  ) {
    scene.traverse((object) => { if (object instanceof Mesh) object.geometry.dispose(); });
    throw new Error("The skull is missing an anatomy part or its fitting data");
  }

  scene.updateMatrixWorld(true);
  for (const part of [cranium, mandible, lowerTeeth]) {
    part.geometry.applyMatrix4(part.matrixWorld);
  }
  if (upperTeeth instanceof Mesh) {
    upperTeeth.geometry.applyMatrix4(upperTeeth.matrixWorld);
  }
  for (const { geometry } of [cranium, mandible]) {
    const { count } = geometry.getAttribute("position");
    if (!geometry.hasAttribute("_bone_occlusion")) {
      geometry.setAttribute("_bone_occlusion", new BufferAttribute(new Uint8Array(count * 2), 2, true));
    }
    if (!geometry.hasAttribute("_bone_enamel")) {
      geometry.setAttribute("_bone_enamel", new BufferAttribute(new Uint8Array(count * 4), 4, true));
    }
  }
  seatLowerIncisors(mandible.geometry);

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
    upperTeeth: upperTeeth instanceof Mesh ? upperTeeth.geometry : undefined,
    lowerTeeth: lowerTeeth.geometry,
    hinge,
    skullPoint,
  };
}
