/**
 * The HSK 2.0 level-5 word list: the app's source of truth for vocabulary.
 * Built by `npm run words:build`; see scripts/build-words.mjs for the source
 * and licence. Sorted most common first.
 */
import data from "./words.json";

export type Word = {
  /** The simplified hanzi. Progress rows are keyed by it. */
  id: string;
  hanzi: string;
  pinyin: string;
  /** A short meaning, used on cards and as a quiz option. */
  gloss: string;
  meanings: string[];
  pos: string[];
  /** Frequency rank; lower is more common. */
  rank: number;
};

export const words: Word[] = data;

export const TOTAL_WORDS = words.length;

const byId = new Map(words.map((w) => [w.id, w]));

export function getWord(id: string): Word | undefined {
  return byId.get(id);
}
