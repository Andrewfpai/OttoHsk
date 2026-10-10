"use client";

import { ChevronDown, Search } from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWordBank } from "@/components/level/level-provider";
import type { Word, WordBank } from "@/content/word-types";
import {
  FAST_TRACK_GAP,
  FAST_TRACK_STRENGTH,
  KNOWN_STRENGTH,
  MAX_STRENGTH,
  WRONG_PENALTY,
  type WordStatus,
  gapFor,
  statusOf,
} from "@/features/flashcards/lib/schedule";
import { plainPinyin } from "@/lib/pinyin";
import { cn } from "@/lib/utils";

import { ExampleSentence } from "./example-sentence";
import { STATUS_DOT, STATUS_LABEL, StatusBadge } from "./status-badge";

type Filter = "all" | WordStatus;
type Sort = "az" | "common";

const FILTERS: Filter[] = ["all", "new", "learning", "known"];
const PAGE = 100;

type Searchable = { word: Word; pinyin: string; meanings: string };

/**
 * Search keys, built once per level: tone-less pinyin, and every meaning in
 * English and Indonesian. Two orders: most common first, and dictionary
 * order like the official list (pinyin without tones, then tones, then
 * characters).
 */
const indexes = new WeakMap<WordBank, { byCommon: Searchable[]; byPinyin: Searchable[] }>();
function indexOf(bank: WordBank) {
  let index = indexes.get(bank);
  if (!index) {
    const byCommon = bank.words.map((w) => ({
      word: w,
      pinyin: plainPinyin(w.pinyin),
      meanings: [w.gloss, w.indonesian, ...w.meanings].join(" ").toLowerCase(),
    }));
    const byPinyin = [...byCommon].sort(
      (a, b) =>
        a.pinyin.localeCompare(b.pinyin) ||
        a.word.pinyin.localeCompare(b.word.pinyin) ||
        a.word.hanzi.localeCompare(b.word.hanzi, "zh"),
    );
    index = { byCommon, byPinyin };
    indexes.set(bank, index);
  }
  return index;
}

const HAS_HANZI = /\p{Script=Han}/u;

export type WordProgress = Record<string, { strength: number; dueTest: number }>;

