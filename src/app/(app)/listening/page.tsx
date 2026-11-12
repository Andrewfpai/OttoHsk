import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { PageContainer, PageHeader } from "@/components/layout/page-header";
import audio from "@/content/listening-audio.json";
import { listeningHsk6 } from "@/content/listening-hsk6";
import { tokensFor } from "@/content/reading-tokens";
import { ListeningPapers } from "@/features/listening/components/listening-paper";
import { StarsProvider } from "@/features/stars/components/stars";
import { getStars } from "@/features/stars/server/queries";
import { requireUser } from "@/lib/auth-guard";

export const metadata: Metadata = { title: "Listening" };

export default async function ListeningPage() {
  // Listening practice is written for the new HSK 6.
  if ((await requireUser()).level !== 6) redirect("/dashboard");
  const stars = await getStars();
  return (
    <PageContainer>
      <PageHeader
        title="Listening 听力"
        description="New HSK 6 listening, questions 1–40: short passages (Part 1), longer passages (Part 2) and interviews (Part 3), read by a woman's and a man's voice. Play, answer from the options, then check: the transcript appears, and you can replay any line and look up any word."
      />
      <StarsProvider initial={stars.ids} initialOwn={stars.own}>
        <ListeningPapers papers={listeningHsk6} audio={audio} tokens={tokensFor(listeningHsk6.map((p) => p.id))} />
      </StarsProvider>
    </PageContainer>
  );
}
