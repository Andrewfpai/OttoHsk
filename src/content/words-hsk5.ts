/**
 * The HSK 5 (HSK 2.0) word list.
 *
 * Three files, merged here by word id:
 * - `words.json`: the 1,300 words with pinyin, frequency and every
 *   dictionary sense, built by `npm run words:build` (see
 *   scripts/build-words.mjs for sources and licences). Most common first.
 * - `meanings.json`: the checked meaning of every word, in English (shown
 *   and quizzed on) and Indonesian. It replaces the dictionary's guess.
 *   Fix a meaning here, never in words.json.
 * - `examples.json`: one example sentence per word, shown in practice.
 * - `quiz-hsk5.json`: a different sentence per word, for tests only
 *   (`node scripts/build-quiz.mjs`).
 */
import { confusables } from "./confusables";
import examples from "./examples.json";
import checked from "./meanings.json";
import quiz from "./quiz-hsk5.json";
import { type Example, type Word, makeBank } from "./word-types";
import data from "./words.json";

type Meaning = { gloss: string; indonesian: string };
const meaningOf: Record<string, Meaning> = checked;
const exampleOf: Record<string, Example> = examples;
const quizOf: Record<string, Example> = quiz;

export const wordsHsk5: Word[] = data.map((w) => ({
  ...w,
  gloss: meaningOf[w.id]?.gloss ?? w.gloss,
  indonesian: meaningOf[w.id]?.indonesian ?? "",
  example: exampleOf[w.id] ?? null,
  quiz: quizOf[w.id] ?? null,
}));

export const bankHsk5 = makeBank(
  5,
  wordsHsk5,
  confusables.map((set) => set.words.map((w) => w.hanzi)),
);
