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

export const skullPerformanceDuration = 13.6;
export const jawTravel = { closed: -0.095, open: 0.276 };

const radians = Math.PI / 180;
const restingPitch = -4;
const sideLooksStart = 8.6;

// The optic leads the diagonal looks, then the two level turns.
// Negative pitch lifts the chin. Directions are from the skull's perspective.
const cues = {
  yaw: [
    [0, 0], [.72, 0], [1.87, 36], [2.14, 34], [3.02, 0],
    [3.75, 0], [4.79, -29], [5.10, -26], [5.90, 0], [sideLooksStart, 0],
    [8.86, 0], [9.72, 37], [9.96, 34], [10.12, 34], [10.72, 0],
    [10.98, 0], [11.93, -33], [12.18, -30], [12.46, -30], [13.32, 0],
  ],
  pitch: [
    [0, restingPitch], [.75, restingPitch], [1.92, -14], [2.17, -13], [2.95, restingPitch],
    [3.87, restingPitch], [5.04, 9], [5.27, 7], [6.08, restingPitch],
  ],
  roll: [
    [0, 0], [.76, -.7], [1.87, 2.3], [2.21, 1.6], [2.96, 0],
    [3.76, 0], [4.89, -2.8], [5.26, -1.5], [5.99, 0],
    [8.86, 0], [9.72, 2.1], [10.12, 1.3], [10.72, 0],
    [10.98, 0], [11.93, -2.5], [12.46, -1.2], [13.32, 0],
  ],
  jaw: [
    [0, 0], [.88, 0], [1.3, -.068], [2.03, .147], [2.56, .107], [3.26, .107],
    [3.92, jawTravel.closed], [4.15, -.083], [5.08, jawTravel.open],
    [5.63, .207], [6.27, .207], [7.7, -.046], [sideLooksStart, 0],
    [9, 0], [9.65, -.03], [10.26, -.03], [10.73, 0],
    [11.03, 0], [11.93, .075], [12.4, .058], [13.4, 0],
  ],
  preload: [
    [0, 0], [.66, 0], [.89, -.21], [1.3, 0],
    [3.88, 0], [4.2, .24], [4.75, 0], [6.18, 0], [6.41, -.13], [7.09, 0],
  ],
  scopeYaw: [
    [0, 0], [.19, 0], [.70, 8], [1.87, 3], [2.18, 3.7], [2.92, 0],
    [3.35, 0], [3.84, -8], [4.79, -3.5], [5.10, -3], [5.82, 0],
    [sideLooksStart, 0], [8.99, 8], [9.72, 3.5], [10.12, 3.5], [10.68, 0],
    [10.80, 0], [11.15, -8], [11.93, -4], [12.46, -4], [13.24, 0],
  ],
  scopePitch: [
    [0, 0], [.30, 0], [.78, -4.2], [1.92, -1.8], [2.21, -2.2], [2.85, 0],
    [3.38, 0], [3.86, 4.2], [4.88, 2], [5.21, 2], [5.93, 0],
  ],
  focus: [
    [0, 0], [.15, 0], [.56, -33], [1.91, 155], [2.34, 140], [3.41, 140],
    [3.79, 118], [4.96, -152], [5.46, -133], [6.58, -133], [8.12, 12], [8.52, 0],
    [sideLooksStart, 0], [8.94, -20], [9.61, 92], [10.12, 82], [10.68, 7],
    [10.98, -12], [11.82, -104], [12.46, -93], [13.4, 0],
  ],
  opticalLight: [
    [0, 0], [.24, 0], [.71, .75], [2.04, .9], [2.64, .35], [3.35, .35],
    [5.04, 1], [5.72, .42], [6.48, .42], [8.08, 0],
    [sideLooksStart, 0], [9.02, .7], [10.12, .35], [10.78, .15],
    [11.16, .76], [12.44, .38], [13.3, 0],
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
