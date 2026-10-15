"use client";

import { Check, ChevronDown, X } from "lucide-react";
import { useState } from "react";

import { useWordBank } from "@/components/level/level-provider";
import { formatDate } from "@/lib/dates";
import { EXAM_TIME_ZONE } from "@/lib/exam";
import { cn } from "@/lib/utils";

import type { HistoryTest } from "../server/queries";

type Day = { day: string; tests: HistoryTest[]; cards: number; correct: number };

function byDay(tests: HistoryTest[]): Day[] {
  const days = new Map<string, Day>();
  for (const t of tests) {
    const d = days.get(t.day) ?? { day: t.day, tests: [], cards: 0, correct: 0 };
    d.tests.push(t);
    d.cards += t.total;
    d.correct += t.correct;
    days.set(t.day, d);
  }
  return [...days.values()];
}

const pct = (correct: number, total: number) => (total ? Math.round((correct / total) * 100) : 0);

/** Every flashcard test, grouped by day, newest first; each opens to its words. */
export function TestHistory({ tests }: { tests: HistoryTest[] }) {
  const [open, setOpen] = useState<string | null>(null);

  if (tests.length === 0) {
    return (
      <div className="text-muted-foreground rounded-xl border border-dashed p-10 text-center text-sm">
        No tests yet. Your flashcard tests will be listed here, day by day.
      </div>
    );
  }

  const days = byDay(tests);
  const cards = tests.reduce((n, t) => n + t.total, 0);
  const correct = tests.reduce((n, t) => n + t.correct, 0);

  return (
    <div className="space-y-6">
      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Tests" value={tests.length} />
        <Stat label="Days studied" value={days.length} />
        <Stat label="Cards answered" value={cards} />
        <Stat label="Right" value={`${pct(correct, cards)}%`} />
      </dl>

      {days.map((d) => (
        <section key={d.day} className="bg-card overflow-hidden rounded-2xl border">
          <header className="flex flex-wrap items-baseline justify-between gap-2 border-b px-4 py-3 sm:px-5">
            <h2 className="font-medium">
              {formatDate(new Date(`${d.day}T00:00:00Z`), "UTC", {
                weekday: "short",
                day: "numeric",
                month: "short",
              })}
            </h2>
            <p className="text-muted-foreground font-numeric text-sm">
              {d.tests.length} test{d.tests.length === 1 ? "" : "s"} · {d.cards} cards ·{" "}
              <span className="text-foreground">{pct(d.correct, d.cards)}%</span> right
            </p>
          </header>
          <ul className="divide-y">
            {d.tests.map((t) => {
              const expanded = open === t.id;
              return (
                <li key={t.id}>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    onClick={() => setOpen(expanded ? null : t.id)}
                    className="hover:bg-muted/40 flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left text-sm sm:px-5"
                  >
                    <span className="text-muted-foreground font-numeric w-10">#{t.testNumber}</span>
                    <span className="text-muted-foreground font-numeric w-12">
                      {formatDate(new Date(t.takenAt), EXAM_TIME_ZONE, { hour: "2-digit", minute: "2-digit" })}
                    </span>
                    <span className="font-numeric flex-1">
                      {t.correct}/{t.total}
                      <span className="text-muted-foreground"> · {pct(t.correct, t.total)}%</span>
                    </span>
                    <span
                      className={cn(
                        "w-10 text-right text-xs font-medium",
                        t.passed ? "text-success" : "text-destructive",
                      )}
                    >
                      {t.passed ? "Pass" : "Fail"}
                    </span>
                    <ChevronDown
                      aria-hidden
                      className={cn("text-muted-foreground size-4 transition-transform", expanded && "rotate-180")}
                    />
                  </button>
                  {expanded ? <TestDetail test={t} /> : null}
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}

function TestDetail({ test }: { test: HistoryTest }) {
  const { getWord } = useWordBank();
  if (!test.answers) {
    return (
      <p className="text-muted-foreground bg-muted/30 border-t px-4 py-3 text-sm sm:px-5">
        This test is from before word-by-word results were kept, so it has its score only.
      </p>
    );
  }
  const wrong = test.answers.filter((a) => !a.right);
  const right = test.answers.filter((a) => a.right);
  return (
    <div className="bg-muted/30 space-y-4 border-t px-4 py-4 sm:px-5">
      {wrong.length > 0 ? (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">
            Missed <span className="text-muted-foreground font-numeric">({wrong.length})</span>
          </h3>
          <ul className="space-y-2">
            {wrong.map((a, i) => {
              const w = getWord(a.wordId);
              const chosen = a.chosenId ? getWord(a.chosenId) : undefined;
              return (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <X aria-label="Wrong" className="text-destructive mt-1 size-4 shrink-0" />
                  <span className="font-hanzi w-16 shrink-0 text-lg">{w?.hanzi ?? a.wordId}</span>
                  <span className="min-w-0">
                    <span className="text-primary">{w?.pinyin}</span>{" "}
                    <span className="text-muted-foreground">· {w?.gloss}</span>
                    <span className="text-muted-foreground block text-xs">
                      {a.typed !== undefined
                        ? `You typed "${a.typed}"`
                        : chosen
                          ? `You picked ${chosen.hanzi} (${chosen.gloss})`
                          : null}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <p className="text-success text-sm font-medium">Every word right.</p>
      )}
      {right.length > 0 ? (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">
            Right <span className="text-muted-foreground font-numeric">({right.length})</span>
          </h3>
          <ul className="flex flex-wrap gap-1.5">
            {right.map((a, i) => {
              const w = getWord(a.wordId);
              return (
                <li
                  key={i}
                  title={w ? `${w.pinyin} · ${w.gloss}` : undefined}
                  className="bg-background inline-flex items-center gap-1 rounded-lg border px-2 py-1"
                >
                  <Check aria-hidden className="text-success size-3.5" />
                  <span className="font-hanzi">{w?.hanzi ?? a.wordId}</span>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="bg-card rounded-xl border p-3">
      <dt className="text-muted-foreground text-xs">{label}</dt>
      <dd className="font-numeric text-2xl font-semibold">{value}</dd>
    </div>
  );
}
