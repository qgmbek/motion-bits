import { Color, Mesh, MeshBasicMaterial, PlaneGeometry, Scene, type PMREMGenerator } from "three";

// Broad cards describe the cast surfaces. Narrow strips catch the bevels and
// teeth as the sculpture turns. Radiance values are in linear HDR.
const cards = [
  { at: [-3.9, 3.4, 5.9], size: [4.5, 6.7], tint: 0xfff3e4, radiance: 5.4 },
  { at: [0.2, 1.2, 7.6], size: [3.2, 3.8], tint: 0xf4f7ff, radiance: 1.65 },
  { at: [5.5, 0.9, 3.3], size: [1.45, 6.4], tint: 0xdceaff, radiance: 7.4 },
  { at: [-5.2, 1.6, -3.6], size: [1.3, 5.9], tint: 0xe4eeff, radiance: 6.8 },
  { at: [0.4, 6.6, -0.6], size: [6.6, 3.0], tint: 0xffffff, radiance: 3.4 },
  { at: [2.7, 2.2, -6.0], size: [3.7, 4.6], tint: 0xf3f5ff, radiance: 2.85 },
  { at: [1.4, -3.8, 4.5], size: [4.6, 2.4], tint: 0xd8e1eb, radiance: 0.64 },
] as const;

export function createMetalEnvironment(pmrem: PMREMGenerator) {
  const studio = new Scene();
  studio.background = new Color().setRGB(0.075, 0.081, 0.09);
  const geometry = new PlaneGeometry(1, 1);
  const materials = cards.map(({ at: [x, y, z], size: [width, height], tint, radiance }) => {
    const material = new MeshBasicMaterial({
      color: new Color(tint).multiplyScalar(radiance),
      toneMapped: false,
    });
    const panel = new Mesh(geometry, material);
    panel.position.set(x, y, z);
    panel.scale.set(width, height, 1);
    panel.lookAt(0, 0, 0);
    studio.add(panel);
    return material;
  });

  try {
    return pmrem.fromScene(studio, 0.015);
  } finally {
    geometry.dispose();
    for (const material of materials) material.dispose();
  }
}
