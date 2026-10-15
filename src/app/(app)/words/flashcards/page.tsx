import type { Metadata } from "next";

import { FlashcardStudio } from "@/features/flashcards/components/flashcard-studio";
import { getFlashcardInfo, getProgress, getRecentTests } from "@/features/flashcards/server/queries";
import { getStarredIds } from "@/features/stars/server/queries";

export const metadata: Metadata = { title: "Flashcards" };

export default async function FlashcardsPage({ searchParams }: PageProps<"/words/flashcards">) {
  const [progress, info, recentTests, starredIds, params] = await Promise.all([
    getProgress(),
    getFlashcardInfo(),
    getRecentTests(),
    getStarredIds(),
    searchParams,
  ]);
  return (
    <FlashcardStudio
      progress={progress}
      info={info}
      recentTests={recentTests}
      starredIds={starredIds}
      initialSource={params.deck === "starred" ? "starred" : "mix"}
    />
  );
}
