"use client";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Loader2,
  Lock,
  RotateCcw,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useEffectEvent, useMemo, useRef, useState, useTransition } from "react";
import { toast } from "sonner";

import { StickyActions } from "@/components/sticky-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type Word, getWord, words } from "@/content/words";
import { ExampleSentence } from "@/features/words/components/example-sentence";
import { formatCountdown, useNow } from "@/hooks/use-now";
import { formatDate } from "@/lib/dates";
import { EXAM_TIME_ZONE } from "@/lib/exam";
import { cn } from "@/lib/utils";

import { DECK_SIZES, buildDeck, isDue } from "../lib/deck";
import { FAIL_WRONG_RATIO, GUESS_MS, MAX_ANSWER_MS, MAX_LOCK_MS, failAt, formatLock, lockDurationMs } from "../lib/lockout";
import { nextPace } from "../lib/practice-pace";
import { statusOf } from "../lib/schedule";
import { type AnswerInput, isRightAnswer } from "../lib/grade";
import { type Question, blankedSentence, buildQuestions, pinyinMatches } from "../lib/questions";
import { type TestResult, submitTest } from "../server/actions";
import type { FlashcardInfo, ProgressRow, TestSummary } from "../server/queries";
import { savePace, usePracticePace } from "./use-practice-pace";

/** Practice gets this long per card before the test starts on its own. */

type Answer = AnswerInput;

type Phase =
  | { name: "setup" }
  | { name: "practice"; deck: Word[]; startedAt: number; durationMs: number }
  | { name: "test"; deck: Word[]; questions: Question[] }
  | { name: "results"; result: TestResult; answers: Answer[] };

export function FlashcardStudio({
  progress,
  info,
  recentTests,
}: {
  progress: ProgressRow[];
  info: FlashcardInfo;
  recentTests: TestSummary[];
}) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>({ name: "setup" });
  const [size, setSize] = useState<number>(20);
  const pace = usePracticePace();
  // The server's answer after a test, in case it lands before the refreshed
  // props do.
  const [resultLock, setResultLock] = useState<number | null>(null);
  const lockedUntil = Math.max(info.lockedUntil ?? 0, resultLock ?? 0) || null;

  const now = useNow();
  const locked = now !== null && lockedUntil !== null && lockedUntil > now;
  const isLockedNow = () => lockedUntil !== null && lockedUntil > Date.now();

  function startPractice() {
    const deck = buildDeck(words, progress, info.nextTest, size);
    if (deck.words.length === 0) {
      toast.info("Nothing to study right now: every word is waiting for its next review.");
      return;
    }
    setPhase({
      name: "practice",
      deck: deck.words,
      startedAt: Date.now(),
      durationMs: deck.words.length * pace,
    });
  }

  function startTest(deck: Word[], startedAt: number, timedOut: boolean) {
    if (isLockedNow()) {
      toast.error("Tests are locked for now. Keep practising.");
      return;
    }
    savePace(nextPace(pace, { cards: deck.length, usedMs: Date.now() - startedAt, timedOut }));
    setPhase({ name: "test", deck, questions: buildQuestions(deck, words, Math.random) });
  }

  if (phase.name === "practice") {
    return (
      <Practice
        key={phase.startedAt}
        deck={phase.deck}
        startedAt={phase.startedAt}
        durationMs={phase.durationMs}
        locked={locked}
        lockedUntil={lockedUntil}
        now={now}
        isLockedNow={isLockedNow}
        onStartTest={(timedOut) => startTest(phase.deck, phase.startedAt, timedOut)}
        onQuit={() => setPhase({ name: "setup" })}
      />
    );
  }

  if (phase.name === "test") {
    return (
      <Test
        questions={phase.questions}
        onDone={(result, answers) => {
          setResultLock(result.lockedUntil);
          setPhase({ name: "results", result, answers });
        }}
        onLocked={() => {
          // Locked from another tab: fetch the lock so Setup shows it.
          router.refresh();
          setPhase({ name: "setup" });
        }}
      />
    );
  }

  if (phase.name === "results") {
    return (
      <Results
        result={phase.result}
        answers={phase.answers}
        lockedUntil={lockedUntil}
        now={now}
        onAgain={() => setPhase({ name: "setup" })}
      />
    );
  }

  return (
    <Setup
      progress={progress}
      info={info}
      locked={locked}
      lockedUntil={lockedUntil}
      now={now}
      size={size}
      pace={pace}
      onSize={setSize}
      onStart={startPractice}
      recentTests={recentTests}
    />
  );
}

