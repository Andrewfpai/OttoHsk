import type { Metadata } from "next";

import { PageContainer, PageHeader } from "@/components/layout/page-header";
import { storiesHsk6 } from "@/content/stories-hsk6";
import { drillSeed } from "@/features/drills/server/queries";
import { EssayStudio } from "@/features/essays/components/essay-studio";
import { RetellStudio } from "@/features/essays/components/retell-studio";
import { getAiStatus, getRecentEssays } from "@/features/essays/server/queries";
import { getProgress } from "@/features/flashcards/server/queries";
import { requireUser } from "@/lib/auth-guard";

export const metadata: Metadata = { title: "Writing" };

// Feedback may try up to four models in turn, each allowed ~55 s.
export const maxDuration = 240;

export default async function EssaysPage() {
  const [user, seed, ai, recent] = await Promise.all([
    requireUser(),
    drillSeed(),
    getAiStatus(),
    getRecentEssays(),
  ]);

  if (user.level === 6) {
    return (
      <PageContainer>
        <PageHeader
          title="Retelling 缩写"
          description="Writing (question 101): read a story for 10 minutes, then retell it from memory in about 400 characters, with a title. AI feedback checks which story points you kept, and your Chinese."
        />
        <RetellStudio stories={storiesHsk6} seed={seed} ai={ai} recent={recent} />
      </PageContainer>
    );
  }

  const progress = await getProgress();
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
