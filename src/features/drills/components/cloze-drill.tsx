"use client";

import { ArrowRight } from "lucide-react";
import { Fragment, useState } from "react";

import { Button } from "@/components/ui/button";
import { clozePassages } from "@/content/cloze";
import type { ClozePassage } from "@/content/types";
import { seededRng } from "@/lib/random";
import { cn } from "@/lib/utils";

import { DRILL_ITEM_IDS, questionId } from "../lib/items";
import { type ItemStat, practiceOrder, summarize, withSession } from "../lib/stats";
import { Choices } from "./choice-question";
import { DrillHeader } from "./drill-header";
import { useRecord } from "./use-record";

const LETTERS = ["A", "B", "C", "D"] as const;

/**
 * A passage's standing for ordering the queue: missed if any blank was last
 * answered wrong, untried if no blank has been answered, otherwise right.
 */
function passageStats(stats: Record<string, ItemStat>): Record<string, ItemStat> {
  const out: Record<string, ItemStat> = {};
  for (const p of clozePassages) {
    const own = p.blanks.map((b) => stats[questionId(p.id, b.number)]).filter(Boolean);
    if (own.length === 0) continue;
    out[p.id] = {
      attempts: own.reduce((n, s) => n + s.attempts, 0),
      correct: own.reduce((n, s) => n + s.correct, 0),
      lastCorrect: own.length === p.blanks.length && own.every((s) => s.lastCorrect),
    };
  }
  return out;
}

/**
 * The passage with each {{n}} drawn as a numbered gap. Before checking, a
 * gap shows your pick in a neutral colour; after, the right answer, green
 * if you had it and red if not.
 */
function PassageText({
  passage,
  picked,
  checked,
}: {
  passage: ClozePassage;
  picked: Record<number, string>;
  checked: boolean;
}) {
  const byNumber = new Map(passage.blanks.map((b) => [b.number, b]));
  return (
    <div className="font-hanzi space-y-3 text-lg leading-loose">
      {passage.text.split("\n").map((para, i) => (
        <p key={i} className="indent-8">
          {para.split(/(\{\{\d+\}\})/).map((part, j) => {
            const m = part.match(/^\{\{(\d+)\}\}$/);
            if (!m) return <Fragment key={j}>{part}</Fragment>;
            const n = Number(m[1]);
            const blank = byNumber.get(n);
            const choice = picked[n];
            const right = blank !== undefined && choice === blank.options[blank.answer];
            return (
              <span
                key={j}
                className={cn(
                  "mx-1 inline-block min-w-14 border-b-2 px-1 text-center indent-0 leading-normal",
                  !checked && "border-primary text-primary",
                  checked && right && "border-success text-success",
                  checked && !right && "border-destructive text-destructive",
                )}
              >
                {checked && blank ? (
                  blank.options[blank.answer]
                ) : choice !== undefined ? (
                  choice
                ) : (
                  <span className="font-numeric text-sm">{n}</span>
                )}
              </span>
            );
          })}
        </p>
      ))}
    </div>
  );
}

export function ClozeDrill({ stats, seed }: { stats: Record<string, ItemStat>; seed: number }) {
  const record = useRecord();
  // Fixed at mount from a server-chosen seed, so server and client agree and a
  // stats refresh never reshuffles the drill in progress.
  const [queue] = useState(() =>
    practiceOrder(clozePassages, (p) => p.id, passageStats(stats), seededRng(seed)),
  );
  const [position, setPosition] = useState(0);
  // Picks can change freely until the passage is checked, as on the exam.
  const [picked, setPicked] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const [session, setSession] = useState<Record<string, boolean>>({});
  const [tally, setTally] = useState({ answered: 0, right: 0 });

  if (queue.length === 0) {
    return (
      <div className="text-muted-foreground rounded-xl border border-dashed p-10 text-center text-sm">
        No passages yet.
      </div>
    );
  }

  const passage = queue[position % queue.length];
  const summary = summarize(DRILL_ITEM_IDS.cloze, withSession(stats, session));
  const answeredCount = passage.blanks.filter((b) => picked[b.number] !== undefined).length;
  const allAnswered = answeredCount === passage.blanks.length;

  function pick(blank: ClozePassage["blanks"][number], option: string) {
    if (checked) return;
    setPicked((p) => ({ ...p, [blank.number]: option }));
  }

  /** Reveal every answer at once, and only then save the results. */
  function check() {
    if (!allAnswered || checked) return;
    const results: Record<string, boolean> = {};
    let right = 0;
    for (const b of passage.blanks) {
      const ok = picked[b.number] === b.options[b.answer];
      results[questionId(passage.id, b.number)] = ok;
      if (ok) right++;
    }
    setChecked(true);
    setSession((s) => ({ ...s, ...results }));
    setTally((t) => ({ answered: t.answered + passage.blanks.length, right: t.right + right }));
    for (const [id, ok] of Object.entries(results)) record("cloze", id, ok);
  }

  function next() {
    setPosition((p) => p + 1);
    setPicked({});
    setChecked(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const passageRight = passage.blanks.filter(
    (b) => picked[b.number] === b.options[b.answer],
  ).length;

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <DrillHeader summary={summary} session={tally} />

      <section className="bg-card space-y-6 rounded-2xl border p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="bg-muted rounded-md px-2 py-0.5 text-xs">Your papers · {passage.source}</span>
          <span className="text-muted-foreground text-xs">
            Passage <span className="font-numeric">{(position % queue.length) + 1}</span> of{" "}
            <span className="font-numeric">{queue.length}</span>
          </span>
        </div>

        <PassageText passage={passage} picked={picked} checked={checked} />

        <ol className="space-y-5 border-t pt-5">
          {passage.blanks.map((b) => {
            const choice = picked[b.number] ?? null;
            const answer = b.options[b.answer];
            return (
              <li key={b.number} className="space-y-2">
                <p className="font-numeric text-muted-foreground text-sm">{b.number}.</p>
                <Choices
                  options={b.options}
                  answer={answer}
                  picked={choice}
                  revealed={checked}
                  onPick={(o) => pick(b, o)}
                  render={(o) => (
                    <span>
                      <span className="text-muted-foreground mr-1.5 font-sans text-sm">
                        {LETTERS[b.options.indexOf(o)]}
                      </span>
                      {o}
                    </span>
                  )}
                />
                {checked ? (
                  <p className="text-sm">
                    <span className={cn("font-medium", choice === answer ? "text-success" : "text-destructive")}>
                      {choice === answer ? "Right. " : `Answer: ${LETTERS[b.answer]} ${answer}. `}
                    </span>
                    <span className="text-muted-foreground">{b.why}</span>
                  </p>
                ) : null}
              </li>
            );
          })}
        </ol>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-5">
          <span className="text-muted-foreground text-sm">
            {checked ? (
              <>
                This passage:{" "}
                <span className="text-foreground font-numeric">
                  {passageRight}/{passage.blanks.length}
                </span>
              </>
            ) : (
              <>
                Answered{" "}
                <span className="text-foreground font-numeric">
                  {answeredCount}/{passage.blanks.length}
                </span>
                . Answers show once every blank has one.
              </>
            )}
          </span>
          <div className="flex gap-2">
            {checked ? (
              <Button size="lg" className="cursor-pointer" onClick={next}>
                Next passage <ArrowRight aria-hidden />
              </Button>
            ) : (
              <>
                <Button size="lg" variant="ghost" className="cursor-pointer" onClick={next}>
                  Skip
                </Button>
                <Button size="lg" className="cursor-pointer" disabled={!allAnswered} onClick={check}>
                  Check answers
                </Button>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
