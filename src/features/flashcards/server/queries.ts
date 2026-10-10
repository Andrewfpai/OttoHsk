import { and, desc, eq } from "drizzle-orm";

import { wordBank } from "@/content/words";
import { db } from "@/db";
import { flashcardState, flashcardTests, wordProgress } from "@/db/schema";
import { requireUser } from "@/lib/auth-guard";

/** Serializable across the server/client boundary. */
export type ProgressRow = { wordId: string; strength: number; dueTest: number };

/** Progress on the learner's current level's words. */
export async function getProgress(): Promise<ProgressRow[]> {
  const user = await requireUser();
  const bank = wordBank(user.level);
  const rows = await db
    .select({ wordId: wordProgress.wordId, strength: wordProgress.strength, dueTest: wordProgress.dueTest })
    .from(wordProgress)
    .where(eq(wordProgress.userId, user.id));
  // Only this level's words. Ids never repeat across levels, and progress on
  // a word that has left a list (HSK 5 was rebuilt from the official 1,300)
  // is kept but never counted or shown.
  return rows.filter((r) => bank.getWord(r.wordId));
}

export type FlashcardInfo = {
  testsTaken: number;
  /** The number the next test will have; words due at or before it are due. */
  nextTest: number;
  lockLevel: number;
  /** Epoch ms, or null. May be in the past: the client compares with now. */
  lockedUntil: number | null;
};

export async function getFlashcardInfo(): Promise<FlashcardInfo> {
  const user = await requireUser();
  const [row] = await db
    .select()
    .from(flashcardState)
    .where(and(eq(flashcardState.userId, user.id), eq(flashcardState.level, user.level)))
    .limit(1);
  const testsTaken = row?.testsTaken ?? 0;
  return {
    testsTaken,
    nextTest: testsTaken + 1,
    lockLevel: row?.lockLevel ?? 0,
    lockedUntil: row?.lockedUntil?.getTime() ?? null,
  };
}

export type TestSummary = {
  id: string;
  takenAt: number;
  testNumber: number;
  total: number;
  correct: number;
  guesses: number;
  passed: boolean;
};

export async function getRecentTests(limit = 10): Promise<TestSummary[]> {
  const user = await requireUser();
  const rows = await db
    .select()
    .from(flashcardTests)
    .where(and(eq(flashcardTests.userId, user.id), eq(flashcardTests.level, user.level)))
    .orderBy(desc(flashcardTests.takenAt))
    .limit(limit);
  return rows.map((r) => ({
    id: r.id,
    takenAt: r.takenAt.getTime(),
    testNumber: r.testNumber,
    total: r.total,
    correct: r.correct,
    guesses: r.guesses,
    passed: r.passed,
  }));
}
