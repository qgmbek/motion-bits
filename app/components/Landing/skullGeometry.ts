import { BufferGeometry, Float32BufferAttribute } from "three";

type Field = (x: number, y: number, z: number) => number;
type Point = readonly [number, number, number];

function ellipsoid(x: number, y: number, z: number, rx: number, ry: number, rz: number) {
  const k0 = Math.sqrt((x / rx) ** 2 + (y / ry) ** 2 + (z / rz) ** 2);
  const k1 = Math.sqrt((x / (rx * rx)) ** 2 + (y / (ry * ry)) ** 2 + (z / (rz * rz)) ** 2);
  return k1 > 0.00001 ? k0 * (k0 - 1) / k1 : -Math.min(rx, ry, rz);
}

function blend(a: number, b: number, radius: number) {
  const h = Math.max(radius - Math.abs(a - b), 0) / radius;
  return Math.min(a, b) - h * h * radius * 0.25;
}

function capsule(x: number, y: number, z: number, a: Point, b: Point, radius: number) {
  const px = x - a[0], py = y - a[1], pz = z - a[2];
  const bx = b[0] - a[0], by = b[1] - a[1], bz = b[2] - a[2];
  const t = Math.max(0, Math.min(1, (px * bx + py * by + pz * bz) / (bx * bx + by * by + bz * bz)));
  return Math.hypot(px - bx * t, py - by * t, pz - bz * t) - radius;
}

const cranium: Field = (x, y, z) => {
  const side = Math.abs(x);
  let bone = ellipsoid(x, y - 1.02, z + 0.12, 1.02, 1.21, 0.89);
  bone = blend(bone, ellipsoid(x, y + 0.16, z - 0.68, 0.64, 0.38, 0.43), 0.19);
  bone = blend(bone, ellipsoid(side - 0.78, y - 0.13, z - 0.56, 0.29, 0.24, 0.32), 0.14);
  bone = blend(bone, ellipsoid(side - 0.88, y - 0.21, z + 0.01, 0.17, 0.15, 0.6), 0.12);
  bone = blend(bone, ellipsoid(x, y - 0.47, z - 0.86, 0.15, 0.42, 0.22), 0.12);
  bone = blend(bone, ellipsoid(side - 0.48, y - 1.04, z - 0.72, 0.47, 0.19, 0.25), 0.15);

  // Subtract real socket volumes. Their rear walls and orbital rims are part of the mesh.
  const eyeY = y - 0.67 + (side - 0.49) * 0.13;
  const orbit = ellipsoid(side - 0.49, eyeY, z - 0.84, 0.40, 0.355, 0.67);
  bone = -blend(-bone, orbit, 0.075);
  const nasalWidth = 0.105 + Math.max(0, 0.2 - y) * 0.15;
  const nasal = ellipsoid(side - 0.075, y - 0.02, z - 1.02, nasalWidth, 0.245, 0.38);
  bone = -blend(-bone, nasal, 0.035);
  const temple = ellipsoid(side - 0.88, y + 0.09, z - 0.01, 0.30, 0.25, 0.40);
  bone = -blend(-bone, temple, 0.045);

  // Restrained asymmetry keeps the bone from reading as a collection of perfect spheres.
  const wear = Math.sin(x * 22 + z * 9) * Math.sin(y * 19 - x * 7) * Math.sin(z * 24 + y * 11);
  return bone + wear * 0.007 + Math.sin(x * 8 + y * 5 + z * 13) * 0.006;
};

const mandible: Field = (x, y, z) => {
  const side = Math.abs(x);
  // The open U-shaped mandible has a cavity all the way through, not a black mouth decal.
  const angle = Math.max(-1.42, Math.min(1.42, Math.atan2(x / 0.66, (z - 0.05) / 0.78)));
  const archX = Math.sin(angle) * 0.66;
  const archZ = Math.cos(angle) * 0.78 + 0.05;
  const archY = -1.31 + Math.abs(angle) * 0.07;
  let jaw = ellipsoid(x - archX, y - archY, z - archZ, 0.14, 0.21, 0.14);
  jaw = blend(jaw, capsule(side, y, z, [0.66, -1.23, 0.18], [0.80, -0.05, -0.18], 0.12), 0.12);
  jaw = blend(jaw, ellipsoid(x, y + 1.42, z - 0.73, 0.45, 0.20, 0.19), 0.11);
  return jaw + Math.sin(x * 27 + z * 18) * Math.sin(y * 30) * 0.004;
};

