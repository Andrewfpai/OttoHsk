"use client";

import { Check, Lock, RotateCcw, X } from "lucide-react";
import { useMemo, useState, useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";
import type { ReadingItem, ReadingQuestion, ReadingSet, ReadingToken } from "@/content/types";
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
  /** Question id ("h51329#61") → option index. */
  picks: Record<string, number>;
  checked: boolean;
  startedAt?: number;
  checkedAt?: number;
};

const EMPTY: Saved = { picks: {}, checked: false };
const listeners = new Set<() => void>();
const storageKey = (part: PartKey) => `ottohsk.reading.v2.${part}`;

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function readRaw(part: PartKey): string {
  try {
    return window.localStorage.getItem(storageKey(part)) ?? "";
  } catch {
    return "";
  }
}

function parse(raw: string): Saved {
  if (!raw) return EMPTY;
  try {
    const v = JSON.parse(raw) as Partial<Saved>;
    return { ...EMPTY, ...v, picks: v.picks && typeof v.picks === "object" ? v.picks : {}, checked: false };
  } catch {
    return EMPTY;
  }
}

function write(part: PartKey, saved: Saved | null) {
  try {
    if (saved) window.localStorage.setItem(storageKey(part), JSON.stringify(saved));
    else window.localStorage.removeItem(storageKey(part));
  } catch {
    // Not kept; the answers still count for this visit.
  }
  for (const l of listeners) l();
}

type Update = (change: (prev: Saved) => Saved, keep?: boolean) => void;

/**
 * Answers in progress live in this browser, so a half-done part survives a
 * refresh. A checked part is not kept: its results stay until you leave or
 * refresh, and then the part starts fresh. Storage can throw (private
 * mode), and then answers live in memory for this visit only.
 */
function useSaved(part: PartKey): [Saved, Update] {
  const raw = useSyncExternalStore(
    subscribe,
    () => readRaw(part),
    () => "",
  );
  const [memory, setMemory] = useState<Saved | null>(null);
  const saved = useMemo(() => memory ?? parse(raw), [memory, raw]);
  // Built from what is stored now, not this render's copy, so two quick
  // taps cannot overwrite each other.
  const update: Update = (change, keep = true) => {
    const next = change(memory ?? parse(readRaw(part)));
    if (!keep) {
      write(part, null);
      setMemory(next);
      return;
    }
    write(part, next);
    setMemory(readRaw(part) ? null : next);
  };
  return [saved, update];
}

/* ───────────────────────────── paper ───────────────────────────── */

type PartKey = "part2" | "part3";

const PARTS: Record<PartKey, { label: string; title: string; how: string }> = {
  part2: { label: "Part 2", title: "第二部分", how: "pick the sentence that matches the passage" },
  part3: { label: "Part 3", title: "第三部分", how: "read each passage and answer its questions" },
};

/** Every question of one part, across the sets, with where it comes from. */
type Entry = { set: ReadingSet; q: ReadingQuestion; id: string };

function entriesOf(sets: ReadingSet[], part: PartKey): Entry[] {
  return sets.flatMap((set) =>
    set.paper[part].flatMap((item) =>
      item.questions.map((q) => ({ set, q, id: questionId(set.paper.id, q.number) })),
    ),
  );
}

function range(items: ReadingItem[]): string {
  const qs = items.flatMap((item) => item.questions);
  return `${qs[0].number}–${qs.at(-1)!.number}`;
}

/**
 * Reading Parts 2 and 3 of several real papers, one part per tab: answer
 * the part, then check it. After checking, every word can be tapped (or
 * hovered) for its pinyin and meaning; before, it is exam conditions.
 */
