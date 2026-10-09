"use server";

import { and, eq, inArray, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getWord } from "@/content/words";
import { db } from "@/db";
import { flashcardState, flashcardTests, wordProgress } from "@/db/schema";
import { type ActionResult, fail, ok } from "@/lib/action-result";
import { requireUser } from "@/lib/auth-guard";

import { nextSchedule } from "../lib/schedule";
import { GUESS_MS, MAX_ANSWER_MS, afterTest, isLocked, isPass } from "../lib/lockout";

const answersSchema = z
  .array(
    z.object({
      wordId: z.string().refine((id) => Boolean(getWord(id)), "Unknown word"),
      chosenId: z.string().refine((id) => Boolean(getWord(id)), "Unknown word"),
      /** How long the answer took. */
      ms: z
        .number()
        .int()
        .min(0)
        .transform((ms) => Math.min(ms, MAX_ANSWER_MS)),
    }),
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

  const now = new Date();

  return db.transaction(async (tx) => {
    // FOR UPDATE: two tabs submitting at once must not both read "unlocked".
    // The row is created first, since FOR UPDATE cannot lock a missing row
    // and two first-ever tests would otherwise both be test #1.
    await tx.insert(flashcardState).values({ userId: user.id }).onConflictDoNothing();
    const [state] = await tx
      .select()
      .from(flashcardState)
      .where(eq(flashcardState.userId, user.id))
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
    const rows = answers.map((a) => {
      const right = a.chosenId === a.wordId;
      if (right) correct++;
      else if (a.ms < GUESS_MS) guesses++;
      const next = nextSchedule(strengths.get(a.wordId) ?? null, right, testNumber);
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
      .values({ userId: user.id, testNumber, total, correct, guesses, passed });

    const nextLock = afterTest(lock, passed, now);
    const nextState = {
      testsTaken: testNumber,
      lockLevel: nextLock.level,
      lockedUntil: nextLock.lockedUntil,
    };
    await tx
      .insert(flashcardState)
      .values({ userId: user.id, ...nextState })
      .onConflictDoUpdate({ target: flashcardState.userId, set: nextState });

    revalidatePath("/dashboard");
    revalidatePath("/words", "layout");

    return ok<TestResult>({
      testNumber,
      total,
      correct,
      guesses,
      passed,
      lockedUntil: nextLock.lockedUntil?.getTime() ?? null,
    });
  });
}
