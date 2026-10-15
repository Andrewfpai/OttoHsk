/**
 * Dev-only previews of every page with sample data, for checking the UI
 * without a database or a Google login. 404s in production. Saving anything
 * from here fails, since there is no database behind it.
 */
import { notFound } from "next/navigation";

import { READING_SETS } from "@/content/reading";
import readingTokens from "@/content/reading-tokens.json";
import { storiesHsk6 } from "@/content/stories-hsk6";
import type { ReadingToken } from "@/content/types";
import { ReadingPaperView } from "@/features/reading/components/reading-paper";
import { QuickReview } from "@/features/stars/components/quick-review";
import { StarsProvider } from "@/features/stars/components/stars";
import { StudySettingsForm } from "@/features/account/components/study-settings-form";
import { ErrorDrill } from "@/features/drills/components/error-drill";
import { DRILLS, drillItemIds } from "@/features/drills/lib/items";
import { RetellStudio } from "@/features/essays/components/retell-studio";
import { toLevel } from "@/lib/levels";

import { AppShell } from "@/components/layout/app-shell";
import { PageContainer, PageHeader } from "@/components/layout/page-header";
import { DashboardView } from "@/features/dashboard/components/dashboard-view";
import { ConfusablesDrill } from "@/features/drills/components/confusables-drill";
import { EssayStudio } from "@/features/essays/components/essay-studio";
import { ClozeDrill } from "@/features/drills/components/cloze-drill";
import { NoRecording } from "@/features/drills/components/use-record";
import { OrderingDrill } from "@/features/drills/components/ordering-drill";
import { FlashcardStudio } from "@/features/flashcards/components/flashcard-studio";
import { TestHistory } from "@/features/flashcards/components/test-history";
import { MockTracker } from "@/features/mocks/components/mock-tracker";
import { WordList } from "@/features/words/components/word-list";
import { WordsTabs } from "@/features/words/components/words-tabs";

import { sampleData } from "../sample";

/** `?level=6` previews HSK 6. */
export default async function PreviewPage({ params, searchParams }: PageProps<"/zz-preview/[view]">) {
  if (process.env.NODE_ENV === "production") notFound();
  const { view } = await params;
  const level = toLevel(Number((await searchParams).level ?? 5));
  const USER = {
    id: "preview",
    email: "preview@example.com",
    name: "Preview Learner",
    image: null,
    hasPassword: true,
    level,
    examDate: "2026-11-07",
  };
  const s = sampleData(level);
  const starred = s.progress.slice(0, 5).map((p) => p.wordId);

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
          <StarsProvider initial={starred} offline>
            <WordList
              progress={Object.fromEntries(
                s.progress.map((p) => [p.wordId, { strength: p.strength, dueTest: p.dueTest }]),
              )}
              nextTest={s.info.nextTest}
            />
          </StarsProvider>
        </div>
      </PageContainer>
    ),
    flashcards: (
      <PageContainer>
        <PageHeader title="Words" />
        <FlashcardStudio progress={s.progress} info={s.info} recentTests={s.recentTests} starredIds={starred} />
      </PageContainer>
    ),
    "flashcards-locked": (
      <PageContainer>
        <PageHeader title="Words" />
        <FlashcardStudio progress={s.progress} info={s.lockedInfo} recentTests={s.recentTests} starredIds={starred} />
      </PageContainer>
    ),
    confusables: (
      <PageContainer>
        <PageHeader title="Confusables 近义词" />
        <ConfusablesDrill
          sets={DRILLS[level].confusable}
          itemIds={drillItemIds(level, "confusable")}
          stats={{}}
          seed={s.seed}
        />
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
        <ClozeDrill passages={DRILLS[level].cloze} itemIds={drillItemIds(level, "cloze")} stats={{}} seed={s.seed} />
      </PageContainer>
    ),
    history: (
      <PageContainer>
        <PageHeader title="Words" />
        <WordsTabs />
        <div className="mt-6">
          <TestHistory tests={s.history} />
        </div>
      </PageContainer>
    ),
    errors: (
      <PageContainer>
        <PageHeader title="Find the error 病句" />
        <ErrorDrill items={DRILLS[6].error} stats={{}} seed={s.seed} />
      </PageContainer>
    ),
    retell: (
      <PageContainer>
        <PageHeader title="Retelling 缩写" />
        <RetellStudio
          stories={storiesHsk6}
          seed={s.seed}
          ai={{ enabled: true, models: ["deepseek-v4-pro", "gpt-6-sol", "claude-opus-4.8", "glm-5.2"] }}
          recent={[]}
        />
      </PageContainer>
    ),
    settings: (
      <PageContainer className="max-w-3xl">
        <PageHeader title="Settings" />
        <StudySettingsForm level={level} examDate="2026-11-07" />
      </PageContainer>
    ),
    review: (
      <PageContainer>
        <PageHeader title="Quick review" />
        <StarsProvider initial={starred} offline>
          <QuickReview startedIds={s.progress.map((p) => p.wordId)} seed={s.seed} />
        </StarsProvider>
      </PageContainer>
    ),
    reading: (
      <PageContainer>
        <PageHeader title="Reading 阅读" />
        <StarsProvider initial={starred} offline>
          <ReadingPaperView sets={READING_SETS} tokens={readingTokens as Record<string, ReadingToken[]>} />
        </StarsProvider>
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
