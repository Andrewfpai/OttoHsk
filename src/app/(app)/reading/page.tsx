import type { Metadata } from "next";

import { PageContainer, PageHeader } from "@/components/layout/page-header";
import { READING_SETS } from "@/content/reading";
import tokens from "@/content/reading-tokens.json";
import type { ReadingToken } from "@/content/types";
import { ReadingPaperView } from "@/features/reading/components/reading-paper";
import { StarsProvider } from "@/features/stars/components/stars";
import { getStarredIds } from "@/features/stars/server/queries";
import { requireUser } from "@/lib/auth-guard";

export const metadata: Metadata = { title: "Reading" };

export default async function ReadingPage() {
  const { level } = await requireUser();
  return (
    <PageContainer>
      <PageHeader
        title="Reading 阅读"
        description={
          level === 5
            ? `Parts 2 and 3 of ${READING_SETS.length} real papers (${READING_SETS.map((s) => s.paper.title).join(", ")}), done on screen.`
            : "The reading papers here are HSK 5. Switch to HSK 5 in Settings to do them."
        }
      />
      {level === 5 ? (
        <StarsProvider initial={await getStarredIds()}>
          <ReadingPaperView sets={READING_SETS} tokens={tokens as Record<string, ReadingToken[]>} />
        </StarsProvider>
      ) : null}
    </PageContainer>
  );
}
