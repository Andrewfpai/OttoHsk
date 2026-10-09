import { desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { flashcardState, flashcardTests, wordProgress } from "@/db/schema";
import { requireUser } from "@/lib/auth-guard";

/** Serializable across the server/client boundary. */
export type ProgressRow = { wordId: string; strength: number; dueTest: number };

export async function getProgress(): Promise<ProgressRow[]> {
  const user = await requireUser();
  return db
    .select({ wordId: wordProgress.wordId, strength: wordProgress.strength, dueTest: wordProgress.dueTest })
    .from(wordProgress)
    .where(eq(wordProgress.userId, user.id));
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
    .where(eq(flashcardState.userId, user.id))
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
    .where(eq(flashcardTests.userId, user.id))
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
