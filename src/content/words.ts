/**
 * Every level's vocabulary, for server code. Client code must not import
 * this (it would ship every list to the browser): it uses `useWordBank()`.
 */
import type { Level } from "@/lib/levels";

import type { WordBank } from "./word-types";
import { bankHsk5 } from "./words-hsk5";
import { bankHsk6 } from "./words-hsk6";

export type { Example, Word, WordBank } from "./word-types";

const BANKS: Record<Level, WordBank> = { 5: bankHsk5, 6: bankHsk6 };

export function wordBank(level: Level): WordBank {
  return BANKS[level];
}

/** A word from any level, for checks that only need to know it exists. */
export function findWord(id: string) {
  return bankHsk5.getWord(id) ?? bankHsk6.getWord(id);
}
