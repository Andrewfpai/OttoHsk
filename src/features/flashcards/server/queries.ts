import { and, desc, eq, min } from "drizzle-orm";

import { wordBank } from "@/content/words";
import { db } from "@/db";
import { flashcardState, flashcardTests, wordProgress } from "@/db/schema";
import { requireUser } from "@/lib/auth-guard";
import { localDate } from "@/lib/exam";

import { type TestAnswerRecord, readAnswers } from "../lib/history";

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

/** When the learner took their first test at their current level, or null. */
export async function getFirstTestAt(): Promise<Date | null> {
  const user = await requireUser();
  const [row] = await db
    .select({ first: min(flashcardTests.takenAt) })
    .from(flashcardTests)
    .where(and(eq(flashcardTests.userId, user.id), eq(flashcardTests.level, user.level)));
  // min() over a timestamp comes back as a string from the driver, whatever
  // its TypeScript type says; parse it rather than trust it.
  return row?.first ? new Date(row.first) : null;
}

export type HistoryTest = TestSummary & {
  /** "YYYY-MM-DD" in the learner's calendar, for grouping by day. */
  day: string;
  /** Each word's result; null for tests taken before results were kept. */
  answers: TestAnswerRecord[] | null;
};

/** Every test at the learner's current level, newest first. */
export async function getTestHistory(limit = 2000): Promise<HistoryTest[]> {
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
    day: localDate(r.takenAt),
    testNumber: r.testNumber,
    total: r.total,
    correct: r.correct,
    guesses: r.guesses,
    passed: r.passed,
    answers: readAnswers(r.answers),
  }));
}
