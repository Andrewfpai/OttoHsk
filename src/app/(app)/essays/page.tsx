import type { Metadata } from "next";

import { PageContainer, PageHeader } from "@/components/layout/page-header";
import { writingHsk6 } from "@/content/writing-hsk6";
import { drillSeed } from "@/features/drills/server/queries";
import { EssayStudio } from "@/features/essays/components/essay-studio";
import { WritingStudio } from "@/features/essays/components/writing-studio";
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
          title="Writing 写作"
          description="New HSK 6 writing, 45 minutes for both parts. Part 1: a practical text (a notice, letter, post…) of at least 150 characters. Part 2: an opinion essay of at least 300. AI feedback checks the task's points, and your Chinese."
        />
        <WritingStudio prompts={writingHsk6} seed={seed} ai={ai} recent={recent} />
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
