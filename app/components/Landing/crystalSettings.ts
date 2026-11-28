import {
  BufferGeometry, Color, Float32BufferAttribute, Group, InstancedMesh,
  MeshPhysicalMaterial, MeshStandardMaterial, Object3D, TorusGeometry, Vector3,
  type Texture,
} from "three";

type Setting = { position: Vector3; normal?: Vector3; accented?: boolean };
type Point = readonly [number, number, number];

// Flat-shaded crown, table, girdle and pavilion: actual cut surfaces catch the
// same studio reflections as the rest of the sculpture.
function createCrystalCut() {
  const vertices: number[] = [];
  const triangle = (a: Point, b: Point, c: Point) => vertices.push(...a, ...b, ...c);
  const point = (index: number, radius: number, z: number, phase = 0): Point => {
    const angle = index * Math.PI / 8 + phase;
    return [Math.cos(angle) * radius, Math.sin(angle) * radius, z];
  };

  for (let i = 0; i < 16; i++) {
    const table = point(i, .54, .48, Math.PI / 16);
    const nextTable = point(i + 1, .54, .48, Math.PI / 16);
    const girdle = point(i, 1, 0);
    const nextGirdle = point(i + 1, 1, 0);
    const base = point(i, 1, -.07);
    const nextBase = point(i + 1, 1, -.07);
    triangle([0, 0, .48], table, nextTable);
    triangle(table, girdle, nextGirdle);
    triangle(table, nextGirdle, nextTable);
    triangle(girdle, base, nextBase);
    triangle(girdle, nextBase, nextGirdle);
    triangle(base, [0, 0, -.68], nextBase);
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));
  geometry.computeVertexNormals();
  return geometry;
}

export function createCrystalSettings(environment: Texture) {
  const crystalGeometry = createCrystalCut();
  const bezelGeometry = new TorusGeometry(1.07, .105, 6, 24);
  const crystalMaterial = new MeshPhysicalMaterial({
    color: 0xffffff, metalness: 0, roughness: .075,
    transmission: .24, thickness: .024, ior: 2.17,
    clearcoat: 1, clearcoatRoughness: .04,
    envMap: environment, envMapIntensity: 1.35,
  });
  const bezelMaterial = new MeshStandardMaterial({
    color: 0xd2dbdc, metalness: 1, roughness: .15,
    envMap: environment, envMapIntensity: 1.05,
  });
  const assemblies: { group: Group; stones: InstancedMesh; bezels: InstancedMesh; settings: readonly Setting[] }[] = [];
  const clear = new Color(0xeaf1ee);
  const tint = new Color(0xd0ff71);
  const color = new Color();
  const forward = new Vector3(0, 0, 1);
  const pose = new Object3D();

  const colorStones = (stones: InstancedMesh, settings: readonly Setting[]) => {
    settings.forEach((setting, i) => {
      stones.setColorAt(i, color.copy(clear).lerp(tint, setting.accented ? .6 : .035));
    });
    if (stones.instanceColor) stones.instanceColor.needsUpdate = true;
  };

  return {
    add(parent: Group, name: string, settings: readonly Setting[], radius: number) {
      const group = new Group();
      group.name = name;
      const stones = new InstancedMesh(crystalGeometry, crystalMaterial, settings.length);
      const bezels = new InstancedMesh(bezelGeometry, bezelMaterial, settings.length);
      stones.name = `${name}-crystals`;
      bezels.name = `${name}-platinum-settings`;
      settings.forEach((setting, i) => {
        pose.position.copy(setting.position);
        pose.quaternion.setFromUnitVectors(forward, setting.normal ?? forward);
        pose.rotateZ(i * .41);
        pose.scale.setScalar(radius);
        pose.updateMatrix();
        stones.setMatrixAt(i, pose.matrix);
        bezels.setMatrixAt(i, pose.matrix);
      });
      stones.instanceMatrix.needsUpdate = true;
      bezels.instanceMatrix.needsUpdate = true;
      colorStones(stones, settings);
      group.add(bezels, stones);
      parent.add(group);
      assemblies.push({ group, stones, bezels, settings });
    },
    setAccent(value: string) {
      tint.set(value);
      for (const { stones, settings } of assemblies) colorStones(stones, settings);
    },
    dispose() {
      for (const { group, stones, bezels } of assemblies) {
        group.removeFromParent();
        stones.dispose();
        bezels.dispose();
      }
      crystalGeometry.dispose();
      bezelGeometry.dispose();
      crystalMaterial.dispose();
      bezelMaterial.dispose();
    },
  };
}
