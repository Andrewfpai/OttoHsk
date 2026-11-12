import type { Metadata } from "next";

import { PageContainer, PageHeader } from "@/components/layout/page-header";
import { tokensFor } from "@/content/reading-tokens";
import { ClozeDrill } from "@/features/drills/components/cloze-drill";
import { DRILLS, drillItemIds } from "@/features/drills/lib/items";
import { drillSeed, getItemStats } from "@/features/drills/server/queries";
import { StarsProvider } from "@/features/stars/components/stars";
import { getStars } from "@/features/stars/server/queries";
import { requireUser } from "@/lib/auth-guard";

export const metadata: Metadata = { title: "Fill in" };

export default async function ClozePage() {
  const [{ level }, stats, seed, starred] = await Promise.all([
    requireUser(),
    getItemStats("cloze"),
    drillSeed(),
    getStars(),
  ]);
  const passages = DRILLS[level].cloze;
  return (
    <PageContainer>
      <PageHeader
        title="Fill in 填空"
        description={
          level === 5
            ? "Reading Part 1 (questions 46–60) from your own papers. Read the passage, pick A–D for each blank, then see why. Passages with a blank you missed come back first."
            : "Reading Part 1 (questions 41–50): short passages with four or five blanks. Pick A–D for each, then see why. Passages with a blank you missed come back first."
        }
      />
      <StarsProvider initial={starred.ids} initialOwn={starred.own}>
        <ClozeDrill
          key={level}
          passages={passages}
          itemIds={drillItemIds(level, "cloze")}
          stats={stats}
          seed={seed}
          tokens={tokensFor(passages.map((p) => p.id))}
        />
      </StarsProvider>
    </PageContainer>
  );
}
