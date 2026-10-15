/**
 * The per-word record a test keeps for the history view, stored as jsonb on
 * `flashcard_tests.answers`. Read back defensively: jsonb is untyped, and
 * tests from before it was recorded have none.
 */
import { z } from "zod";

export const testAnswerRecord = z.object({
  wordId: z.string(),
  right: z.boolean(),
  /** The option picked, for a choice question. */
  chosenId: z.string().optional(),
  /** What was typed, for a pinyin question. */
  typed: z.string().optional(),
});

export type TestAnswerRecord = z.infer<typeof testAnswerRecord>;

export function readAnswers(value: unknown): TestAnswerRecord[] | null {
  const parsed = z.array(testAnswerRecord).safeParse(value);
  return parsed.success ? parsed.data : null;
}
