/**
 * The HSK 5 (HSK 2.0) word list: the app's source of truth for vocabulary.
 *
 * Three files, merged here by word id:
 * - `words.json`: the 1,300 words with pinyin, frequency and every
 *   dictionary sense, built by `npm run words:build` (see
 *   scripts/build-words.mjs for sources and licences). Most common first.
 * - `meanings.json`: the checked meaning of every word, in English (shown
 *   and quizzed on) and Indonesian. It replaces the dictionary's guess.
 *   Fix a meaning here, never in words.json.
 * - `examples.json`: one example sentence per word.
 */
import examples from "./examples.json";
import checked from "./meanings.json";
import data from "./words.json";

export type Example = { zh: string; en: string };

export type Word = {
  /** The simplified hanzi. Progress rows are keyed by it. */
  id: string;
  hanzi: string;
  pinyin: string;
  /** The checked English meaning: shown on cards and used as a quiz answer. */
  gloss: string;
  /** The same meaning in Indonesian. */
  indonesian: string;
  /** Every dictionary sense, for the word list's detail view. */
  meanings: string[];
  pos: string[];
  /** Frequency rank; lower is more common. */
  rank: number;
  /** One sentence using the word in its HSK 5 sense. */
  example: Example | null;
};

type Meaning = { gloss: string; indonesian: string };
const meaningOf: Record<string, Meaning> = checked;
const exampleOf: Record<string, Example> = examples;

export const words: Word[] = data.map((w) => ({
  ...w,
  gloss: meaningOf[w.id]?.gloss ?? w.gloss,
  indonesian: meaningOf[w.id]?.indonesian ?? "",
  example: exampleOf[w.id] ?? null,
}));

export const TOTAL_WORDS = words.length;

const byId = new Map(words.map((w) => [w.id, w]));

export function getWord(id: string): Word | undefined {
  return byId.get(id);
}
