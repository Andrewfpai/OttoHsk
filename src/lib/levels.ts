/**
 * The HSK levels the app supports. Each person studies one level at a time
 * (Settings); every tab follows it, and progress is kept per level.
 *
 * HSK 5 and HSK 6 are different exams, not just more words:
 * - HSK 5 writing: sentence order (Q91–98) and two short essays (Q99/Q100).
 * - HSK 6 writing: one 缩写 (Q101) — read a story, retell it from memory.
 *   HSK 6 reading opens with 病句 (find the sentence with an error), which
 *   takes sentence order's place in the app.
 */
export const LEVELS = [5, 6] as const;
export type Level = (typeof LEVELS)[number];
export const DEFAULT_LEVEL: Level = 5;

export function isLevel(value: unknown): value is Level {
  return value === 5 || value === 6;
}

/** A stored value, read defensively: anything unknown counts as the default. */
export function toLevel(value: unknown): Level {
  return isLevel(value) ? value : DEFAULT_LEVEL;
}

export type Section = "listening" | "reading" | "writing";

/**
 * Mock-test sections. HSK 5 counts correct answers (writing: Part 1's eight
 * ordering questions). HSK 6 writing is a single essay, so it is a score.
 */
export const SECTION_MAX: Record<Level, Record<Section, number>> = {
  5: { listening: 45, reading: 45, writing: 8 },
  6: { listening: 50, reading: 50, writing: 100 },
};

export const WRITING_NOTE: Record<Level, string> = {
  5: "Part 1 only",
  6: "essay score",
};
