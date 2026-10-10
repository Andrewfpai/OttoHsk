"use client";

import { Check, RotateCcw, X } from "lucide-react";
import { useState } from "react";

import { useWordBank } from "@/components/level/level-provider";
import { StickyActions } from "@/components/sticky-actions";
import { Button } from "@/components/ui/button";
import { orderingItems } from "@/content/ordering";
import { getOrderingNote } from "@/content/ordering-notes";
import { orderingPapers } from "@/content/ordering-papers";
import type { OrderingItem } from "@/content/types";
import { seededRng, shuffle } from "@/lib/random";
import { cn } from "@/lib/utils";

import { isCorrectOrder, sentenceOf } from "../lib/ordering";
import { type ItemStat, interleave, practiceOrder, summarize, withSession } from "../lib/stats";
import { DrillHeader } from "./drill-header";
import { useRecord } from "./use-record";

/** Share of each drill taken from your own papers; the rest is built-in. */
const PAPERS_SHARE = 0.6;

/** HSK 5 only (HSK 6 has no sentence ordering), so its content lives here. */
const ITEM_IDS = [...orderingPapers, ...orderingItems].map((item) => item.id);

function buildQueue(stats: Record<string, ItemStat>, seed: number): OrderingItem[] {
  const id = (i: OrderingItem) => i.id;
  return interleave(
    practiceOrder(orderingPapers, id, stats, seededRng(seed)),
    practiceOrder(orderingItems, id, stats, seededRng(seed + 1)),
    PAPERS_SHARE,
  );
}

/** Chunks are tracked by position, since an item may repeat a chunk string. */
type Placed = number[];

/**
 * The shuffled chunk positions for one item. Seeded, so it is the same on
 * every render while you work on it — and never the answer itself.
 */
function chunkOrder(count: number, seed: number): number[] {
  const order = shuffle(
    Array.from({ length: count }, (_, i) => i),
    seededRng(seed),
  );
  if (count > 1 && order.every((v, i) => v === i)) order.reverse();
  return order;
}

