/**
 * The checks that need no AI: length and, for Q99, whether each given word
 * appears. They run as you type.
 */

/** Characters as the answer grid counts them: everything but whitespace. */
export function countChars(text: string): number {
  return text.replace(/\s/g, "").length;
}

export const TARGET_CHARS = 80;

export type LengthState = "short" | "good" | "long";

/** "About 80": 60–110 is fine; much less loses marks, much more wastes time. */
export function lengthState(chars: number): LengthState {
  if (chars < 60) return "short";
  if (chars > 110) return "long";
  return "good";
}

export function wordsUsed(text: string, words: readonly string[]): Record<string, boolean> {
  return Object.fromEntries(words.map((w) => [w, w.length > 0 && text.includes(w)]));
}

/** Suggested time per essay: Part 2 is two essays inside a 40-minute section. */
export const ESSAY_MS = 15 * 60_000;
