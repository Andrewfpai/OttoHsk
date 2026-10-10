"use client";

import { Check, X } from "lucide-react";
import { useState } from "react";

import { StickyActions } from "@/components/sticky-actions";
import { Button } from "@/components/ui/button";
import type { ErrorItem } from "@/content/types";
import { seededRng } from "@/lib/random";
import { cn } from "@/lib/utils";

import { type ItemStat, practiceOrder, summarize, withSession } from "../lib/stats";
import { DrillHeader } from "./drill-header";
import { useRecord } from "./use-record";

const LETTERS = ["A", "B", "C", "D"] as const;

/**
 * HSK 6 Reading Part 1 (病句): four sentences, one with an error. Pick it,
 * then see it corrected and why. Items you missed come back first.
 */
export function ErrorDrill({
  items,
  stats,
  seed,
}: {
  items: ErrorItem[];
  stats: Record<string, ItemStat>;
  seed: number;
}) {
  const record = useRecord();
  // Fixed at mount from a server-chosen seed, so server and client agree and a
  // stats refresh never reshuffles the drill in progress.
  const [queue] = useState(() => practiceOrder(items, (i) => i.id, stats, seededRng(seed)));
  const [position, setPosition] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [session, setSession] = useState<Record<string, boolean>>({});
  const [tally, setTally] = useState({ answered: 0, right: 0 });

  if (queue.length === 0) {
    return (
      <div className="text-muted-foreground rounded-xl border border-dashed p-10 text-center text-sm">
        No items yet.
      </div>
    );
  }

  const item = queue[position % queue.length];
  const summary = summarize(
    items.map((i) => i.id),
    withSession(stats, session),
  );

  function pick(index: number) {
    if (picked !== null) return;
    const right = index === item.wrong;
    setPicked(index);
    setSession((s) => ({ ...s, [item.id]: right }));
    setTally((t) => ({ answered: t.answered + 1, right: t.right + (right ? 1 : 0) }));
    record("error", item.id, right);
  }

  function next() {
    setPosition((p) => p + 1);
    setPicked(null);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <DrillHeader summary={summary} session={tally} />

      <section className="bg-card space-y-5 rounded-2xl border p-5 sm:p-6">
        <p className="text-muted-foreground text-sm">Which sentence has an error?</p>
        <ul className="space-y-2">
          {item.sentences.map((sentence, i) => {
            const isWrong = i === item.wrong;
            const isPicked = i === picked;
            const shown = picked !== null;
            return (
              <li key={i}>
                <button
                  type="button"
                  disabled={shown}
                  onClick={() => pick(i)}
                  className={cn(
                    "focus-visible:ring-ring flex w-full cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 text-left transition-colors focus-visible:ring-2 focus-visible:outline-none disabled:cursor-default",
                    !shown && "hover:border-primary/50 hover:bg-muted/50",
                    shown && isWrong && "border-success bg-success/10",
                    shown && isPicked && !isWrong && "border-destructive bg-destructive/10",
                    shown && !isWrong && !isPicked && "opacity-60",
                  )}
                >
                  <span className="text-muted-foreground font-numeric bg-muted mt-1 flex size-6 shrink-0 items-center justify-center rounded-md text-xs">
                    {LETTERS[i]}
                  </span>
                  <span className="font-hanzi min-w-0 flex-1 text-lg leading-relaxed">{sentence}</span>
                  {shown && isWrong ? (
                    <Check aria-label="The sentence with the error" className="text-success mt-1.5 size-5 shrink-0" />
                  ) : null}
                  {shown && isPicked && !isWrong ? (
                    <X aria-label="Your answer" className="text-destructive mt-1.5 size-5 shrink-0" />
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>

        {picked !== null ? (
          <>
            <div className="space-y-3">
              <p className={cn("text-sm font-medium", picked === item.wrong ? "text-success" : "text-destructive")}>
                {picked === item.wrong ? "Right." : `Not this time: the error is in ${LETTERS[item.wrong]}.`}
              </p>
              <div className="bg-muted/50 space-y-2 rounded-xl p-4 text-sm">
                <p className="font-medium">{item.point}</p>
                <p className="text-muted-foreground">{item.why}</p>
                <p>
                  <span className="text-muted-foreground text-xs">Corrected · </span>
                  <span className="font-hanzi text-base">{item.corrected}</span>
                </p>
              </div>
            </div>
            <StickyActions surface="card">
              <Button size="lg" className="h-11 w-full cursor-pointer sm:w-auto" onClick={next}>
                Next
              </Button>
            </StickyActions>
          </>
        ) : null}
      </section>
    </div>
  );
}
