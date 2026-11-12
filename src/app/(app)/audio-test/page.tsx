import type { Metadata } from "next";

import { PageContainer, PageHeader } from "@/components/layout/page-header";
import words from "@/content/audio-test.json";
import { AudioTest } from "@/features/audio/audio-test";

export const metadata: Metadata = { title: "Audio test" };

/** A trial page, not in the menu: compare the browser voice with recorded clips. */
export default function AudioTestPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Audio test"
        description="The first 20 HSK 6 words and their sentences, two ways: this device's built-in voice, and recorded clips. Try both on your phone and computer, and pick one."
      />
      <AudioTest words={words} />
    </PageContainer>
  );
}
