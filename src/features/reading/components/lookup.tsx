"use client";

import { X } from "lucide-react";
import { createContext, useContext, useMemo, useState } from "react";

import { useWordBank } from "@/components/level/level-provider";

import type { ReadingToken } from "@/content/types";
import { StarButton } from "@/features/stars/components/stars";
import { cn } from "@/lib/utils";

/**
 * Tap (or hover) a word for its pinyin, meaning and level, and star it.
 * Texts come pre-split into words (scripts/build-reading-tokens.ts). Words
 * are only tappable where a text is drawn with `lookup` on, which drills
 * turn on once an answer is checked: before that it is exam conditions.
 */
export type Tokens = Record<string, ReadingToken[]>;
/** A word on the page: which text it is in, and where. */
type Spot = { key: string; index: number };

const SpotContext = createContext<Spot | null>(null);

/** One handler for every word inside, rather than thousands. */
function spotFrom(target: EventTarget | null): Spot | null {
  const el = target instanceof Element ? target.closest<HTMLElement>("[data-k]") : null;
  if (!el?.dataset.k) return null;
  return { key: el.dataset.k, index: Number(el.dataset.i) };
}

/** Wraps a drill: catches taps and hovers on words, and shows the word panel. */
export function LookupRoot({
  tokens,
  className,
  children,
}: {
  tokens: Tokens;
  className?: string;
  children: React.ReactNode;
}) {
  const [spot, setSpot] = useState<Spot | null>(null);
  const token = spot ? tokens[spot.key]?.[spot.index] : undefined;
  return (
    <div
      className={cn("pb-40", className)}
      onClick={(e) => {
        const s = spotFrom(e.target);
        if (s) setSpot(s);
      }}
      onPointerOver={(e) => {
        if (e.pointerType !== "mouse") return;
        const s = spotFrom(e.target);
        if (s && (s.key !== spot?.key || s.index !== spot?.index)) setSpot(s);
      }}
    >
      <SpotContext.Provider value={spot}>{children}</SpotContext.Provider>
      {token?.p ? <WordPanel token={token} onClose={() => setSpot(null)} /> : null}
    </div>
  );
}

const UNDERLINE = "decoration-primary underline decoration-2 underline-offset-[5px]";

/**
 * A text drawn word by word; with `lookup`, each word is tappable.
 * `renderPlain` draws the non-word runs (punctuation, and {{n}} gaps).
 */
export function LookupText({
  tokens,
  textKey,
  lookup,
  start = 0,
  className,
  renderPlain = (text) => text,
}: {
  tokens: ReadingToken[];
  textKey: string;
  lookup: boolean;
  /** Where `tokens` starts in the whole text's tokens, when drawing part of it. */
  start?: number;
  className?: string;
  renderPlain?: (text: string) => React.ReactNode;
}) {
  const spot = useContext(SpotContext);
  return (
    <span className={className}>
      {tokens.map((t, j) => {
        const i = start + j;
        if (lookup && t.p) {
          return (
            <span
              key={i}
              data-k={textKey}
              data-i={i}
              className={cn(
                "cursor-pointer rounded-sm transition-colors hover:bg-primary/10",
                t.u && UNDERLINE,
                spot?.key === textKey && spot.index === i && "bg-primary/20 hover:bg-primary/20",
              )}
            >
              {t.t}
            </span>
          );
        }
        if (t.p) {
          return (
            <span key={i} className={cn(t.u && UNDERLINE)}>
              {t.t}
            </span>
          );
        }
        return <span key={i}>{renderPlain(t.t)}</span>;
      })}
    </span>
  );
}

/** A text's tokens split into paragraphs at its line breaks, each with where it starts. */
export function paragraphsOf(tokens: ReadingToken[]): { start: number; tokens: ReadingToken[] }[] {
  const paras = [{ start: 0, tokens: [] as ReadingToken[] }];
  tokens.forEach((t, i) => {
    if (t.t === "\n") paras.push({ start: i + 1, tokens: [] });
    else paras.at(-1)!.tokens.push(t);
  });
  return paras;
}

export function WordPanel({ token, onClose }: { token: ReadingToken; onClose: () => void }) {
  // Stars go on the word in the learner's current level's list, if it is
  // there: the same hanzi has a different id in HSK 5 and HSK 6.
  const bank = useWordBank();
  const word = useMemo(() => bank.words.find((w) => w.hanzi === token.t), [bank, token.t]);
  return (
    <div
      aria-live="polite"
      className="fixed inset-x-0 bottom-0 z-40 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:inset-x-auto lg:right-6 lg:bottom-6 lg:w-96 lg:p-0"
    >
      <div className="bg-popover text-popover-foreground flex items-start gap-3 rounded-2xl border p-4 shadow-lg">
        <p className="font-hanzi text-3xl leading-tight">{token.t}</p>
        <div className="min-w-0 flex-1">
          <p className="text-primary font-medium">{token.p}</p>
          <p className="text-sm">{token.g ?? "Not in the dictionary (likely a name)."}</p>
          <p className="text-muted-foreground mt-0.5 text-xs">
            {word
              ? `In your HSK ${bank.level} words: a star brings it back in flashcards`
              : `${token.l ? `${token.l} · ` : ""}a star saves it for Quick review`}
          </p>
        </div>
        {word ? (
          <StarButton wordId={word.id} label={token.t} />
        ) : (
          <StarButton own={{ hanzi: token.t, pinyin: token.p ?? "", gloss: token.g ?? "" }} label={token.t} />
        )}
        <button
          type="button"
          aria-label="Close"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-ring inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-lg focus-visible:ring-2 focus-visible:outline-none"
        >
          <X aria-hidden className="size-5" />
        </button>
      </div>
    </div>
  );
}
