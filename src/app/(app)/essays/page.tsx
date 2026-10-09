import type { Metadata } from "next";

import { PageContainer, PageHeader } from "@/components/layout/page-header";
import { drillSeed } from "@/features/drills/server/queries";
import { EssayStudio } from "@/features/essays/components/essay-studio";
import { getAiStatus, getRecentEssays } from "@/features/essays/server/queries";
import { getProgress } from "@/features/flashcards/server/queries";

export const metadata: Metadata = { title: "Essays" };

// Feedback may try up to four models in turn, each allowed ~55 s.
export const maxDuration = 240;

export default async function EssaysPage() {
  const [progress, seed, ai, recent] = await Promise.all([
    getProgress(),
    drillSeed(),
    getAiStatus(),
    getRecentEssays(),
  ]);
  return (
    <PageContainer>
      <PageHeader
        title="Essays"
        description="Writing Part 2: Q99 (use five given words) and Q100 (write about a picture), about 80 characters each. Length and word use are checked as you type; AI feedback marks the rest."
      />
      <EssayStudio
        startedWordIds={progress.map((p) => p.wordId)}
        seed={seed}
        ai={ai}
        recent={recent}
      />
    </PageContainer>
  );
}
