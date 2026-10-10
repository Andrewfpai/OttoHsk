/**
 * When a word comes back, counted in tests rather than days.
 *
 * Every word stays in rotation for good; answers only change how far away
 * its next appearance is. Each word has a strength from 0 to 6:
 *
 * - Right: strength +1, and the word moves further out. Three right answers
 *   in a row make a word known.
 * - Wrong: back in the very next test, and strength −2 rather than to zero.
 *   A slip on a word you have known for days costs a little; a word you
 *   never knew stays at the bottom.
 * - Fast track: a brand-new word answered right on its first try, and not
 *   in a quick guess, is probably one you already knew. It counts as two
 *   right answers (strength 2), so one more right answer makes it known.
 *
 *   strength  0 → next test
 *             1 → 3 tests later
 *             2 → 5
 *             3 → 10            known
 *             4 → 20
 *             5 → 40
 *             6 → 60            the ceiling: an occasional check
 */
import { GUESS_MS } from "./lockout";

export const KNOWN_STRENGTH = 3;
export const MAX_STRENGTH = 6;

/** Strength lost on a wrong answer. */
export const WRONG_PENALTY = 2;

/** Tests to wait, indexed by strength. */
export const GAP_BY_STRENGTH = [1, 3, 5, 10, 20, 40, 60] as const;

/** Where a new word answered right on its first try lands, and when it is re-checked. */
export const FAST_TRACK_STRENGTH = 2;
export const FAST_TRACK_GAP = GAP_BY_STRENGTH[FAST_TRACK_STRENGTH];

export function gapFor(strength: number): number {
  return GAP_BY_STRENGTH[Math.min(Math.max(strength, 0), MAX_STRENGTH)];
}

export type WordStatus = "new" | "learning" | "known";

/** `strength` is null for a word never tested. */
export function statusOf(strength: number | null | undefined): WordStatus {
  if (strength === null || strength === undefined) return "new";
  return strength >= KNOWN_STRENGTH ? "known" : "learning";
}

export type Schedule = { strength: number; dueTest: number };

/**
 * A word's schedule after one answer in test number `testNumber` (1 for the
 * learner's first test). `current` is null for a word never tested;
 * `answerMs` is how long the answer took.
 */
export function nextSchedule(
  current: number | null,
  correct: boolean,
  testNumber: number,
  answerMs: number,
): Schedule {
  if (!correct) {
    // Always the next test, whatever the strength: confirm it straight away.
    return { strength: Math.max(0, (current ?? 0) - WRONG_PENALTY), dueTest: testNumber + 1 };
  }
  if (current === null && answerMs >= GUESS_MS) {
    return { strength: FAST_TRACK_STRENGTH, dueTest: testNumber + FAST_TRACK_GAP };
  }
  const strength = Math.min(MAX_STRENGTH, (current ?? 0) + 1);
  return { strength, dueTest: testNumber + gapFor(strength) };
}