export function OrderingDrill({ stats, seed }: { stats: Record<string, ItemStat>; seed: number }) {
  const { getWord } = useWordBank();
  const record = useRecord();
  // Fixed at mount from a server-chosen seed, so server and client render the
  // same queue and a stats refresh never reshuffles a drill in progress.
  const [queue] = useState(() => buildQueue(stats, seed));
  // The seed prop changes whenever the page re-renders on the server; the
  // chunk tray must not reorder mid-answer.
  const [seed0] = useState(seed);
  const [summaryBase] = useState(stats);
  const [index, setIndex] = useState(0);
  const [placed, setPlaced] = useState<Placed>([]);
  const [checked, setChecked] = useState<boolean | null>(null);
  const [session, setSession] = useState({ answered: 0, right: 0 });
  const [results, setResults] = useState<Record<string, boolean>>({});

  const item = queue[index % queue.length];
  const note = getOrderingNote(item.id);
  const order = chunkOrder(item.chunks.length, seed0 + index);

  const summary = summarize(ITEM_IDS, withSession(summaryBase, results));

  function place(chunkIndex: number) {
    if (checked !== null) return;
    setPlaced((p) => [...p, chunkIndex]);
  }

  function unplace(position: number) {
    if (checked !== null) return;
    setPlaced((p) => p.filter((_, i) => i !== position));
  }

  function check() {
    const ok = isCorrectOrder(
      item,
      placed.map((i) => item.chunks[i]),
    );
    setChecked(ok);
    setSession((s) => ({ answered: s.answered + 1, right: s.right + (ok ? 1 : 0) }));
    setResults((r) => ({ ...r, [item.id]: ok }));
    record("ordering", item.id, ok);
  }

  function next() {
    setIndex((i) => i + 1);
    setPlaced([]);
    setChecked(null);
  }

  const remaining = order.filter((i) => !placed.includes(i));
  const complete = placed.length === item.chunks.length;

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <DrillHeader summary={summary} session={session} />

      <section className="bg-card space-y-6 rounded-2xl border p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="text-muted-foreground text-sm">
            Put the words in order. Tap a placed word to take it back.
            <span className="bg-muted text-foreground ml-2 inline-block max-w-full rounded-md px-1.5 py-0.5 text-xs break-words">
              {item.source ? `Your papers · ${item.source}` : "Built-in"}
            </span>
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="cursor-pointer"
            onClick={() => setPlaced([])}
            disabled={placed.length === 0 || checked !== null}
          >
            <RotateCcw aria-hidden /> Reset
          </Button>
        </div>

        {/* The sentence being built */}
        <div
          aria-label="Your sentence"
          className={cn(
            "flex min-h-20 flex-wrap items-center gap-2 rounded-xl border-2 border-dashed p-3",
            checked === true && "border-success bg-success/5 border-solid",
            checked === false && "border-destructive bg-destructive/5 border-solid",
          )}
        >
          {placed.length === 0 ? (
            <span className="text-muted-foreground px-2 text-sm">Tap the words below…</span>
          ) : (
            placed.map((chunkIndex, position) => (
              <button
                key={`${chunkIndex}`}
                type="button"
                onClick={() => unplace(position)}
                disabled={checked !== null}
                className="bg-primary/10 text-foreground font-hanzi hover:bg-primary/20 cursor-pointer rounded-lg px-3 py-2 text-xl transition-colors disabled:cursor-default"
              >
                {item.chunks[chunkIndex]}
              </button>
            ))
          )}
          {complete ? <span className="font-hanzi text-xl">{item.end ?? "。"}</span> : null}
        </div>

        {/* Chunks still to place */}
        <div className="flex min-h-14 flex-wrap gap-2" aria-label="Words to place">
          {remaining.map((chunkIndex) => (
            <button
              key={chunkIndex}
              type="button"
              onClick={() => place(chunkIndex)}
              className="bg-secondary hover:border-primary/50 font-hanzi cursor-pointer rounded-lg border px-3 py-2 text-xl transition-colors"
            >
              {item.chunks[chunkIndex]}
            </button>
          ))}
        </div>

        {checked === null ? (
          <Button size="lg" className="cursor-pointer" disabled={!complete} onClick={check}>
            Check
          </Button>
        ) : (
          <>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                {checked ? (
                  <Check aria-hidden className="text-success mt-1 size-5 shrink-0" />
                ) : (
                  <X aria-hidden className="text-destructive mt-1 size-5 shrink-0" />
                )}
                <div className="space-y-1">
                  <p className={cn("text-sm font-medium", checked ? "text-success" : "text-destructive")}>
                    {checked ? "Correct" : "Not quite. The answer:"}
                  </p>
                  <p className="font-hanzi text-2xl">{sentenceOf(item.chunks, item.end)}</p>
                  {note ? <p className="text-primary text-sm">{note.pinyin}</p> : null}
                  <p className="text-muted-foreground text-sm">{item.translation}</p>
                </div>
              </div>
              {note && note.words.length > 0 ? (
                <div className="space-y-2 rounded-xl border p-4">
                  <h3 className="text-sm font-medium">HSK 5 words in this sentence</h3>
                  <ul className="space-y-2 text-sm">
                    {note.words.map((id) => {
                      const w = getWord(id);
                      if (!w) return null;
                      return (
                        <li key={id} className="grid grid-cols-[auto_1fr] items-baseline gap-x-3">
                          <span className="font-hanzi text-lg">{w.hanzi}</span>
                          <span>
                            <span className="text-primary">{w.pinyin}</span> {w.gloss}
                            {w.indonesian ? (
                              <span className="text-muted-foreground block text-xs">{w.indonesian}</span>
                            ) : null}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : null}
              <div className="bg-muted/50 space-y-1 rounded-xl p-4 text-sm">
                <p className="font-medium">{item.point}</p>
                <p className="text-muted-foreground">{item.explanation}</p>
              </div>
            </div>
            <StickyActions surface="card">
              <Button size="lg" className="h-11 w-full cursor-pointer sm:w-auto" onClick={next}>
                Next sentence
              </Button>
            </StickyActions>
          </>
        )}
      </section>
    </div>
  );
}
