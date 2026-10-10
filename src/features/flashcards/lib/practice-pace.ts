/**
 * Practice time per card, adjusted to how the learner actually uses it.
 *
 * - Started the test early: next time's timer moves halfway toward the time
 *   actually used, so a fast learner is not handed minutes they skip.
 * - Ran out of time: next time gets a few seconds more per card.
 *
 * Clamped both ways so it never reaches zero or grows without end.
 */
export const DEFAULT_PACE_MS = 15_000;
export const MIN_PACE_MS = 5_000;
export const MAX_PACE_MS = 30_000;
/** Added per card after the timer ran out. */
export const PACE_STEP_MS = 3_000;

export function clampPace(ms: number): number {
  if (!Number.isFinite(ms)) return DEFAULT_PACE_MS;
  // Whole half-seconds, so the setup screen shows tidy numbers.
  return Math.min(MAX_PACE_MS, Math.max(MIN_PACE_MS, Math.round(ms / 500) * 500));
}

export function nextPace(
  current: number,
  session: { cards: number; usedMs: number; timedOut: boolean },
): number {
  if (session.timedOut) return clampPace(current + PACE_STEP_MS);
  const usedPerCard = session.usedMs / Math.max(1, session.cards);
  return clampPace(current - (current - usedPerCard) / 2);
}
