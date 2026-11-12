import type { Metadata } from "next";

import { PageContainer, PageHeader } from "@/components/layout/page-header";
import data from "@/content/audio-test.json";
import { AudioTest } from "@/features/audio/audio-test";

export const metadata: Metadata = { title: "Audio test" };

/** A trial page, not in the menu: compare the browser voice with recorded clips. */
export default function AudioTestPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Audio test"
        description="The first 8 HSK 6 words and their sentences, recorded in six voices at three speeds, with this device's built-in voice to compare. Pick the voice and speed you like."
      />
      <AudioTest data={data} />
    </PageContainer>
  );
}
