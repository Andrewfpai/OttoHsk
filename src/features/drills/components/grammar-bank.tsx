"use client";

import { ChevronDown, CircleCheck } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { grammarPatterns } from "@/content/grammar";
import type { GrammarCategory, GrammarPattern } from "@/content/types";
import { cn } from "@/lib/utils";

import { DRILL_ITEM_IDS, questionId } from "../lib/items";
import { type ItemStat, summarize, withSession } from "../lib/stats";
import { BlankSentence, Choices } from "./choice-question";
import { useRecord } from "./use-record";

const CATEGORY_LABEL: Record<GrammarCategory, string> = {
  connector: "Connectors",
  structure: "Structures",
  adverb: "Adverbs",
  complement: "Complements",
  preposition: "Prepositions",
  expression: "Expressions",
};

const CATEGORIES = (Object.keys(CATEGORY_LABEL) as GrammarCategory[]).filter((c) =>
  grammarPatterns.some((p) => p.category === c),
);

type Filter = "all" | "todo" | GrammarCategory;

export function GrammarBank({ stats }: { stats: Record<string, ItemStat> }) {
  const record = useRecord();
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<string | null>(null);
  const [session, setSession] = useState<Record<string, boolean>>({});
  // Picked options per question, so a reopened card shows its answers.
  const [picked, setPicked] = useState<Record<string, string>>({});

  const merged = withSession(stats, session);
  const summary = summarize(DRILL_ITEM_IDS.grammar, merged);
  const masteredIn = (source: Record<string, ItemStat>, p: GrammarPattern) =>
    p.quiz.every((_, i) => source[questionId(p.id, i)]?.lastCorrect);

  const shown = grammarPatterns.filter((p) => {
    if (filter === "all") return true;
    // Judged on what you knew when the page opened, so a pattern you just
    // mastered stays on screen instead of vanishing under your cursor.
    if (filter === "todo") return !masteredIn(stats, p);
    return p.category === filter;
  });

  function answer(p: GrammarPattern, i: number, option: string) {
    const id = questionId(p.id, i);
    if (picked[id]) return;
    const right = option === p.quiz[i].answer;
    setPicked((s) => ({ ...s, [id]: option }));
    setSession((s) => ({ ...s, [id]: right }));
    record("grammar", id, right);
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div role="group" aria-label="Filter patterns" className="flex flex-wrap gap-1.5">
          {(["all", "todo", ...CATEGORIES] as Filter[]).map((f) => (
            <Button
              key={f}
              size="lg"
              variant={filter === f ? "secondary" : "ghost"}
              aria-pressed={filter === f}
              className="cursor-pointer"
              onClick={() => setFilter(f)}
            >
              {f === "all" ? "All" : f === "todo" ? "Not mastered" : CATEGORY_LABEL[f]}
            </Button>
          ))}
        </div>
        <span className="text-muted-foreground text-sm">
          Questions mastered{" "}
          <span className="text-foreground font-numeric">
            {summary.mastered}/{summary.total}
          </span>
        </span>
      </div>

      {shown.length === 0 ? (
        <div className="text-muted-foreground rounded-xl border border-dashed p-10 text-center text-sm">
          Every pattern here is mastered. Pick another filter.
        </div>
      ) : (
        <ul className="space-y-3">
          {shown.map((p) => {
            const expanded = open === p.id;
            const done = masteredIn(merged, p);
            return (
              <li key={p.id} className="bg-card overflow-hidden rounded-xl border">
                <button
                  type="button"
                  aria-expanded={expanded}
                  onClick={() => setOpen(expanded ? null : p.id)}
                  className="hover:bg-muted/40 flex w-full cursor-pointer items-center gap-4 px-4 py-3 text-left transition-colors"
                >
                  <span className="min-w-0 flex-1">
                    <span className="font-hanzi block text-xl">{p.pattern}</span>
                    <span className="text-muted-foreground block text-sm">
                      {p.pinyin} · {p.meaning}
                    </span>
                  </span>
                  {done ? (
                    <CircleCheck aria-label="Mastered" className="text-success size-5 shrink-0" />
                  ) : null}
                  <ChevronDown
                    aria-hidden
                    className={cn(
                      "text-muted-foreground size-4 shrink-0 transition-transform",
                      expanded && "rotate-180",
                    )}
                  />
                </button>

                {expanded ? (
                  <div className="space-y-5 border-t px-4 py-4">
                    <p className="text-sm">{p.explanation}</p>

                    <ul className="space-y-3">
                      {p.examples.map((ex) => (
                        <li key={ex.zh} className="bg-muted/40 rounded-lg p-3">
                          <p className="font-hanzi text-lg">{ex.zh}</p>
                          <p className="text-primary text-sm">{ex.pinyin}</p>
                          <p className="text-muted-foreground text-sm">{ex.en}</p>
                        </li>
                      ))}
                    </ul>

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Check yourself</h3>
                      {p.quiz.map((q, i) => {
                        const id = questionId(p.id, i);
                        const choice = picked[id] ?? null;
                        return (
                          <div key={id} className="space-y-2">
                            <BlankSentence
                              sentence={q.prompt}
                              fill={choice ? q.answer : null}
                              state={choice ? (choice === q.answer ? "right" : "wrong") : null}
                              className="text-lg"
                            />
                            <Choices
                              options={q.options}
                              answer={q.answer}
                              picked={choice}
                              onPick={(o) => answer(p, i, o)}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
