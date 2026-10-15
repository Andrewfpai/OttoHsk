import { eq } from "drizzle-orm";

import { wordBank } from "@/content/words";
import { db } from "@/db";
import { starredWords } from "@/db/schema";
import { requireUser } from "@/lib/auth-guard";

/** The learner's starred words at their current level, most recent first. */
export async function getStarredIds(): Promise<string[]> {
  const user = await requireUser();
  const bank = wordBank(user.level);
  const rows = await db
    .select({ wordId: starredWords.wordId, at: starredWords.starredAt })
    .from(starredWords)
    .where(eq(starredWords.userId, user.id));
  return rows
    .filter((r) => bank.getWord(r.wordId))
    .sort((a, b) => b.at.getTime() - a.at.getTime())
    .map((r) => r.wordId);
}
