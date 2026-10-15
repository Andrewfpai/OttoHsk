"use client";

import { Check, RotateCcw, X } from "lucide-react";
import { useMemo, useState, useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";
import type { ReadingItem, ReadingPaper, ReadingQuestion, ReadingToken } from "@/content/types";
import { useRecordMany } from "@/features/drills/components/use-record";
import { questionId } from "@/features/drills/lib/question-id";
import { StarButton } from "@/features/stars/components/stars";
import { cn } from "@/lib/utils";

const LETTERS = ["A", "B", "C", "D"] as const;

type Tokens = Record<string, ReadingToken[]>;
/** A word on the page: which text it is in, and where. */
type Spot = { key: string; index: number };

/* ───────────────────────── saved answers ───────────────────────── */

type Saved = {
  /** Question number → option index. */
  picks: Record<number, number>;
  checked: boolean;
  startedAt?: number;
  checkedAt?: number;
};

const EMPTY: Saved = { picks: {}, checked: false };
const listeners = new Set<() => void>();
const storageKey = (paperId: string) => `ottohsk.reading.${paperId}`;

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function readRaw(paperId: string): string {
  try {
    return window.localStorage.getItem(storageKey(paperId)) ?? "";
  } catch {
    return "";
  }
}

function parse(raw: string): Saved {
  if (!raw) return EMPTY;
  try {
    const v = JSON.parse(raw) as Partial<Saved>;
    return { ...EMPTY, ...v, picks: v.picks && typeof v.picks === "object" ? v.picks : {} };
  } catch {
    return EMPTY;
  }
}

function write(paperId: string, saved: Saved) {
  try {
    window.localStorage.setItem(storageKey(paperId), JSON.stringify(saved));
  } catch {
    // Not kept; the answers still count for this visit's check.
  }
  for (const l of listeners) l();
}

/**
 * Answers live in this browser, so a half-done paper survives a refresh.
 * Storage can throw (private mode), and then nothing is kept between visits.
 */
function useSaved(paperId: string): [Saved, (change: (prev: Saved) => Saved) => void] {
  const raw = useSyncExternalStore(
    subscribe,
    () => readRaw(paperId),
    () => "",
  );
  // Without storage the answers live in memory instead.
  const [memory, setMemory] = useState<Saved | null>(null);
  const saved = useMemo(() => memory ?? parse(raw), [memory, raw]);
  // Built from what is stored now, not this render's copy, so two quick
  // taps cannot overwrite each other.
  function update(change: (prev: Saved) => Saved) {
    const next = change(memory ?? parse(readRaw(paperId)));
    write(paperId, next);
    setMemory(readRaw(paperId) ? null : next);
  }
  return [saved, update];
}

/* ───────────────────────────── paper ───────────────────────────── */

/**
 * A reading paper to do on screen: answer everything, then check. Every
 * word can be tapped (or hovered) for its pinyin and meaning.
 */
export function ReadingPaperView({ paper, tokens }: { paper: ReadingPaper; tokens: Tokens }) {
  const [saved, update] = useSaved(paper.id);
  const [spot, setSpot] = useState<Spot | null>(null);
  const recordMany = useRecordMany();
  const { picks, checked } = saved;

  const questions = useMemo(
    () => [...paper.part2, ...paper.part3].flatMap((item) => item.questions),
    [paper],
  );
  const answered = questions.filter((q) => picks[q.number] !== undefined).length;
  const isRight = (q: ReadingQuestion) => picks[q.number] === q.answer;

  function pick(q: ReadingQuestion, option: number) {
    if (checked) return;
    update((prev) => ({
      ...prev,
      picks: { ...prev.picks, [q.number]: option },
      startedAt: prev.startedAt ?? Date.now(),
    }));
  }

  function check() {
    update((prev) => ({ ...prev, checked: true, checkedAt: Date.now() }));
    recordMany(
      "reading",
      questions.map((q) => ({ itemId: questionId(paper.id, q.number), correct: isRight(q) })),
    );
    scrollTo("reading-top");
  }

  function reset() {
    update(() => EMPTY);
    scrollTo("reading-top");
  }

  /** One handler for every word on the page, rather than thousands. */
  function spotFrom(target: EventTarget | null): Spot | null {
    const el = target instanceof Element ? target.closest<HTMLElement>("[data-k]") : null;
    if (!el?.dataset.k) return null;
    return { key: el.dataset.k, index: Number(el.dataset.i) };
  }

  const token = spot ? tokens[spot.key]?.[spot.index] : undefined;

  return (
    <div
      className="space-y-8 pb-44"
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
      <div id="reading-top" className="scroll-mt-20">
        {checked ? (
          <Score paper={paper} picks={picks} saved={saved} onReset={reset} />
        ) : (
          <p className="text-muted-foreground text-sm">
            Answer all {questions.length}, then check: you see what you missed and why. Tap any word
            {" "}(or hover, with a mouse) for its pinyin and meaning. Your answers are kept on this device.
          </p>
        )}
      </div>

      <Part
        title="第二部分"
        subtitle={`Questions ${paper.part2[0].numbers}–${paper.part2.at(-1)!.numbers}: pick the sentence that matches the passage.`}
      >
        {paper.part2.map((item) => (
          <ItemCard key={item.id} paperId={paper.id} item={item} tokens={tokens} spot={spot} picks={picks} checked={checked} onPick={pick} />
        ))}
      </Part>

      <Part
        title="第三部分"
        subtitle={`Questions ${paper.part3[0].questions[0].number}–${paper.part3.at(-1)!.questions.at(-1)!.number}: read each passage and answer its questions.`}
      >
        {paper.part3.map((item) => (
          <ItemCard key={item.id} paperId={paper.id} item={item} tokens={tokens} spot={spot} picks={picks} checked={checked} onPick={pick} />
        ))}
      </Part>

      <div className="flex flex-wrap items-center gap-3">
        {checked ? (
          <Button size="lg" variant="outline" className="h-11 cursor-pointer px-6" onClick={reset}>
            <RotateCcw aria-hidden />
            Try again
          </Button>
        ) : (
          <>
            <Button size="lg" className="h-11 cursor-pointer px-6" disabled={answered === 0} onClick={check}>
              <Check aria-hidden />
              Check answers
            </Button>
            <p className="text-muted-foreground text-sm">
              <span className="font-numeric">
                {answered}/{questions.length}
              </span>{" "}
              answered
              {answered > 0 && answered < questions.length ? ". Blank ones count as wrong." : ""}
            </p>
          </>
        )}
      </div>

      {token?.p ? <WordPanel token={token} onClose={() => setSpot(null)} /> : null}
    </div>
  );
}

function scrollTo(id: string) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

function Part({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <header>
        <h2 className="font-hanzi text-xl font-semibold">{title}</h2>
        <p className="text-muted-foreground text-sm">{subtitle}</p>
      </header>
      {children}
    </section>
  );
}

/* ───────────────────────────── items ───────────────────────────── */

function ItemCard({
  paperId,
  item,
  tokens,
  spot,
  picks,
  checked,
  onPick,
}: {
  paperId: string;
  item: ReadingItem;
  tokens: Tokens;
  spot: Spot | null;
  picks: Record<number, number>;
  checked: boolean;
  onPick: (q: ReadingQuestion, option: number) => void;
}) {
  const many = item.questions.length > 1;
  return (
    <article className="bg-card rounded-2xl border p-4 sm:p-6">
      <div className={cn(many && "lg:grid lg:grid-cols-2 lg:gap-8")}>
        <div className={cn(many && "lg:sticky lg:top-6 lg:max-h-[calc(100dvh-3rem)] lg:self-start lg:overflow-y-auto")}>
          {many ? <p className="text-muted-foreground font-numeric mb-2 text-xs font-medium">{item.numbers}</p> : null}
          <Text tokens={tokens[item.id] ?? []} textKey={item.id} spot={spot} paragraphs />
        </div>
        <div className={cn("space-y-6", many ? "mt-6 lg:mt-0" : "mt-4")}>
          {item.questions.map((q) => (
            <Question
              key={q.number}
              paperId={paperId}
              q={q}
              tokens={tokens}
              spot={spot}
              picked={picks[q.number]}
              checked={checked}
              onPick={(i) => onPick(q, i)}
            />
          ))}
        </div>
      </div>
    </article>
  );
}

function Question({
  paperId,
  q,
  tokens,
  spot,
  picked,
  checked,
  onPick,
}: {
  paperId: string;
  q: ReadingQuestion;
  tokens: Tokens;
  spot: Spot | null;
  picked: number | undefined;
  checked: boolean;
  onPick: (option: number) => void;
}) {
  const id = `${paperId}#${q.number}`;
  const right = picked === q.answer;
  return (
    <div id={`q${q.number}`} className="scroll-mt-20 space-y-3">
      <div className="flex items-start gap-2">
        <span className="font-numeric bg-muted rounded-md px-1.5 py-0.5 text-sm font-semibold">{q.number}</span>
        {q.prompt ? <Text tokens={tokens[id] ?? []} textKey={id} spot={spot} className="pt-0.5" /> : null}
      </div>
      <div role="radiogroup" aria-label={`Question ${q.number}`} className="grid gap-2 sm:grid-cols-2">
        {q.options.map((_, i) => {
          const key = `${id}.${i}`;
          const isPicked = picked === i;
          const isAnswer = q.answer === i;
          return (
            <button
              key={i}
              type="button"
              role="radio"
              aria-checked={isPicked}
              // Not `disabled`: the words inside must stay tappable after checking.
              aria-disabled={checked || undefined}
              onClick={() => onPick(i)}
              className={cn(
                "focus-visible:ring-ring flex min-h-11 items-start gap-2 rounded-xl border px-3 py-2 text-left transition-colors focus-visible:ring-2 focus-visible:outline-none",
                checked ? "cursor-default" : "cursor-pointer",
                !checked && !isPicked && "hover:border-primary/50 hover:bg-muted/50",
                !checked && isPicked && "border-primary bg-primary/10",
                checked && isAnswer && "border-success bg-success/10",
                checked && isPicked && !isAnswer && "border-destructive bg-destructive/10",
                checked && !isAnswer && !isPicked && "opacity-60",
              )}
            >
              <span
                className={cn(
                  "font-numeric flex size-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold",
                  !checked && isPicked && "border-primary bg-primary text-primary-foreground",
                )}
              >
                {LETTERS[i]}
              </span>
              <Text tokens={tokens[key] ?? []} textKey={key} spot={spot} className="flex-1 pt-px" />
              {checked && isAnswer ? <Check aria-label="Correct answer" className="text-success mt-1 size-4 shrink-0" /> : null}
              {checked && isPicked && !isAnswer ? (
                <X aria-label="Your answer" className="text-destructive mt-1 size-4 shrink-0" />
              ) : null}
            </button>
          );
        })}
      </div>
      {checked ? (
        <div
          className={cn(
            "rounded-xl border-l-4 px-3 py-2 text-sm",
            right ? "border-success bg-success/5" : "border-destructive bg-destructive/5",
          )}
        >
          <p className="font-medium">
            {right
              ? "Right."
              : picked === undefined
                ? `No answer. It is ${LETTERS[q.answer]}.`
                : `You picked ${LETTERS[picked]}. It is ${LETTERS[q.answer]}.`}
          </p>
          <p className="text-muted-foreground">{q.why}</p>
        </div>
      ) : null}
    </div>
  );
}

/* ───────────────────────────── words ───────────────────────────── */

/** A text drawn word by word, each word tappable. */
function Text({
  tokens,
  textKey,
  spot,
  paragraphs = false,
  className,
}: {
  tokens: ReadingToken[];
  textKey: string;
  spot: Spot | null;
  paragraphs?: boolean;
  className?: string;
}) {
  const words = tokens.map((t, i) =>
    t.t === "\n" ? null : t.p ? (
      <span
        key={i}
        data-k={textKey}
        data-i={i}
        className={cn(
          "cursor-pointer rounded-sm transition-colors hover:bg-primary/10",
          t.u && "decoration-primary underline decoration-2 underline-offset-[5px]",
          spot?.key === textKey && spot.index === i && "bg-primary/20 hover:bg-primary/20",
        )}
      >
        {t.t}
      </span>
    ) : (
      <span key={i} className={cn(t.u && "decoration-primary underline decoration-2 underline-offset-[5px]")}>
        {t.t}
      </span>
    ),
  );

  if (!paragraphs) return <span className={cn("font-hanzi text-lg leading-relaxed", className)}>{words}</span>;

  // Split at the "\n" tokens into indented paragraphs, as on paper.
  const paras: React.ReactNode[][] = [[]];
  tokens.forEach((t, i) => (t.t === "\n" ? paras.push([]) : paras.at(-1)!.push(words[i])));
  return (
    <div className={cn("font-hanzi space-y-2 text-lg leading-loose", className)}>
      {paras.map((p, i) => (
        <p key={i} className="indent-[2em]">
          {p}
        </p>
      ))}
    </div>
  );
}

function WordPanel({ token, onClose }: { token: ReadingToken; onClose: () => void }) {
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
          {token.l ? <p className="text-muted-foreground mt-0.5 text-xs">{token.l}</p> : null}
        </div>
        {token.id ? <StarButton wordId={token.id} label={token.t} /> : null}
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

/* ───────────────────────────── score ───────────────────────────── */

function Score({
  paper,
  picks,
  saved,
  onReset,
}: {
  paper: ReadingPaper;
  picks: Record<number, number>;
  saved: Saved;
  onReset: () => void;
}) {
  const tally = (items: ReadingItem[]) => {
    const qs = items.flatMap((i) => i.questions);
    return { right: qs.filter((q) => picks[q.number] === q.answer).length, total: qs.length };
  };
  const p2 = tally(paper.part2);
  const p3 = tally(paper.part3);
  const missed = [...paper.part2, ...paper.part3]
    .flatMap((i) => i.questions)
    .filter((q) => picks[q.number] !== q.answer)
    .map((q) => q.number);
  const minutes =
    saved.startedAt && saved.checkedAt ? Math.max(1, Math.round((saved.checkedAt - saved.startedAt) / 60_000)) : null;

  return (
    <section className="bg-card space-y-4 rounded-2xl border p-5 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-muted-foreground text-sm">Score</p>
          <p className="font-numeric text-4xl font-semibold">
            {p2.right + p3.right}
            <span className="text-muted-foreground text-2xl">/{p2.total + p3.total}</span>
          </p>
        </div>
        <dl className="font-numeric flex gap-6 text-sm">
          <div>
            <dt className="text-muted-foreground">Part 2</dt>
            <dd className="font-medium">
              {p2.right}/{p2.total}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Part 3</dt>
            <dd className="font-medium">
              {p3.right}/{p3.total}
            </dd>
          </div>
          {minutes ? (
            <div>
              <dt className="text-muted-foreground">Time</dt>
              <dd className="font-medium">{minutes} min</dd>
            </div>
          ) : null}
        </dl>
      </div>
      {missed.length > 0 ? (
        <div className="space-y-2">
          <p className="text-sm font-medium">Missed: jump to one</p>
          <ul className="flex flex-wrap gap-1.5">
            {missed.map((n) => (
              <li key={n}>
                <a
                  href={`#q${n}`}
                  className="border-destructive/40 text-destructive hover:bg-destructive/10 font-numeric inline-flex min-h-9 min-w-9 items-center justify-center rounded-lg border px-2 text-sm"
                >
                  {n}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-success font-medium">Every answer right.</p>
      )}
      <Button variant="outline" className="cursor-pointer" onClick={onReset}>
        <RotateCcw aria-hidden />
        Try again
      </Button>
    </section>
  );
}