/** Indexed marching tetrahedra: watertight cavities with shared, smoothly shaded vertices. */
function surface(field: Field, min: Point, max: Point, spacing: number) {
  const nx = Math.ceil((max[0] - min[0]) / spacing) + 1;
  const ny = Math.ceil((max[1] - min[1]) / spacing) + 1;
  const nz = Math.ceil((max[2] - min[2]) / spacing) + 1;
  const sx = (max[0] - min[0]) / (nx - 1);
  const sy = (max[1] - min[1]) / (ny - 1);
  const sz = (max[2] - min[2]) / (nz - 1);
  const layer = nx * ny;
  const values = new Float32Array(layer * nz);
  for (let z = 0; z < nz; z++) {
    for (let y = 0; y < ny; y++) {
      for (let x = 0; x < nx; x++) {
        values[x + y * nx + z * layer] = field(min[0] + x * sx, min[1] + y * sy, min[2] + z * sz);
      }
    }
  }

  const positions: number[] = [];
  const indices: number[] = [];
  const vertices = new Map<number, number>();
  const offsets = [0, 1, 1 + nx, nx, layer, layer + 1, layer + nx + 1, layer + nx];
  const tetrahedra = [[0, 5, 1, 6], [0, 1, 2, 6], [0, 2, 3, 6], [0, 3, 7, 6], [0, 7, 4, 6], [0, 4, 5, 6]];
  const inside: number[] = [];
  const outside: number[] = [];

  function coordinate(index: number): Point {
    const z = Math.floor(index / layer);
    const y = Math.floor((index - z * layer) / nx);
    const x = index % nx;
    return [min[0] + x * sx, min[1] + y * sy, min[2] + z * sz];
  }

  function vertex(a: number, b: number) {
    const key = Math.min(a, b) * values.length + Math.max(a, b);
    const existing = vertices.get(key);
    if (existing !== undefined) return existing;
    const pa = coordinate(a), pb = coordinate(b);
    const t = values[a] / (values[a] - values[b]);
    const index = positions.length / 3;
    positions.push(pa[0] + (pb[0] - pa[0]) * t, pa[1] + (pb[1] - pa[1]) * t, pa[2] + (pb[2] - pa[2]) * t);
    vertices.set(key, index);
    return index;
  }

  function triangle(a: number, b: number, c: number, inner: number, outer: number) {
    const ax = positions[b * 3] - positions[a * 3];
    const ay = positions[b * 3 + 1] - positions[a * 3 + 1];
    const az = positions[b * 3 + 2] - positions[a * 3 + 2];
    const bx = positions[c * 3] - positions[a * 3];
    const by = positions[c * 3 + 1] - positions[a * 3 + 1];
    const bz = positions[c * 3 + 2] - positions[a * 3 + 2];
    const pi = coordinate(inner), po = coordinate(outer);
    const direction = (ay * bz - az * by) * (po[0] - pi[0]) + (az * bx - ax * bz) * (po[1] - pi[1]) + (ax * by - ay * bx) * (po[2] - pi[2]);
    if (direction > 0) indices.push(a, b, c);
    else indices.push(a, c, b);
  }

  for (let z = 0; z < nz - 1; z++) {
    for (let y = 0; y < ny - 1; y++) {
      for (let x = 0; x < nx - 1; x++) {
        const origin = x + y * nx + z * layer;
        let mask = 0;
        for (let c = 0; c < 8; c++) if (values[origin + offsets[c]] < 0) mask |= 1 << c;
        if (mask === 0 || mask === 255) continue;
        for (const tetrahedron of tetrahedra) {
          inside.length = 0;
          outside.length = 0;
          for (const corner of tetrahedron) {
            const index = origin + offsets[corner];
            (values[index] < 0 ? inside : outside).push(index);
          }
          if (!inside.length || !outside.length) continue;
          if (inside.length === 1) {
            triangle(vertex(inside[0], outside[0]), vertex(inside[0], outside[1]), vertex(inside[0], outside[2]), inside[0], outside[0]);
          } else if (outside.length === 1) {
            triangle(vertex(outside[0], inside[0]), vertex(outside[0], inside[1]), vertex(outside[0], inside[2]), inside[0], outside[0]);
          } else {
            const a = vertex(inside[0], outside[0]), b = vertex(inside[0], outside[1]);
            const c = vertex(inside[1], outside[0]), d = vertex(inside[1], outside[1]);
            triangle(a, b, c, inside[0], outside[0]);
            triangle(b, d, c, inside[0], outside[0]);
          }
        }
      }
    }
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  return geometry;
}

export function createCraniumGeometry() {
  return surface(cranium, [-1.2, -0.67, -1.12], [1.2, 2.31, 1.23], 0.033);
}

export function createMandibleGeometry() {
  return surface(mandible, [-0.99, -1.67, -0.38], [0.99, 0.13, 1.06], 0.029);
}