export function ReadingPaperView({ sets, tokens }: { sets: ReadingSet[]; tokens: Tokens }) {
  const [part, setPart] = useState<PartKey>("part2");
  const [spot, setSpot] = useState<Spot | null>(null);
  const saves: Record<PartKey, [Saved, Update]> = {
    part2: useSaved("part2"),
    part3: useSaved("part3"),
  };
  const lookup = saves[part][0].checked;

  /** One handler for every word on the page, rather than thousands. */
  function spotFrom(target: EventTarget | null): Spot | null {
    const el = target instanceof Element ? target.closest<HTMLElement>("[data-k]") : null;
    if (!el?.dataset.k) return null;
    return { key: el.dataset.k, index: Number(el.dataset.i) };
  }

  const token = lookup && spot ? tokens[spot.key]?.[spot.index] : undefined;

  return (
    <div
      className="space-y-6 pb-44"
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
      <div role="tablist" aria-label="Part" className="bg-muted flex w-full gap-1 rounded-xl p-1 sm:w-fit">
        {(Object.keys(PARTS) as PartKey[]).map((key) => {
          const entries = entriesOf(sets, key);
          const { picks, checked } = saves[key][0];
          const status = checked
            ? `${entries.filter((e) => picks[e.id] === e.q.answer).length}/${entries.length} right`
            : `${entries.filter((e) => picks[e.id] !== undefined).length}/${entries.length} answered`;
          return (
            <button
              key={key}
              type="button"
              role="tab"
              id={`tab-${key}`}
              aria-selected={part === key}
              aria-controls="reading-part"
              onClick={() => {
                setPart(key);
                setSpot(null);
              }}
              className={cn(
                "focus-visible:ring-ring flex min-h-11 flex-1 cursor-pointer flex-col items-center justify-center rounded-lg px-4 py-1.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none sm:flex-none",
                part === key ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span>
                {PARTS[key].label} <span className="font-numeric">· {range(sets[0].paper[key])}</span>
              </span>
              <span className="text-muted-foreground font-numeric text-xs font-normal">{status}</span>
            </button>
          );
        })}
      </div>

      <div id="reading-part" role="tabpanel" aria-labelledby={`tab-${part}`}>
        <PartView
          key={part}
          sets={sets}
          part={part}
          tokens={tokens}
          spot={lookup ? spot : null}
          saved={saves[part][0]}
          update={saves[part][1]}
          onReset={() => setSpot(null)}
        />
      </div>

      {token?.p ? <WordPanel token={token} onClose={() => setSpot(null)} /> : null}
    </div>
  );
}

function PartView({
  sets,
  part,
  tokens,
  spot,
  saved,
  update,
  onReset,
}: {
  sets: ReadingSet[];
  part: PartKey;
  tokens: Tokens;
  spot: Spot | null;
  saved: Saved;
  update: Update;
  onReset: () => void;
}) {
  const recordMany = useRecordMany();
  const { picks, checked } = saved;
  const entries = useMemo(() => entriesOf(sets, part), [sets, part]);
  const answered = entries.filter((e) => picks[e.id] !== undefined).length;

  function pick(id: string, option: number) {
    if (checked) return;
    update((prev) => ({
      ...prev,
      picks: { ...prev.picks, [id]: option },
      startedAt: prev.startedAt ?? Date.now(),
    }));
  }

  function check() {
    // Results stay on screen but are not stored: a refresh starts afresh.
    update((prev) => ({ ...prev, checked: true, checkedAt: Date.now() }), false);
    recordMany(
      "reading",
      entries.map((e) => ({ itemId: e.id, correct: picks[e.id] === e.q.answer })),
    );
    scrollTo("reading-top");
  }

  function reset() {
    update(() => EMPTY);
    onReset();
    scrollTo("reading-top");
  }

  return (
    <div className="space-y-6">
      <div id="reading-top" className="scroll-mt-20">
        {checked ? (
          <Score entries={entries} saved={saved} onReset={reset} />
        ) : (
          <p className="text-muted-foreground text-sm">
            {sets.length} sets, {entries.length} questions. Answer them, then check: you see what you missed
            and why. After checking, tap any word (or hover, with a mouse) for its pinyin and meaning.
          </p>
        )}
      </div>

      <section className="space-y-4">
        <header>
          <h2 className="font-hanzi text-xl font-semibold">{PARTS[part].title}</h2>
          <p className="text-muted-foreground text-sm">
            Questions {range(sets[0].paper[part])} of each set: {PARTS[part].how}.
          </p>
        </header>
        {sets.map((set) => (
          <div key={set.paper.id} className="space-y-4">
            <h3 className="flex items-baseline gap-2 pt-2 font-semibold">
              Set {set.label}
              <span className="text-muted-foreground text-sm font-normal">{set.paper.title}</span>
            </h3>
            {set.paper[part].map((item) => (
              <ItemCard
                key={item.id}
                paperId={set.paper.id}
                item={item}
                tokens={tokens}
                spot={spot}
                lookup={checked}
                picks={picks}
                checked={checked}
                onPick={pick}
              />
            ))}
          </div>
        ))}
      </section>

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
              Check {PARTS[part].label}
            </Button>
            <p className="text-muted-foreground text-sm">
              <span className="font-numeric">
                {answered}/{entries.length}
              </span>{" "}
              answered
              {answered > 0 && answered < entries.length ? ". Blank ones count as wrong." : ""}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function scrollTo(id: string) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

const anchor = (id: string) => `q-${id.replace("#", "-")}`;

/* ───────────────────────────── items ───────────────────────────── */

function ItemCard({
  paperId,
  item,
  tokens,
  spot,
  lookup,
  picks,
  checked,
  onPick,
}: {
  paperId: string;
  item: ReadingItem;
  tokens: Tokens;
  spot: Spot | null;
  lookup: boolean;
  picks: Record<string, number>;
  checked: boolean;
  onPick: (id: string, option: number) => void;
}) {
  const many = item.questions.length > 1;
  return (
    <article className="bg-card rounded-2xl border p-4 sm:p-6">
      <div className={cn(many && "lg:grid lg:grid-cols-2 lg:gap-8")}>
        <div className={cn(many && "lg:sticky lg:top-6 lg:max-h-[calc(100dvh-3rem)] lg:self-start lg:overflow-y-auto")}>
          {many ? <p className="text-muted-foreground font-numeric mb-2 text-xs font-medium">{item.numbers}</p> : null}
          <Text tokens={tokens[item.id] ?? []} textKey={item.id} spot={spot} lookup={lookup} paragraphs />
        </div>
        <div className={cn("space-y-6", many ? "mt-6 lg:mt-0" : "mt-4")}>
          {item.questions.map((q) => {
            const id = questionId(paperId, q.number);
            return (
              <Question
                key={q.number}
                id={id}
                q={q}
                tokens={tokens}
                spot={spot}
                lookup={lookup}
                picked={picks[id]}
                checked={checked}
                onPick={(i) => onPick(id, i)}
              />
            );
          })}
        </div>
      </div>
    </article>
  );
}

function Question({
  id,
  q,
  tokens,
  spot,
  lookup,
  picked,
  checked,
  onPick,
}: {
  id: string;
  q: ReadingQuestion;
  tokens: Tokens;
  spot: Spot | null;
  lookup: boolean;
  picked: number | undefined;
  checked: boolean;
  onPick: (option: number) => void;
}) {
  const right = picked === q.answer;
  return (
    <div id={anchor(id)} className="scroll-mt-20 space-y-3">
      <div className="flex items-start gap-2">
        <span className="font-numeric bg-muted rounded-md px-1.5 py-0.5 text-sm font-semibold">{q.number}</span>
        {q.prompt ? <Text tokens={tokens[id] ?? []} textKey={id} spot={spot} lookup={lookup} className="pt-0.5" /> : null}
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
              <Text tokens={tokens[key] ?? []} textKey={key} spot={spot} lookup={lookup} className="flex-1 pt-px" />
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

const UNDERLINE = "decoration-primary underline decoration-2 underline-offset-[5px]";

/** A text drawn word by word; with `lookup`, each word is tappable. */
function Text({
  tokens,
  textKey,
  spot,
  lookup,
  paragraphs = false,
  className,
}: {
  tokens: ReadingToken[];
  textKey: string;
  spot: Spot | null;
  lookup: boolean;
  paragraphs?: boolean;
  className?: string;
}) {
  const words = tokens.map((t, i) =>
    t.t === "\n" ? null : lookup && t.p ? (
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
    ) : (
      <span key={i} className={cn(t.u && UNDERLINE)}>
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

function Score({ entries, saved, onReset }: { entries: Entry[]; saved: Saved; onReset: () => void }) {
  const { picks } = saved;
  const isRight = (e: Entry) => picks[e.id] === e.q.answer;
  const right = entries.filter(isRight).length;
  const missed = entries.filter((e) => !isRight(e));
  const bySet = [...new Set(entries.map((e) => e.set))].map((set) => {
    const mine = entries.filter((e) => e.set === set);
    return { set, right: mine.filter(isRight).length, total: mine.length };
  });
  const minutes =
    saved.startedAt && saved.checkedAt ? Math.max(1, Math.round((saved.checkedAt - saved.startedAt) / 60_000)) : null;

  return (
    <section className="bg-card space-y-4 rounded-2xl border p-5 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-muted-foreground text-sm">Score</p>
          <p className="font-numeric text-4xl font-semibold">
            {right}
            <span className="text-muted-foreground text-2xl">/{entries.length}</span>
          </p>
        </div>
        <dl className="font-numeric flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {bySet.map((s) => (
            <div key={s.set.paper.id}>
              <dt className="text-muted-foreground">Set {s.set.label}</dt>
              <dd className="font-medium">
                {s.right}/{s.total}
              </dd>
            </div>
          ))}
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
            {missed.map((e) => (
              <li key={e.id}>
                <a
                  href={`#${anchor(e.id)}`}
                  className="border-destructive/40 text-destructive hover:bg-destructive/10 font-numeric inline-flex min-h-9 items-center justify-center rounded-lg border px-2 text-sm"
                >
                  {e.set.label}
                  {e.q.number}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-success font-medium">Every answer right.</p>
      )}
      <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
        <Lock aria-hidden className="size-3.5" />
        Results are not kept: refresh or leave and this part starts fresh.
      </p>
      <Button variant="outline" className="cursor-pointer" onClick={onReset}>
        <RotateCcw aria-hidden />
        Try again
      </Button>
    </section>
  );
}
