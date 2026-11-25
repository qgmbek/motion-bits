import {
  BoxGeometry, BufferGeometry, CatmullRomCurve3, Color, CylinderGeometry,
  ExtrudeGeometry, Float32BufferAttribute, Group, LatheGeometry, Material,
  Mesh, MeshPhysicalMaterial, MeshStandardMaterial, Path, Shape, SphereGeometry,
  TorusGeometry, TubeGeometry, Vector2, Vector3,
} from "three";
import type { SkullAnatomy } from "./skullAnatomy";
import { createBoneMaterial } from "./boneMaterial";

type Point = readonly [number, number, number];
type Point2 = readonly [number, number];

function pointFromVector(vector: Vector3): Point {
  return [vector.x, vector.y, vector.z];
}

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
export function createMechanicalSkull(anatomy: SkullAnatomy) {
  const root = new Group();
  root.name = "mechanical-skull";
  const head = new Group();
  head.name = "cranium";
  root.add(head);
  const jaw = new Group();
  jaw.name = "jaw-pivot";
  jaw.position.set(...anatomy.hinge);
  head.add(jaw);
  const jawSeat = new Group();
  jawSeat.name = "mandible-open-rest";
  jawSeat.position.set(0, -0.022, 0.162);
  jawSeat.rotation.x = 0.038;
  jaw.add(jawSeat);
  const jawParts = new Group();
  jawParts.position.copy(jaw.position).multiplyScalar(-1);
  jawSeat.add(jawParts);
  const gears: Group[] = [];

  const bone = createBoneMaterial();
  const steel = weatheredMaterial(0x4d5860, 0.64, 0.51, 0.32, 0.24);
  const darkSteel = weatheredMaterial(0x26323a, 0.78, 0.52, 0.4);
  const leather = weatheredMaterial(0x30383b, 0.12, 0.9, 1.7, 0.5);
  const enamel = new MeshPhysicalMaterial({
    color: 0xffffff, vertexColors: true, metalness: 0, roughness: 0.46,
    specularIntensity: 0.60, clearcoat: 0.14, clearcoatRoughness: 0.38, envMapIntensity: 0.62,
  });
  const tuskMaterial = weatheredMaterial(0xb7a991, 0, 0.59, 0.2, 0.16);
  const edge = new MeshStandardMaterial({ color: 0x98a5ac, metalness: 0.86, roughness: 0.32 });
  const recess = new MeshStandardMaterial({ color: 0x080e12, roughness: 0.84, metalness: 0.15 });
  const lensMaterial = new MeshPhysicalMaterial({
    color: 0xc6d6df, metalness: 0, roughness: 0.13, transmission: 0.9,
    ior: 1.52, thickness: 0.073, attenuationColor: new Color(0x8397a6),
    attenuationDistance: 0.37, clearcoat: 0.48, clearcoatRoughness: 0.15,
    envMapIntensity: 0.82,
  });
  const seam = new MeshStandardMaterial({ color: 0x8a9698, metalness: 0.25, roughness: 0.7 });
  const accent = new MeshStandardMaterial({ color: 0xc0d6d9, emissive: 0x8ebec5, emissiveIntensity: 0.25, metalness: 0.6, roughness: 0.32 });
  const materials: Material[] = [bone, steel, darkSteel, leather, enamel, tuskMaterial, edge, recess, lensMaterial, seam, accent];
  const sphere = new SphereGeometry(1, 28, 20);
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
    options: { bore?: number; secondaryPorts?: boolean; module?: number } = {},
  ) {
    const assembly = new Group();
    assembly.name = name;
    assembly.position.set(...at);
    parent.add(assembly);
    gears.push(assembly);
    const module = options.module ?? radius / (teeth / 2 + 1);
    const pitch = module * teeth / 2;
    const tip = pitch + module;
    const rootRadius = pitch - 1.20 * module;
    const pressureAngle = Math.PI / 9;
    const base = pitch * Math.cos(pressureAngle);
    const flankStart = Math.max(rootRadius, base);
    const pitchStep = Math.PI * 2 / teeth;
    const involute = (angle: number) => Math.tan(angle) - angle;
    const flankAngle = (distance: number) => (
      pitchStep * 0.232 + involute(pressureAngle) -
      involute(Math.acos(Math.min(1, base / distance)))
    );
    const rootAngle = Math.min(pitchStep * 0.42, flankAngle(flankStart) + pitchStep * 0.055);
    const shape = new Shape();
    const line = (distance: number, angle: number) => shape.lineTo(Math.cos(angle) * distance, Math.sin(angle) * distance);
    shape.moveTo(rootRadius * Math.cos(-pitchStep / 2), rootRadius * Math.sin(-pitchStep / 2));
    for (let i = 0; i < teeth; i++) {
      const angle = i * pitchStep;
      line(rootRadius, angle - rootAngle);
      for (let step = 0; step <= 4; step++) {
        const distance = flankStart + (tip - flankStart) * step / 4;
        line(distance, angle - flankAngle(distance));
      }
      line(tip, angle);
      for (let step = 4; step >= 0; step--) {
        const distance = flankStart + (tip - flankStart) * step / 4;
        line(distance, angle + flankAngle(distance));
      }
      line(rootRadius, angle + rootAngle);
      line(rootRadius, angle + pitchStep / 2);
    }
    shape.closePath();
    const bore = options.bore ?? 0.17;
    hole(shape, 0, 0, tip * bore);
    for (let i = 0; i < ports; i++) {
      const angle = i / ports * Math.PI * 2;
      hole(shape, Math.cos(angle) * tip * 0.52, Math.sin(angle) * tip * 0.52, tip * 0.155);
      if (options.secondaryPorts) {
        const offset = angle + Math.PI / ports;
        hole(shape, Math.cos(offset) * tip * 0.57, Math.sin(offset) * tip * 0.57, tip * 0.086);
      }
    }
    mesh(assembly, "toothed-wheel", extrude(shape, depth, Math.min(0.004, module * 0.18)), steel);
    ring(assembly, "machined-outer-lip", [0, 0, depth + 0.006], tip * 0.77, tip * 0.026, edge);
    turnedProfile(assembly, "stepped-axle-bearing", [
      [tip * bore, depth - 0.005], [tip * (bore + 0.105), depth - 0.005],
      [tip * (bore + 0.105), depth + 0.009], [tip * (bore + 0.081), depth + 0.017],
      [tip * (bore + 0.026), depth + 0.017], [tip * bore, depth + 0.010],
      [tip * bore, depth - 0.005],
    ], edge);
    if (bore <= 0.22) disc(assembly, "recessed-axle", [0, 0, -0.015], tip * 0.14, 0.026, darkSteel);
    return assembly;
  }

  function phaseGear(driver: Group, follower: Group, drivingTeeth: number, drivenTeeth: number) {
    const contact = Math.atan2(follower.position.y - driver.position.y, follower.position.x - driver.position.x);
    follower.rotation.z = contact + Math.PI + ((contact - driver.rotation.z) * drivingTeeth - Math.PI) / drivenTeeth;
  }

  // Use the baked cavity shading on the cranium to avoid shadow-map artifacts
  // around the forehead hardware and upper sockets.
  mesh(head, "ct-cranium-and-maxilla", anatomy.cranium, bone).receiveShadow = false;
  mesh(jawParts, "ct-mandible", anatomy.mandible, bone);
  if (anatomy.upperTeeth) {
    mesh(head, "upper-dental-crowns", anatomy.upperTeeth, enamel).receiveShadow = false;
  }
  mesh(jawParts, "lower-dental-crowns", anatomy.lowerTeeth, enamel);

  function tusk(side: number, outer = false) {
    const profile: Point[] = outer
      ? [[0.489, -1.207, 0.264], [0.515, -1.103, 0.323], [0.531, -0.988, 0.352], [0.516, -0.915, 0.346]]
      : [[0.354, -1.24, 0.361], [0.408, -1.085, 0.50], [0.44, -0.796, 0.589], [0.417, side > 0 ? -0.55 : -0.585, 0.598]];
    const curve = new CatmullRomCurve3(profile.map(([x, y, z]) => new Vector3(side * x, y, z)));
    const points: number[] = [], indices: number[] = [];
    for (let i = 0; i <= 28; i++) {
      const t = i / 28, point = curve.getPoint(t), tangent = curve.getTangent(t);
      const normal = new Vector3(0, 0, 1).cross(tangent).normalize();
      const binormal = tangent.clone().cross(normal).normalize();
      const radius = (outer ? 0.043 : 0.102) * Math.pow(1 - t, 0.79) + 0.0015;
      for (let j = 0; j < 16; j++) {
        const a = j / 16 * Math.PI * 2;
        const ridge = 1 + 0.055 * Math.cos(a * 3 + t * Math.PI) * Math.sin(t * Math.PI);
        const vertex = point.clone().addScaledVector(normal, Math.cos(a) * radius * ridge)
          .addScaledVector(binormal, Math.sin(a) * radius * 0.78);
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
    mesh(jawParts, `lower-${outer ? "outer-spur" : "tusk"}-${side}`, geometry, tuskMaterial);
  }
  tusk(-1);
  tusk(1);
  tusk(-1, true);
  tusk(1, true);

  // A recessed monocle with an actual open barrel, knurled bezel, and optical glass.
  const monocle = new Group();
  monocle.name = "monocle-pivot";
  monocle.position.set(-0.518, 0.654, 1.02);
  monocle.rotation.y = -0.21;
  head.add(monocle);
  const socketPlate = new Shape();
  socketPlate.moveTo(-0.46, 0.30);
  socketPlate.bezierCurveTo(-0.19, 0.56, 0.27, 0.50, 0.43, 0.28);
  socketPlate.bezierCurveTo(0.51, 0.03, 0.40, -0.39, 0.16, -0.47);
  socketPlate.bezierCurveTo(-0.12, -0.56, -0.42, -0.40, -0.48, -0.19);
  socketPlate.bezierCurveTo(-0.53, -0.05, -0.50, 0.14, -0.46, 0.30);
  hole(socketPlate, 0, 0, 0.302);
  mesh(monocle, "cast-orbital-flange", extrude(socketPlate, 0.08, 0.018), darkSteel, [0, 0, -0.135]);

  // Fit the optical seat along its own axis. Bone within the projected aperture
  // must end behind the backing plate, even at the inner edge near the nose.
  monocle.updateWorldMatrix(true, false);
  const toOptic = monocle.matrixWorld.clone().invert();
  const skullVertices = anatomy.cranium.getAttribute("position");
  const sample = new Vector3();
  let apertureBone = 0;
  let rimBone = 0;
  for (let i = 0; i < skullVertices.count; i++) {
    sample.fromBufferAttribute(skullVertices, i).applyMatrix4(toOptic);
    const radiusSquared = sample.x ** 2 + sample.y ** 2;
    if (radiusSquared <= 0.345 ** 2) apertureBone = Math.max(apertureBone, sample.z);
    if (radiusSquared <= 0.47 ** 2) rimBone = Math.max(rimBone, sample.z);
  }
  const glassSeat = apertureBone + 0.052;
  const barrelFace = Math.max(rimBone + 0.056, glassSeat + 0.108);
  const focusDepth = barrelFace - 0.192;

  turnedProfile(monocle, "beveled-lens-barrel", [
    [0.319, -0.076], [0.419, -0.076], [0.439, -0.054], [0.443, focusDepth],
    [0.448, barrelFace - 0.098], [0.463, barrelFace - 0.078], [0.463, barrelFace - 0.022],
    [0.448, barrelFace - 0.006], [0.432, barrelFace], [0.386, barrelFace],
    [0.371, barrelFace - 0.012], [0.342, glassSeat + 0.018], [0.319, glassSeat + 0.012],
    [0.319, -0.076],
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
  mesh(monocle, "knurled-focus-ring", extrude(focusRing, 0.076, 0.003), darkSteel, [0, 0, focusDepth]);
  ring(monocle, "focus-ring-seam", [0, 0, focusDepth + 0.082], 0.448, 0.004, edge);
  ring(monocle, "barrel-rear-gasket", [0, 0, -0.063], 0.421, 0.014, recess);
  ring(monocle, "lens-retainer", [0, 0, glassSeat + 0.027], 0.328, 0.009, darkSteel);
  disc(monocle, "dark-lens-backing", [0, 0, glassSeat - 0.024], 0.323, 0.017, recess);
  const glass = turnedProfile(monocle, "ground-optical-glass", [
    [0, glassSeat], [0.294, glassSeat], [0.322, glassSeat + 0.004],
    [0.323, glassSeat + 0.018], [0.315, glassSeat + 0.024], [0.27, glassSeat + 0.033],
    [0.20, glassSeat + 0.040], [0.12, glassSeat + 0.045], [0, glassSeat + 0.047],
  ], lensMaterial);
  glass.castShadow = false;
  gear(monocle, "lens-adjustment-upper", [-0.27, 0.45, -0.015], 0.13, 18, 0.05, 0);
  gear(monocle, "lens-adjustment-outer", [-0.46, 0.27, -0.025], 0.15, 20, 0.045, 4);
  disc(monocle, "focus-knob", [-0.47, -0.04, 0.015], 0.075, 0.12, edge);
  ring(monocle, "focus-knob-groove", [-0.47, -0.04, 0.08], 0.044, 0.012, recess);
  bolt(monocle, [0.133, -0.42, -0.023], undefined, 0.6);

  // The cast housing follows the two gear circles and the shared tangent between them.
  const axle: Point2 = [0, 0.10];
  const pinion: Point2 = [-0.132, -0.48];
  const driveModule = Math.hypot(pinion[0] - axle[0], pinion[1] - axle[1]) / 30;
  const idlerCenter: Point2 = [pinion[0] - driveModule * 8, pinion[1] - driveModule * Math.sqrt(18 ** 2 - 8 ** 2)];
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
  driveOutline(driveBack, 0.436, 0.305);
  const driveBackGeometry = extrude(driveBack, 0.031, 0.008);
  const driveCover = new Shape();
  driveOutline(driveCover, 0.445, 0.313);
  const gearWindow = new Path();
  driveOutline(gearWindow, 0.395, 0.279);
  driveCover.holes.push(gearWindow);
  const driveCoverGeometry = extrude(driveCover, 0.085, 0.008);

  for (const side of [-1, 1]) {
    const transmission = new Group();
    transmission.name = `jaw-transmission-${side}`;
    transmission.position.set(side * 0.985, anatomy.hinge[1] - axle[1] - 0.065, anatomy.hinge[2]);
    transmission.rotation.y = side * 1.43;
    transmission.scale.x = side;
    head.add(transmission);
    transmission.updateWorldMatrix(true, false);
    const toDrive = transmission.matrixWorld.clone().invert();
    let cheekClearance = 0;
    for (let i = 0; i < skullVertices.count; i++) {
      sample.fromBufferAttribute(skullVertices, i).applyMatrix4(toDrive);
      const inUpperHousing = (sample.x - axle[0]) ** 2 + (sample.y - axle[1]) ** 2 <= 0.451 ** 2;
      const inLowerHousing = (sample.x - pinion[0]) ** 2 + (sample.y - pinion[1]) ** 2 <= 0.319 ** 2;
      if (inUpperHousing || inLowerHousing) cheekClearance = Math.max(cheekClearance, sample.z);
    }
    transmission.translateZ(cheekClearance + 0.04);
    const bearingCenter = transmission.localToWorld(new Vector3(...axle, -0.015));
    const innerAnchor = new Vector3(side * 0.80, bearingCenter.y, bearingCenter.z);
    rod(head, "temporal-axle-mount", pointFromVector(innerAnchor), pointFromVector(bearingCenter), 0.126, darkSteel);
    const shoulder = innerAnchor.clone().lerp(bearingCenter, 0.78);
    rod(head, "axle-standoff-shoulder", pointFromVector(shoulder), pointFromVector(bearingCenter), 0.153, steel);
    mesh(transmission, "cast-drive-back", driveBackGeometry, recess, [0, 0, -0.026]);
    mesh(transmission, "cast-drive-housing", driveCoverGeometry, steel, [0, 0, 0.014]);
    const sharedModule = { module: driveModule };
    const main = gear(transmission, `main-jaw-gear-${side}`, [...axle, 0.025], 0.377, 36, 0.055, 4, { ...sharedModule, secondaryPorts: true });
    const driven = gear(transmission, `lower-jaw-gear-${side}`, [...pinion, 0.025], 0.258, 24, 0.055, 0, { ...sharedModule, bore: 0.38 });
    const idler = gear(transmission, `jaw-idler-${side}`, [...idlerCenter, 0.025], 0.139, 12, 0.055, 0, sharedModule);
    main.rotation.z = 0.18;
    phaseGear(main, driven, 36, 24);
    phaseGear(driven, idler, 24, 12);
    disc(transmission, "idler-mounting-boss", [...idlerCenter, -0.008], 0.105, 0.059, darkSteel);
    bolt(transmission, [...axle, 0.101], undefined, 0.67);
    bolt(transmission, [...idlerCenter, 0.091], undefined, 0.48);
    for (const angle of [0.15, 1.23, 2.39]) {
      bolt(transmission, [Math.cos(angle) * 0.421, axle[1] + Math.sin(angle) * 0.421, 0.103], undefined, 0.39);
    }

    const jawMount: Point = [side * 0.382, -1.30, 0.302];
    const fixedMount = transmission.localToWorld(new Vector3(idlerCenter[0] + 0.075, idlerCenter[1] + 0.055, -0.05));
    const movingMount = jawParts.localToWorld(new Vector3(...jawMount));
    const cylinderEnd = fixedMount.clone().lerp(movingMount, 0.52);
    const glandEnd = fixedMount.clone().lerp(movingMount, 0.62);
    const glandStart = fixedMount.clone().lerp(movingMount, 0.49);
    rod(head, "piston-cylinder", pointFromVector(fixedMount), pointFromVector(cylinderEnd), 0.045, steel);
    rod(head, "piston-gland", pointFromVector(glandStart), pointFromVector(glandEnd), 0.05, darkSteel);
    rod(head, "polished-piston-shaft", pointFromVector(cylinderEnd), pointFromVector(movingMount), 0.024, edge);
    orb(jawParts, "piston-jaw-clevis", jawMount, [0.052, 0.052, 0.048], steel);
    bolt(jawParts, [jawMount[0] + side * 0.043, jawMount[1], jawMount[2]], new Vector3(side, 0, 0), 0.56);
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
    chinPositions.setZ(i, chinPositions.getZ(i) - 0.86 * x * x + y * 0.86);
  }
  chinGeometry.computeVertexNormals();
  const guard = mesh(jawParts, "vented-chin-guard", chinGeometry, steel, [0, -1.426, 0.347]);
  guard.scale.x = 0.84;
  for (const side of [-1, 1]) bolt(jawParts, [side * 0.329, -1.394, 0.288], new Vector3(side * 0.42, -0.65, 1), 0.68);

  const { skullPoint } = anatomy;

  function skullNormal(point: Point) {
    return new Vector3(point[0], point[1] - 1.04, (point[2] + 0.27) * 0.75).normalize();
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
  patch("rear-harness", 1.35, 1.48, 0.79, 4.41, leather, 0.025);
  for (let i = 0; i < 38; i++) {
    const theta = 0.20 + i * 0.032;
    for (const phi of [0.725, 0.855]) {
      tube(head, "saddle-stitch", [skullPoint(theta, phi, 0.043), skullPoint(theta + 0.015, phi + 0.009, 0.043)], 0.004, seam);
    }
  }
  const harnessStud = skullPoint(1.39, 0.79, 0.057);
  bolt(head, harnessStud, skullNormal(harnessStud), 1.5);
  const rearStud = skullPoint(1.41, 4.36, 0.05);
  bolt(head, rearStud, skullNormal(rearStud), 0.75);
  const opticMount = monocle.localToWorld(new Vector3(-0.15, 0.41, -0.048));
  const armorMount = new Vector3(...skullPoint(1.18, -0.43, 0.029));
  const braceMid = opticMount.clone().lerp(armorMount, 0.51).add(new Vector3(-0.024, 0.012, 0.018));
  tube(head, "orbital-to-forehead-brace", [opticMount, braceMid, armorMount].map(pointFromVector), 0.048, darkSteel);
  bolt(monocle, [-0.15, 0.415, -0.006], undefined, 0.65);
  const cap = pointFromVector(armorMount);
  bolt(head, cap, skullNormal(cap), 0.67);

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
  service.position.set(-1.10, 0.93, -0.40);
  service.rotation.y = -1.60;
  head.add(service);
  const cover = new Shape();
  cover.moveTo(-0.56, -0.32);
  cover.bezierCurveTo(-0.66, 0.0, -0.43, 0.50, 0, 0.53);
  cover.bezierCurveTo(0.42, 0.54, 0.61, 0.12, 0.52, -0.29);
  cover.quadraticCurveTo(0, -0.48, -0.56, -0.32);
  const serviceBack = extrude(cover, 0.21, 0.016);
  mesh(service, "cast-temple-gearbox", serviceBack, darkSteel, [0, 0, -0.22]);
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
  const rearSpindle: Point2 = [-0.254, 0.154];
  const frontSpindle: Point2 = [0.166, 0.051];
  const templeModule = Math.hypot(frontSpindle[0] - rearSpindle[0], frontSpindle[1] - rearSpindle[1]) / 26;
  const tailSpindle: Point2 = [
    frontSpindle[0] - templeModule * 12,
    frontSpindle[1] - templeModule * Math.sqrt(21 ** 2 - 12 ** 2),
  ];
  const templeOptions = { module: templeModule };
  const rearGear = gear(service, "temple-large-gear", [...rearSpindle, 0.01], 0.242, 27, 0.031, 5, templeOptions);
  const frontGear = gear(service, "temple-small-gear", [...frontSpindle, 0.01], 0.225, 25, 0.031, 6, templeOptions);
  const tailGear = gear(service, "temple-idler", [...tailSpindle, 0.01], 0.158, 17, 0.031, 0, { ...templeOptions, bore: 0.32 });
  phaseGear(rearGear, frontGear, 27, 25);
  phaseGear(frontGear, tailGear, 25, 17);
  mesh(service, "pierced-temple-cover", extrude(cover, 0.04, 0.012), steel, [0, 0, 0.07]);
  for (const point of [[-0.47, -0.26, 0.125], [0.43, -0.24, 0.125], [-0.35, 0.35, 0.125], [0.24, 0.39, 0.125]] as Point[]) bolt(service, point, undefined, 0.8);

  const feedStart = service.localToWorld(new Vector3(0.48, -0.075, 0.05));
  const feedEnd = monocle.localToWorld(new Vector3(-0.438, -0.13, focusDepth - 0.053));
  const feedExit = feedStart.clone().lerp(feedEnd, 0.12);
  const opticInlet = feedStart.clone().lerp(feedEnd, 0.88);
  const feedElbow = feedStart.clone().lerp(feedEnd, 0.48);
  feedElbow.x -= 0.07;
  tube(head, "covered-optic-feed", [feedStart, feedExit, feedElbow, opticInlet, feedEnd].map(pointFromVector), 0.037, darkSteel);
  rod(head, "gearbox-feed-union", pointFromVector(feedStart), pointFromVector(feedExit), 0.055, steel);
  rod(head, "optic-feed-union", pointFromVector(opticInlet), pointFromVector(feedEnd), 0.056, steel);

  for (const [theta, phi, height, radius] of [[0.68, -1.83, 0.21, 0.053], [0.79, -2.01, 0.155, 0.036]]) {
    const foot = skullPoint(theta, phi, 0.026);
    const direction = skullNormal(foot);
    const mount = new Vector3(...foot);
    const collar = mount.clone().addScaledVector(direction, 0.035);
    const stemTop = mount.clone().addScaledVector(direction, height - 0.034);
    const end = mount.clone().addScaledVector(direction, height);
    rod(head, "crown-bulkhead-collar", pointFromVector(mount), pointFromVector(collar), radius * 1.55, steel);
    rod(head, "crown-service-stem", pointFromVector(collar), pointFromVector(stemTop), radius, darkSteel);
    rod(head, "crown-service-cap", pointFromVector(stemTop), pointFromVector(end), radius * 1.22, edge);
  }
  for (let i = 0; i < 3; i++) {
    const angle = -0.77 + i * 0.062;
    orb(monocle, "optical-index", [Math.cos(angle) * 0.419, Math.sin(angle) * 0.419, barrelFace + 0.002], [0.006, 0.006, 0.004], accent);
  }

  const pedestal = new Group();
  pedestal.name = "turned-display-plinth";
  root.add(pedestal);
  const profile = [
    [0, -2.17], [0.83, -2.17], [0.94, -2.14], [0.97, -2.08],
    [0.96, -2.02], [0.89, -1.98], [0.85, -1.94], [0.83, -1.86],
    [0.72, -1.80], [0.58, -1.72], [0.51, -1.64], [0.50, -1.57],
    [0.55, -1.51], [0.57, -1.45], [0.54, -1.39], [0.43, -1.34],
    [0.32, -1.27], [0.24, -1.17], [0.137, -1.06], [0.124, -0.47],
    [0.198, -0.39], [0.268, -0.34], [0.304, -0.28], [0.275, -0.221],
    [0.195, 0.08], [0, 0.08],
  ].map(([radius, height]) => new Vector2(radius, height));
  mesh(pedestal, "lathed-pedestal", new LatheGeometry(profile, 96), darkSteel, [0, 0, -0.65]);
  const footTrim = ring(pedestal, "plinth-machined-edge", [0, -2.06, -0.65], 0.958, 0.012, steel);
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
