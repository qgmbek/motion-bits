import { MeshStandardMaterial } from "three";

const noiseFunctions = /* glsl */ `
  float boneHash(vec3 coordinate) {
    vec3 p = fract(coordinate * 0.1031);
    p += dot(p, p.yzx + 33.33);
    return fract((p.x + p.y) * p.z);
  }

  float boneNoise(vec3 p) {
    vec3 cell = floor(p);
    vec3 t = fract(p);
    t = t * t * (3.0 - 2.0 * t);
    float lower = mix(
      mix(boneHash(cell), boneHash(cell + vec3(1, 0, 0)), t.x),
      mix(boneHash(cell + vec3(0, 1, 0)), boneHash(cell + vec3(1, 1, 0)), t.x), t.y);
    float upper = mix(
      mix(boneHash(cell + vec3(0, 0, 1)), boneHash(cell + vec3(1, 0, 1)), t.x),
      mix(boneHash(cell + vec3(0, 1, 1)), boneHash(cell + vec3(1, 1, 1)), t.x), t.y);
    return mix(lower, upper, t.z);
  }

  float bonePore(vec3 p) {
    vec3 cell = floor(p);
    vec3 center = 0.25 + 0.50 * vec3(
      boneHash(cell),
      boneHash(cell + vec3(7.3, 1.8, 4.0)),
      boneHash(cell + vec3(3.2, 5.7, 9.1)));
    float distanceToCenter = length((fract(p) - center) * vec3(1.0, 1.2, 1.0));
    float size = mix(0.12, 0.23, boneHash(cell + 12.6));
    return 1.0 - smoothstep(size * 0.18, size, distanceToCenter);
  }

`;

export function createBoneMaterial() {
  const material = new MeshStandardMaterial({
    color: 0xb2a48d,
    metalness: 0,
    roughness: 0.78,
    envMapIntensity: 0.65,
  });
  material.name = "Weathered cortical bone";
  material.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", `#include <common>
        attribute vec2 _bone_occlusion;
        varying vec3 vBonePosition;
        varying vec2 vBoneOcclusion;
      `)
      .replace("#include <begin_vertex>", `#include <begin_vertex>
        vBonePosition = position;
        vBoneOcclusion = _bone_occlusion;
      `);
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", `#include <common>
        varying vec3 vBonePosition;
        varying vec2 vBoneOcclusion;
        ${noiseFunctions}
      `)
      .replace("#include <color_fragment>", `#include <color_fragment>
        vec3 bonePoint = vBonePosition + vec3(2.7, 4.3, 7.1);
        float drift = boneNoise(bonePoint * 4.6);
        float mineral = boneNoise(bonePoint * vec3(8.2, 5.9, 9.6) + drift * 1.04);
        float marbling = smoothstep(0.24, 0.76, 0.6 * drift + 0.4 * mineral);
        float grainMask = smoothstep(0.28, 0.68, boneNoise(bonePoint * 14.0));
        float footprint = max(length(dFdx(bonePoint)), length(dFdy(bonePoint)));
        // Scale the fine detail down in distant views to avoid a speckled silhouette.
        float pinholes = bonePore(bonePoint * 48.0) * (1.0 - smoothstep(0.24, 0.86, footprint * 48.0));
        float weathering = grainMask;
        float crevice = smoothstep(0.035, 0.58, vBoneOcclusion.x);
        float hollow = smoothstep(0.045, 0.76, vBoneOcclusion.y);
        vec3 aged = mix(vec3(0.77, 0.70, 0.60), vec3(1.09, 1.10, 1.11), marbling);
        diffuseColor.rgb *= aged;
        diffuseColor.rgb *= mix(vec3(1.0), vec3(0.69, 0.60, 0.50), crevice * 0.66);
        diffuseColor.rgb *= 1.0 - weathering * pinholes * 0.19;
      `)
      .replace("#include <roughnessmap_fragment>", `#include <roughnessmap_fragment>
        roughnessFactor = clamp(roughnessFactor + (mineral - 0.5) * 0.14, 0.61, 0.93);
      `)
      .replace("#include <normal_fragment_maps>", `#include <normal_fragment_maps>
        float relief = (mineral - 0.5) * 0.005 - weathering * pinholes * 0.0045;
        vec3 surfaceX = dFdx(-vViewPosition);
        vec3 surfaceY = dFdy(-vViewPosition);
        vec3 tangentX = cross(surfaceY, normal);
        vec3 tangentY = cross(normal, surfaceX);
        float determinant = dot(surfaceX, tangentX);
        vec3 gradient = sign(determinant) * (dFdx(relief) * tangentX + dFdy(relief) * tangentY);
        normal = normalize(max(abs(determinant), 0.00000001) * normal - gradient);
      `)
      .replace("#include <aomap_fragment>", `#include <aomap_fragment>
        reflectedLight.indirectDiffuse *= 1.0 - hollow * 0.68;
        reflectedLight.indirectSpecular *= 1.0 - hollow * 0.53;
      `);
  };
  material.customProgramCacheKey = () => "cortical-bone-v2";
  return material;
}
