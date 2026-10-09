import type { Metadata } from "next";

import { getProgress } from "@/features/flashcards/server/queries";
import { WordList } from "@/features/words/components/word-list";

export const metadata: Metadata = { title: "Word list" };

export default async function WordsPage() {
  const progress = await getProgress();
  const strengths = Object.fromEntries(progress.map((p) => [p.wordId, p.strength]));
  return <WordList strengths={strengths} />;
}
