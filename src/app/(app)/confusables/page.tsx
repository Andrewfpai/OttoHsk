import type { Metadata } from "next";

import { PageContainer, PageHeader } from "@/components/layout/page-header";
import { ConfusablesDrill } from "@/features/drills/components/confusables-drill";
import { drillSeed, getItemStats } from "@/features/drills/server/queries";

export const metadata: Metadata = { title: "Confusables" };

export default async function ConfusablesPage() {
  const [stats, seed] = await Promise.all([getItemStats("confusable"), drillSeed()]);
  return (
    <PageContainer>
      <PageHeader
        title="Confusables 近义词"
        description="Near-synonyms of the kind Reading Part 1 tests. Pick the word that fits, then read why the other one doesn't. Questions you missed come back first."
      />
      <ConfusablesDrill stats={stats} seed={seed} />
    </PageContainer>
  );
}
