/**
 * Dev-only previews of every page with sample data, for checking the UI
 * without a database or a Google login. 404s in production. Saving anything
 * from here fails, since there is no database behind it.
 */
import { notFound } from "next/navigation";

import { AppShell } from "@/components/layout/app-shell";
import { PageContainer, PageHeader } from "@/components/layout/page-header";
import { DashboardView } from "@/features/dashboard/components/dashboard-view";
import { ConfusablesDrill } from "@/features/drills/components/confusables-drill";
import { EssayStudio } from "@/features/essays/components/essay-studio";
import { ClozeDrill } from "@/features/drills/components/cloze-drill";
import { NoRecording } from "@/features/drills/components/use-record";
import { OrderingDrill } from "@/features/drills/components/ordering-drill";
import { FlashcardStudio } from "@/features/flashcards/components/flashcard-studio";
import { MockTracker } from "@/features/mocks/components/mock-tracker";
import { WordList } from "@/features/words/components/word-list";
import { WordsTabs } from "@/features/words/components/words-tabs";

import { sampleData } from "../sample";

const USER = { id: "preview", email: "preview@example.com", name: "Preview Learner", image: null, hasPassword: true };

export default async function PreviewPage({ params }: PageProps<"/zz-preview/[view]">) {
  if (process.env.NODE_ENV === "production") notFound();
  const { view } = await params;
  const s = sampleData();

  async function signOutAction() {
    "use server";
  }

  const pages: Record<string, React.ReactNode> = {
    dashboard: <DashboardView name={USER.name} d={s.dashboard} />,
    words: (
      <PageContainer>
        <PageHeader title="Words" />
        <WordsTabs />
        <div className="mt-6">
          <WordList strengths={Object.fromEntries(s.progress.map((p) => [p.wordId, p.strength]))} />
        </div>
      </PageContainer>
    ),
    flashcards: (
      <PageContainer>
        <PageHeader title="Words" />
        <FlashcardStudio progress={s.progress} info={s.info} recentTests={s.recentTests} />
      </PageContainer>
    ),
    "flashcards-locked": (
      <PageContainer>
        <PageHeader title="Words" />
        <FlashcardStudio progress={s.progress} info={s.lockedInfo} recentTests={s.recentTests} />
      </PageContainer>
    ),
    confusables: (
      <PageContainer>
        <PageHeader title="Confusables 近义词" />
        <ConfusablesDrill stats={{}} seed={s.seed} />
      </PageContainer>
    ),
    ordering: (
      <PageContainer>
        <PageHeader title="Sentence order" />
        <OrderingDrill stats={s.stats} seed={s.seed} />
      </PageContainer>
    ),
    essays: (
      <PageContainer>
        <PageHeader title="Essays" />
        <EssayStudio
          startedWordIds={s.progress.map((p) => p.wordId)}
          seed={s.seed}
          ai={{ enabled: true, models: ["deepseek-v4-pro", "gpt-6-sol", "claude-opus-4.8", "glm-5.2"] }}
          recent={s.essays}
        />
      </PageContainer>
    ),
    cloze: (
      <PageContainer>
        <PageHeader title="Fill in 填空" />
        <ClozeDrill stats={{}} seed={s.seed} />
      </PageContainer>
    ),
    mocks: (
      <PageContainer>
        <PageHeader title="Mock tests" />
        <MockTracker mocks={s.mocks} today={s.today} />
      </PageContainer>
    ),
  };

  const page = pages[view];
  if (!page) notFound();

  return (
    <AppShell user={USER} signOutAction={signOutAction}>
      <NoRecording>{page}</NoRecording>
    </AppShell>
  );
}
