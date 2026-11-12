"use client";

import { ArrowRight } from "lucide-react";
import { Fragment, useState } from "react";

import { Button } from "@/components/ui/button";
import type { SentenceFillPassage } from "@/content/types";
import { LookupRoot, LookupText, type Tokens, paragraphsOf } from "@/features/reading/components/lookup";
import { seededRng } from "@/lib/random";
import { cn } from "@/lib/utils";

import { questionId } from "../lib/question-id";
import { type ItemStat, practiceOrder, summarize, withSession } from "../lib/stats";
import { DrillHeader } from "./drill-header";
import { useRecord } from "./use-record";

const LETTERS = ["A", "B", "C", "D", "E", "F"] as const;

/** A passage's standing for ordering the queue (see the fill-in drill). */
function passageStats(
  passages: SentenceFillPassage[],
  stats: Record<string, ItemStat>,
): Record<string, ItemStat> {
  const out: Record<string, ItemStat> = {};
  for (const p of passages) {
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
 * New HSK 6 Reading Part 2 (51–60): put five of six sentences into a
 * passage's gaps. Picks change freely until Check, as on the exam, and each
 * sentence goes in one gap only. After checking: the right sentence in each
 * gap, why, and word lookup with stars.
 */
export function SentenceFillDrill({
  passages,
  stats,
  seed,
  tokens,
}: {
  passages: SentenceFillPassage[];
  stats: Record<string, ItemStat>;
  seed: number;
  tokens: Tokens;
}) {
  const record = useRecord();
  // Fixed at mount from a server-chosen seed, so server and client agree.
  const [queue] = useState(() =>
    practiceOrder(passages, (p) => p.id, passageStats(passages, stats), seededRng(seed)),
  );
  const [position, setPosition] = useState(0);
  /** Gap number → option index. */
  const [picked, setPicked] = useState<Record<number, number>>({});
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
  const itemIds = passages.flatMap((p) => p.blanks.map((b) => questionId(p.id, b.number)));
  const summary = summarize(itemIds, withSession(stats, session));
  const byNumber = new Map(passage.blanks.map((b) => [b.number, b]));
  const answeredCount = passage.blanks.filter((b) => picked[b.number] !== undefined).length;
  const allAnswered = answeredCount === passage.blanks.length;
  const usedBy = new Map(Object.entries(picked).map(([n, i]) => [i, Number(n)]));

  function pick(number: number, option: number) {
    if (checked) return;
    setPicked((p) => {
      const next = { ...p };
      // A sentence fills one gap: take it out of any other.
      for (const [n, i] of Object.entries(next)) if (i === option) delete next[Number(n)];
      if (p[number] === option) delete next[number];
      else next[number] = option;
      return next;
    });
  }

  function check() {
    if (!allAnswered || checked) return;
    const results: Record<string, boolean> = {};
    let right = 0;
    for (const b of passage.blanks) {
      const ok = picked[b.number] === b.answer;
      results[questionId(passage.id, b.number)] = ok;
      if (ok) right++;
    }
    setChecked(true);
    setSession((s) => ({ ...s, ...results }));
    setTally((t) => ({ answered: t.answered + passage.blanks.length, right: t.right + right }));
    for (const [id, ok] of Object.entries(results)) record("sentence", id, ok);
  }

  function next() {
    if (!checked && answeredCount > 0 && !window.confirm("Skip this passage? Your picks here won't be saved.")) {
      return;
    }
    setPosition((p) => p + 1);
    setPicked({});
    setChecked(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /** A gap: its number, then your pick, then (checked) the right sentence. */
  function gaps(text: string) {
    return text.split(/(\{\{\d+\}\})/).map((part, j) => {
      const m = part.match(/^\{\{(\d+)\}\}$/);
      if (!m) return <Fragment key={j}>{part}</Fragment>;
      const n = Number(m[1]);
      const blank = byNumber.get(n);
      const choice = picked[n];
      const right = blank !== undefined && choice === blank.answer;
      const shown = checked && blank ? blank.answer : choice;
      return (
        <span
          key={j}
          className={cn(
            "mx-0.5 rounded-md border-b-2 px-1 indent-0",
            !checked && "border-primary bg-primary/5",
            checked && right && "border-success bg-success/10",
            checked && !right && "border-destructive bg-destructive/10",
          )}
        >
          <span className="font-numeric text-muted-foreground mr-1 font-sans text-xs">({n})</span>
          {shown !== undefined ? (
            <>
              <span className="font-sans text-sm font-semibold">{LETTERS[shown]} </span>
              {passage.options[shown]}
            </>
          ) : (
            <span className="text-muted-foreground">＿＿＿＿</span>
          )}
        </span>
      );
    });
  }

  const words = tokens[passage.id];
  const passageRight = passage.blanks.filter((b) => picked[b.number] === b.answer).length;

  return (
    <LookupRoot tokens={tokens} className="mx-auto max-w-3xl space-y-5">
      <DrillHeader summary={summary} session={tally} />

      <section className="bg-card space-y-6 rounded-2xl border p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="bg-muted rounded-md px-2 py-0.5 text-xs">{passage.source}</span>
          <span className="text-muted-foreground text-xs">
            Passage <span className="font-numeric">{(position % queue.length) + 1}</span> of{" "}
            <span className="font-numeric">{queue.length}</span>
          </span>
        </div>

        <div className="font-hanzi space-y-3 text-base leading-loose sm:text-lg">
          {words
            ? paragraphsOf(words).map((para, i) => (
                <p key={i} className="indent-8">
                  <LookupText
                    tokens={para.tokens}
                    start={para.start}
                    textKey={passage.id}
                    lookup={checked}
                    renderPlain={gaps}
                  />
                </p>
              ))
            : passage.text.split("\n").map((para, i) => (
                <p key={i} className="indent-8">
                  {gaps(para)}
                </p>
              ))}
        </div>

        <ol className="space-y-2 border-t pt-5">
          {passage.options.map((o, i) => {
            const key = `${passage.id}.opt${i}`;
            const gap = usedBy.get(i);
            const unused = checked && !passage.blanks.some((b) => b.answer === i);
            return (
              <li
                key={i}
                className={cn(
                  "font-hanzi flex items-start gap-2 rounded-lg px-2 py-1.5 text-base sm:text-lg",
                  !checked && gap !== undefined && "text-muted-foreground",
                  unused && "opacity-60",
                )}
              >
                <span className="font-numeric mt-1 w-5 shrink-0 font-sans text-sm font-semibold">{LETTERS[i]}</span>
                <span className="min-w-0 flex-1">
                  {tokens[key] ? <LookupText tokens={tokens[key]} textKey={key} lookup={checked} /> : o}
                  {unused ? <span className="text-muted-foreground ml-2 font-sans text-xs">fits no gap</span> : null}
                </span>
                {!checked && gap !== undefined ? (
                  <span className="text-muted-foreground font-numeric mt-1 shrink-0 font-sans text-xs">→ {gap}</span>
                ) : null}
              </li>
            );
          })}
        </ol>

        <ol className="space-y-4 border-t pt-5">
          {passage.blanks.map((b) => {
            const choice = picked[b.number];
            return (
              <li key={b.number} className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-numeric text-muted-foreground w-8 text-sm">{b.number}.</span>
                  <div role="radiogroup" aria-label={`Question ${b.number}`} className="flex flex-wrap gap-1.5">
                    {LETTERS.map((letter, i) => {
                      const isPicked = choice === i;
                      const isAnswer = b.answer === i;
                      return (
                        <button
                          key={letter}
                          type="button"
                          role="radio"
                          aria-checked={isPicked}
                          aria-disabled={checked || undefined}
                          onClick={() => pick(b.number, i)}
                          className={cn(
                            "focus-visible:ring-ring font-numeric size-10 rounded-lg border text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none",
                            checked ? "cursor-default" : "cursor-pointer",
                            !checked && isPicked && "border-primary bg-primary text-primary-foreground",
                            !checked && !isPicked && "hover:bg-muted",
                            !checked && !isPicked && usedBy.has(i) && "text-muted-foreground/60",
                            checked && isAnswer && "border-success bg-success/15 text-success",
                            checked && isPicked && !isAnswer && "border-destructive bg-destructive/15 text-destructive",
                            checked && !isAnswer && !isPicked && "opacity-40",
                          )}
                        >
                          {letter}
                        </button>
                      );
                    })}
                  </div>
                </div>
                {checked ? (
                  <p className="text-sm">
                    <span className={cn("font-medium", choice === b.answer ? "text-success" : "text-destructive")}>
                      {choice === b.answer ? "Right. " : `Answer: ${LETTERS[b.answer]}. `}
                    </span>
                    <span className="text-muted-foreground">{b.why}</span>
                  </p>
                ) : null}
              </li>
            );
          })}
        </ol>

        {checked ? (
          <p className="text-muted-foreground text-xs">Tap any word for its pinyin and meaning, and star it to test later.</p>
        ) : null}

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
                . One sentence is left over.
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
    </LookupRoot>
  );
}
