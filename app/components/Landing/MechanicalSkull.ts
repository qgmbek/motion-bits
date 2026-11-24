import {
  BoxGeometry, BufferGeometry, CatmullRomCurve3, Color, CylinderGeometry,
  ExtrudeGeometry, Float32BufferAttribute, Group, LatheGeometry, Material,
  Mesh, MeshPhysicalMaterial, MeshStandardMaterial, Path, Shape, SphereGeometry,
  TorusGeometry, TubeGeometry, Vector2, Vector3,
} from "three";
import { createCraniumGeometry, createMandibleGeometry } from "./skullGeometry";

type Point = readonly [number, number, number];
type Point2 = readonly [number, number];

const grainShader = /* glsl */ `
  varying vec3 vArtifactPosition;
  float artifactHash(vec3 p) {
    p = fract(p * 0.3183099 + vec3(0.11, 0.23, 0.37));
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }
  float artifactNoise(vec3 p) {
    vec3 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix(artifactHash(i), artifactHash(i + vec3(1,0,0)), f.x),
      mix(artifactHash(i + vec3(0,1,0)), artifactHash(i + vec3(1,1,0)), f.x), f.y),
      mix(mix(artifactHash(i + vec3(0,0,1)), artifactHash(i + vec3(1,0,1)), f.x),
      mix(artifactHash(i + vec3(0,1,1)), artifactHash(i + vec3(1,1,1)), f.x), f.y), f.z);
  }
`;

function weatheredMaterial(color: number, metalness: number, roughness: number, grain: number, erosion = 0) {
  const material = new MeshStandardMaterial({ color, metalness, roughness, envMapIntensity: 0.65 });
  material.onBeforeCompile = (shader) => {
    shader.uniforms.artifactGrain = { value: grain };
    shader.uniforms.artifactErosion = { value: erosion };
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nvarying vec3 vArtifactPosition;")
      .replace("#include <begin_vertex>", "#include <begin_vertex>\nvArtifactPosition = position;");
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", `#include <common>\nuniform float artifactGrain;\nuniform float artifactErosion;\n${grainShader}`)
      .replace("#include <color_fragment>", `#include <color_fragment>
        float patina = artifactNoise(vArtifactPosition * 7.0);
        float erosionMask = smoothstep(0.29, 0.73, artifactNoise(vArtifactPosition * 11.0 + patina));
        float pit = smoothstep(0.54, 0.82, artifactNoise(vArtifactPosition * 63.0 + erosionMask * 0.8));
        float erosion = erosionMask * pit * artifactErosion;
        diffuseColor.rgb *= mix(0.79, 1.10, patina) - 0.23 * erosion;
      `)
      .replace("#include <roughnessmap_fragment>", `#include <roughnessmap_fragment>
        roughnessFactor = clamp(roughnessFactor + (patina - 0.5) * 0.18, 0.15, 1.0);
      `)
      .replace("#include <normal_fragment_maps>", `#include <normal_fragment_maps>
        float relief = artifactGrain * (
          artifactNoise(vArtifactPosition * 13.0) * 0.012 +
          artifactNoise(vArtifactPosition * 48.0) * 0.006 +
          artifactNoise(vArtifactPosition * 122.0) * 0.0018 - erosion * 0.0045);
        vec3 surfaceX = dFdx(-vViewPosition);
        vec3 surfaceY = dFdy(-vViewPosition);
        vec3 r1 = cross(surfaceY, normal);
        vec3 r2 = cross(normal, surfaceX);
        float determinant = dot(surfaceX, r1);
        vec3 gradient = sign(determinant) * (dFdx(relief) * r1 + dFdy(relief) * r2);
        normal = normalize(max(abs(determinant), 0.00000001) * normal - gradient);
      `);
  };
  material.customProgramCacheKey = () => "mechanical-skull-weathering-v2";
  return material;
}

