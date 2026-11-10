/** Seconds each photo stays fully visible, including the crossfade into the next one. */
const HOLD_SECONDS = 7;
/** Crossfade length. Matches the original three-photo hero. */
const FADE_SECONDS = 1.4;

export type HeroTiming = {
  animate: boolean;
  duration: number;
  delays: number[];
  fade: number;
  hold: number;
  out: number;
};

function roundTo(value: number, places: number): number {
  const factor = 10 ** places;
  return Math.round(value * factor) / factor;
}

/** Crossfade timing for `count` hero photos. One or none stays on a still frame. */
export function heroTiming(count: number): HeroTiming {
  if (count < 2) {
    return { animate: false, duration: 0, delays: [], fade: 0, hold: 0, out: 0 };
  }

  const duration = count * HOLD_SECONDS;
  return {
    animate: true,
    duration,
    delays: Array.from({ length: count }, (_, index) =>
      roundTo(index * HOLD_SECONDS - FADE_SECONDS, 1),
    ),
    fade: roundTo((FADE_SECONDS / duration) * 100, 3),
    hold: roundTo((HOLD_SECONDS / duration) * 100, 3),
    out: roundTo(((HOLD_SECONDS + FADE_SECONDS) / duration) * 100, 3),
  };
}
