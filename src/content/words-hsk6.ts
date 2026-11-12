/**
 * The HSK 6 word list for the new HSK (HSK 3.0): the new HSK 5 words not in
 * HSK 2.0 levels 1–5, then the whole new HSK 6 list, 2,547 words in study
 * order. Built into one file, with its test sentences, by
 * `npm run words:build:hsk6` (see scripts/build-words-hsk6.mjs for sources
 * and licences).
 */
import { confusablesHsk6 } from "./confusables-hsk6";
import quiz from "./quiz-hsk6.json";
import { type Example, type Word, makeBank } from "./word-types";
import data from "./words-hsk6.json";

/** Test-only sentences (built with the list), never the practice card's. */
const quizOf: Record<string, Example> = quiz;

export const wordsHsk6: Word[] = data.map((w) => ({ ...w, from: w.from as Word["from"], quiz: quizOf[w.id] ?? null }));

export const bankHsk6 = makeBank(
  6,
  wordsHsk6,
  confusablesHsk6.map((set) => set.words.map((w) => w.hanzi)),
);
