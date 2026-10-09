/**
 * When a word comes back, counted in tests rather than days.
 *
 * Every word stays in rotation for good; answers only change how far away
 * its next appearance is. Each word has a strength from 0 to 6:
 *
 * - Right: strength +1, and the word moves further out. One right answer
 *   proves little — the test follows straight after practice, and a blind
 *   guess on four options is right 25% of the time — so the early gaps are
 *   short and a lucky guess is re-checked soon. Two lucky guesses in a row
 *   are 6%; three, under 2%.
 * - Wrong: back in the very next test, and strength −2 rather than to zero.
 *   A slip or a misclick on a word you have known for days costs a little;
 *   a word you never knew stays at the bottom.
 *
 *   strength  0 → next test
 *             1 → 2 tests later  (right in test 1, back in test 3)
 *             2 → 4
 *             3 → 8
 *             4 → 15
 *             5 → 30            known
 *             6 → 60            the ceiling: an occasional check
 */
export const KNOWN_STRENGTH = 5;
export const MAX_STRENGTH = 6;

/** Strength lost on a wrong answer. */
export const WRONG_PENALTY = 2;

/** Tests to wait, indexed by strength. */
export const GAP_BY_STRENGTH = [1, 2, 4, 8, 15, 30, 60] as const;

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
 * learner's first test). `current` is null for a word never tested.
 */
export function nextSchedule(
  current: number | null,
  correct: boolean,
  testNumber: number,
): Schedule {
  if (!correct) {
    // Always the next test, whatever the strength: confirm it straight away.
    return { strength: Math.max(0, (current ?? 0) - WRONG_PENALTY), dueTest: testNumber + 1 };
  }
  const strength = Math.min(MAX_STRENGTH, (current ?? 0) + 1);
  return { strength, dueTest: testNumber + gapFor(strength) };
}
