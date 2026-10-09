"use client";

import { ChevronDown, Clock, Loader2, Shuffle } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { scenes } from "@/content/essay-scenes";
import { getWord, words as allWords } from "@/content/words";
import { formatCountdown, useNow } from "@/hooks/use-now";
import { type Rng, seededRng, shuffle } from "@/lib/random";
import { cn } from "@/lib/utils";

import { ESSAY_MS, TARGET_CHARS, countChars, lengthState, wordsUsed } from "../lib/checks";
import type { EssayKind } from "../lib/feedback";
import { type EssayResult, checkEssay } from "../server/actions";
import type { EssayRow } from "../server/queries";
import { FeedbackView } from "./feedback-view";

type WordSource = "mine" | "all" | "custom";

const SOURCE_LABEL: Record<WordSource, string> = {
  mine: "My words",
  all: "Any HSK 5 word",
  custom: "Enter my own",
};

const LENGTH_COPY = {
  short: { text: "too short", tone: "text-warning" },
  good: { text: "good length", tone: "text-success" },
  long: { text: "long: trim it", tone: "text-warning" },
} as const;

function pickFive(pool: readonly string[], rng: Rng): string[] {
  return shuffle(pool, rng).slice(0, 5);
}

export function EssayStudio({
  startedWordIds,
  seed,
  ai,
  recent,
}: {
  /** Words the learner has met in flashcards: the "My words" pool. */
  startedWordIds: string[];
  seed: number;
  ai: { enabled: boolean; models: string[] };
  recent: EssayRow[];
}) {
  const allIds = allWords.map((w) => w.id);
  const minePool = startedWordIds.length >= 5 ? startedWordIds : allIds;

  const [kind, setKind] = useState<EssayKind>("q99");
  const [source, setSource] = useState<WordSource>("mine");
  // Seeded, so the server render and the first client render agree.
  const [given, setGiven] = useState(() => pickFive(minePool, seededRng(seed)));
  const [custom, setCustom] = useState<string[]>(["", "", "", "", ""]);
  const [sceneIndex, setSceneIndex] = useState(() => seed % scenes.length);
  const [ownScene, setOwnScene] = useState("");
  const [useOwnScene, setUseOwnScene] = useState(false);

  const [body, setBody] = useState("");
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [result, setResult] = useState<EssayResult | null>(null);
  const [pending, startTransition] = useTransition();
  const now = useNow();

  const fiveWords = source === "custom" ? custom.map((w) => w.trim()) : given;
  const scene = useOwnScene ? ownScene.trim() : scenes[sceneIndex].zh;
  const chars = countChars(body);
  const length = lengthState(chars);
  const used = wordsUsed(body, fiveWords);
  const elapsed = startedAt !== null && now !== null ? now - startedAt : 0;

  const promptReady = kind === "q99" ? fiveWords.every(Boolean) : scene.length >= 4;
  const canCheck = ai.enabled && promptReady && chars >= 10 && !pending;

  /** A new task starts a fresh essay. Asks first if there is writing to lose. */
  function resetFor(change: () => void) {
    if (body.trim() && !result && !window.confirm("Start a new task? Your current writing will be cleared.")) {
      return;
    }
    change();
    setBody("");
    setStartedAt(null);
    setResult(null);
  }

  function newWords(from: WordSource = source) {
    resetFor(() => {
      setSource(from);
      if (from !== "custom") setGiven(pickFive(from === "mine" ? minePool : allIds, Math.random));
    });
  }

  function submit() {
    const durationMs = startedAt === null ? 0 : Date.now() - startedAt;
    const payload =
      kind === "q99"
        ? { kind, words: fiveWords, body, durationMs }
        : { kind, scene, body, durationMs };
    startTransition(async () => {
      const res = await checkEssay(payload);
      if (res.ok) setResult(res.data);
      else toast.error(res.error, { duration: 10_000 });
    });
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="min-w-0 space-y-5">
        {/* Task */}
        <section className="bg-card space-y-4 rounded-2xl border p-5">
          <div role="group" aria-label="Question" className="bg-muted inline-flex rounded-lg p-1">
            {(["q99", "q100"] as const).map((k) => (
              <button
                key={k}
                type="button"
                aria-pressed={kind === k}
                onClick={() => kind !== k && resetFor(() => setKind(k))}
                className={cn(
                  "cursor-pointer rounded-md px-4 py-1.5 text-sm font-medium transition-colors",
                  kind === k ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {k === "q99" ? "Q99 · five words" : "Q100 · picture"}
              </button>
            ))}
          </div>

          {kind === "q99" ? (
            <div className="space-y-3">
              <p className="text-muted-foreground text-sm">
                Write about {TARGET_CHARS} characters using all five words.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {(Object.keys(SOURCE_LABEL) as WordSource[]).map((s) => (
                  <Button
                    key={s}
                    size="sm"
                    variant={source === s ? "secondary" : "ghost"}
                    aria-pressed={source === s}
                    className="cursor-pointer"
                    onClick={() => source !== s && newWords(s)}
                  >
                    {SOURCE_LABEL[s]}
                  </Button>
                ))}
              </div>

              {source === "custom" ? (
                <div className="grid grid-cols-5 gap-2">
                  {custom.map((w, i) => (
                    <Input
                      key={i}
                      value={w}
                      maxLength={8}
                      aria-label={`Word ${i + 1}`}
                      onChange={(e) => setCustom((c) => c.map((x, j) => (j === i ? e.target.value : x)))}
                      className="font-hanzi h-11 text-center text-lg"
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap items-center gap-2">
                  {given.map((id) => {
                    const w = getWord(id);
                    return (
                      <span
                        key={id}
                        title={w ? `${w.pinyin} · ${w.gloss}` : undefined}
                        className={cn(
                          "rounded-lg border px-3 py-1.5 transition-colors",
                          used[id] && "border-success bg-success/10",
                        )}
                      >
                        <span className="font-hanzi block text-xl leading-tight">{id}</span>
                        <span className="text-muted-foreground block text-xs">{w?.pinyin}</span>
                      </span>
                    );
                  })}
                  <Button
                    variant="ghost"
                    size="icon-lg"
                    className="cursor-pointer"
                    aria-label="New set of words"
                    onClick={() => newWords()}
                  >
                    <Shuffle aria-hidden />
                  </Button>
                </div>
              )}
              {source === "mine" && startedWordIds.length < 5 ? (
                <p className="text-muted-foreground text-xs">
                  Using all HSK 5 words until you have met at least five in flashcards.
                </p>
              ) : null}
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-muted-foreground text-sm">
                Write about {TARGET_CHARS} characters about the picture. The exam shows a photo; here
                the scene is described, or describe the picture from your mock paper.
              </p>
              {useOwnScene ? (
                <Textarea
                  value={ownScene}
                  onChange={(e) => setOwnScene(e.target.value)}
                  maxLength={300}
                  placeholder="What does the picture show? e.g. 一个人在机场看手表"
                  aria-label="Describe your picture"
                  className="font-hanzi"
                />
              ) : (
                <div className="bg-muted/40 flex items-start gap-3 rounded-xl p-4">
                  <div className="min-w-0 flex-1">
                    <p className="font-hanzi text-lg">{scenes[sceneIndex].zh}</p>
                    <p className="text-muted-foreground text-sm">{scenes[sceneIndex].en}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon-lg"
                    className="cursor-pointer"
                    aria-label="Another scene"
                    onClick={() => resetFor(() => setSceneIndex((i) => (i + 1 + Math.floor(Math.random() * (scenes.length - 1))) % scenes.length))}
                  >
                    <Shuffle aria-hidden />
                  </Button>
                </div>
              )}
              <Button
                variant="link"
                size="sm"
                className="cursor-pointer px-0"
                onClick={() => resetFor(() => setUseOwnScene((v) => !v))}
              >
                {useOwnScene ? "Use a ready-made scene instead" : "Describe my own picture instead"}
              </Button>
            </div>
          )}
        </section>

        {/* Writing */}
        <section className="bg-card space-y-3 rounded-2xl border p-5">
          <div className="flex items-center justify-between gap-3 text-sm">
            <span
              className={cn(
                "font-numeric inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1",
                startedAt !== null && elapsed > ESSAY_MS ? "bg-warning/15 text-warning" : "bg-muted",
              )}
              aria-label="Writing time"
            >
              <Clock aria-hidden className="size-4" />
              {startedAt === null
                ? formatCountdown(ESSAY_MS)
                : elapsed > ESSAY_MS
                  ? `+${formatCountdown(elapsed - ESSAY_MS)} over`
                  : formatCountdown(ESSAY_MS - elapsed)}
            </span>
            <span className="text-muted-foreground">
              <span className="text-foreground font-numeric">{chars}</span> 字 · target ~{TARGET_CHARS}
              {chars > 0 ? <span className={cn("ml-1.5", LENGTH_COPY[length].tone)}>{LENGTH_COPY[length].text}</span> : null}
            </span>
          </div>

          <Textarea
            value={body}
            onChange={(e) => {
              if (startedAt === null && e.target.value) setStartedAt(Date.now());
              setBody(e.target.value);
            }}
            readOnly={result !== null}
            maxLength={600}
            placeholder={startedAt === null ? "The 15-minute timer starts when you start typing…" : ""}
            aria-label="Your essay"
            className="font-hanzi min-h-48 text-lg leading-relaxed"
          />

          {kind === "q99" && fiveWords.some(Boolean) ? (
            <p className="text-muted-foreground flex flex-wrap gap-x-3 gap-y-1 text-xs">
              {fiveWords.filter(Boolean).map((w) => (
                <span key={w} className={cn(used[w] ? "text-success" : "")}>
                  {used[w] ? "✓" : "○"} <span className="font-hanzi">{w}</span>
                </span>
              ))}
            </p>
          ) : null}

          <div className="flex flex-wrap items-center gap-3">
            {result ? (
              <Button size="lg" variant="outline" className="cursor-pointer" onClick={() => (kind === "q99" ? newWords() : resetFor(() => setSceneIndex((i) => (i + 1) % scenes.length)))}>
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
                Trying {ai.models.join(" → ")}. This can take up to a minute.
              </span>
            ) : !ai.enabled ? (
              <span className="text-muted-foreground text-xs">
                AI feedback is off: AI_API_KEY is not set. The checks above still work.
              </span>
            ) : null}
          </div>
        </section>
      </div>

      {/* Feedback and history */}
      <div className="min-w-0 space-y-5">
        <section className="bg-card rounded-2xl border p-5" aria-live="polite">
          {result ? (
            <FeedbackView feedback={result.feedback} model={result.model} attempts={result.attempts} />
          ) : (
            <p className="text-muted-foreground text-sm">
              Feedback appears here: a score, each mistake with a correction and why, your essay
              corrected, and a model answer to compare with. It also shows which model checked it.
            </p>
          )}
        </section>

        <History essays={recent} />
      </div>
    </div>
  );
}

function History({ essays }: { essays: EssayRow[] }) {
  const [open, setOpen] = useState<string | null>(null);
  if (essays.length === 0) return null;
  return (
    <section className="bg-card overflow-hidden rounded-2xl border">
      <h2 className="border-b px-5 py-3 text-sm font-medium">Past essays</h2>
      <ul className="divide-y">
        {essays.map((e) => {
          const expanded = open === e.id;
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
                  <span className="font-hanzi block truncate">{e.prompt}</span>
                  <span className="text-muted-foreground block text-xs">
                    {e.kind.toUpperCase()} ·{" "}
                    {new Date(e.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })} ·{" "}
                    {e.model}
                  </span>
                </span>
                <ChevronDown aria-hidden className={cn("text-muted-foreground size-4 transition-transform", expanded && "rotate-180")} />
              </button>
              {expanded ? (
                <div className="space-y-4 border-t px-5 py-4">
                  <p className="font-hanzi bg-muted/40 rounded-xl p-3 text-lg leading-relaxed">{e.body}</p>
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
