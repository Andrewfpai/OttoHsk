import type { Metadata } from "next";

import { PageContainer, PageHeader } from "@/components/layout/page-header";
import { ClozeDrill } from "@/features/drills/components/cloze-drill";
import { drillSeed, getItemStats } from "@/features/drills/server/queries";

export const metadata: Metadata = { title: "Fill in" };

export default async function ClozePage() {
  const [stats, seed] = await Promise.all([getItemStats("cloze"), drillSeed()]);
  return (
    <PageContainer>
      <PageHeader
        title="Fill in 填空"
        description="Reading Part 1 (questions 46–60) from your own papers. Read the passage, pick A–D for each blank, then see why. Passages with a blank you missed come back first."
      />
      <ClozeDrill stats={stats} seed={seed} />
    </PageContainer>
  );
}
