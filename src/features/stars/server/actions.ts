"use server";

import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { findWord } from "@/content/words";
import { db } from "@/db";
import { flashcardState, starredWords, wordProgress } from "@/db/schema";
import { type ActionResult, fail, ok } from "@/lib/action-result";
import { requireUser } from "@/lib/auth-guard";

const input = z.object({
  wordId: z.string().refine((id) => Boolean(findWord(id)), "Unknown word"),
  starred: z.boolean(),
});

/**
 * Star or unstar a word. Starring a word already in the flashcards brings
 * it back in the very next test; from there the usual spacing applies.
 */
export async function setStar(raw: unknown): Promise<ActionResult<{ starred: boolean }>> {
  const user = await requireUser();
  const parsed = input.safeParse(raw);
  if (!parsed.success) return fail("That word could not be starred.");
  const { wordId, starred } = parsed.data;

  if (!starred) {
    await db
      .delete(starredWords)
      .where(and(eq(starredWords.userId, user.id), eq(starredWords.wordId, wordId)));
  } else {
    await db.insert(starredWords).values({ userId: user.id, wordId }).onConflictDoNothing();
    const [state] = await db
      .select({ testsTaken: flashcardState.testsTaken })
      .from(flashcardState)
      .where(and(eq(flashcardState.userId, user.id), eq(flashcardState.level, user.level)))
      .limit(1);
    // Due in the very next test; its strength is left as it was.
    await db
      .update(wordProgress)
      .set({ dueTest: (state?.testsTaken ?? 0) + 1 })
      .where(and(eq(wordProgress.userId, user.id), eq(wordProgress.wordId, wordId)));
  }

  // No revalidatePath: in Next 16 it re-renders the page the learner is on,
  // reshuffling a review mid-glance. Every page reading stars is dynamic, so
  // the next visit is fresh, and the star itself is shown optimistically.
  return ok({ starred });
}
