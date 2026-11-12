import type { Metadata } from "next";

import { PageContainer, PageHeader } from "@/components/layout/page-header";
import { READING_SETS } from "@/content/reading";
import { readingHsk6 } from "@/content/reading-hsk6";
import { tokensFor } from "@/content/reading-tokens";
import type { ReadingSet } from "@/content/types";
import { ReadingPaperView } from "@/features/reading/components/reading-paper";
import { StarsProvider } from "@/features/stars/components/stars";
import { getStars } from "@/features/stars/server/queries";
import { requireUser } from "@/lib/auth-guard";

export const metadata: Metadata = { title: "Reading" };

/** HSK 6's practice papers, Part 3 (61–80) only. */
const HSK6_SETS: ReadingSet[] = readingHsk6.map((paper, i) => ({
  label: String(i + 1),
  paper: { ...paper, title: "HSK 6 practice" },
}));

export default async function ReadingPage() {
  const { level } = await requireUser();
  const sets = level === 5 ? READING_SETS : HSK6_SETS;
  const stars = await getStars();
  return (
    <PageContainer>
      <PageHeader
        title="Reading 阅读"
        description={
          level === 5
            ? `Parts 2 and 3 of ${READING_SETS.length} real papers (${READING_SETS.map((s) => s.paper.title).join(", ")}), done on screen.`
            : `Reading Part 3 (questions 61–80): ${HSK6_SETS.length} practice sets of five long passages, four questions each, 4 minutes a passage. After checking, tap any word for its meaning, and star it to test later.`
        }
      />
      <StarsProvider initial={stars.ids} initialOwn={stars.own}>
        <ReadingPaperView
          key={level}
          sets={sets}
          slot={level === 5 ? "" : "hsk6."}
          tokens={tokensFor(sets.map((s) => s.paper.id))}
        />
      </StarsProvider>
    </PageContainer>
  );
}
