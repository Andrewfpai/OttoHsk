import type { Metadata } from "next";

import { PageContainer, PageHeader } from "@/components/layout/page-header";
import { grammarPatterns } from "@/content/grammar";
import { GrammarBank } from "@/features/drills/components/grammar-bank";
import { getItemStats } from "@/features/drills/server/queries";

export const metadata: Metadata = { title: "Grammar" };

export default async function GrammarPage() {
  const stats = await getItemStats("grammar");
  return (
    <PageContainer>
      <PageHeader
        title="Grammar"
        description={`${grammarPatterns.length} HSK 5 patterns. Open one for the rule, two examples and two quick questions. A pattern is mastered when your latest answer to both is right.`}
      />
      <GrammarBank stats={stats} />
    </PageContainer>
  );
}
