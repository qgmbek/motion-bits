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
    vec3 center = 0.28 + 0.44 * vec3(
      boneHash(cell),
      boneHash(cell + vec3(7.3, 1.8, 4.0)),
      boneHash(cell + vec3(3.2, 5.7, 9.1)));
    float distanceToCenter = length((fract(p) - center) * vec3(1.0, 1.2, 1.0));
    float size = mix(0.10, 0.27, boneHash(cell + 12.6));
    return 1.0 - smoothstep(size * 0.23, size, distanceToCenter);
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
        attribute vec4 _bone_enamel;
        varying vec3 vBonePosition;
        varying vec2 vBoneOcclusion;
        varying vec4 vBoneEnamel;
      `)
      .replace("#include <begin_vertex>", `#include <begin_vertex>
        vBonePosition = position;
        vBoneOcclusion = _bone_occlusion;
        vBoneEnamel = _bone_enamel;
      `);
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", `#include <common>
        varying vec3 vBonePosition;
        varying vec2 vBoneOcclusion;
        varying vec4 vBoneEnamel;
        ${noiseFunctions}
      `)
      .replace("#include <color_fragment>", `#include <color_fragment>
        vec3 bonePoint = vBonePosition + vec3(2.7, 4.3, 7.1);
        float drift = boneNoise(bonePoint * 3.4);
        float mineral = boneNoise(bonePoint * vec3(7.6, 5.5, 9.3) + drift * 1.35);
        float marbling = smoothstep(0.19, 0.80, drift * 0.58 + mineral * 0.42);
        float weathering = smoothstep(0.29, 0.70, boneNoise(bonePoint * 12.5 + mineral));
        float exposedFace = smoothstep(0.47, 1.06, vBonePosition.z) *
          (1.0 - smoothstep(0.79, 1.41, vBonePosition.y));
        float enamel = vBoneEnamel.a;
        float crevice = smoothstep(0.025, 0.42, vBoneOcclusion.x);
        float hollow = smoothstep(0.10, 0.68, vBoneOcclusion.y) * (1.0 - enamel * 0.88);
        float porosity = mix(0.25, 0.79, weathering) * (0.64 + 0.46 * exposedFace + 0.25 * crevice);
        float footprint = max(length(dFdx(bonePoint)), length(dFdy(bonePoint)));
        float poreVisibility = 1.0 - smoothstep(0.27, 0.96, footprint * 36.0);
        float microVisibility = 1.0 - smoothstep(0.24, 0.83, footprint * 92.0);
        float pores = bonePore(bonePoint * 36.0 + mineral * 0.65);
        float micropores = bonePore(bonePoint * 92.0 + vec3(1.19, 4.7, 2.5));
        vec3 ivory = mix(vec3(0.79, 0.73, 0.65), vec3(1.07, 1.06, 1.06), marbling);
        vec3 corticalColor = diffuseColor.rgb * ivory;
        corticalColor *= mix(vec3(1.0), vec3(0.78, 0.69, 0.59), crevice * 0.67);
        corticalColor *= 1.0 - hollow * 0.14;
        corticalColor *= 1.0 - porosity * (pores * poreVisibility * 0.16 + micropores * microVisibility * 0.065);
        diffuseColor.rgb = mix(corticalColor, vBoneEnamel.rgb, enamel);
      `)
      .replace("#include <roughnessmap_fragment>", `#include <roughnessmap_fragment>
        float polish = (1.0 - weathering) * (1.0 - crevice);
        float boneRoughness = roughnessFactor - polish * 0.13 + crevice * 0.095 + (mineral - 0.5) * 0.09;
        roughnessFactor = mix(clamp(boneRoughness, 0.59, 0.91), 0.49, enamel);
      `)
      .replace("#include <normal_fragment_maps>", `#include <normal_fragment_maps>
        float corticalGrain = boneNoise(bonePoint * vec3(29.0, 39.0, 32.0) + mineral * 1.5);
        float grainVisibility = 1.0 - smoothstep(0.34, 1.05, footprint * 39.0);
        // Filter the slope after differentiation so subpixel pores fade cleanly.
        vec2 slope = vec2(dFdx(mineral), dFdy(mineral)) * 0.0048;
        slope += weathering * grainVisibility * 0.0019 * vec2(dFdx(corticalGrain), dFdy(corticalGrain));
        slope -= porosity * poreVisibility * 0.0023 * vec2(dFdx(pores), dFdy(pores));
        slope -= porosity * microVisibility * 0.00044 * vec2(dFdx(micropores), dFdy(micropores));
        slope *= 1.0 - enamel * 0.96;
        vec3 surfaceX = dFdx(-vViewPosition);
        vec3 surfaceY = dFdy(-vViewPosition);
        vec3 tangentX = cross(surfaceY, normal);
        vec3 tangentY = cross(normal, surfaceX);
        float determinant = dot(surfaceX, tangentX);
        vec3 gradient = sign(determinant) * (slope.x * tangentX + slope.y * tangentY);
        normal = normalize(max(abs(determinant), 0.00000001) * normal - gradient);
      `)
      .replace("#include <aomap_fragment>", `#include <aomap_fragment>
        reflectedLight.directDiffuse *= 1.0 - hollow * 0.43;
        reflectedLight.directSpecular *= 1.0 - hollow * 0.46;
        reflectedLight.indirectDiffuse *= 1.0 - hollow * 0.76;
        reflectedLight.indirectSpecular *= 1.0 - hollow * 0.63;
      `);
  };
  material.customProgramCacheKey = () => "cortical-bone-accessibility";
  return material;
}
