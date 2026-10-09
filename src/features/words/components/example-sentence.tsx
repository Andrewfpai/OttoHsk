import type { Word } from "@/content/words";
import { cn } from "@/lib/utils";

/** The word's example sentence, with the word itself picked out. */
export function ExampleSentence({ word, className }: { word: Word; className?: string }) {
  if (!word.example) return null;
  const { zh, en } = word.example;
  const at = zh.indexOf(word.hanzi);
  return (
    <span className={cn("block space-y-0.5", className)}>
      <span className="font-hanzi block text-base leading-relaxed">
        {at === -1 ? (
          zh
        ) : (
          <>
            {zh.slice(0, at)}
            <span className="text-primary font-medium">{word.hanzi}</span>
            {zh.slice(at + word.hanzi.length)}
          </>
        )}
      </span>
      <span className="text-muted-foreground block text-sm">{en}</span>
    </span>
  );
}
