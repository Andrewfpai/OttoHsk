import type { Metadata } from "next";

import { PageContainer, PageHeader } from "@/components/layout/page-header";
import { ClozeDrill } from "@/features/drills/components/cloze-drill";
import { DRILLS, drillItemIds } from "@/features/drills/lib/items";
import { drillSeed, getItemStats } from "@/features/drills/server/queries";
import { requireUser } from "@/lib/auth-guard";

export const metadata: Metadata = { title: "Fill in" };

export default async function ClozePage() {
  const [{ level }, stats, seed] = await Promise.all([requireUser(), getItemStats("cloze"), drillSeed()]);
  return (
    <PageContainer>
      <PageHeader
        title="Fill in 填空"
        description={
          level === 5
            ? "Reading Part 1 (questions 46–60) from your own papers. Read the passage, pick A–D for each blank, then see why. Passages with a blank you missed come back first."
            : "Reading Part 2 (questions 61–70): short passages with three to five blanks. Pick A–D for each, then see why. Passages with a blank you missed come back first."
        }
      />
      <ClozeDrill
        key={level}
        passages={DRILLS[level].cloze}
        itemIds={drillItemIds(level, "cloze")}
        stats={stats}
        seed={seed}
      />
    </PageContainer>
  );
}