/* ─────────────────────────────── Setup ─────────────────────────────── */

function Setup({
  progress,
  info,
  locked,
  lockedUntil,
  now,
  size,
  pace,
  onSize,
  onStart,
  recentTests,
}: {
  progress: ProgressRow[];
  info: FlashcardInfo;
  locked: boolean;
  lockedUntil: number | null;
  now: number | null;
  size: number;
  /** Practice ms per card. */
  pace: number;
  onSize: (n: number) => void;
  onStart: () => void;
  recentTests: TestSummary[];
}) {
  const stats = useMemo(() => {
    let due = 0;
    let known = 0;
    for (const p of progress) {
      if (isDue(p, info.nextTest)) due++;
      if (statusOf(p.strength) === "known") known++;
    }
    return { due, known, fresh: words.length - progress.length };
  }, [progress, info.nextTest]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
      <section className="bg-card space-y-6 rounded-2xl border p-5 sm:p-6">
        <dl className="grid grid-cols-3 gap-3">
          <Stat label="Due for review" value={stats.due} />
          <Stat label="Not started" value={stats.fresh} />
          <Stat label="Known" value={stats.known} />
        </dl>

        {locked && lockedUntil !== null && now !== null ? (
          <div
            role="status"
            className="border-warning/40 bg-warning/10 flex items-start gap-3 rounded-xl border p-4 text-sm"
          >
            <Lock aria-hidden className="text-warning mt-0.5 size-4 shrink-0" />
            <div>
              <p className="font-medium">
                Tests locked for{" "}
                <span className="font-numeric">{formatCountdown(lockedUntil - now)}</span>
              </p>
              <p className="text-muted-foreground">
                {info.lockLevel > 1 ? `${info.lockLevel} failed tests in a row. ` : ""}
                Practice is still open. Use the time to go through the cards slowly.
              </p>
            </div>
          </div>
        ) : null}

        <div className="space-y-3">
          <h2 className="text-sm font-medium">Cards per session</h2>
          <div role="radiogroup" aria-label="Cards per session" className="flex flex-wrap gap-2">
            {DECK_SIZES.map((n) => (
              <button
                key={n}
                type="button"
                role="radio"
                aria-checked={size === n}
                onClick={() => onSize(n)}
                className={cn(
                  "focus-visible:ring-ring min-w-24 cursor-pointer rounded-xl border px-4 py-3 text-left transition-colors focus-visible:ring-2 focus-visible:outline-none",
                  size === n ? "border-primary bg-primary/10" : "hover:bg-muted",
                )}
              >
                <span className="font-numeric block text-lg font-semibold">{n}</span>
                <span className="text-muted-foreground block text-xs">
                  {formatCountdown(n * pace)} practice
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Button size="lg" variant="cta" className="h-11 w-full cursor-pointer sm:w-auto sm:px-6" onClick={onStart}>
            Start practice
          </Button>
          <p className="text-muted-foreground flex items-start gap-2 text-sm">
            <Lock aria-hidden className="mt-0.5 size-4 shrink-0" />
            <span>
              Get <span className="text-foreground font-numeric font-medium">{failAt(size)}</span> or
              more of <span className="font-numeric">{size}</span> wrong (over{" "}
              {Math.round(FAIL_WRONG_RATIO * 100)}%) and the test locks for{" "}
              <span className="text-foreground font-medium">{formatLock(lockDurationMs(info.lockLevel))}</span>
              {info.lockLevel > 0
                ? `, because you failed the last ${info.lockLevel === 1 ? "test" : `${info.lockLevel} tests`}. It doubles each time, up to ${formatLock(MAX_LOCK_MS)}`
                : ""}
              .
            </span>
          </p>
        </div>
      </section>

      <aside className="space-y-6">
        {recentTests.length > 0 ? (
          <section className="bg-card rounded-2xl border p-5 text-sm">
            <h2 className="mb-3 font-medium">Recent tests</h2>
            <ul className="space-y-2">
              {recentTests.slice(0, 6).map((t) => (
                <li key={t.id} className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">
                    <span className="font-numeric">#{t.testNumber}</span> ·{" "}
                    {formatDate(new Date(t.takenAt), EXAM_TIME_ZONE, {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span className="font-numeric">
                    {t.correct}/{t.total}
                  </span>
                  <span
                    className={cn(
                      "w-12 text-right text-xs font-medium",
                      t.passed ? "text-success" : "text-destructive",
                    )}
                  >
                    {t.passed ? "Pass" : "Fail"}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </aside>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="bg-muted/50 rounded-xl p-3">
      <dt className="text-muted-foreground text-xs">{label}</dt>
      <dd className="font-numeric text-2xl font-semibold">{value}</dd>
    </div>
  );
}

/* ────────────────────────────── Practice ───────────────────────────── */

function Practice({
  deck,
  startedAt,
  durationMs,
  locked,
  lockedUntil,
  now,
  isLockedNow,
  onStartTest,
  onQuit,
}: {
  deck: Word[];
  startedAt: number;
  durationMs: number;
  locked: boolean;
  lockedUntil: number | null;
  now: number | null;
  isLockedNow: () => boolean;
  /** `timedOut` when the timer started it rather than the learner. */
  onStartTest: (timedOut: boolean) => void;
  onQuit: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState<ReadonlySet<string>>(() => new Set());
  const [showBack, setShowBack] = useState(false);
  const [timeUp, setTimeUp] = useState(false);

  const word = deck[index];
  const canTest = !locked;
  const remaining = now === null ? durationMs : startedAt + durationMs - now;

  function flip() {
    setShowBack((b) => !b);
    setFlipped((s) => (s.has(word.id) ? s : new Set(s).add(word.id)));
  }

  function go(delta: number) {
    setIndex((i) => Math.min(deck.length - 1, Math.max(0, i + delta)));
    setShowBack(false);
  }

  // When time runs out the test starts by itself — unless tests are locked,
  // in which case practice simply carries on.
  const onTimeUp = useEffectEvent(() => {
    setTimeUp(true);
    if (!isLockedNow()) onStartTest(true);
  });
  useEffect(() => {
    const t = setTimeout(onTimeUp, Math.max(0, startedAt + durationMs - Date.now()));
    return () => clearTimeout(t);
  }, [startedAt, durationMs]);

  const onKey = useEffectEvent((e: KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    // Space and Enter belong to whatever button has focus, except the card.
    if (e.target instanceof HTMLElement && e.target.closest("input, textarea, select, a, button:not([data-card])")) return;
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      flip();
    } else if (e.key === "ArrowRight") go(1);
    else if (e.key === "ArrowLeft") go(-1);
  });
  useEffect(() => {
    const handler = (e: KeyboardEvent) => onKey(e);
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div className="flex items-center justify-between gap-3">
        <Button variant="ghost" className="cursor-pointer" onClick={onQuit}>
          <ArrowLeft aria-hidden /> End session
        </Button>
        <span
          className={cn(
            "font-numeric inline-flex items-center gap-1.5 rounded-lg px-3 py-1 text-sm",
            remaining <= 30_000 ? "bg-warning/15 text-warning" : "bg-muted",
          )}
          aria-label="Practice time left"
        >
          <Clock aria-hidden className="size-4" />
          {timeUp ? "Time's up" : formatCountdown(remaining)}
        </span>
      </div>

      <div className="text-muted-foreground flex items-center justify-between text-sm">
        <span>
          Card <span className="font-numeric">{index + 1}</span> of{" "}
          <span className="font-numeric">{deck.length}</span>
        </span>
        <span>
          Flipped <span className="font-numeric">{flipped.size}</span>/
          <span className="font-numeric">{deck.length}</span>
        </span>
      </div>

      <button
        type="button"
        data-card
        onClick={flip}
        aria-label={showBack ? "Hide answer" : "Show answer"}
        className="bg-card hover:border-primary/40 focus-visible:ring-ring flex min-h-72 w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border p-8 text-center transition-colors focus-visible:ring-2 focus-visible:outline-none"
      >
        <span className="font-hanzi text-6xl leading-tight sm:text-7xl">{word.hanzi}</span>
        {showBack ? (
          <span className="space-y-2">
            <span className="text-primary block text-xl">{word.pinyin}</span>
            <span className="block text-lg">{word.gloss}</span>
            {word.indonesian ? (
              <span className="text-muted-foreground block text-sm">{word.indonesian}</span>
            ) : null}
            {word.pos.length ? (
              <span className="text-muted-foreground block text-xs">{word.pos.join(" · ")}</span>
            ) : null}
            <ExampleSentence word={word} className="border-t pt-3" />
          </span>
        ) : (
          <span className="text-muted-foreground text-sm">Tap or press Space to flip</span>
        )}
      </button>

      <div className="flex items-center justify-between gap-3">
        <Button
          variant="outline"
          size="lg"
          className="cursor-pointer"
          onClick={() => go(-1)}
          disabled={index === 0}
          aria-label="Previous card"
        >
          <ArrowLeft aria-hidden />
        </Button>
        <div className="flex flex-wrap justify-center gap-1" aria-hidden>
          {deck.map((w, i) => (
            <span
              key={w.id}
              className={cn(
                "size-1.5 rounded-full",
                i === index ? "bg-primary" : flipped.has(w.id) ? "bg-primary/40" : "bg-muted-foreground/20",
              )}
            />
          ))}
        </div>
        <Button
          variant="outline"
          size="lg"
          className="cursor-pointer"
          onClick={() => go(1)}
          disabled={index === deck.length - 1}
          aria-label="Next card"
        >
          <ArrowRight aria-hidden />
        </Button>
      </div>

      <div className="space-y-2 text-center">
        <Button
          variant="cta"
          size="lg"
          className="h-11 w-full cursor-pointer sm:w-auto sm:px-8"
          disabled={!canTest}
          onClick={() => onStartTest(false)}
        >
          Start test
        </Button>
        <p className="text-muted-foreground text-xs">
          {locked && lockedUntil !== null && now !== null ? (
            <>
              Tests unlock in{" "}
              <span className="font-numeric">{formatCountdown(lockedUntil - now)}</span>.
            </>
          ) : (
            "Start whenever you are ready. Starting early shortens next time's timer; running out lengthens it."
          )}
        </p>
      </div>
    </div>
  );
}

/* ──────────────────────────────── Test ─────────────────────────────── */

/** How long a right answer stays on screen before the next question. */
const AUTO_NEXT_MS = 600;

/** A monotonic clock for timing answers; only ever read in events and effects. */
function clockMs(): number {
  return performance.now();
}

/**
 * How long an answer took. Capped: a question left open while the tab sat in
 * the background is still a real answer.
 */
function answerMs(shownAt: number | null): number {
  return Math.min(MAX_ANSWER_MS, shownAt === null ? 60_000 : Math.round(clockMs() - shownAt));
}

const PROMPT: Record<Question["kind"], string> = {
  meaning: "What does it mean?",
  hanzi: "Which word means this?",
  sentence: "Which word fits?",
  pinyin: "Type the pinyin",
};

function Test({
  questions,
  onDone,
  onLocked,
}: {
  questions: Question[];
  onDone: (result: TestResult, answers: Answer[]) => void;
  onLocked: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [typed, setTyped] = useState("");
  const [pending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);
  // When the current question appeared, to time the answer. Set by events,
  // never during render.
  const shownAt = useRef<number | null>(null);

  const q = questions[index];
  const word = getWord(q.wordId)!;
  const answer = answers[index] ?? null;
  const right = answer !== null && isRightAnswer(answer);
  const last = index === questions.length - 1;

  function record(given: { chosenId: string } | { typed: string }) {
    if (answer !== null) return;
    const ms = answerMs(shownAt.current);
    setAnswers((a) => [...a, { wordId: q.wordId, ...given, ms }]);
  }

  function submitTyped(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (answer !== null) {
      next();
      return;
    }
    const text = typed.trim();
    if (!text) return;
    record({ typed: text });
    // Wrong: close the phone keyboard so the right pinyin and Next show.
    if (!pinyinMatches(text, word.pinyin)) inputRef.current?.blur();
  }

  function next() {
    if (answer === null || pending) return;
    if (!last) {
      setIndex((i) => i + 1);
      setTyped("");
      shownAt.current = clockMs();
      return;
    }
    startTransition(async () => {
      try {
        const res = await submitTest(answers);
        if (res.ok) onDone(res.data, answers);
        else {
          toast.error(res.error);
          if (res.code === "LOCKED") onLocked();
        }
      } catch {
        // Stay on the last question with every answer kept, so Finish retries.
        toast.error("Couldn't reach the server. Your answers are kept; press Finish again.");
      }
    });
  }

  // A right answer moves on by itself; a wrong one waits for Next, so the
  // correct answer can be read first.
  const autoNext = useEffectEvent(() => next());
  useEffect(() => {
    if (!right) return;
    const t = setTimeout(autoNext, AUTO_NEXT_MS);
    return () => clearTimeout(t);
  }, [right, index]);

  // The first question's clock starts when the test mounts.
  useEffect(() => {
    shownAt.current = clockMs();
  }, []);

  // A pinyin question is ready to type into as soon as it appears.
  useEffect(() => {
    if (q.kind === "pinyin") inputRef.current?.focus();
  }, [index, q.kind]);

  const onKey = useEffectEvent((e: KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey || e.altKey || e.repeat) return;
    // Typing pinyin: the form handles Enter, and digits are tone numbers.
    if (e.target instanceof HTMLElement && e.target.closest("input, textarea")) return;
    const n = Number(e.key);
    if (q.kind !== "pinyin" && n >= 1 && n <= q.options.length) record({ chosenId: q.options[n - 1] });
    else if (e.key === "Enter") next();
  });
  useEffect(() => {
    const handler = (e: KeyboardEvent) => onKey(e);
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  function optionLabel(id: string) {
    const w = getWord(id)!;
    if (q.kind === "meaning") return <span>{w.gloss}</span>;
    return <span className="font-hanzi text-2xl">{w.hanzi}</span>;
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div className="text-muted-foreground flex items-center justify-between text-sm">
        <span>
          Question <span className="font-numeric">{index + 1}</span> of{" "}
          <span className="font-numeric">{questions.length}</span>
        </span>
        <span>{PROMPT[q.kind]}</span>
      </div>
      <div className="bg-muted h-1 overflow-hidden rounded-full">
        <div
          className="bg-primary h-full transition-[width]"
          style={{ width: `${(index / questions.length) * 100}%` }}
        />
      </div>

      <div className="bg-card flex min-h-44 items-center justify-center rounded-2xl border p-6 text-center sm:p-8">
        {q.kind === "hanzi" ? (
          <span className="text-2xl">{word.gloss}</span>
        ) : q.kind === "sentence" ? (
          <span className="font-hanzi text-2xl leading-relaxed">
            {answer === null ? blankedSentence(word) : word.example?.zh}
          </span>
        ) : (
          <span className="font-hanzi text-6xl leading-tight">{word.hanzi}</span>
        )}
      </div>

      {q.kind === "pinyin" ? (
        <form onSubmit={submitTyped} className="space-y-2">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              readOnly={answer !== null}
              aria-label="Pinyin"
              placeholder="e.g. biaoxian"
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              enterKeyHint="go"
              className={cn(
                "h-12 text-lg",
                answer !== null &&
                  (right ? "border-success bg-success/10" : "border-destructive bg-destructive/10"),
              )}
            />
            {answer === null ? (
              <Button type="submit" size="lg" className="h-12 cursor-pointer px-5" disabled={!typed.trim()}>
                Check
              </Button>
            ) : null}
          </div>
          <p className="text-muted-foreground text-xs">Tones don&apos;t count. Type ü as v.</p>
        </form>
      ) : (
        <div className="grid gap-2 sm:grid-cols-2">
          {q.options.map((id, i) => {
            const isAnswer = id === q.wordId;
            const isPicked = answer !== null && id === answer.chosenId;
            return (
              <button
                key={id}
                type="button"
                onClick={() => record({ chosenId: id })}
                disabled={answer !== null}
                className={cn(
                  "focus-visible:ring-ring flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors focus-visible:ring-2 focus-visible:outline-none disabled:cursor-default",
                  answer === null && "hover:border-primary/50 hover:bg-muted/50",
                  answer !== null && isAnswer && "border-success bg-success/10",
                  isPicked && !isAnswer && "border-destructive bg-destructive/10",
                  answer !== null && !isAnswer && !isPicked && "opacity-50",
                )}
              >
                <span className="text-muted-foreground font-numeric bg-muted flex size-6 shrink-0 items-center justify-center rounded-md text-xs">
                  {i + 1}
                </span>
                <span className="min-w-0 flex-1">{optionLabel(id)}</span>
                {answer !== null && isAnswer ? (
                  <Check aria-label="Correct answer" className="text-success size-5" />
                ) : null}
                {isPicked && !isAnswer ? <X aria-label="Your answer" className="text-destructive size-5" /> : null}
              </button>
            );
          })}
        </div>
      )}

      {answer !== null ? (
        <>
          <div className="space-y-1 text-sm">
            <p>
              <span className="font-hanzi text-base">{word.hanzi}</span>{" "}
              <span className="text-primary">{word.pinyin}</span>{" "}
              <span className="text-muted-foreground">· {word.gloss}</span>
            </p>
            {q.kind === "sentence" && word.example ? (
              <p className="text-muted-foreground">{word.example.en}</p>
            ) : null}
          </div>
          <StickyActions className="sm:flex sm:justify-end">
            <Button
              size="lg"
              className="h-11 w-full cursor-pointer sm:w-auto sm:px-8"
              onClick={next}
              disabled={pending}
            >
              {pending ? <Loader2 aria-hidden className="animate-spin" /> : null}
              {last ? "Finish test" : "Next"}
            </Button>
          </StickyActions>
        </>
      ) : q.kind !== "pinyin" ? (
        <p className="text-muted-foreground text-center text-xs">Press 1–4 to answer, Enter for next.</p>
      ) : null}
    </div>
  );
}

/* ────────────────────────────── Results ────────────────────────────── */

function Results({
  result,
  answers,
  lockedUntil,
  now,
  onAgain,
}: {
  result: TestResult;
  answers: Answer[];
  lockedUntil: number | null;
  now: number | null;
  onAgain: () => void;
}) {
  const wrong = answers.filter((a) => !isRightAnswer(a));
  const pct = Math.round((result.correct / result.total) * 100);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <section
        className={cn(
          "rounded-2xl border p-6 text-center",
          result.passed ? "border-success/40 bg-success/5" : "border-destructive/40 bg-destructive/5",
        )}
      >
        <p className={cn("text-sm font-medium", result.passed ? "text-success" : "text-destructive")}>
          Test <span className="font-numeric">#{result.testNumber}</span> ·{" "}
          {result.passed ? "Passed" : "Not passed"}
        </p>
        <p className="font-numeric mt-1 text-5xl font-semibold">
          {result.correct}/{result.total}
        </p>
        <p className="text-muted-foreground mt-1 text-sm">
          <span className="font-numeric">{pct}%</span> correct
        </p>

        {!result.passed && lockedUntil !== null && now !== null && lockedUntil > now ? (
          <p className="mt-4 text-sm">
            Tests are locked for{" "}
            <span className="font-numeric font-medium">{formatCountdown(lockedUntil - now)}</span>.
            Practice is still open.
          </p>
        ) : null}

        {result.guesses > 0 ? (
          <p className="text-warning mt-3 text-sm">
            {result.guesses} wrong answer{result.guesses === 1 ? " was" : "s were"} given in under{" "}
            {GUESS_MS / 1000}s. Slow down and read every option.
          </p>
        ) : null}
      </section>

      {wrong.length > 0 ? (
        <section className="space-y-3">
          <h2 className="text-sm font-medium">
            To review <span className="text-muted-foreground font-numeric">({wrong.length})</span>
          </h2>
          <ul className="bg-card divide-y rounded-xl border">
            {wrong.map((a) => {
              const w = getWord(a.wordId)!;
              const chosen = a.chosenId === undefined ? undefined : getWord(a.chosenId);
              return (
                <li key={a.wordId} className="flex items-center gap-4 px-4 py-3">
                  <span className="font-hanzi w-20 shrink-0 text-2xl">{w.hanzi}</span>
                  <span className="min-w-0 flex-1 text-sm">
                    <span className="text-primary block">{w.pinyin}</span>
                    <span className="block">{w.gloss}</span>
                    {w.indonesian ? (
                      <span className="text-muted-foreground block text-xs">{w.indonesian}</span>
                    ) : null}
                    <ExampleSentence word={w} className="my-1" />
                    <span className="text-muted-foreground block text-xs">
                      {chosen ? `You picked ${chosen.hanzi} (${chosen.gloss})` : `You typed "${a.typed}"`}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
          <p className="text-muted-foreground text-xs">These come back in your very next test.</p>
        </section>
      ) : null}

      <ComesBack result={result} answers={answers} />

      <div className="flex justify-center">
        <Button size="lg" variant="outline" className="cursor-pointer" onClick={onAgain}>
          <RotateCcw aria-hidden /> New session
        </Button>
      </div>
    </div>
  );
}

/** Every word in the test: its strength before → after, and the test it returns in. */
function ComesBack({ result, answers }: { result: TestResult; answers: Answer[] }) {
  const right = new Set(answers.filter(isRightAnswer).map((a) => a.wordId));
  const rows = [...result.schedule].sort((a, b) => a.dueTest - b.dueTest || a.strength - b.strength);
  return (
    <section className="space-y-3">
      <h2 className="text-sm font-medium">When each word comes back</h2>
      <ul className="bg-card divide-y rounded-xl border text-sm">
        {rows.map((r) => {
          const w = getWord(r.wordId)!;
          const ok = right.has(r.wordId);
          const inTests = r.dueTest - result.testNumber;
          return (
            <li key={r.wordId} className="flex items-center gap-3 px-4 py-2.5">
              {ok ? (
                <Check aria-label="Right" className="text-success size-4 shrink-0" />
              ) : (
                <X aria-label="Wrong" className="text-destructive size-4 shrink-0" />
              )}
              <span className="font-hanzi w-16 shrink-0 text-lg">{w.hanzi}</span>
              <span className="text-muted-foreground font-numeric min-w-0 flex-1 text-xs">
                {r.before === null ? "new" : r.before} → {r.strength}
                {statusOf(r.strength) === "known" ? " · known" : ""}
              </span>
              <span className="font-numeric shrink-0 text-right text-xs">
                test #{r.dueTest}
                <span className="text-muted-foreground">
                  {" "}
                  · {inTests === 1 ? "next test" : `in ${inTests} tests`}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
