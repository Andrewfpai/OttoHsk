import type { Metadata } from "next";

import { PageContainer, PageHeader } from "@/components/layout/page-header";
import { MockTracker } from "@/features/mocks/components/mock-tracker";
import { getMocks } from "@/features/mocks/server/queries";
import { localDate } from "@/lib/exam";

export const metadata: Metadata = { title: "Mock tests" };

export default async function MocksPage() {
  const mocks = await getMocks();
  return (
    <PageContainer>
      <PageHeader
        title="Mock tests"
        description="Log each mock paper as correct answers per section and watch the trend. Spend most of your time on the section that is improving least."
      />
      <MockTracker mocks={mocks} today={localDate(new Date())} />
    </PageContainer>
  );
}
