type Cue = readonly [seconds: number, value: number];

export type SkullPose = {
  yaw: number;
  pitch: number;
  roll: number;
  jaw: number;
  jawDrive: number;
  scopeYaw: number;
  scopePitch: number;
  focus: number;
  opticalLight: number;
};

export const skullPerformanceDuration = 4.8;
export const jawTravel = { closed: -0.062, open: 0.186 };

const radians = Math.PI / 180;

// The optic leads each look. The long holds leave time to read the silhouette
// before the quicker return and the jaw's last settle.
const cues = {
  yaw: [
    [0, 0], [.32, -2], [1.36, 46], [1.7, 42], [2.16, 42],
    [2.4, 45], [3.16, -18], [3.43, -15], [3.85, -15], [skullPerformanceDuration, 0],
  ],
  pitch: [
    [0, 0], [.36, 2], [1.23, -3], [1.75, -1.2],
    [2.38, 1.8], [3.2, 3.6], [3.56, .8], [skullPerformanceDuration, 0],
  ],
  roll: [
    [0, 0], [.46, -1.2], [1.36, 2.6], [1.75, 1.6], [2.32, 1.6],
    [3.17, -2.25], [3.65, -1], [skullPerformanceDuration, 0],
  ],
  jaw: [
    [0, 0], [.54, 0], [.91, -.043], [1.34, .076], [1.65, .044], [2.05, .044],
    [2.44, jawTravel.closed], [2.58, -.048], [3.09, jawTravel.open], [3.38, .137], [3.79, .137],
    [4.36, -.023], [skullPerformanceDuration, 0],
  ],
  preload: [
    [0, 0], [.45, 0], [.58, -.14], [.9, 0],
    [2.49, 0], [2.66, .16], [2.92, 0], [4.15, 0], [4.35, -.07], [4.72, 0],
  ],
  scopeYaw: [
    [0, 0], [.15, 0], [.47, 6], [1.36, 2], [1.76, 3.7], [2.12, 3.7],
    [2.48, -6], [3.18, -3], [3.6, -4.5], [3.89, -4.5], [4.57, 0],
  ],
  scopePitch: [
    [0, 0], [.31, -1.6], [.6, -3.2], [1.62, -1], [2.13, -1],
    [2.49, 3.2], [3.3, 1.2], [3.87, 1.2], [4.57, 0],
  ],
  focus: [
    [0, 0], [.12, 0], [.39, -21], [.96, 77], [1.27, 99], [1.51, 87], [2.14, 87],
    [2.37, 69], [2.95, -91], [3.21, -78], [3.78, -78], [4.45, 8], [4.72, 0],
  ],
  opticalLight: [
    [0, 0], [.2, 0], [.6, .75], [1.39, .9], [1.76, .35], [2.22, .35],
    [2.94, 1], [3.5, .42], [4.58, 0],
  ],
} satisfies Record<string, readonly Cue[]>;

function sample(track: readonly Cue[], seconds: number) {
  for (let i = 1; i < track.length; i++) {
    const [end, to] = track[i];
    if (seconds > end) continue;
    const [start, from] = track[i - 1];
    const progress = Math.max(0, (seconds - start) / (end - start));
    const ease = progress * progress * (3 - 2 * progress);
    return from + (to - from) * ease;
  }
  return track[track.length - 1][1];
}

export function sampleSkullPerformance(seconds: number): SkullPose {
  const jaw = sample(cues.jaw, seconds);
  return {
    yaw: sample(cues.yaw, seconds) * radians,
    pitch: sample(cues.pitch, seconds) * radians,
    roll: sample(cues.roll, seconds) * radians,
    jaw,
    jawDrive: jaw * 7.2 + sample(cues.preload, seconds),
    scopeYaw: sample(cues.scopeYaw, seconds) * radians,
    scopePitch: sample(cues.scopePitch, seconds) * radians,
    focus: sample(cues.focus, seconds) * radians,
    opticalLight: sample(cues.opticalLight, seconds),
  };
}
