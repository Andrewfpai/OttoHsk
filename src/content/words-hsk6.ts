/**
 * The HSK 6 (HSK 2.0) word list: 2,500 words, most common first, built into
 * one file by `npm run words:build:hsk6` (see scripts/build-words-hsk6.mjs
 * for sources and licences).
 */
import { confusablesHsk6 } from "./confusables-hsk6";
import quiz from "./quiz-hsk6.json";
import { type Example, type Word, makeBank } from "./word-types";
import data from "./words-hsk6.json";

/** Test-only sentences (`node scripts/build-quiz.mjs`), never the practice card's. */
const quizOf: Record<string, Example> = quiz;

export const wordsHsk6: Word[] = data.map((w) => ({ ...w, quiz: quizOf[w.id] ?? null }));

export const bankHsk6 = makeBank(
  6,
  wordsHsk6,
  confusablesHsk6.map((set) => set.words.map((w) => w.hanzi)),
);
