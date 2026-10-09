import { PageContainer, PageHeader } from "@/components/layout/page-header";
import { TOTAL_WORDS } from "@/content/words";
import { WordsTabs } from "@/features/words/components/words-tabs";

export default function WordsLayout({ children }: LayoutProps<"/words">) {
  return (
    <PageContainer>
      <PageHeader
        title="Words"
        description={`All ${TOTAL_WORDS.toLocaleString()} new words of HSK 5 (HSK 2.0), most common first. Flashcard tests move them from new to learning to known.`}
      />
      <WordsTabs />
      <div className="mt-6">{children}</div>
    </PageContainer>
  );
}
