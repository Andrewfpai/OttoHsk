import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { PageContainer, PageHeader } from "@/components/layout/page-header";
import { ErrorDrill } from "@/features/drills/components/error-drill";
import { DRILLS } from "@/features/drills/lib/items";
import { drillSeed, getItemStats } from "@/features/drills/server/queries";
import { requireUser } from "@/lib/auth-guard";

export const metadata: Metadata = { title: "Find the error" };

export default async function ErrorsPage() {
  // HSK 5 has no 病句 section; its place in the menu is sentence order.
  if ((await requireUser()).level !== 6) redirect("/ordering");
  const [stats, seed] = await Promise.all([getItemStats("error"), drillSeed()]);
  return (
    <PageContainer>
      <PageHeader
        title="Find the error 病句"
        description="Reading Part 1 (questions 51–60): four sentences, one with an error. Pick it, then see it corrected and why. The ones you missed come back first."
      />
      <ErrorDrill items={DRILLS[6].error} stats={stats} seed={seed} />
    </PageContainer>
  );
}
