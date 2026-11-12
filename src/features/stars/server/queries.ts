import { eq } from "drizzle-orm";

import { wordBank } from "@/content/words";
import { db } from "@/db";
import { starredWords } from "@/db/schema";
import { requireUser } from "@/lib/auth-guard";

import { type OwnWord, isOwnWord } from "../lib/own-words";

export type Stars = {
  /** Starred words of the current level's list, most recent first. */
  ids: string[];
  /** Starred own words (in no list) met at this level, most recent first. */
  own: OwnWord[];
};

/** The learner's stars at their current level. */
export async function getStars(): Promise<Stars> {
  const user = await requireUser();
  const bank = wordBank(user.level);
  const rows = await db.select().from(starredWords).where(eq(starredWords.userId, user.id));
  rows.sort((a, b) => b.starredAt.getTime() - a.starredAt.getTime());
  return {
    ids: rows.filter((r) => bank.getWord(r.wordId)).map((r) => r.wordId),
    own: rows
      .filter((r) => isOwnWord(r.wordId) && r.level === user.level)
      .map((r) => ({ id: r.wordId, hanzi: r.wordId.slice(1), pinyin: r.pinyin ?? "", gloss: r.gloss ?? "" })),
  };
}

/** The learner's starred list words at their current level, most recent first. */
export async function getStarredIds(): Promise<string[]> {
  return (await getStars()).ids;
}
