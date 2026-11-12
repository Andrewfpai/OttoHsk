"use client";

import { ChevronDown, Clock, Languages, Loader2, PenLine, Shuffle } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { WritingPrompt } from "@/content/types";
import { formatCountdown, useNow } from "@/hooks/use-now";
import { formatDate } from "@/lib/dates";
import { EXAM_TIME_ZONE } from "@/lib/exam";
import { cn } from "@/lib/utils";

import { countChars } from "../lib/checks";
import { WRITING_MS, writingLength } from "../lib/writing";
import { type EssayResult, checkWriting } from "../server/actions";
import type { EssayRow } from "../server/queries";
import { FeedbackView } from "./feedback-view";

type Kind = WritingPrompt["kind"];

const PARTS: Record<Kind, { label: string; title: string }> = {
  practical: { label: "Part 1", title: "Practical writing" },
  opinion: { label: "Part 2", title: "Opinion essay" },
};

const LENGTH_COPY = {
  short: { text: "under the minimum", tone: "text-warning" },
  good: { text: "good length", tone: "text-success" },
  long: { text: "long: the exam needs less", tone: "text-warning" },
} as const;

/**
 * New HSK 6 writing: Part 1, a practical text of 150+ characters, and
 * Part 2, an opinion essay of 300+. A clock runs once you start (15 and 30
 * minutes, the exam's 45 split by length); it never stops you. AI feedback
 * marks the task's points, mistakes, and gives a model answer.
 */