export function WordList({ progress, nextTest }: { progress: WordProgress; nextTest: number }) {
  const bank = useWordBank();
  const { byCommon, byPinyin } = indexOf(bank);
  const strengths = useMemo(
    () => Object.fromEntries(Object.entries(progress).map(([id, p]) => [id, p.strength])),
    [progress],
  );
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("az");
  const [shown, setShown] = useState(PAGE);
  const [open, setOpen] = useState<string | null>(null);
  // Typing stays responsive while 1,300 rows re-filter behind it.
  const deferredQuery = useDeferredValue(query);

  const counts = useMemo(() => {
    const c: Record<WordStatus, number> = { new: 0, learning: 0, known: 0 };
    for (const w of bank.words) c[statusOf(strengths[w.id])]++;
    return c;
  }, [bank, strengths]);

  const results = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    const qPinyin = plainPinyin(q);
    return (sort === "az" ? byPinyin : byCommon)
      .filter(({ word, pinyin, meanings }) => {
        if (filter !== "all" && statusOf(strengths[word.id]) !== filter) return false;
        if (!q) return true;
        if (HAS_HANZI.test(q)) return word.hanzi.includes(q);
        return (qPinyin && pinyin.includes(qPinyin)) || meanings.includes(q);
      })
      .map((s) => s.word);
  }, [byCommon, byPinyin, deferredQuery, filter, sort, strengths]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            aria-hidden
            className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
          />
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShown(PAGE);
            }}
            placeholder="Search 汉字, pinyin (zhenshi), English or Indonesian"
            aria-label="Search words"
            className="h-10 pl-9"
          />
        </div>
        <div role="group" aria-label="Filter by status" className="flex flex-wrap gap-1.5">
          {FILTERS.map((f) => (
            <Button
              key={f}
              type="button"
              size="lg"
              variant={filter === f ? "secondary" : "ghost"}
              aria-pressed={filter === f}
              onClick={() => {
                setFilter(f);
                setShown(PAGE);
              }}
              className="cursor-pointer"
            >
              {f !== "all" ? (
                <span aria-hidden className={cn("size-2 rounded-full", STATUS_DOT[f])} />
              ) : null}
              {f === "all" ? "All" : STATUS_LABEL[f]}
              <span className="text-muted-foreground font-numeric text-xs">
                {f === "all" ? bank.total : counts[f]}
              </span>
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-muted-foreground text-sm" aria-live="polite">
          <span className="font-numeric">{results.length}</span> word{results.length === 1 ? "" : "s"}
        </p>
        <div role="group" aria-label="Sort words" className="flex items-center gap-1 text-sm">
          <span className="text-muted-foreground mr-1">Sort</span>
          {(
            [
              ["az", "A–Z"],
              ["common", "Most common"],
            ] as const
          ).map(([value, label]) => (
            <Button
              key={value}
              type="button"
              size="sm"
              variant={sort === value ? "secondary" : "ghost"}
              aria-pressed={sort === value}
              onClick={() => {
                setSort(value);
                setShown(PAGE);
              }}
              className="cursor-pointer"
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      {results.length === 0 ? (
        <div className="text-muted-foreground rounded-xl border border-dashed p-10 text-center text-sm">
          No words match. Try fewer letters, or pinyin without tones.
        </div>
      ) : (
        <ul className="bg-card divide-y overflow-hidden rounded-xl border">
          {results.slice(0, shown).map((w) => {
            const expanded = open === w.id;
            return (
              <li key={w.id}>
                <button
                  type="button"
                  onClick={() => setOpen(expanded ? null : w.id)}
                  aria-expanded={expanded}
                  className="hover:bg-muted/50 focus-visible:bg-muted/50 grid w-full cursor-pointer grid-cols-[5.5rem_1fr_auto] items-center gap-x-4 px-4 py-3 text-left transition-colors focus-visible:outline-none sm:grid-cols-[7rem_9rem_1fr_auto]"
                >
                  <span className="font-hanzi text-2xl leading-tight">{w.hanzi}</span>
                  <span className="text-muted-foreground hidden text-sm sm:block">{w.pinyin}</span>
                  <span className="min-w-0">
                    <span className="text-muted-foreground block text-xs sm:hidden">{w.pinyin}</span>
                    <span className="block truncate text-sm">{w.gloss}</span>
                  </span>
                  <span className="flex items-center gap-3">
                    <StatusBadge status={statusOf(strengths[w.id])} className="hidden sm:inline-flex" />
                    <span
                      aria-hidden
                      className={cn("size-2 rounded-full sm:hidden", STATUS_DOT[statusOf(strengths[w.id])])}
                    />
                    <ChevronDown
                      aria-hidden
                      className={cn(
                        "text-muted-foreground size-4 transition-transform",
                        expanded && "rotate-180",
                      )}
                    />
                  </span>
                </button>
                {expanded ? (
                  <div className="bg-muted/30 space-y-2 px-4 pt-1 pb-4 text-sm">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* The row already shows status on wider screens. */}
                      <StatusBadge status={statusOf(strengths[w.id])} className="sm:hidden" />
                      {progress[w.id] !== undefined ? (
                        <span className="text-muted-foreground text-xs">
                          Strength{" "}
                          <span className="font-numeric">
                            {progress[w.id].strength}/{MAX_STRENGTH}
                          </span>
                          {progress[w.id].strength < KNOWN_STRENGTH ? ` · known at ${KNOWN_STRENGTH}` : ""}
                        </span>
                      ) : null}
                      {w.pos.map((p) => (
                        <span key={p} className="bg-secondary rounded-md px-2 py-0.5 text-xs">
                          {p}
                        </span>
                      ))}
                    </div>
                    <NextAppearance entry={progress[w.id]} nextTest={nextTest} />
                    {w.indonesian ? (
                      <p>
                        <span className="text-muted-foreground text-xs">Indonesian · </span>
                        {w.indonesian}
                      </p>
                    ) : null}
                    <ExampleSentence word={w} className="bg-background/60 rounded-lg border px-3 py-2" />
                    <p className="text-muted-foreground text-xs">
                      All dictionary senses: {w.meanings.join(" · ")}
                    </p>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}

      {results.length > shown ? (
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="lg"
            className="cursor-pointer"
            onClick={() => setShown((n) => n + PAGE)}
          >
            Show more ({results.length - shown} left)
          </Button>
        </div>
      ) : null}

      <p className="text-muted-foreground text-xs">
        Dictionary senses: complete-hsk-vocabulary (MIT) and CC-CEDICT (CC BY-SA 4.0).
      </p>
    </div>
  );
}

/** When the word is next tested, and what a right or wrong answer would do. */
function NextAppearance({
  entry,
  nextTest,
}: {
  entry: { strength: number; dueTest: number } | undefined;
  nextTest: number;
}) {
  if (!entry) {
    return (
      <p className="text-muted-foreground text-xs">
        Not tested yet. Right on the first try (not a quick guess): strength {FAST_TRACK_STRENGTH},
        checked again {FAST_TRACK_GAP} tests later.
      </p>
    );
  }
  const { strength, dueTest } = entry;
  const away = dueTest - nextTest;
  const up = Math.min(MAX_STRENGTH, strength + 1);
  const down = Math.max(0, strength - WRONG_PENALTY);
  return (
    <p className="text-muted-foreground text-xs">
      <span className="text-foreground">
        {away <= 0 ? "Due in your next test" : `Back in test #${dueTest} (${away} test${away === 1 ? "" : "s"} away)`}
      </span>
      {" · "}Right: strength {up}, then {gapFor(up)} tests later · Wrong: strength {down}, back the
      next test.
    </p>
  );
}
