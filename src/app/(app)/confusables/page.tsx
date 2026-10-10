import type { Metadata } from "next";

import { PageContainer, PageHeader } from "@/components/layout/page-header";
import { ConfusablesDrill } from "@/features/drills/components/confusables-drill";
import { DRILLS, drillItemIds } from "@/features/drills/lib/items";
import { drillSeed, getItemStats } from "@/features/drills/server/queries";
import { requireUser } from "@/lib/auth-guard";

export const metadata: Metadata = { title: "Confusables" };

export default async function ConfusablesPage() {
  const [{ level }, stats, seed] = await Promise.all([requireUser(), getItemStats("confusable"), drillSeed()]);
  return (
    <PageContainer>
      <PageHeader
        title="Confusables 近义词"
        description={
          level === 5
            ? "Near-synonyms of the kind Reading Part 1 tests. Pick the word that fits, then read why the other one doesn't. Questions you missed come back first."
            : "Near-synonyms of the kind HSK 6 Reading Parts 1 and 2 test. Pick the word that fits, then read why the others don't. Questions you missed come back first."
        }
      />
      <ConfusablesDrill
        key={level}
        sets={DRILLS[level].confusable}
        itemIds={drillItemIds(level, "confusable")}
        stats={stats}
        seed={seed}
      />
    </PageContainer>
  );
}
