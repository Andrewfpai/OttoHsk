import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { PageContainer, PageHeader } from "@/components/layout/page-header";
import { OrderingDrill } from "@/features/drills/components/ordering-drill";
import { drillSeed, getItemStats } from "@/features/drills/server/queries";
import { requireUser } from "@/lib/auth-guard";

export const metadata: Metadata = { title: "Sentence order" };

export default async function OrderingPage() {
  // HSK 6 has no sentence ordering; its place in the menu is "Find the error".
  if ((await requireUser()).level !== 5) redirect("/errors");
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
