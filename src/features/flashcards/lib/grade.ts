/**
 * Whether one test answer is right. Shared by the server, which grades, and
 * the test screen, which shows the result straight away.
 */
import type { Word } from "@/content/word-types";

import { pinyinMatches } from "./questions";

/** A choice carries `chosenId`; a typed pinyin answer carries `typed`. */
export type AnswerInput = { wordId: string; chosenId?: string; typed?: string; ms: number };

export function isRightAnswer(a: AnswerInput, getWord: (id: string) => Word | undefined): boolean {
  if (a.typed !== undefined) {
    const word = getWord(a.wordId);
    return word !== undefined && pinyinMatches(a.typed, word.pinyin);
  }
  return a.chosenId === a.wordId;
}
