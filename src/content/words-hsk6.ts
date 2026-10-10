/**
 * The HSK 6 (HSK 2.0) word list: 2,500 words, most common first, built into
 * one file by `npm run words:build:hsk6` (see scripts/build-words-hsk6.mjs
 * for sources and licences).
 */
import { confusablesHsk6 } from "./confusables-hsk6";
import { type Word, makeBank } from "./word-types";
import data from "./words-hsk6.json";

export const wordsHsk6: Word[] = data;

export const bankHsk6 = makeBank(
  6,
  wordsHsk6,
  confusablesHsk6.map((set) => set.words.map((w) => w.hanzi)),
);
