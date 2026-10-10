"use client";

import { BookOpen, ChevronDown, Clock, Loader2, PenLine, Shuffle } from "lucide-react";
import { useEffect, useEffectEvent, useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { RetellStory } from "@/content/types";
import { formatCountdown, useNow } from "@/hooks/use-now";
import { formatDate } from "@/lib/dates";
import { EXAM_TIME_ZONE } from "@/lib/exam";
import { cn } from "@/lib/utils";

import { countChars } from "../lib/checks";
import { READ_MS, RETELL_TARGET, WRITE_MS, retellLength } from "../lib/retell";
import { type EssayResult, checkRetelling } from "../server/actions";
import type { EssayRow } from "../server/queries";
import { FeedbackView } from "./feedback-view";

type Phase =
  | { name: "ready" }
  | { name: "read"; startedAt: number }
  | { name: "write"; startedAt: number };

const LENGTH_COPY = {
  short: { text: "too short", tone: "text-warning" },
  good: { text: "good length", tone: "text-success" },
  long: { text: "long: trim it", tone: "text-warning" },
} as const;

/**
 * HSK 6 question 101 (缩写), as on the exam: read the story for up to 10
 * minutes, then it is hidden and you retell it with a title in about 400
 * characters, in 35 minutes. AI feedback checks which story points you kept.
 */
export function RetellStudio({
  stories,
  seed,
  ai,
  recent,
}: {
  stories: RetellStory[];
  seed: number;
  ai: { enabled: boolean; models: string[] };
  recent: EssayRow[];
}) {
  // Seeded, so the server render and the first client render agree.
  const [storyIndex, setStoryIndex] = useState(() => seed % stories.length);
  const [phase, setPhase] = useState<Phase>({ name: "ready" });
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [result, setResult] = useState<EssayResult | null>(null);
  const [finishedAt, setFinishedAt] = useState<number | null>(null);
  const [showStory, setShowStory] = useState(false);
  const [pending, startTransition] = useTransition();
  const now = useNow();

  const story = stories[storyIndex];
  const chars = countChars(body);
  const length = retellLength(chars);
  const canCheck = ai.enabled && chars >= 50 && !pending && result === null;

  const timeLeft =
    phase.name === "ready" || now === null
      ? null
      : phase.startedAt + (phase.name === "read" ? READ_MS : WRITE_MS) - (finishedAt ?? now);

  function startWriting() {
    setPhase({ name: "write", startedAt: Date.now() });
  }

  // As on the exam, the story is taken away when reading time is up.
  const onReadTimeUp = useEffectEvent(() => {
    toast.info("Reading time is up. Now retell it from memory.");
    startWriting();
  });
  useEffect(() => {
    if (phase.name !== "read") return;
    const t = setTimeout(onReadTimeUp, Math.max(0, phase.startedAt + READ_MS - Date.now()));
    return () => clearTimeout(t);
  }, [phase]);

  function nextStory() {
    if (pending) return;
    if (body.trim() && !result && !window.confirm("Start another story? Your retelling will be cleared.")) return;
    setStoryIndex((i) => (i + 1) % stories.length);
    setPhase({ name: "ready" });
    setTitle("");
    setBody("");
    setResult(null);
    setFinishedAt(null);
    setShowStory(false);
  }

  function submit() {
    if (phase.name !== "write") return;
    const durationMs = Date.now() - phase.startedAt;
    startTransition(async () => {
      // A timeout or a dropped connection throws rather than returning an
      // error; catching it keeps the page, and the retelling, on screen.
      try {
        const res = await checkRetelling({ storyId: story.id, title, body, durationMs });
        if (res.ok) {
          setResult(res.data);
          setFinishedAt(Date.now());
        } else {
          toast.error(res.error, { duration: 10_000 });
        }
      } catch {
        toast.error("Couldn't reach the server. Your retelling is still here; try again.", {
          duration: 10_000,
        });
      }
    });
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="min-w-0 space-y-5">
        <section className="bg-card min-w-0 space-y-4 rounded-2xl border p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-medium">
              {phase.name === "write" ? "Retell it" : "Read the story"}
              <span className="text-muted-foreground font-numeric ml-2 text-sm font-normal">
                {storyIndex + 1}/{stories.length}
              </span>
            </h2>
            <div className="flex items-center gap-2">
              {timeLeft !== null ? (
                <span
                  className={cn(
                    "font-numeric inline-flex items-center gap-1.5 rounded-lg px-3 py-1 text-sm",
                    timeLeft <= 60_000 ? "bg-warning/15 text-warning" : "bg-muted",
                  )}
                  aria-label={phase.name === "read" ? "Reading time left" : "Writing time left"}
                >
                  <Clock aria-hidden className="size-4" />
                  {timeLeft > 0 ? formatCountdown(timeLeft) : "Time's up"}
                </span>
              ) : null}
              <Button
                variant="ghost"
                size="icon"
                className="cursor-pointer"
                aria-label="Another story"
                onClick={nextStory}
                disabled={pending}
              >
                <Shuffle aria-hidden />
              </Button>
            </div>
          </div>

          {phase.name === "ready" ? (
            <div className="space-y-3">
              <p className="text-muted-foreground text-sm">
                You get up to 10 minutes to read. Then the story is hidden and you have 35 minutes to
                retell it in about {RETELL_TARGET} characters, with a title. No notes, as on the exam.
              </p>
              <Button
                size="lg"
                variant="cta"
                className="cursor-pointer"
                onClick={() => setPhase({ name: "read", startedAt: Date.now() })}
              >
                <BookOpen aria-hidden /> Start reading
              </Button>
            </div>
          ) : phase.name === "read" ? (
            <div className="space-y-4">
              <StoryText story={story} />
              <Button size="lg" className="cursor-pointer" onClick={startWriting}>
                <PenLine aria-hidden /> I&apos;m ready: hide it and write
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                readOnly={result !== null || pending}
                maxLength={40}
                placeholder="Title (题目)"
                aria-label="Title"
                className="font-hanzi h-11 text-lg"
              />
              <Textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                readOnly={result !== null || pending}
                placeholder="Retell the story in your own words…"
                aria-label="Your retelling"
                className="font-hanzi min-h-72 text-lg leading-relaxed"
              />
              <p className="text-muted-foreground text-sm">
                <span className="font-numeric text-foreground">{chars}</span> / about {RETELL_TARGET}{" "}
                characters ·{" "}
                <span className={LENGTH_COPY[length].tone}>{LENGTH_COPY[length].text}</span>
              </p>
              <div className="flex flex-wrap items-center gap-3">
                {result ? (
                  <Button size="lg" variant="outline" className="cursor-pointer" onClick={nextStory}>
                    Next story
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
                  <span className="text-muted-foreground text-xs">
                    AI feedback is off: AI_API_KEY is not set.
                  </span>
                ) : null}
              </div>
            </div>
          )}
        </section>

        {result ? (
          <section className="bg-card space-y-3 rounded-2xl border p-5">
            <Button variant="outline" className="cursor-pointer" onClick={() => setShowStory((s) => !s)}>
              {showStory ? "Hide the original story" : "Show the original story"}
            </Button>
            {showStory ? <StoryText story={story} /> : null}
          </section>
        ) : null}
      </div>

      <div className="min-w-0 space-y-5">
        <section className="bg-card rounded-2xl border p-5" aria-live="polite">
          {result ? (
            <FeedbackView feedback={result.feedback} model={result.model} attempts={result.attempts} />
          ) : (
            <p className="text-muted-foreground text-sm">
              Feedback appears here: a score, which story points you kept or lost, each mistake with a
              correction and why, your retelling corrected, and a model retelling to compare with.
            </p>
          )}
        </section>

        <History essays={recent} stories={stories} />
      </div>
    </div>
  );
}

function StoryText({ story }: { story: RetellStory }) {
  return (
    <div className="font-hanzi bg-muted/40 space-y-3 rounded-xl p-4 text-lg leading-relaxed">
      {story.text.split("\n").map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}

function History({ essays, stories }: { essays: EssayRow[]; stories: RetellStory[] }) {
  const [open, setOpen] = useState<string | null>(null);
  if (essays.length === 0) return null;
  return (
    <section className="bg-card overflow-hidden rounded-2xl border">
      <h2 className="border-b px-5 py-3 text-sm font-medium">Past retellings</h2>
      <ul className="divide-y">
        {essays.map((e) => {
          const expanded = open === e.id;
          const story = stories.find((s) => s.id === e.prompt);
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
                  <span className="font-hanzi block truncate">{story?.title ?? e.prompt}</span>
                  <span className="text-muted-foreground block text-xs">
                    <span className="font-numeric">{e.chars}</span> chars ·{" "}
                    {formatDate(new Date(e.createdAt), EXAM_TIME_ZONE, { month: "short", day: "numeric" })} ·{" "}
                    {e.model}
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
