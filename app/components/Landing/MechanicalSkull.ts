import {
  BoxGeometry, BufferGeometry, CatmullRomCurve3, Color, CylinderGeometry,
  ExtrudeGeometry, Float32BufferAttribute, Group, LatheGeometry, Material, MathUtils, Matrix4,
  Mesh, MeshPhysicalMaterial, MeshStandardMaterial, Path, Shape, ShapeGeometry, SphereGeometry,
  TorusGeometry, TubeGeometry, Vector2, Vector3, type Texture,
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

type SurfaceFinish = {
  color: number;
  metalness: number;
  roughness: number;
  grain: number;
  erosion?: number;
  envMap?: Texture;
  turned?: boolean;
};

function weatheredMaterial({ color, metalness, roughness, grain, erosion = 0, envMap, turned = false }: SurfaceFinish) {
  const material = new MeshStandardMaterial({
    color, metalness, roughness, envMap: envMap ?? null, envMapIntensity: envMap ? 0.92 : 0.65,
  });
  material.onBeforeCompile = (shader) => {
    shader.uniforms.artifactGrain = { value: grain };
    shader.uniforms.artifactErosion = { value: erosion };
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nvarying vec3 vArtifactPosition;")
      .replace("#include <begin_vertex>", "#include <begin_vertex>\nvArtifactPosition = position;");
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", `#include <common>\nuniform float artifactGrain;\nuniform float artifactErosion;\n${grainShader}`)
      .replace("#include <color_fragment>", `#include <color_fragment>
        vec3 p = vArtifactPosition;
        float patina = artifactNoise(p * 6.0);
        float oxide = smoothstep(0.34, 0.77, artifactNoise(p * 10.0 + patina)) * artifactErosion;
        float footprint = max(length(dFdx(p)), length(dFdy(p)));
        float grainVisibility = 1.0 - smoothstep(0.28, 1.1, footprint * 82.0);
        diffuseColor.rgb *= mix(0.88, 1.10, patina) * mix(vec3(1.0), vec3(0.68, 0.61, 0.55), oxide);
        ${turned ? `
          float radius = length(p.xy);
          float feed = artifactNoise(vec3(radius * 52.0, 1.6, 4.1));
          float toolPhase = radius * 490.0 + feed * 2.0;
          float toolMarks = cos(toolPhase);
          float toolVisibility = 1.0 - smoothstep(0.65, 2.7, fwidth(toolPhase));
        ` : ""}
      `)
      .replace("#include <roughnessmap_fragment>", `#include <roughnessmap_fragment>
        roughnessFactor += (patina - 0.5) * 0.085 + oxide * 0.22;
        ${turned ? "roughnessFactor += (feed - 0.5) * 0.055 + 0.023 * toolMarks * toolVisibility;" : ""}
        roughnessFactor = clamp(roughnessFactor, 0.15, 0.98);
      `)
      .replace("#include <metalnessmap_fragment>", `#include <metalnessmap_fragment>
        metalnessFactor *= 1.0 - 0.23 * oxide;
      `)
      .replace("#include <normal_fragment_maps>", `#include <normal_fragment_maps>
        float casting = artifactNoise(p * 14.0) * 0.006;
        float micrograin = artifactNoise(p * 82.0) * 0.0012;
        vec2 slope = artifactGrain * (vec2(dFdx(casting), dFdy(casting))
          + grainVisibility * vec2(dFdx(micrograin), dFdy(micrograin)));
        ${turned ? "slope += 0.00017 * toolVisibility * vec2(dFdx(toolMarks), dFdy(toolMarks));" : ""}
        vec3 surfaceX = dFdx(-vViewPosition);
        vec3 surfaceY = dFdy(-vViewPosition);
        vec3 r1 = cross(surfaceY, normal);
        vec3 r2 = cross(normal, surfaceX);
        float determinant = dot(surfaceX, r1);
        vec3 gradient = sign(determinant) * (slope.x * r1 + slope.y * r2);
        normal = normalize(max(abs(determinant), 0.00000001) * normal - gradient);
      `);
  };
  material.customProgramCacheKey = () => turned ? "skull-turned-finish" : "skull-cast-finish";
  return material;
}

/** All pivots are deliberately named and independent; nothing in this factory animates. */
export function createMechanicalSkull(anatomy: SkullAnatomy, metalEnvironment: Texture) {
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
  jawSeat.rotation.x = -0.058;
  jaw.add(jawSeat);
  const jawParts = new Group();
  jawParts.position.copy(jaw.position).multiplyScalar(-1);
  jawSeat.add(jawParts);
  const gears: Group[] = [];

  const bone = createBoneMaterial();
  const steel = weatheredMaterial({
    color: 0x68747d, metalness: 0.93, roughness: 0.37, grain: 0.58, erosion: 0.37, envMap: metalEnvironment,
  });
  const darkSteel = weatheredMaterial({
    color: 0x3c464f, metalness: 0.94, roughness: 0.33, grain: 0.41, erosion: 0.43, envMap: metalEnvironment,
  });
  const machinedSteel = weatheredMaterial({
    color: 0x87939c, metalness: 0.98, roughness: 0.24, grain: 0.16, erosion: 0.14, envMap: metalEnvironment, turned: true,
  });
  const leather = weatheredMaterial({ color: 0x30383b, metalness: 0.07, roughness: 0.9, grain: 1.7, erosion: 0.5 });
  const enamel = new MeshPhysicalMaterial({
    color: 0xffffff, vertexColors: true, metalness: 0, roughness: 0.46,
    specularIntensity: 0.60, clearcoat: 0.14, clearcoatRoughness: 0.38, envMapIntensity: 0.62,
  });
  const edge = new MeshStandardMaterial({
    color: 0xa6b2b9, metalness: 1, roughness: 0.18, envMap: metalEnvironment, envMapIntensity: 0.88,
  });
  const recess = new MeshStandardMaterial({ color: 0x080e12, roughness: 0.84, metalness: 0.15 });
  const lensMaterial = new MeshPhysicalMaterial({
    color: 0xc6d6df, metalness: 0, roughness: 0.13, transmission: 0.9,
    ior: 1.52, thickness: 0.073, attenuationColor: new Color(0x8397a6),
    attenuationDistance: 0.37, clearcoat: 0.48, clearcoatRoughness: 0.15,
    envMapIntensity: 0.82,
  });
  const seam = new MeshStandardMaterial({ color: 0x8a9698, metalness: 0.25, roughness: 0.7 });
  const accent = new MeshStandardMaterial({ color: 0xc0d6d9, emissive: 0x8ebec5, emissiveIntensity: 0.25, metalness: 0.6, roughness: 0.32 });
  const materials: Material[] = [bone, steel, darkSteel, machinedSteel, leather, enamel, edge, recess, lensMaterial, seam, accent];
  const sphere = new SphereGeometry(1, 28, 20);
  const boltGeometry = new CylinderGeometry(0.035, 0.035, 0.023, 6);
  boltGeometry.rotateX(Math.PI / 2);
  const washerGeometry = new TorusGeometry(0.037, 0.008, 6, 16);
  const slotGeometry = new BoxGeometry(0.028, 0.005, 0.002);

  function mesh(parent: Group, name: string, geometry: BufferGeometry, material: Material | Material[], position: Point = [0, 0, 0]) {
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

  function hole(shape: Shape, x: number, y: number, radius: number, clockwise = true) {
    const path = new Path();
    path.absarc(x, y, radius, 0, Math.PI * 2, clockwise);
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
    mesh(assembly, "toothed-wheel", extrude(shape, depth, Math.min(0.004, module * 0.18)), [machinedSteel, edge]);
    ring(assembly, "machined-outer-lip", [0, 0, depth + 0.006], tip * 0.77, tip * 0.026, edge);
    turnedProfile(assembly, "stepped-axle-bearing", [
      [tip * bore, depth - 0.005], [tip * (bore + 0.105), depth - 0.005],
      [tip * (bore + 0.105), depth + 0.009], [tip * (bore + 0.081), depth + 0.017],
      [tip * (bore + 0.026), depth + 0.017], [tip * bore, depth + 0.010],
      [tip * bore, depth - 0.005],
    ], machinedSteel);
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
  ], machinedSteel);
  const focusRing = new Shape();
  for (let i = 0; i < 72 * 4; i++) {
    const angle = i / (72 * 4) * Math.PI * 2;
    const radius = i % 4 === 1 || i % 4 === 2 ? 0.476 : 0.455;
    if (i === 0) focusRing.moveTo(radius, 0);
    else focusRing.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
  }
  focusRing.closePath();
  hole(focusRing, 0, 0, 0.435);
  mesh(monocle, "knurled-focus-ring", extrude(focusRing, 0.076, 0.003), [darkSteel, steel], [0, 0, focusDepth]);
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
  const driveX = pinion[0] - axle[0], driveY = pinion[1] - axle[1];
  const driveLength = Math.hypot(driveX, driveY);
  const driveModule = driveLength / 30;
  const idlerCenter: Point2 = [pinion[0] - driveModule * 8, pinion[1] - driveModule * Math.sqrt(18 ** 2 - 8 ** 2)];
  const upperCoverRadius = 0.445, lowerCoverRadius = 0.313;
  const coverBevel = 0.009;
  function driveOutline(path: Path, upperRadius: number, lowerRadius: number) {
    const axis = Math.atan2(driveY, driveX);
    const tangent = Math.acos((upperRadius - lowerRadius) / driveLength);
    const first = axis + tangent, last = axis - tangent + Math.PI * 2;
    path.moveTo(axle[0] + Math.cos(first) * upperRadius, axle[1] + Math.sin(first) * upperRadius);
    path.absarc(axle[0], axle[1], upperRadius, first, last, false);
    path.absarc(pinion[0], pinion[1], lowerRadius, last, first + Math.PI * 2, false);
    path.closePath();
  }

  const driveBack = new Shape();
  driveOutline(driveBack, 0.436, 0.305);
  const driveCover = new Shape();
  driveOutline(driveCover, upperCoverRadius, lowerCoverRadius);
  const gearWindow = new Path();
  driveOutline(gearWindow, 0.395, 0.279);
  driveCover.holes.push(gearWindow);

  function curveCasting(geometry: BufferGeometry, offset: (x: number, y: number) => number) {
    const positions = geometry.getAttribute("position");
    const normals = geometry.getAttribute("normal");
    const normal = new Vector3();
    const step = 0.001;
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i), y = positions.getY(i);
      positions.setZ(i, positions.getZ(i) + offset(x, y));
      const slopeX = (offset(x + step, y) - offset(x - step, y)) / (2 * step);
      const slopeY = (offset(x, y + step) - offset(x, y - step)) / (2 * step);
      normal.fromBufferAttribute(normals, i);
      normal.x -= slopeX * normal.z;
      normal.y -= slopeY * normal.z;
      normal.normalize();
      normals.setXYZ(i, normal.x, normal.y, normal.z);
    }
    return geometry;
  }

  // The rear casting nests into the cheek seat. The outer rim stays in the
  // same plane as the gears so the cheekbone cannot cut across its face.
  const driveBackGeometry = curveCasting(extrude(driveBack, 0.057, coverBevel), (_, y) => (
    -0.106 * MathUtils.smoothstep(y, axle[1] + 0.18, axle[1] + 0.42)
  ));
  const driveBedGeometry = new ShapeGeometry(driveBack, 24);
  const driveCoverGeometry = extrude(driveCover, 0.072, coverBevel);
  const clearanceRadius = upperCoverRadius + coverBevel + 0.006;
  const radiusChange = lowerCoverRadius - upperCoverRadius;
  const travelDenominator = driveLength * driveLength - radiusChange * radiusChange;

  function underDriveCover(x: number, y: number) {
    const fromAxleX = x - axle[0], fromAxleY = y - axle[1];
    // Minimize the distance to the circles that form the tapered outline.
    const t = MathUtils.clamp((fromAxleX * driveX + fromAxleY * driveY + clearanceRadius * radiusChange) / travelDenominator, 0, 1);
    const radius = clearanceRadius + t * radiusChange;
    return (fromAxleX - t * driveX) ** 2 + (fromAxleY - t * driveY) ** 2 <= radius * radius;
  }

  const chinHeight = -1.44;
  function chinDepth(x: number, y: number) {
    return 0.350 + 0.76 * y + 1.47 * y * y - 0.74 * x * x - 0.028 * MathUtils.smoothstep(Math.abs(x), 0.18, 0.44);
  }

  const jawVertices = anatomy.mandible.getAttribute("position");
  jawParts.updateWorldMatrix(true, false);
  for (const side of [-1, 1]) {
    const transmission = new Group();
    transmission.name = `jaw-transmission-${side}`;
    transmission.position.set(side * 0.91, -0.315, anatomy.hinge[2] - 0.03);
    transmission.rotation.y = side * 1.43;
    transmission.rotateX(0.20);
    transmission.scale.x = side;
    head.add(transmission);
    transmission.updateWorldMatrix(true, false);
    const toDrive = transmission.matrixWorld.clone().invert();
    let seatDepth = -0.055;
    const jawToDrive = toDrive.clone().multiply(jawParts.matrixWorld);
    for (const [vertices, transform] of [[skullVertices, toDrive], [jawVertices, jawToDrive]] as const) {
      for (let i = 0; i < vertices.count; i++) {
        sample.fromBufferAttribute(vertices, i).applyMatrix4(transform);
        const inIdler = (sample.x - idlerCenter[0]) ** 2 + (sample.y - idlerCenter[1]) ** 2 <= 0.149 ** 2;
        if (underDriveCover(sample.x, sample.y) || inIdler) {
          seatDepth = Math.max(seatDepth, sample.z + 0.018);
        }
      }
    }
    transmission.translateZ(seatDepth);

    turnedProfile(transmission, "cheek-recess-bearing-seat", [
      [0.102, -0.27], [0.14, -0.27], [0.19, -0.15], [0.24, -0.097],
      [0.267, -0.038], [0.267, 0.006], [0.102, 0.006], [0.102, -0.27],
    ], darkSteel, [...axle, 0]);
    disc(transmission, "inboard-axle", [...axle, -0.20], 0.09, 0.53, darkSteel);
    mesh(transmission, "cast-drive-back", driveBackGeometry, darkSteel, [0, 0, -0.061]);
    mesh(transmission, "drive-gear-bed", driveBedGeometry, recess, [0, 0, 0.008]);
    mesh(transmission, "cast-drive-housing", driveCoverGeometry, [steel, darkSteel], [0, 0, 0.006]);
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
    for (const angle of [-0.26, 0.42, 2.88]) {
      bolt(transmission, [Math.cos(angle) * 0.418, axle[1] + Math.sin(angle) * 0.418, 0.076], undefined, 0.39);
    }

    // The inboard end of the axle drives a short crank behind the cheek.
    // Its pull cylinder crosses the opening on the tongue side of the jaw.
    const crankPivot = transmission.localToWorld(new Vector3(...axle, -0.43));
    const pullTop = new Vector3(side * 0.365, -0.357, 0.113);
    const pullFoot: Point = [side * 0.172, -1.161, 0.453];
    const pullBottom = jawParts.localToWorld(new Vector3(...pullFoot));
    const crankShoulder = crankPivot.clone().lerp(pullTop, 0.56).add(new Vector3(0, -0.057, -0.03));
    tube(head, "inboard-bell-crank", [crankPivot, crankShoulder, pullTop].map(pointFromVector), 0.048, darkSteel);
    orb(head, "pull-top-eye", pointFromVector(pullTop), [0.064, 0.065, 0.061], steel);
    rod(head, "pull-top-pin", [pullTop.x - 0.071, pullTop.y, pullTop.z], [pullTop.x + 0.071, pullTop.y, pullTop.z], 0.025, machinedSteel);

    const pullAxis = pullBottom.clone().sub(pullTop);
    const stroke = pullAxis.length();
    const sleeveProfile = [
      [0, 0], [0.035, 0], [0.042, 0.08], [0.056, 0.15], [0.059, 0.43],
      [0.055, 0.49], [0.063, 0.51], [0.063, 0.57], [0.05, 0.60], [0.029, 0.60],
    ].map(([radius, travel]) => new Vector2(radius, travel * stroke));
    const sleeve = mesh(head, "inboard-pull-cylinder", new LatheGeometry(sleeveProfile, 32), darkSteel, pointFromVector(pullTop));
    sleeve.quaternion.setFromUnitVectors(new Vector3(0, 1, 0), pullAxis.normalize());
    const shaftStart = pullTop.clone().lerp(pullBottom, 0.52);
    rod(head, "inboard-draw-rod", pointFromVector(shaftStart), pointFromVector(pullBottom), 0.025, edge);
    orb(jawParts, "inner-jaw-clevis", pullFoot, [0.064, 0.059, 0.058], darkSteel);
    bolt(jawParts, [pullFoot[0] + side * 0.052, pullFoot[1], pullFoot[2]], new Vector3(side, 0, 0), 0.64);

    // A short, pierced tie joins the bottom of the gear case to the chin casting.
    const tieStart = transmission.localToWorld(new Vector3(...idlerCenter, 0.024));
    const lugY = 0.032;
    const lugX = side * 0.409;
    const jawLug: Point = [lugX, chinHeight + lugY, chinDepth(lugX, lugY) + 0.032];
    const tieEnd = jawParts.localToWorld(new Vector3(...jawLug));
    const tieAxis = tieEnd.clone().sub(tieStart);
    const length = tieAxis.length();
    tieAxis.normalize();
    const tieNormal = new Vector3(side, 0, 0.52);
    tieNormal.addScaledVector(tieAxis, -tieAxis.dot(tieNormal)).normalize();
    const tieUp = tieNormal.clone().cross(tieAxis);
    const tie = new Shape();
    tie.moveTo(0, 0.073);
    tie.bezierCurveTo(length * 0.27, 0.053, length * 0.68, 0.037, length, 0.055);
    tie.bezierCurveTo(length + 0.074, 0.055, length + 0.074, -0.055, length, -0.055);
    tie.bezierCurveTo(length * 0.68, -0.037, length * 0.27, -0.053, 0, -0.073);
    tie.bezierCurveTo(-0.094, -0.073, -0.094, 0.073, 0, 0.073);
    tie.closePath();
    hole(tie, 0, 0, 0.037, false);
    hole(tie, length, 0, 0.029, false);
    const link = mesh(head, "forged-chin-tie", extrude(tie, 0.038, 0.008), [steel, darkSteel], pointFromVector(tieStart));
    link.quaternion.setFromRotationMatrix(new Matrix4().makeBasis(tieAxis, tieUp, tieNormal));
    const tiePin = tieEnd.clone().addScaledVector(tieNormal, 0.043);
    rod(head, "chin-tie-pin", pointFromVector(tieEnd), pointFromVector(tiePin), 0.028, machinedSteel);
    bolt(head, pointFromVector(tiePin), tieNormal, 0.71);
  }

  // A curved casting wraps the jaw. The back of each vent is recessed and dark.
  const chin = new Shape();
  chin.moveTo(-0.455, 0.053);
  chin.bezierCurveTo(-0.43, 0.12, -0.31, 0.129, -0.22, 0.142);
  chin.bezierCurveTo(-0.087, 0.165, 0.086, 0.168, 0.224, 0.144);
  chin.bezierCurveTo(0.319, 0.129, 0.426, 0.118, 0.455, 0.055);
  chin.bezierCurveTo(0.437, -0.063, 0.344, -0.146, 0.247, -0.169);
  chin.bezierCurveTo(0.119, -0.208, -0.116, -0.209, -0.245, -0.171);
  chin.bezierCurveTo(-0.339, -0.146, -0.434, -0.068, -0.455, 0.053);
  chin.closePath();
  for (const x of [-0.249, -0.083, 0.083, 0.249]) {
    const vent = new Path();
    const top = 0.081 - Math.abs(x) * 0.06;
    const bottom = -0.168 + Math.abs(x) * 0.132;
    const toe = x * 0.91;
    vent.moveTo(x - 0.051, top - 0.018);
    vent.bezierCurveTo(x - 0.054, top - 0.079, toe - 0.045, bottom + 0.065, toe - 0.034, bottom + 0.024);
    vent.bezierCurveTo(toe - 0.023, bottom - 0.006, toe + 0.021, bottom - 0.006, toe + 0.032, bottom + 0.021);
    vent.bezierCurveTo(toe + 0.044, bottom + 0.051, x + 0.052, top - 0.079, x + 0.051, top - 0.017);
    vent.bezierCurveTo(x + 0.042, top + 0.013, x - 0.049, top + 0.007, x - 0.051, top - 0.018);
    vent.closePath();
    chin.holes.push(vent);
    const midY = (top + bottom) * 0.5;
    const wellOutline = vent.getPoints(14).map((p) => new Vector2(x + (p.x - x) * 1.16, midY + (p.y - midY) * 1.12));
    const well = curveCasting(new ShapeGeometry(new Shape(wellOutline)), chinDepth);
    mesh(jawParts, "recessed-chin-vent", well, recess, [0, chinHeight, 0.037]);
  }

  const chinCasting = curveCasting(extrude(chin, 0.062, 0.016), chinDepth);
  mesh(jawParts, "vented-chin-guard", chinCasting, [steel, darkSteel], [0, chinHeight, 0.01]);
  const chinLip: Point2[] = [
    [-0.427, 0.077], [-0.345, 0.11], [-0.222, 0.131], [-0.097, 0.139],
    [0.046, 0.143], [0.211, 0.132], [0.343, 0.111], [0.426, 0.078],
  ];
  tube(jawParts, "chin-guard-rolled-lip", chinLip.map(([x, y]): Point => (
    [x, chinHeight + y, chinDepth(x, y) + 0.066]
  )), 0.017, steel);
  for (const side of [-1, 1]) {
    const x = side * 0.374, y = -0.047;
    bolt(jawParts, [x, chinHeight + y, chinDepth(x, y) + 0.072], new Vector3(side * 0.59, -0.46, 1), 0.79);
  }

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
    [0.32, -1.27], [0.22, -1.17], [0.107, -1.06], [0.098, -0.47],
    [0.198, -0.39], [0.268, -0.34], [0.304, -0.28], [0.275, -0.221],
    [0.195, 0.08], [0, 0.08],
  ].map(([radius, height]) => new Vector2(radius, height));
  const plinthGeometry = new LatheGeometry(profile, 96);
  const plinthVertices = plinthGeometry.getAttribute("position");
  // Route the mount around the mouth and into the underside of the skull.
  for (let i = 0; i < plinthVertices.count; i++) {
    const y = plinthVertices.getY(i);
    const offset = 0.56 * MathUtils.smoothstep(y, -1.53, -0.94)
      - 0.13 * MathUtils.smoothstep(y, -0.43, 0.08);
    plinthVertices.setX(i, plinthVertices.getX(i) + offset);
  }
  plinthGeometry.computeVertexNormals();
  mesh(pedestal, "lathed-pedestal", plinthGeometry, darkSteel, [0, 0, -0.65]);
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