/** All pivots are deliberately named and independent; nothing in this factory animates. */
export function createMechanicalSkull() {
  const root = new Group();
  root.name = "mechanical-skull";
  const head = new Group();
  head.name = "cranium";
  root.add(head);
  const jaw = new Group();
  jaw.name = "jaw-pivot";
  jaw.position.set(0, -0.05, -0.18);
  head.add(jaw);
  const jawParts = new Group();
  jawParts.position.copy(jaw.position).multiplyScalar(-1);
  jaw.add(jawParts);
  const gears: Group[] = [];

  const bone = weatheredMaterial(0x7e898f, 0.25, 0.70, 1.25, 1);
  const steel = weatheredMaterial(0x4d5860, 0.64, 0.51, 0.32, 0.24);
  const darkSteel = weatheredMaterial(0x26323a, 0.78, 0.52, 0.4);
  const leather = weatheredMaterial(0x30383b, 0.12, 0.9, 1.7, 0.5);
  const enamel = weatheredMaterial(0x9aa3a4, 0.28, 0.42, 0.24);
  const edge = new MeshStandardMaterial({ color: 0x98a5ac, metalness: 0.86, roughness: 0.32 });
  const recess = new MeshStandardMaterial({ color: 0x080e12, roughness: 0.84, metalness: 0.15 });
  const lensMaterial = new MeshPhysicalMaterial({
    color: 0x364047, metalness: 0.22, roughness: 0.42, clearcoat: 0.24,
    clearcoatRoughness: 0.26, envMapIntensity: 0.55,
  });
  const seam = new MeshStandardMaterial({ color: 0x8a9698, metalness: 0.25, roughness: 0.7 });
  const accent = new MeshStandardMaterial({ color: 0xc0d6d9, emissive: 0x8ebec5, emissiveIntensity: 0.25, metalness: 0.6, roughness: 0.32 });
  const materials: Material[] = [bone, steel, darkSteel, leather, enamel, edge, recess, lensMaterial, seam, accent];
  const sphere = new SphereGeometry(1, 28, 20);
  const crownGeometry = new SphereGeometry(1, 24, 20);
  const crownPositions = crownGeometry.getAttribute("position");
  for (let i = 0; i < crownPositions.count; i++) {
    const x = crownPositions.getX(i), y = crownPositions.getY(i), z = crownPositions.getZ(i);
    crownPositions.setXYZ(i, Math.sign(x) * Math.abs(x) ** 0.72, Math.sign(y) * Math.abs(y) ** 0.65, Math.sign(z) * Math.abs(z) ** 0.8);
  }
  crownGeometry.computeVertexNormals();
  const boltGeometry = new CylinderGeometry(0.035, 0.035, 0.023, 6);
  boltGeometry.rotateX(Math.PI / 2);
  const washerGeometry = new TorusGeometry(0.037, 0.008, 6, 16);
  const slotGeometry = new BoxGeometry(0.028, 0.005, 0.002);

  function mesh(parent: Group, name: string, geometry: BufferGeometry, material: Material, position: Point = [0, 0, 0]) {
    const object = new Mesh(geometry, material);
    object.name = name;
    object.position.set(...position);
    object.castShadow = true;
    object.receiveShadow = true;
    parent.add(object);
    return object;
  }

  function orb(parent: Group, name: string, at: Point, scale: Point, material: Material) {
    const object = mesh(parent, name, sphere, material, at);
    object.scale.set(...scale);
    return object;
  }

  function tube(parent: Group, name: string, points: Point[], radius: number, material: Material, closed = false) {
    const path = new CatmullRomCurve3(points.map((point) => new Vector3(...point)), closed);
    return mesh(parent, name, new TubeGeometry(path, Math.max(16, points.length * 7), radius, 8, closed), material);
  }

  function rod(parent: Group, name: string, a: Point, b: Point, radius: number, material: Material) {
    const start = new Vector3(...a), end = new Vector3(...b);
    const direction = end.clone().sub(start);
    const object = mesh(parent, name, new CylinderGeometry(radius, radius, direction.length(), 12), material);
    object.position.copy(start).add(end).multiplyScalar(0.5);
    object.quaternion.setFromUnitVectors(new Vector3(0, 1, 0), direction.normalize());
    return object;
  }

  function ring(parent: Group, name: string, at: Point, radius: number, thickness: number, material: Material) {
    return mesh(parent, name, new TorusGeometry(radius, thickness, 8, 64), material, at);
  }

  function disc(parent: Group, name: string, at: Point, radius: number, depth: number, material: Material) {
    const geometry = new CylinderGeometry(radius, radius, depth, 48);
    geometry.rotateX(Math.PI / 2);
    return mesh(parent, name, geometry, material, at);
  }

  function turnedProfile(parent: Group, name: string, profile: readonly Point2[], material: Material, position?: Point) {
    const geometry = new LatheGeometry(profile.map(([radius, depth]) => new Vector2(radius, depth)), 96);
    geometry.rotateX(Math.PI / 2);
    return mesh(parent, name, geometry, material, position);
  }

  function bolt(parent: Group, at: Point, normal?: Vector3, size = 1) {
    const assembly = new Group();
    assembly.name = "hex-fastener";
    assembly.position.set(...at);
    assembly.scale.setScalar(size);
    if (normal) assembly.quaternion.setFromUnitVectors(new Vector3(0, 0, 1), normal.clone().normalize());
    mesh(assembly, "washer", washerGeometry, darkSteel);
    mesh(assembly, "bolt", boltGeometry, edge, [0, 0, 0.014]);
    mesh(assembly, "slot", slotGeometry, recess, [0, 0, 0.027]);
    parent.add(assembly);
    return assembly;
  }

  function extrude(shape: Shape, depth: number, bevel = 0.012) {
    return new ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelSize: bevel, bevelThickness: bevel, bevelSegments: 2, curveSegments: 24 });
  }

  function hole(shape: Shape, x: number, y: number, radius: number) {
    const path = new Path();
    path.absarc(x, y, radius, 0, Math.PI * 2, true);
    shape.holes.push(path);
  }

  function gear(
    parent: Group, name: string, at: Point, radius: number, teeth: number, depth: number, ports: number,
    options: { bore?: number; secondaryPorts?: boolean } = {},
  ) {
    const assembly = new Group();
    assembly.name = name;
    assembly.position.set(...at);
    parent.add(assembly);
    gears.push(assembly);
    const shape = new Shape();
    for (let i = 0; i <= teeth * 4; i++) {
      const angle = i / (teeth * 4) * Math.PI * 2;
      const r = radius * (i % 4 === 1 || i % 4 === 2 ? 1 : 0.91);
      if (i === 0) shape.moveTo(Math.cos(angle) * r, Math.sin(angle) * r);
      else shape.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
    }
    shape.closePath();
    const bore = options.bore ?? 0.17;
    hole(shape, 0, 0, radius * bore);
    for (let i = 0; i < ports; i++) {
      const angle = i / ports * Math.PI * 2;
      hole(shape, Math.cos(angle) * radius * 0.52, Math.sin(angle) * radius * 0.52, radius * 0.155);
      if (options.secondaryPorts) {
        const offset = angle + Math.PI / ports;
        hole(shape, Math.cos(offset) * radius * 0.57, Math.sin(offset) * radius * 0.57, radius * 0.086);
      }
    }
    mesh(assembly, "toothed-wheel", extrude(shape, depth, 0.006), steel);
    ring(assembly, "machined-outer-lip", [0, 0, depth + 0.009], radius * 0.78, radius * 0.035, edge);
    ring(assembly, "axle-bearing", [0, 0, depth + 0.012], radius * (bore + 0.055), radius * 0.032, edge);
    if (bore <= 0.22) disc(assembly, "recessed-axle", [0, 0, -0.025], radius * 0.14, 0.02, darkSteel);
    return assembly;
  }

  mesh(head, "sculpted-bone-with-orbital-and-nasal-cavities", createCraniumGeometry(), bone);
  mesh(jawParts, "open-mandible", createMandibleGeometry(), bone);

  // Individual crowns follow a horseshoe dental arcade. The two tusks belong to the jaw.
  for (const upper of [true, false]) {
    const parent = upper ? head : jawParts;
    for (let i = 0; i < 14; i++) {
      const angle = (i - 6.5) / 6.5 * 1.25;
      const x = Math.sin(angle) * (upper ? 0.57 : 0.54);
      const z = 0.29 + Math.cos(angle) * (upper ? 0.76 : 0.57);
      const y = upper ? -0.55 + Math.abs(angle) * 0.08 : -1.10 + Math.abs(angle) * 0.08;
      const central = Math.abs(angle) < 0.4;
      const crown = mesh(parent, `${upper ? "upper" : "lower"}-tooth-${i}`, crownGeometry, enamel, [x, y, z]);
      crown.scale.set(central ? 0.053 : 0.05, central ? 0.145 : 0.12, 0.095);
      crown.rotation.y = angle * 0.7;
      crown.rotation.z = -angle * 0.06;
    }
  }

  function tusk(side: number) {
    const curve = new CatmullRomCurve3([
      new Vector3(side * 0.48, -1.2, 0.74), new Vector3(side * 0.55, -1.02, 0.83),
      new Vector3(side * 0.58, -0.78, 0.86), new Vector3(side * 0.54, -0.62, 0.83),
    ]);
    const points: number[] = [], indices: number[] = [];
    for (let i = 0; i <= 28; i++) {
      const t = i / 28, point = curve.getPoint(t), tangent = curve.getTangent(t);
      const normal = new Vector3(0, 0, 1).cross(tangent).normalize();
      const binormal = tangent.clone().cross(normal).normalize();
      const radius = 0.099 * Math.pow(1 - t, 0.72) + 0.0015;
      for (let j = 0; j < 16; j++) {
        const a = j / 16 * Math.PI * 2;
        const vertex = point.clone().addScaledVector(normal, Math.cos(a) * radius).addScaledVector(binormal, Math.sin(a) * radius);
        points.push(vertex.x, vertex.y, vertex.z);
        if (i < 28) {
          const a0 = i * 16 + j, b0 = i * 16 + (j + 1) % 16;
          indices.push(a0, b0, a0 + 16, b0, b0 + 16, a0 + 16);
        }
      }
    }
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new Float32BufferAttribute(points, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    mesh(jawParts, `lower-tusk-${side}`, geometry, enamel);
  }
  tusk(-1);
  tusk(1);

  // A recessed monocle with an actual open barrel, knurled bezel, and optical glass.
  const monocle = new Group();
  monocle.name = "monocle-pivot";
  monocle.position.set(-0.49, 0.67, 0.93);
  monocle.rotation.y = -0.12;
  head.add(monocle);
  const socketPlate = new Shape();
  socketPlate.moveTo(-0.46, 0.30);
  socketPlate.bezierCurveTo(-0.19, 0.56, 0.27, 0.50, 0.43, 0.28);
  socketPlate.bezierCurveTo(0.51, 0.03, 0.40, -0.39, 0.16, -0.47);
  socketPlate.bezierCurveTo(-0.12, -0.56, -0.42, -0.40, -0.48, -0.19);
  socketPlate.bezierCurveTo(-0.53, -0.05, -0.50, 0.14, -0.46, 0.30);
  hole(socketPlate, 0, 0, 0.302);
  mesh(monocle, "cast-orbital-flange", extrude(socketPlate, 0.08, 0.018), darkSteel, [0, 0, -0.135]);

  turnedProfile(monocle, "beveled-lens-barrel", [
    [0.319, -0.076], [0.423, -0.076], [0.446, -0.052], [0.449, 0.105],
    [0.457, 0.136], [0.453, 0.18], [0.435, 0.198], [0.382, 0.198],
    [0.367, 0.185], [0.334, 0.078], [0.321, 0.047], [0.319, -0.076],
  ], steel);
  const focusRing = new Shape();
  for (let i = 0; i < 72 * 4; i++) {
    const angle = i / (72 * 4) * Math.PI * 2;
    const radius = i % 4 === 1 || i % 4 === 2 ? 0.476 : 0.455;
    if (i === 0) focusRing.moveTo(radius, 0);
    else focusRing.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
  }
  focusRing.closePath();
  hole(focusRing, 0, 0, 0.435);
  mesh(monocle, "knurled-focus-ring", extrude(focusRing, 0.076, 0.003), darkSteel, [0, 0, 0.008]);
  ring(monocle, "lens-retainer", [0, 0, 0.055], 0.327, 0.009, darkSteel);
  disc(monocle, "dark-lens-backing", [0, 0, -0.046], 0.321, 0.018, recess);
  orb(monocle, "recessed-optical-glass", [0, 0, 0.027], [0.322, 0.322, 0.029], lensMaterial);
  gear(monocle, "lens-adjustment-upper", [-0.27, 0.45, -0.015], 0.13, 18, 0.05, 0);
  gear(monocle, "lens-adjustment-outer", [-0.46, 0.27, -0.025], 0.15, 20, 0.045, 4);
  disc(monocle, "focus-knob", [-0.47, -0.04, 0.015], 0.075, 0.12, edge);
  ring(monocle, "focus-knob-groove", [-0.47, -0.04, 0.08], 0.044, 0.012, recess);
  bolt(monocle, [0.133, -0.42, -0.023], undefined, 0.6);

  // The cast housing follows the two gear circles and the shared tangent between them.
  const axle: Point2 = [0, 0.10];
  const pinion: Point2 = [-0.132, -0.48];
  function driveOutline(path: Path, upperRadius: number, lowerRadius: number) {
    const dx = pinion[0] - axle[0], dy = pinion[1] - axle[1];
    const axis = Math.atan2(dy, dx);
    const tangent = Math.acos((upperRadius - lowerRadius) / Math.hypot(dx, dy));
    const first = axis + tangent, last = axis - tangent + Math.PI * 2;
    path.moveTo(axle[0] + Math.cos(first) * upperRadius, axle[1] + Math.sin(first) * upperRadius);
    path.absarc(axle[0], axle[1], upperRadius, first, last, false);
    path.absarc(pinion[0], pinion[1], lowerRadius, last, first + Math.PI * 2, false);
    path.closePath();
  }

  const driveBack = new Shape();
  driveOutline(driveBack, 0.42, 0.289);
  const driveBackGeometry = extrude(driveBack, 0.031, 0.008);
  const driveCover = new Shape();
  driveOutline(driveCover, 0.428, 0.294);
  const gearWindow = new Path();
  driveOutline(gearWindow, 0.373, 0.261);
  driveCover.holes.push(gearWindow);
  const driveCoverGeometry = extrude(driveCover, 0.085, 0.008);

  for (const side of [-1, 1]) {
    const transmission = new Group();
    transmission.name = `jaw-transmission-${side}`;
    transmission.position.set(side * 0.88, -0.04, -0.08);
    transmission.rotation.y = side * 1.43;
    transmission.scale.x = side;
    head.add(transmission);
    mesh(transmission, "cast-drive-back", driveBackGeometry, recess, [0, 0, -0.026]);
    mesh(transmission, "cast-drive-housing", driveCoverGeometry, steel, [0, 0, 0.014]);
    const upper = gear(transmission, `main-jaw-gear-${side}`, [...axle, 0.025], 0.355, 36, 0.058, 4, { secondaryPorts: true });
    upper.rotation.z = 0.18;
    gear(transmission, `lower-jaw-gear-${side}`, [...pinion, 0.025], 0.246, 28, 0.055, 0, { bore: 0.42 });
    gear(transmission, `jaw-idler-${side}`, [-0.31, -0.76, 0.07], 0.10, 15, 0.055, 0);
    ring(transmission, "lower-bearing-collar", [...pinion, 0.102], 0.14, 0.013, darkSteel);
    bolt(transmission, [-0.31, -0.76, 0.14], undefined, 0.8);

    rod(jawParts, "jaw-piston-body", [side * 0.86, -0.30, 0.25], [side * 0.73, -0.92, 0.61], 0.062, steel);
    rod(jawParts, "jaw-piston-rod", [side * 0.74, -0.85, 0.58], [side * 0.56, -1.30, 0.82], 0.029, edge);
    rod(jawParts, "mandible-brace", [side * 0.88, -0.81, -0.02], [side * 0.50, -1.39, 0.78], 0.055, darkSteel);
    orb(jawParts, "piston-ball-joint", [side * 0.56, -1.30, 0.82], [0.08, 0.08, 0.08], steel);
    bolt(jawParts, [side * 0.55, -1.30, 0.88], undefined, 0.8);
  }

  // Vented chin armor. The slots are holes through the plate.
  const chin = new Shape();
  chin.moveTo(-0.47, 0.10);
  chin.bezierCurveTo(-0.39, 0.26, 0.39, 0.26, 0.47, 0.10);
  chin.bezierCurveTo(0.44, -0.23, -0.44, -0.23, -0.47, 0.10);
  for (const x of [-0.235, -0.078, 0.078, 0.235]) {
    const vent = new Path();
    const bottom = -0.094 + Math.abs(x) * 0.10;
    vent.moveTo(x - 0.041, bottom + 0.028);
    vent.lineTo(x - 0.05, 0.097);
    vent.quadraticCurveTo(x, 0.155, x + 0.05, 0.097);
    vent.lineTo(x + 0.041, bottom + 0.028);
    vent.quadraticCurveTo(x, bottom - 0.016, x - 0.041, bottom + 0.028);
    chin.holes.push(vent);
  }
  const chinGeometry = extrude(chin, 0.04, 0.014);
  const chinPositions = chinGeometry.getAttribute("position");
  for (let i = 0; i < chinPositions.count; i++) {
    const x = chinPositions.getX(i), y = chinPositions.getY(i);
    chinPositions.setZ(i, chinPositions.getZ(i) - 0.52 * x * x + y * 0.17);
  }
  chinGeometry.computeVertexNormals();
  orb(jawParts, "chin-vent-recess", [0, -1.43, 0.87], [0.335, 0.152, 0.039], recess);
  mesh(jawParts, "vented-chin-guard", chinGeometry, steel, [0, -1.43, 0.925]);
  for (const side of [-1, 1]) bolt(jawParts, [side * 0.39, -1.40, 0.891], new Vector3(side * 0.42, -0.17, 1), 0.68);

  function skullPoint(theta: number, phi: number, offset = 0): Point {
    return [(1.036 + offset) * Math.sin(theta) * Math.sin(phi), 1.02 + (1.226 + offset) * Math.cos(theta), -0.12 + (0.909 + offset) * Math.sin(theta) * Math.cos(phi)];
  }

  function skullNormal(point: Point) {
    return new Vector3(point[0], (point[1] - 1.02) / 1.45, (point[2] + 0.12) / 0.82).normalize();
  }

  function patch(name: string, t0: number, t1: number, p0: number, p1: number, material: Material, offset = 0.016) {
    const points: number[] = [], indices: number[] = [];
    const n = 20;
    for (let i = 0; i <= n; i++) {
      for (let j = 0; j <= n; j++) {
        points.push(...skullPoint(t0 + (t1 - t0) * i / n, p0 + (p1 - p0) * j / n, offset));
        if (i < n && j < n) {
          const a = i * (n + 1) + j;
          indices.push(a, a + n + 1, a + 1, a + 1, a + n + 1, a + n + 2);
        }
      }
    }
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new Float32BufferAttribute(points, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    mesh(head, name, geometry, material);
    const outline: Point[] = [];
    for (let i = 0; i <= 16; i++) outline.push(skullPoint(t0, p0 + (p1 - p0) * i / 16, offset + 0.009));
    for (let i = 1; i <= 16; i++) outline.push(skullPoint(t0 + (t1 - t0) * i / 16, p1, offset + 0.009));
    for (let i = 1; i <= 16; i++) outline.push(skullPoint(t1, p1 - (p1 - p0) * i / 16, offset + 0.009));
    for (let i = 1; i < 16; i++) outline.push(skullPoint(t1 - (t1 - t0) * i / 16, p0, offset + 0.009));
    tube(head, `${name}-rolled-edge`, outline, 0.011, edge, true);
  }

  patch("frontal-armor", 0.30, 1.28, -0.68, -0.045, steel);
  patch("parietal-armor", 0.28, 1.23, -1.48, -0.72, darkSteel);
  patch("rear-armor", 0.32, 1.32, -2.32, -1.53, steel);
  for (const phi of [-0.10, -0.63, -0.78, -1.42, -1.60, -2.25]) {
    for (const theta of [0.43, 0.88, 1.18]) {
      const point = skullPoint(theta, phi, 0.044);
      bolt(head, point, skullNormal(point), 0.85);
    }
  }

  // Sewn leather harness across the crown and around the back of the skull.
  patch("crown-harness", 0.16, 1.46, 0.70, 0.88, leather, 0.024);
  patch("rear-harness", 1.35, 1.48, 0.79, 3.62, leather, 0.025);
  for (let i = 0; i < 38; i++) {
    const theta = 0.20 + i * 0.032;
    for (const phi of [0.725, 0.855]) {
      tube(head, "saddle-stitch", [skullPoint(theta, phi, 0.043), skullPoint(theta + 0.015, phi + 0.009, 0.043)], 0.004, seam);
    }
  }
  const harnessStud = skullPoint(1.39, 0.79, 0.057);
  bolt(head, harnessStud, skullNormal(harnessStud), 1.5);

  // Buckled seam follows the split between bone and frontal metal.
  for (const theta of [0.43, 0.69, 0.95, 1.17]) {
    const point = skullPoint(theta, -0.04, 0.035);
    const buckle = new Group();
    buckle.position.set(...point);
    buckle.quaternion.setFromUnitVectors(new Vector3(0, 0, 1), skullNormal(point));
    head.add(buckle);
    orb(buckle, "seam-clamp", [0, 0, 0], [0.115, 0.057, 0.035], steel);
    bolt(buckle, [-0.064, 0, 0.031], undefined, 0.6);
    bolt(buckle, [0.064, 0, 0.031], undefined, 0.6);
  }

  // A perforated service panel exposes a second train of gears behind the temple.
  const service = new Group();
  service.name = "temple-mechanism";
  service.position.set(-1.015, 0.92, -0.12);
  service.rotation.y = -Math.PI / 2;
  head.add(service);
  const cover = new Shape();
  cover.moveTo(-0.56, -0.32);
  cover.bezierCurveTo(-0.66, 0.0, -0.43, 0.50, 0, 0.53);
  cover.bezierCurveTo(0.42, 0.54, 0.61, 0.12, 0.52, -0.29);
  cover.quadraticCurveTo(0, -0.48, -0.56, -0.32);
  const upperWindow = new Path();
  upperWindow.moveTo(-0.42, 0.08);
  upperWindow.bezierCurveTo(-0.44, 0.26, -0.28, 0.36, -0.085, 0.30);
  upperWindow.bezierCurveTo(-0.035, 0.24, -0.20, 0.064, -0.31, 0.015);
  upperWindow.quadraticCurveTo(-0.41, -0.024, -0.42, 0.08);
  const frontWindow = new Path();
  frontWindow.moveTo(0.03, -0.064);
  frontWindow.bezierCurveTo(0.03, 0.037, 0.19, 0.254, 0.297, 0.247);
  frontWindow.bezierCurveTo(0.402, 0.23, 0.46, 0.083, 0.409, 0.006);
  frontWindow.bezierCurveTo(0.36, -0.068, 0.08, -0.176, 0.03, -0.064);
  const lowerWindow = new Path();
  lowerWindow.moveTo(-0.255, -0.176);
  lowerWindow.bezierCurveTo(-0.208, -0.129, -0.028, -0.147, 0.105, -0.221);
  lowerWindow.bezierCurveTo(0.155, -0.26, 0.017, -0.327, -0.13, -0.306);
  lowerWindow.bezierCurveTo(-0.222, -0.293, -0.308, -0.228, -0.255, -0.176);
  cover.holes.push(upperWindow, frontWindow, lowerWindow);
  disc(service, "gearbox-shadow", [0, 0, -0.02], 0.45, 0.035, recess);
  gear(service, "temple-large-gear", [-0.23, 0.13, 0.01], 0.18, 24, 0.035, 5);
  gear(service, "temple-small-gear", [0.24, 0.04, 0.01], 0.18, 23, 0.03, 6);
  gear(service, "temple-idler", [-0.06, -0.24, 0.01], 0.107, 17, 0.035, 0);
  mesh(service, "pierced-temple-cover", extrude(cover, 0.04, 0.012), steel, [0, 0, 0.07]);
  for (const point of [[-0.47, -0.26, 0.125], [0.43, -0.24, 0.125], [-0.35, 0.35, 0.125], [0.24, 0.39, 0.125]] as Point[]) bolt(service, point, undefined, 0.8);

  // Braided leads and small pressure fittings stay inside the reference's restrained palette.
  tube(head, "temple-conduit", [[-0.98, 1.20, -0.35], [-1.09, 1.03, 0.02], [-1.02, 0.90, 0.46], [-0.86, 0.70, 0.87]], 0.046, darkSteel);
  rod(head, "crown-pressure-fitting", [-0.61, 1.88, -0.04], [-0.79, 2.15, -0.04], 0.075, steel);
  orb(head, "fitting-cap", [-0.79, 2.15, -0.04], [0.088, 0.075, 0.088], darkSteel);
  tube(head, "crown-return-pipe", [[-0.79, 2.16, -0.04], [-0.65, 2.30, -0.18], [-0.33, 2.25, -0.29]], 0.038, steel);
  for (let i = 0; i < 3; i++) {
    const angle = -0.77 + i * 0.062;
    orb(monocle, "optical-index", [Math.cos(angle) * 0.419, Math.sin(angle) * 0.419, 0.199], [0.006, 0.006, 0.004], accent);
  }

  // Hairline sutures and restrained tool marks, drawn as physical incisions.
  const suture: Point[] = [];
  for (let i = 0; i < 65; i++) suture.push(skullPoint(0.25 + i * 0.016, 0.36 + Math.sin(i * 2.3) * 0.015, 0.004));
  tube(head, "cranial-suture", suture, 0.005, darkSteel);
  for (let i = 0; i < 18; i++) {
    const theta = 0.42 + ((i * 0.137) % 0.69), phi = -0.15 - ((i * 0.219) % 1.1);
    tube(head, "plate-tool-mark", [skullPoint(theta, phi, 0.021), skullPoint(theta + 0.028, phi + 0.05, 0.021), skullPoint(theta + 0.052, phi + 0.04, 0.021)], 0.003, recess);
  }

  const pedestal = new Group();
  pedestal.name = "turned-display-plinth";
  root.add(pedestal);
  const profile = [
    [0, -2.17], [0.83, -2.17], [0.94, -2.14], [0.97, -2.08],
    [0.96, -2.02], [0.89, -1.98], [0.85, -1.94], [0.83, -1.86],
    [0.72, -1.80], [0.58, -1.72], [0.51, -1.64], [0.50, -1.57],
    [0.55, -1.51], [0.57, -1.45], [0.54, -1.39], [0.43, -1.34],
    [0.39, -1.27], [0.39, -0.62], [0.46, -0.55], [0.48, -0.48], [0, -0.48],
  ].map(([radius, height]) => new Vector2(radius, height));
  mesh(pedestal, "lathed-pedestal", new LatheGeometry(profile, 96), darkSteel, [0, 0, -0.32]);
  const footTrim = ring(pedestal, "plinth-machined-edge", [0, -2.06, -0.32], 0.958, 0.012, steel);
  footTrim.rotation.x = Math.PI / 2;

  return {
    root,
    parts: { head, jaw, monocle, gears, pedestal },
    setAccent(value: string) {
      accent.color.set(value);
      accent.emissive.copy(new Color(value));
    },
    dispose() {
      const geometries = new Set<BufferGeometry>();
      root.traverse((object) => { if (object instanceof Mesh) geometries.add(object.geometry); });
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
    },
  };
}
