"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { confusables } from "@/content/confusables";
import type { ConfusableSet } from "@/content/types";
import { seededRng, shuffle } from "@/lib/random";
import { cn } from "@/lib/utils";

import { DRILL_ITEM_IDS, questionId } from "../lib/items";
import { type ItemStat, practiceOrder, summarize, withSession } from "../lib/stats";
import { BlankSentence, Choices } from "./choice-question";
import { DrillHeader } from "./drill-header";
import { useRecord } from "./use-record";

type Item = { set: ConfusableSet; index: number; id: string };

const ITEMS: Item[] = confusables.flatMap((set) =>
  set.questions.map((_, index) => ({ set, index, id: questionId(set.id, index) })),
);

export function ConfusablesDrill({
  stats,
  seed,
}: {
  stats: Record<string, ItemStat>;
  seed: number;
}) {
  const record = useRecord();
  const [mode, setMode] = useState<"drill" | "browse">("drill");
  // Fixed at mount from a server-chosen seed, so server and client agree and a
  // stats refresh never reshuffles the drill in progress.
  const [queue] = useState(() => practiceOrder(ITEMS, (i) => i.id, stats, seededRng(seed)));
  const [position, setPosition] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [session, setSession] = useState<Record<string, boolean>>({});
  const [tally, setTally] = useState({ answered: 0, right: 0 });

  const item = queue[position % queue.length];
  const q = item.set.questions[item.index];
  const options = shuffle(
    item.set.words.map((w) => w.hanzi),
    seededRng(seed + position),
  );
  const pinyinOf = (hanzi: string) => item.set.words.find((w) => w.hanzi === hanzi)?.pinyin;

  const summary = summarize(DRILL_ITEM_IDS.confusable, withSession(stats, session));

  function pick(option: string) {
    if (picked !== null) return;
    const right = option === q.answer;
    setPicked(option);
    setSession((s) => ({ ...s, [item.id]: right }));
    setTally((t) => ({ answered: t.answered + 1, right: t.right + (right ? 1 : 0) }));
    record("confusable", item.id, right);
  }

  function next() {
    setPosition((p) => p + 1);
    setPicked(null);
  }

  return (
    <div className="space-y-5">
      <div role="group" aria-label="Mode" className="bg-muted inline-flex rounded-lg p-1">
        {(
          [
            ["drill", "Drill"],
            ["browse", `All pairs (${confusables.length})`],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            aria-pressed={mode === value}
            onClick={() => setMode(value)}
            className={cn(
              "cursor-pointer rounded-md px-4 py-1.5 text-sm font-medium transition-colors",
              mode === value
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {mode === "browse" ? (
        <ul className="grid gap-3 md:grid-cols-2">
          {confusables.map((set) => (
            <li key={set.id} className="bg-card space-y-3 rounded-xl border p-4">
              <SetWords set={set} />
              <p className="text-muted-foreground text-sm">{set.explanation}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mx-auto max-w-3xl space-y-5">
          <DrillHeader summary={summary} session={tally} />

          <section className="bg-card space-y-6 rounded-2xl border p-5 sm:p-6">
            <p className="text-muted-foreground text-sm">Which word fits the blank?</p>
            <BlankSentence
              sentence={q.sentence}
              fill={picked ? q.answer : null}
              state={picked ? (picked === q.answer ? "right" : "wrong") : null}
              className="text-2xl"
            />
            <Choices
              options={options}
              answer={q.answer}
              picked={picked}
              onPick={pick}
              render={(o) => (
                <span className="flex flex-col items-start leading-tight">
                  <span>{o}</span>
                  {picked !== null ? (
                    <span className="text-muted-foreground font-sans text-xs">{pinyinOf(o)}</span>
                  ) : null}
                </span>
              )}
            />

            {picked !== null ? (
              <div className="space-y-4">
                <p className={cn("text-sm", picked === q.answer ? "text-success" : "text-destructive")}>
                  <span className="font-medium">{picked === q.answer ? "Right. " : "Not this time. "}</span>
                  <span className="text-foreground">{q.why}</span>
                </p>
                <div className="bg-muted/50 space-y-3 rounded-xl p-4">
                  <SetWords set={item.set} />
                  <p className="text-muted-foreground text-sm">{item.set.explanation}</p>
                </div>
                <Button size="lg" className="cursor-pointer" onClick={next}>
                  Next
                </Button>
              </div>
            ) : null}
          </section>
        </div>
      )}
    </div>
  );
}

function SetWords({ set }: { set: ConfusableSet }) {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-2">
      {set.words.map((w) => (
        <div key={w.hanzi}>
          <span className="font-hanzi text-xl">{w.hanzi}</span>{" "}
          <span className="text-primary text-sm">{w.pinyin}</span>
          <span className="text-muted-foreground block text-sm">{w.gloss}</span>
        </div>
      ))}
    </div>
  );
}
