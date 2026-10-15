import type { Metadata } from "next";

import { TestHistory } from "@/features/flashcards/components/test-history";
import { getTestHistory } from "@/features/flashcards/server/queries";

export const metadata: Metadata = { title: "Test history" };

export default async function HistoryPage() {
  const tests = await getTestHistory();
  return <TestHistory tests={tests} />;
}
