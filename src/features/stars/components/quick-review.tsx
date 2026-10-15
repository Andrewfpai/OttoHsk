"use client";

import { Eye, Shuffle, Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { StickyActions } from "@/components/sticky-actions";
import { Button } from "@/components/ui/button";
import { useWordBank } from "@/components/level/level-provider";
import { seededRng, shuffle } from "@/lib/random";
import { cn } from "@/lib/utils";

import { StarButton, useStars } from "./stars";

const SET_SIZE = 10;
/** Thinking time before the answers can be shown. */
const WAIT_S = 10;

type Source = "all" | "started" | "starred";

/**
 * Ten random words, hanzi only. The answers unlock after ten seconds of
 * trying to recall them; anything shaky gets a star, which brings it back
 * in the next flashcard test.
 */
export function QuickReview({ startedIds, seed }: { startedIds: string[]; seed: number }) {
  const bank = useWordBank();
  const { starred } = useStars();
  const [source, setSource] = useState<Source>(startedIds.length >= SET_SIZE ? "started" : "all");
  const [round, setRound] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [left, setLeft] = useState(WAIT_S);

  // The starred pool is read when a round starts, so unstarring a word
  // does not swap the set out from under you.
  const [starredAtStart, setStarredAtStart] = useState<string[]>(() => [...starred]);

  const pools: Record<Source, string[]> = useMemo(
    () => ({
      all: bank.words.map((w) => w.id),
      started: startedIds.filter((id) => bank.getWord(id)),
      starred: starredAtStart.filter((id) => bank.getWord(id)),
    }),
    [bank, startedIds, starredAtStart],
  );

  const words = useMemo(
    () =>
      shuffle(pools[source], seededRng(seed + round * 7919))
        .slice(0, SET_SIZE)
        .map((id) => bank.getWord(id)!),
    [pools, source, seed, round, bank],
  );

  // One tick a second while the answers are locked.
  useEffect(() => {
    if (left <= 0) return;
    const t = setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [left]);

  function newRound(next: Source = source) {
    setSource(next);
    setStarredAtStart([...starred]);
    setRound((r) => r + 1);
    setRevealed(false);
    setLeft(WAIT_S);
  }

  const counts: Record<Source, number> = {
    all: bank.total,
    started: pools.started.length,
    starred: starred.size,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div role="radiogroup" aria-label="Words from" className="bg-muted flex gap-1 rounded-xl p-1">
          {(
            [
              ["all", "All words"],
              ["started", "Started"],
              ["starred", "Starred"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={source === value}
              disabled={counts[value] === 0}
              onClick={() => newRound(value)}
              className={cn(
                "focus-visible:ring-ring inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-lg px-3 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                source === value ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {value === "starred" ? <Star aria-hidden className="text-warning size-3.5 fill-current" /> : null}
              {label}
              <span className="text-muted-foreground font-numeric text-xs">{counts[value]}</span>
            </button>
          ))}
        </div>
        {starred.size > 0 ? (
          <Button asChild variant="outline" className="cursor-pointer">
            <Link href="/words/flashcards?deck=starred">
              <Star aria-hidden className="text-warning fill-current" />
              Test starred words
            </Link>
          </Button>
        ) : null}
      </div>

      {words.length === 0 ? (
        <div className="text-muted-foreground rounded-xl border border-dashed p-10 text-center text-sm">
          {source === "starred"
            ? "No starred words yet. Star a word here, in the word list or while reading."
            : "No words started yet. Take a flashcard test first, or review all words."}
        </div>
      ) : (
        <ol className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 xl:grid-cols-5">
          {words.map((w, i) => (
            <li
              key={w.id}
              className={cn(
                "bg-card flex flex-col rounded-2xl border p-3 pt-1 transition-colors sm:p-4 sm:pt-2",
                starred.has(w.id) && "border-warning/50",
              )}
            >
              <div className="-mr-2 flex items-center justify-between">
                <span className="text-muted-foreground font-numeric text-xs">{i + 1}</span>
                <StarButton wordId={w.id} label={w.hanzi} />
              </div>
              <p className="font-hanzi text-3xl leading-tight">{w.hanzi}</p>
              {revealed ? (
                <p className="mt-2 text-sm leading-snug">
                  <span className="text-primary block font-medium">{w.pinyin}</span>
                  <span className="text-muted-foreground">{w.gloss}</span>
                </p>
              ) : null}
            </li>
          ))}
        </ol>
      )}

      {words.length > 0 ? (
        <StickyActions className="flex flex-wrap items-center gap-x-3 gap-y-2">
          {revealed ? (
            <Button size="lg" className="h-11 cursor-pointer px-6" onClick={() => newRound()}>
              <Shuffle aria-hidden />
              Next {SET_SIZE}
            </Button>
          ) : (
            <Button
              size="lg"
              className="h-11 min-w-52 cursor-pointer px-6"
              disabled={left > 0}
              onClick={() => setRevealed(true)}
            >
              <Eye aria-hidden />
              {left > 0 ? (
                <>
                  Show the answer in <span className="font-numeric">{left}</span>
                </>
              ) : (
                "Show the answer"
              )}
            </Button>
          )}
          <p className="text-muted-foreground text-sm">
            {revealed
              ? "Star the ones you missed. They come back in your next flashcard test."
              : "Say each one to yourself: reading and meaning."}
          </p>
        </StickyActions>
      ) : null}
    </div>
  );
}