export function WritingStudio({
  prompts,
  seed,
  ai,
  recent,
}: {
  prompts: WritingPrompt[];
  seed: number;
  ai: { enabled: boolean; models: string[] };
  recent: EssayRow[];
}) {
  const byKind = (k: Kind) => prompts.filter((p) => p.kind === k);
  const [kind, setKind] = useState<Kind>("practical");
  // Seeded, so the server render and the first client render agree.
  const [index, setIndex] = useState<Record<Kind, number>>(() => ({
    practical: seed % byKind("practical").length,
    opinion: (seed * 7) % byKind("opinion").length,
  }));
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [body, setBody] = useState("");
  const [result, setResult] = useState<EssayResult | null>(null);
  const [finishedAt, setFinishedAt] = useState<number | null>(null);
  const [english, setEnglish] = useState(false);
  const [pending, startTransition] = useTransition();
  const now = useNow();

  const list = byKind(kind);
  const prompt = list[index[kind] % list.length];
  const chars = countChars(body);
  const length = writingLength(chars, prompt.minChars);
  const canCheck = ai.enabled && chars >= 30 && !pending && result === null;
  const timeLeft = startedAt === null || now === null ? null : startedAt + WRITING_MS[kind] - (finishedAt ?? now);

  function reset() {
    setStartedAt(null);
    setBody("");
    setResult(null);
    setFinishedAt(null);
    setEnglish(false);
  }

  function leave(): boolean {
    if (pending) return false;
    return !body.trim() || result !== null || window.confirm("Leave this task? What you wrote will be cleared.");
  }

  function switchKind(k: Kind) {
    if (k === kind || !leave()) return;
    setKind(k);
    reset();
  }

  function nextPrompt() {
    if (!leave()) return;
    setIndex((i) => ({ ...i, [kind]: (i[kind] + 1) % list.length }));
    reset();
  }

  function submit() {
    if (startedAt === null) return;
    const durationMs = Date.now() - startedAt;
    startTransition(async () => {
      // A timeout or a dropped connection throws rather than returning an
      // error; catching it keeps the page, and the writing, on screen.
      try {
        const res = await checkWriting({ promptId: prompt.id, body, durationMs });
        if (res.ok) {
          setResult(res.data);
          setFinishedAt(Date.now());
        } else {
          toast.error(res.error, { duration: 10_000 });
        }
      } catch {
        toast.error("Couldn't reach the server. Your writing is still here; try again.", { duration: 10_000 });
      }
    });
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="min-w-0 space-y-5">
        <div role="tablist" aria-label="Part" className="bg-muted flex w-full gap-1 rounded-xl p-1 sm:w-fit">
          {(Object.keys(PARTS) as Kind[]).map((k) => (
            <button
              key={k}
              type="button"
              role="tab"
              aria-selected={kind === k}
              onClick={() => switchKind(k)}
              className={cn(
                "focus-visible:ring-ring flex min-h-11 flex-1 cursor-pointer flex-col items-center justify-center rounded-lg px-4 py-1.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none sm:flex-none",
                kind === k ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span>
                {PARTS[k].label} · {PARTS[k].title}
              </span>
              <span className="text-muted-foreground font-numeric text-xs font-normal">
                {byKind(k)[0]?.minChars}+ characters
              </span>
            </button>
          ))}
        </div>

        <section className="bg-card min-w-0 space-y-4 rounded-2xl border p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-medium">
              The task
              <span className="text-muted-foreground font-numeric ml-2 text-sm font-normal">
                {(index[kind] % list.length) + 1}/{list.length}
              </span>
            </h2>
            <div className="flex items-center gap-2">
              {timeLeft !== null ? (
                <span
                  role="timer"
                  aria-label="Writing time left"
                  className={cn(
                    "font-numeric inline-flex items-center gap-1.5 rounded-lg px-3 py-1 text-sm",
                    timeLeft <= 60_000 ? "bg-warning/15 text-warning" : "bg-muted",
                  )}
                >
                  <Clock aria-hidden className="size-4" />
                  {timeLeft > 0 ? formatCountdown(timeLeft) : "Time's up"}
                </span>
              ) : null}
              <Button
                variant="ghost"
                size="icon"
                className="cursor-pointer"
                aria-label={english ? "Hide the English" : "Show the task in English"}
                aria-pressed={english}
                onClick={() => setEnglish((e) => !e)}
              >
                <Languages aria-hidden />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="cursor-pointer"
                aria-label="Another task"
                onClick={nextPrompt}
                disabled={pending}
              >
                <Shuffle aria-hidden />
              </Button>
            </div>
          </div>

          <p className="font-hanzi bg-muted/40 rounded-xl p-4 text-lg leading-relaxed">{prompt.prompt}</p>
          {english ? <p className="text-muted-foreground text-sm">{prompt.english}</p> : null}

          {startedAt === null ? (
            <div className="space-y-3">
              <p className="text-muted-foreground text-sm">
                At least {prompt.minChars} characters. The clock gives you{" "}
                <span className="font-numeric">{formatCountdown(WRITING_MS[kind])}</span>, your share of
                the exam&apos;s 45 minutes for both parts; it keeps going past zero, it doesn&apos;t stop you.
              </p>
              <Button size="lg" variant="cta" className="cursor-pointer" onClick={() => setStartedAt(Date.now())}>
                <PenLine aria-hidden /> Start writing
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <Textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                readOnly={result !== null || pending}
                placeholder="在这里写…"
                aria-label="Your writing"
                className="font-hanzi min-h-72 text-lg leading-relaxed"
              />
              <p className="text-muted-foreground text-sm">
                <span className="font-numeric text-foreground">{chars}</span> / at least {prompt.minChars}{" "}
                characters · <span className={LENGTH_COPY[length].tone}>{LENGTH_COPY[length].text}</span>
              </p>
              <div className="flex flex-wrap items-center gap-3">
                {result ? (
                  <Button size="lg" variant="outline" className="cursor-pointer" onClick={nextPrompt}>
                    Next task
                  </Button>
                ) : (
                  <Button size="lg" className="cursor-pointer" disabled={!canCheck} onClick={submit}>
                    {pending ? <Loader2 aria-hidden className="animate-spin" /> : null}
                    {pending ? "Checking…" : "Get feedback"}
                  </Button>
                )}
                {pending ? (
                  <span className="text-muted-foreground text-xs">
                    Trying {ai.models.join(" → ")}. Usually under a minute; longer if a model is down.
                  </span>
                ) : !ai.enabled ? (
                  <span className="text-muted-foreground text-xs">AI feedback is off: AI_API_KEY is not set.</span>
                ) : null}
              </div>
            </div>
          )}
        </section>
      </div>

      <div className="min-w-0 space-y-5">
        <section className="bg-card rounded-2xl border p-5" aria-live="polite">
          {result ? (
            <FeedbackView feedback={result.feedback} model={result.model} attempts={result.attempts} />
          ) : (
            <p className="text-muted-foreground text-sm">
              Feedback appears here: a score, which of the task&apos;s points you covered, each mistake with
              a correction and why, your text corrected, and a model answer to compare with.
            </p>
          )}
        </section>

        <History essays={recent} prompts={prompts} />
      </div>
    </div>
  );
}

function History({ essays, prompts }: { essays: EssayRow[]; prompts: WritingPrompt[] }) {
  const [open, setOpen] = useState<string | null>(null);
  if (essays.length === 0) return null;
  return (
    <section className="bg-card overflow-hidden rounded-2xl border">
      <h2 className="border-b px-5 py-3 text-sm font-medium">Past writing</h2>
      <ul className="divide-y">
        {essays.map((e) => {
          const expanded = open === e.id;
          const prompt = prompts.find((p) => p.id === e.prompt);
          return (
            <li key={e.id}>
              <button
                type="button"
                aria-expanded={expanded}
                onClick={() => setOpen(expanded ? null : e.id)}
                className="hover:bg-muted/40 flex w-full cursor-pointer items-center gap-3 px-5 py-3 text-left text-sm"
              >
                <span className="font-numeric w-8 font-semibold">{e.score}</span>
                <span className="min-w-0 flex-1">
                  <span className="font-hanzi block truncate">{prompt?.prompt ?? e.prompt}</span>
                  <span className="text-muted-foreground block text-xs">
                    {e.kind === "practical" ? "Part 1" : e.kind === "opinion" ? "Part 2" : "Retelling"} ·{" "}
                    <span className="font-numeric">{e.chars}</span> chars ·{" "}
                    {formatDate(new Date(e.createdAt), EXAM_TIME_ZONE, { month: "short", day: "numeric" })} · {e.model}
                  </span>
                </span>
                <ChevronDown
                  aria-hidden
                  className={cn("text-muted-foreground size-4 transition-transform", expanded && "rotate-180")}
                />
              </button>
              {expanded ? (
                <div className="space-y-4 border-t px-5 py-4">
                  <p className="font-hanzi bg-muted/40 rounded-xl p-3 text-lg leading-relaxed whitespace-pre-line">
                    {e.body}
                  </p>
                  {e.feedback ? <FeedbackView feedback={e.feedback} model={e.model} /> : null}
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
