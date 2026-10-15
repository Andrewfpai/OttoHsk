import type { Metadata } from "next";

import { getFlashcardInfo, getProgress } from "@/features/flashcards/server/queries";
import { StarsProvider } from "@/features/stars/components/stars";
import { getStarredIds } from "@/features/stars/server/queries";
import { WordList } from "@/features/words/components/word-list";

export const metadata: Metadata = { title: "Word list" };

export default async function WordsPage() {
  const [progress, info, starredIds] = await Promise.all([getProgress(), getFlashcardInfo(), getStarredIds()]);
  const byWord = Object.fromEntries(
    progress.map((p) => [p.wordId, { strength: p.strength, dueTest: p.dueTest }]),
  );
  return (
    <StarsProvider initial={starredIds}>
      <WordList progress={byWord} nextTest={info.nextTest} />
    </StarsProvider>
  );
}
