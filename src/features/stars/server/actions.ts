"use server";

import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { findWord } from "@/content/words";
import { db } from "@/db";
import { flashcardState, starredWords, wordProgress } from "@/db/schema";
import { type ActionResult, fail, ok } from "@/lib/action-result";
import { requireUser } from "@/lib/auth-guard";

import { OWN_PREFIX } from "../lib/own-words";

const input = z.union([
  z.object({
    wordId: z.string().refine((id) => Boolean(findWord(id)), "Unknown word"),
    starred: z.boolean(),
  }),
  // A word met while reading that no list has: kept with what the page showed.
  z.object({
    own: z.object({
      hanzi: z.string().regex(/^\p{Script=Han}{1,8}$/u),
      pinyin: z.string().trim().min(1).max(80),
      gloss: z.string().trim().max(300),
    }),
    starred: z.boolean(),
  }),
]);

/**
 * Star or unstar a word. Starring a list word already in the flashcards
 * brings it back in the very next test; from there the usual spacing
 * applies. Starring any other word saves it, with its pinyin and meaning,
 * for Quick review.
 */
export async function setStar(raw: unknown): Promise<ActionResult<{ starred: boolean }>> {
  const user = await requireUser();
  const parsed = input.safeParse(raw);
  if (!parsed.success) return fail("That word could not be starred.");
  const { starred } = parsed.data;
  const wordId = "own" in parsed.data ? `${OWN_PREFIX}${parsed.data.own.hanzi}` : parsed.data.wordId;

  if (!starred) {
    await db
      .delete(starredWords)
      .where(and(eq(starredWords.userId, user.id), eq(starredWords.wordId, wordId)));
  } else if ("own" in parsed.data) {
    const { pinyin, gloss } = parsed.data.own;
    await db
      .insert(starredWords)
      .values({ userId: user.id, wordId, pinyin, gloss, level: user.level })
      .onConflictDoNothing();
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
