/**
 * The shape of a vocabulary word, shared by every level. Data-free on
 * purpose: client code imports types from here, and gets a level's words
 * from `useWordBank()` (loaded on demand) — never by importing a word list,
 * which would ship every level's list to every page.
 */
import type { Level } from "@/lib/levels";

export type Example = { zh: string; en: string };

export type Word = {
  /** The simplified hanzi. Progress rows are keyed by it. */
  id: string;
  hanzi: string;
  /** Several readings are separated by ", " ("ò, ó, é"). */
  pinyin: string;
  /** The checked English meaning: shown on cards and used as a quiz answer. */
  gloss: string;
  /** The same meaning in Indonesian. */
  indonesian: string;
  /** Every dictionary sense, for the word list's detail view. May be empty. */
  meanings: string[];
  pos: string[];
  /** Frequency rank; lower is more common. */
  rank: number;
  /** One sentence using the word in the sense its level tests. */
  example: Example | null;
};

/** One level's vocabulary, with lookups. */
export type WordBank = {
  level: Level;
  /** Most common first. */
  words: readonly Word[];
  total: number;
  getWord: (id: string) => Word | undefined;
  /** Groups of easily confused words (hanzi), for harder quiz options. */
  confusableGroups: readonly (readonly string[])[];
};

export function makeBank(
  level: Level,
  words: readonly Word[],
  confusableGroups: readonly (readonly string[])[],
): WordBank {
  const byId = new Map(words.map((w) => [w.id, w]));
  return { level, words, total: words.length, getWord: (id) => byId.get(id), confusableGroups };
}
