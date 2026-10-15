import type { Metadata } from "next";

import { PageContainer, PageHeader } from "@/components/layout/page-header";
import { drillSeed } from "@/features/drills/server/queries";
import { getProgress } from "@/features/flashcards/server/queries";
import { QuickReview } from "@/features/stars/components/quick-review";
import { StarsProvider } from "@/features/stars/components/stars";
import { getStarredIds } from "@/features/stars/server/queries";

export const metadata: Metadata = { title: "Quick review" };

export default async function ReviewPage() {
  const [progress, starredIds, seed] = await Promise.all([getProgress(), getStarredIds(), drillSeed()]);
  return (
    <PageContainer>
      <PageHeader
        title="Quick review"
        description="Ten random words, hanzi only. Recall the reading and meaning, then check. Star the shaky ones: they come back in your next flashcard test, and you can test the starred words on their own."
      />
      <StarsProvider initial={starredIds}>
        <QuickReview startedIds={progress.map((p) => p.wordId)} seed={seed} />
      </StarsProvider>
    </PageContainer>
  );
}
