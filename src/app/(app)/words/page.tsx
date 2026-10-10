import type { Metadata } from "next";

import { getFlashcardInfo, getProgress } from "@/features/flashcards/server/queries";
import { WordList } from "@/features/words/components/word-list";

export const metadata: Metadata = { title: "Word list" };

export default async function WordsPage() {
  const [progress, info] = await Promise.all([getProgress(), getFlashcardInfo()]);
  const byWord = Object.fromEntries(
    progress.map((p) => [p.wordId, { strength: p.strength, dueTest: p.dueTest }]),
  );
  return <WordList progress={byWord} nextTest={info.nextTest} />;
}
