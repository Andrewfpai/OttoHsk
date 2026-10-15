import type { Metadata } from "next";

import { PageContainer, PageHeader } from "@/components/layout/page-header";
import { readingH51329 } from "@/content/reading-h51329";
import tokens from "@/content/reading-tokens.json";
import type { ReadingToken } from "@/content/types";
import { ReadingPaperView } from "@/features/reading/components/reading-paper";
import { StarsProvider } from "@/features/stars/components/stars";
import { getStarredIds } from "@/features/stars/server/queries";
import { requireUser } from "@/lib/auth-guard";

export const metadata: Metadata = { title: "Reading" };

/** Only the texts of this paper go to the browser. */
function tokensFor(paperId: string): Record<string, ReadingToken[]> {
  const all = tokens as Record<string, ReadingToken[]>;
  return Object.fromEntries(Object.entries(all).filter(([key]) => key.startsWith(`${paperId}-`) || key.startsWith(`${paperId}#`)));
}

export default async function ReadingPage() {
  const { level } = await requireUser();
  const paper = readingH51329;
  return (
    <PageContainer>
      <PageHeader
        title="Reading 阅读"
        description={
          level === 5
            ? `${paper.source}. Parts 2 and 3 of a real paper, done on screen.`
            : "The reading papers here are HSK 5. Switch to HSK 5 in Settings to do them."
        }
      />
      {level === 5 ? (
        <StarsProvider initial={await getStarredIds()}>
          <ReadingPaperView paper={paper} tokens={tokensFor(paper.id)} />
        </StarsProvider>
      ) : null}
    </PageContainer>
  );
}
