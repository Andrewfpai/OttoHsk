import { PageContainer, PageHeader } from "@/components/layout/page-header";
import { wordBank } from "@/content/words";
import { WordsTabs } from "@/features/words/components/words-tabs";
import { requireUser } from "@/lib/auth-guard";

export default async function WordsLayout({ children }: LayoutProps<"/words">) {
  const { level } = await requireUser();
  const total = wordBank(level).total.toLocaleString("en-GB");
  return (
    <PageContainer>
      <PageHeader
        title="Words"
        description={`All ${total} new words of HSK ${level} (HSK 2.0). Flashcard tests move them from new to learning to known.`}
      />
      <WordsTabs />
      <div className="mt-6">{children}</div>
    </PageContainer>
  );
}
