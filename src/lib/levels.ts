/**
 * The HSK levels the app supports. Each person studies one level at a time
 * (Settings); every tab follows it, and progress is kept per level.
 *
 * HSK 5 and HSK 6 are different exams, not just more words:
 * - HSK 5 is the HSK 2.0 exam: writing is sentence order (Q91–98) and two
 *   short essays (Q99/Q100).
 * - HSK 6 is the new HSK (HSK 3.0): its words are the new HSK 5 words plus
 *   the new HSK 6 list; reading is fill in (41–50), sentence fill (51–60)
 *   and long passages (61–80); writing is a practical text (150+
 *   characters) and an opinion essay (300+).
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

/**
 * Flashcards study a long list in chunks: new words come from one chunk of
 * this many words until it is learned (see chunksOf). Null: the whole list.
 */
export const CHUNK_SIZE: Record<Level, number | null> = { 5: null, 6: 100 };

export type Section = "listening" | "reading" | "writing";

/**
 * Mock-test sections. HSK 5 counts correct answers (writing: Part 1's eight
 * ordering questions). HSK 6 writing is a single essay, so it is a score.
 */
export const SECTION_MAX: Record<Level, Record<Section, number>> = {
  5: { listening: 45, reading: 45, writing: 8 },
  6: { listening: 40, reading: 40, writing: 100 },
};

export const WRITING_NOTE: Record<Level, string> = {
  5: "Part 1 only",
  6: "both parts, score",
};
