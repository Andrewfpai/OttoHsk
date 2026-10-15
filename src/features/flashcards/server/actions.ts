"use server";

import { and, eq, inArray, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { findWord, wordBank } from "@/content/words";
import { db } from "@/db";
import { flashcardState, flashcardTests, wordProgress } from "@/db/schema";
import { type ActionResult, fail, ok } from "@/lib/action-result";
import { requireUser } from "@/lib/auth-guard";

import { isRightAnswer } from "../lib/grade";
import type { TestAnswerRecord } from "../lib/history";
import { nextSchedule } from "../lib/schedule";
import { GUESS_MS, MAX_ANSWER_MS, afterTest, isLocked, isPass } from "../lib/lockout";

const answersSchema = z
  .array(
    z.object({
      wordId: z.string().refine((id) => Boolean(findWord(id)), "Unknown word"),
      /** The option picked, for a multiple-choice question. */
      chosenId: z
        .string()
        .refine((id) => Boolean(findWord(id)), "Unknown word")
        .optional(),
      /** What was typed, for a pinyin question. */
      typed: z.string().max(60).optional(),
      /** How long the answer took. */
      ms: z
        .number()
        .int()
        .min(0)
        .transform((ms) => Math.min(ms, MAX_ANSWER_MS)),
    })
    .refine((a) => (a.chosenId === undefined) !== (a.typed === undefined), "One answer per question"),
  )
  .min(1)
  .max(50)
  .refine((a) => new Set(a.map((x) => x.wordId)).size === a.length, "Duplicate word");

export type TestResult = {
  /** 1 for the learner's first test. */
  testNumber: number;
  total: number;
  correct: number;
  guesses: number;
  passed: boolean;
  /** Epoch ms, or null when the test passed. */
  lockedUntil: number | null;
  /** Each word's strength before and after, and the test it is due back in. */
  schedule: WordSchedule[];
};

export type WordSchedule = {
  wordId: string;
  /** null for a word tested for the first time. */
  before: number | null;
  strength: number;
  dueTest: number;
};

/**
 * Grades a finished test and applies everything it changes, atomically: each
 * word's strength and next due test, the test log, the test count, and the
 * lockout.
 *
 * Refuses while the learner is locked out — the client hides the test then,
 * but this action is reachable by direct POST.
 */
export async function submitTest(input: unknown): Promise<ActionResult<TestResult>> {
  const user = await requireUser();
  const parsed = answersSchema.safeParse(input);
  if (!parsed.success) return fail("That test could not be read. Start a new session.");
  const answers = parsed.data;
  // Every word must belong to the level the learner is studying now: a test
  // started before switching level in another tab is not graded against it.
  const bank = wordBank(user.level);
  if (answers.some((a) => !bank.getWord(a.wordId))) {
    return fail("Your level changed since this test started. Start a new session.");
  }

  const now = new Date();

  return db.transaction(async (tx) => {
    // FOR UPDATE: two tabs submitting at once must not both read "unlocked".
    // The row is created first, since FOR UPDATE cannot lock a missing row
    // and two first-ever tests would otherwise both be test #1.
    await tx.insert(flashcardState).values({ userId: user.id, level: user.level }).onConflictDoNothing();
    const [state] = await tx
      .select()
      .from(flashcardState)
      .where(and(eq(flashcardState.userId, user.id), eq(flashcardState.level, user.level)))
      .for("update")
      .limit(1);
    const lock = { level: state?.lockLevel ?? 0, lockedUntil: state?.lockedUntil ?? null };
    const testNumber = (state?.testsTaken ?? 0) + 1;

    if (isLocked(lock.lockedUntil, now)) {
      return fail<TestResult>("Tests are locked for now. Keep practising.", "LOCKED");
    }

    const ids = answers.map((a) => a.wordId);
    const existing = await tx
      .select({ wordId: wordProgress.wordId, strength: wordProgress.strength })
      .from(wordProgress)
      .where(and(eq(wordProgress.userId, user.id), inArray(wordProgress.wordId, ids)));
    const strengths = new Map(existing.map((r) => [r.wordId, r.strength]));

    let correct = 0;
    let guesses = 0;
    const records: TestAnswerRecord[] = [];
    const rows = answers.map((a) => {
      const right = isRightAnswer(a, bank.getWord);
      records.push({ wordId: a.wordId, right, chosenId: a.chosenId, typed: a.typed });
      if (right) correct++;
      else if (a.ms < GUESS_MS) guesses++;
      const next = nextSchedule(strengths.get(a.wordId) ?? null, right, testNumber, a.ms);
      return {
        userId: user.id,
        wordId: a.wordId,
        strength: next.strength,
        dueTest: next.dueTest,
        correctCount: right ? 1 : 0,
        wrongCount: right ? 0 : 1,
        lastAnsweredAt: now,
      };
    });

    await tx
      .insert(wordProgress)
      .values(rows)
      .onConflictDoUpdate({
        target: [wordProgress.userId, wordProgress.wordId],
        set: {
          strength: sql`excluded.strength`,
          dueTest: sql`excluded.due_test`,
          correctCount: sql`${wordProgress.correctCount} + excluded.correct_count`,
          wrongCount: sql`${wordProgress.wrongCount} + excluded.wrong_count`,
          lastAnsweredAt: sql`excluded.last_answered_at`,
        },
      });

    const total = answers.length;
    const passed = isPass(correct, total);
    await tx
      .insert(flashcardTests)
      .values({ userId: user.id, level: user.level, testNumber, total, correct, guesses, passed, answers: records });

    const nextLock = afterTest(lock, passed, now);
    const nextState = {
      testsTaken: testNumber,
      lockLevel: nextLock.level,
      lockedUntil: nextLock.lockedUntil,
    };
    await tx
      .insert(flashcardState)
      .values({ userId: user.id, level: user.level, ...nextState })
      .onConflictDoUpdate({ target: [flashcardState.userId, flashcardState.level], set: nextState });

    revalidatePath("/dashboard");
    revalidatePath("/words", "layout");

    return ok<TestResult>({
      testNumber,
      total,
      correct,
      guesses,
      passed,
      lockedUntil: nextLock.lockedUntil?.getTime() ?? null,
      schedule: rows.map((r) => ({
        wordId: r.wordId,
        before: strengths.get(r.wordId) ?? null,
        strength: r.strength,
        dueTest: r.dueTest,
      })),
    });
  });
}
