import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { PageContainer, PageHeader } from "@/components/layout/page-header";
import { tokensFor } from "@/content/reading-tokens";
import { SentenceFillDrill } from "@/features/drills/components/sentence-fill-drill";
import { DRILLS } from "@/features/drills/lib/items";
import { drillSeed, getItemStats } from "@/features/drills/server/queries";
import { StarsProvider } from "@/features/stars/components/stars";
import { getStarredIds } from "@/features/stars/server/queries";
import { requireUser } from "@/lib/auth-guard";

export const metadata: Metadata = { title: "Sentence fill" };

export default async function SentencesPage() {
  // HSK 5 (HSK 2.0) has no sentence fill; its place in the menu is sentence order.
  if ((await requireUser()).level !== 6) redirect("/ordering");
  const [stats, seed, starred] = await Promise.all([getItemStats("sentence"), drillSeed(), getStarredIds()]);
  const passages = DRILLS[6].sentence;
  return (
    <PageContainer>
      <PageHeader
        title="Sentence fill 选句填空"
        description="Reading Part 2 (questions 51–60): five gaps, six sentences, one left over. Put each sentence where it fits, then check and see why. After checking, tap any word for its meaning. Passages with a gap you missed come back first."
      />
      <StarsProvider initial={starred}>
        <SentenceFillDrill passages={passages} stats={stats} seed={seed} tokens={tokensFor(passages.map((p) => p.id))} />
      </StarsProvider>
    </PageContainer>
  );
}
