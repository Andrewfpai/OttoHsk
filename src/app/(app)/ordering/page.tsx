import type { Metadata } from "next";

import { PageContainer, PageHeader } from "@/components/layout/page-header";
import { OrderingDrill } from "@/features/drills/components/ordering-drill";
import { drillSeed, getItemStats } from "@/features/drills/server/queries";

export const metadata: Metadata = { title: "Sentence order" };

export default async function OrderingPage() {
  const [stats, seed] = await Promise.all([getItemStats("ordering"), drillSeed()]);
  return (
    <PageContainer>
      <PageHeader
        title="Sentence order"
        description="Writing Part 1 (questions 91–98): arrange the words into one correct sentence. The ones you got wrong come back first."
      />
      <OrderingDrill stats={stats} seed={seed} />
    </PageContainer>
  );
}
