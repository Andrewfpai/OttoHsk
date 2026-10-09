/**
 * The flashcard test lockout: binary exponential backoff on failed tests.
 *
 * A test fails when more than 60% of answers are wrong. Each consecutive
 * failure doubles the lock — 1 min, 2, 4, 8, 16, 32, capped at 1 hour — and
 * a pass resets it. Only the test locks: practice stays open, because a
 * failed test usually means "not learned yet", and practice is the cure.
 */
export const FAIL_WRONG_RATIO = 0.6;
export const BASE_LOCK_MS = 60_000;
export const MAX_LOCK_MS = 60 * 60_000;

/** Wrong answers given faster than this are counted as guesses. */
export const GUESS_MS = 1500;

export function isPass(correct: number, total: number): boolean {
  if (total <= 0) return false;
  return (total - correct) / total <= FAIL_WRONG_RATIO;
}

/** Lock length after the (level + 1)-th consecutive failure. */
export function lockDurationMs(level: number): number {
  return Math.min(MAX_LOCK_MS, BASE_LOCK_MS * 2 ** Math.max(0, level));
}

export type LockState = { level: number; lockedUntil: Date | null };

export function afterTest(state: LockState, passed: boolean, now: Date): LockState {
  if (passed) return { level: 0, lockedUntil: null };
  return {
    level: state.level + 1,
    lockedUntil: new Date(now.getTime() + lockDurationMs(state.level)),
  };
}

export function isLocked(lockedUntil: Date | null, now: Date): boolean {
  return lockedUntil !== null && lockedUntil.getTime() > now.getTime();
}

/** "1 min", "1 h". */
export function formatLock(ms: number): string {
  return ms >= 3_600_000 ? `${ms / 3_600_000} h` : `${ms / 60_000} min`;
}
