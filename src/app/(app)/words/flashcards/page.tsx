import type { Metadata } from "next";

import { FlashcardStudio } from "@/features/flashcards/components/flashcard-studio";
import { getFlashcardInfo, getProgress, getRecentTests } from "@/features/flashcards/server/queries";

export const metadata: Metadata = { title: "Flashcards" };

export default async function FlashcardsPage() {
  const [progress, info, recentTests] = await Promise.all([
    getProgress(),
    getFlashcardInfo(),
    getRecentTests(),
  ]);
  return <FlashcardStudio progress={progress} info={info} recentTests={recentTests} />;
}
