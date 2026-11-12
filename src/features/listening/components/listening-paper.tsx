"use client";

import { ArrowRight, Check, Pause, Play, RotateCcw, X } from "lucide-react";
import { useMemo, useState, useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";
import type { ListeningItem, ListeningPaper } from "@/content/types";
import { useRecordMany } from "@/features/drills/components/use-record";
import { questionId } from "@/features/drills/lib/question-id";
import { LookupRoot, LookupText, type Tokens } from "@/features/reading/components/lookup";
import { cn } from "@/lib/utils";

import { introText, pauseAfter, segmentsOf } from "../lib/script";
import { usePlaylist } from "./use-playlist";

const LETTERS = ["A", "B", "C", "D"] as const;
const PART_HOW: Record<1 | 2 | 3, string> = {
  1: "Listen to the passage, then pick the statement that matches it.",
  2: "Listen to the passage and the four questions, then answer.",
  3: "Listen to the interview and the four questions, then answer.",
};

/* ───────────────────────── saved progress ───────────────────────── */

type Saved = {
  /** The item on screen. */
  at: number;
  /** Question id → option index. */
  picks: Record<string, number>;
  /** Items already checked. */
  checked: string[];
  /** The whole paper is done: results show (not kept across a refresh). */
  done?: boolean;
};

const EMPTY: Saved = { at: 0, picks: {}, checked: [] };
const listeners = new Set<() => void>();
const storageKey = (paperId: string) => `ottohsk.listening.${paperId}`;

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
    return {
      at: typeof v.at === "number" ? v.at : 0,
      picks: v.picks && typeof v.picks === "object" ? v.picks : {},
      checked: Array.isArray(v.checked) ? v.checked : [],
    };
  } catch {
    return EMPTY;
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/**
 * Progress through a paper lives in this browser, so a half-done paper
 * survives a refresh. A finished paper is not kept: refresh and it starts
 * fresh. Storage can throw (private mode); then progress lives in memory.
 */
function useSaved(paperId: string): [Saved, (change: (prev: Saved) => Saved, keep?: boolean) => void] {
  const raw = useSyncExternalStore(
    subscribe,
    () => readRaw(paperId),
    () => "",
  );
  const [memory, setMemory] = useState<Saved | null>(null);
  const saved = useMemo(() => memory ?? parse(raw), [memory, raw]);
  function update(change: (prev: Saved) => Saved, keep = true) {
    const next = change(memory ?? parse(readRaw(paperId)));
    try {
      if (keep) window.localStorage.setItem(storageKey(paperId), JSON.stringify(next));
      else window.localStorage.removeItem(storageKey(paperId));
    } catch {
      // Not kept; it still counts for this visit.
    }
    setMemory(keep && readRaw(paperId) ? null : next);
    for (const l of listeners) l();
  }
  return [saved, update];
}

/* ───────────────────────────── papers ───────────────────────────── */

/**
 * New HSK 6 listening practice: one recording at a time, as on the exam.
 * Press Play and answer from the options alone (in Parts 2 and 3 the
 * questions are spoken). Check shows the answers, why, and the transcript,
 * with replay of the whole recording or any line, and word lookup.
 */
export function ListeningPapers({
  papers,
  audio,
  tokens,
}: {
  papers: ListeningPaper[];
  audio: Record<string, string>;
  tokens: Tokens;
}) {
  const [index, setIndex] = useState(0);
  return (
    <LookupRoot tokens={tokens} className="space-y-6">
      {papers.length > 1 ? (
        <div role="tablist" aria-label="Paper" className="bg-muted flex w-full gap-1 rounded-xl p-1 sm:w-fit">
          {papers.map((p, i) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={index === i}
              onClick={() => setIndex(i)}
              className={cn(
                "focus-visible:ring-ring min-h-10 flex-1 cursor-pointer rounded-lg px-4 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none sm:flex-none",
                index === i ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {p.title}
            </button>
          ))}
        </div>
      ) : null}
      <PaperView key={papers[index].id} paper={papers[index]} audio={audio} tokens={tokens} />
    </LookupRoot>
  );
}

function PaperView({ paper, audio, tokens }: { paper: ListeningPaper; audio: Record<string, string>; tokens: Tokens }) {
  const [saved, update] = useSaved(paper.id);
  const recordMany = useRecordMany();
  const player = usePlaylist();
  const [plays, setPlays] = useState(0);

  const at = Math.min(Math.max(saved.at, 0), paper.items.length - 1);
  const item = paper.items[at];
  const checked = saved.checked.includes(item.id);
  const last = at === paper.items.length - 1;
  const ids = item.questions.map((q) => questionId(paper.id, q.number));
  const answered = ids.filter((id) => saved.picks[id] !== undefined).length;

  const segments = useMemo(() => segmentsOf(item), [item]);
  const srcs = segments.map((s) => audio[s.key]);
  const pauses = segments.map((s, i) => pauseAfter(s, segments[i + 1]));
  const missingAudio = srcs.some((s) => !s);

  function playAll() {
    if (player.current !== null) {
      player.stop();
      return;
    }
    setPlays((n) => n + 1);
    void player.play(srcs, pauses);
  }

  function playLine(i: number) {
    const seg = segments.findIndex((s) => s.key === `${item.id}:L${i}`);
    if (seg >= 0) void player.play(srcs, pauses, seg, true);
  }

  function pick(id: string, option: number) {
    if (checked) return;
    update((prev) => ({ ...prev, picks: { ...prev.picks, [id]: option } }));
  }

  function check() {
    player.stop();
    update((prev) => ({ ...prev, checked: [...new Set([...prev.checked, item.id])] }));
    recordMany(
      "listening",
      item.questions.map((q, i) => ({ itemId: ids[i], correct: saved.picks[ids[i]] === q.answer })),
    );
  }

  function next() {
    player.stop();
    setPlays(0);
    if (last) update((prev) => ({ ...prev, done: true }), false);
    else update((prev) => ({ ...prev, at: at + 1 }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function restart() {
    player.stop();
    setPlays(0);
    update(() => EMPTY);
  }

  if (saved.done) return <Results paper={paper} picks={saved.picks} onRestart={restart} />;

  const right = item.questions.filter((q, i) => saved.picks[ids[i]] === q.answer).length;
  const playing = player.current !== null;
  const playingLine = playing ? segments[player.current!] : null;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
          <p className="font-medium">
            Part {item.part} <span className="text-muted-foreground font-numeric font-normal">· {item.numbers}</span>
          </p>
          <p className="text-muted-foreground font-numeric">
            {at + 1}/{paper.items.length}
          </p>
        </div>
        <div className="bg-muted h-1 overflow-hidden rounded-full">
          <div className="bg-primary h-full transition-[width]" style={{ width: `${(at / paper.items.length) * 100}%` }} />
        </div>
      </div>

      <section className="bg-card space-y-5 rounded-2xl border p-4 sm:p-6">
        <div className="flex flex-wrap items-center gap-3">
          <Button size="lg" className="h-12 cursor-pointer px-6" onClick={playAll} disabled={missingAudio}>
            {playing ? <Pause aria-hidden /> : <Play aria-hidden />}
            {playing ? "Stop" : plays === 0 ? "Play" : "Play again"}
          </Button>
          <p className="text-muted-foreground text-sm" aria-live="polite">
            {missingAudio
              ? "This recording isn't ready yet."
              : playingLine
                ? playingLine.kind === "intro"
                  ? "Introduction…"
                  : playingLine.kind === "question"
                    ? `Question ${playingLine.key.split(":Q")[1]}…`
                    : "Listening…"
                : plays === 0
                  ? PART_HOW[item.part]
                  : `Played ${plays}×. The exam plays each recording once.`}
          </p>
        </div>

        <ol className="space-y-5">
          {item.questions.map((q, qi) => {
            const id = ids[qi];
            const picked = saved.picks[id];
            const ok = picked === q.answer;
            return (
              <li key={q.number} className="space-y-2">
                <p className="flex items-start gap-2">
                  <span className="font-numeric bg-muted rounded-md px-1.5 py-0.5 text-sm font-semibold">{q.number}</span>
                  {checked && q.prompt ? (
                    <LookupText
                      tokens={tokens[`${paper.id}#${q.number}`] ?? []}
                      textKey={`${paper.id}#${q.number}`}
                      lookup
                      className="font-hanzi pt-0.5 text-base sm:text-lg"
                    />
                  ) : null}
                </p>
                <div role="radiogroup" aria-label={`Question ${q.number}`} className="grid gap-2 sm:grid-cols-2">
                  {q.options.map((o, i) => {
                    const key = `${paper.id}#${q.number}.${i}`;
                    const isPicked = picked === i;
                    const isAnswer = q.answer === i;
                    return (
                      <button
                        key={i}
                        type="button"
                        role="radio"
                        aria-checked={isPicked}
                        aria-disabled={checked || undefined}
                        onClick={() => pick(id, i)}
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
                        <LookupText
                          tokens={tokens[key] ?? [{ t: o }]}
                          textKey={key}
                          lookup={checked}
                          className="font-hanzi flex-1 pt-px text-base sm:text-lg"
                        />
                        {checked && isAnswer ? <Check aria-label="Correct answer" className="text-success mt-1 size-4 shrink-0" /> : null}
                        {checked && isPicked && !isAnswer ? <X aria-label="Your answer" className="text-destructive mt-1 size-4 shrink-0" /> : null}
                      </button>
                    );
                  })}
                </div>
                {checked ? (
                  <div
                    className={cn(
                      "rounded-xl border-l-4 px-3 py-2 text-sm",
                      ok ? "border-success bg-success/5" : "border-destructive bg-destructive/5",
                    )}
                  >
                    <p className="font-medium">
                      {ok
                        ? "Right."
                        : picked === undefined
                          ? `No answer. It is ${LETTERS[q.answer]}.`
                          : `You picked ${LETTERS[picked]}. It is ${LETTERS[q.answer]}.`}
                    </p>
                    <p className="text-muted-foreground">{q.why}</p>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ol>

        <div className="flex flex-wrap items-center gap-3 border-t pt-4">
          {checked ? (
            <>
              <Button size="lg" className="h-11 cursor-pointer px-6" onClick={next}>
                {last ? "See results" : "Next"} <ArrowRight aria-hidden />
              </Button>
              <p className="text-sm">
                <span className="font-numeric font-semibold">
                  {right}/{item.questions.length}
                </span>{" "}
                right
              </p>
            </>
          ) : (
            <>
              <Button size="lg" className="h-11 cursor-pointer px-6" onClick={check} disabled={answered === 0}>
                <Check aria-hidden /> Check
              </Button>
              <p className="text-muted-foreground text-sm">
                <span className="font-numeric">
                  {answered}/{item.questions.length}
                </span>{" "}
                answered
                {answered > 0 && answered < item.questions.length ? ". Blank ones count as wrong." : ""}
              </p>
            </>
          )}
        </div>
      </section>

      {checked ? (
        <Transcript item={item} tokens={tokens} playingKey={playingLine?.key ?? null} onPlayLine={playLine} />
      ) : null}
    </div>
  );
}

/** The recording as text, each line with its own play button. */
function Transcript({
  item,
  tokens,
  playingKey,
  onPlayLine,
}: {
  item: ListeningItem;
  tokens: Tokens;
  playingKey: string | null;
  onPlayLine: (i: number) => void;
}) {
  const intro = introText(item);
  const dialogue = new Set(item.lines.map((l) => l.speaker)).size > 1;
  return (
    <section className="bg-card space-y-3 rounded-2xl border p-4 sm:p-6">
      <h2 className="font-medium">Transcript</h2>
      <p className="text-muted-foreground text-xs">Tap ▶ to hear a line again, or any word for its meaning.</p>
      {intro ? <p className="font-hanzi text-muted-foreground">{intro}</p> : null}
      <ol className="space-y-2">
        {item.lines.map((line, i) => {
          const key = `${item.id}:L${i}`;
          return (
            <li
              key={i}
              className={cn(
                "flex items-start gap-2 rounded-lg p-1.5 transition-colors",
                playingKey === key && "bg-primary/10",
              )}
            >
              <button
                type="button"
                onClick={() => onPlayLine(i)}
                aria-label={`Play line ${i + 1}`}
                className="focus-visible:ring-ring hover:bg-muted text-primary inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md focus-visible:ring-2 focus-visible:outline-none"
              >
                <Play aria-hidden className="size-4" />
              </button>
              {dialogue ? (
                <span className="font-hanzi text-muted-foreground mt-1 w-5 shrink-0 text-sm">
                  {line.speaker === "woman" ? "女" : "男"}
                </span>
              ) : null}
              <LookupText
                tokens={tokens[key] ?? [{ t: line.text }]}
                textKey={key}
                lookup
                className="font-hanzi min-w-0 flex-1 text-base leading-relaxed sm:text-lg"
              />
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function Results({
  paper,
  picks,
  onRestart,
}: {
  paper: ListeningPaper;
  picks: Record<string, number>;
  onRestart: () => void;
}) {
  const byPart = ([1, 2, 3] as const).map((part) => {
    const qs = paper.items.filter((i) => i.part === part).flatMap((i) => i.questions);
    return { part, right: qs.filter((q) => picks[questionId(paper.id, q.number)] === q.answer).length, total: qs.length };
  });
  const right = byPart.reduce((n, p) => n + p.right, 0);
  const total = byPart.reduce((n, p) => n + p.total, 0);
  return (
    <section className="bg-card space-y-4 rounded-2xl border p-5 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-muted-foreground text-sm">{paper.title}</p>
          <p className="font-numeric text-4xl font-semibold">
            {right}
            <span className="text-muted-foreground text-2xl">/{total}</span>
          </p>
        </div>
        <dl className="font-numeric flex gap-6 text-sm">
          {byPart.map((p) => (
            <div key={p.part}>
              <dt className="text-muted-foreground">Part {p.part}</dt>
              <dd className="font-medium">
                {p.right}/{p.total}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <Button variant="outline" className="cursor-pointer" onClick={onRestart}>
        <RotateCcw aria-hidden /> Do it again
      </Button>
    </section>
  );
}
