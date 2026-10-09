"use client";

import { ChevronDown, Search } from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { words } from "@/content/words";
import { KNOWN_STRENGTH, MAX_STRENGTH, type WordStatus, statusOf } from "@/features/flashcards/lib/schedule";
import { plainPinyin } from "@/lib/pinyin";
import { cn } from "@/lib/utils";

import { STATUS_DOT, STATUS_LABEL, StatusBadge } from "./status-badge";

type Filter = "all" | WordStatus;

const FILTERS: Filter[] = ["all", "new", "learning", "known"];
const PAGE = 100;

/** Search keys, built once: tone-less pinyin and lower-case meanings. */
const searchable = words.map((w) => ({
  word: w,
  pinyin: plainPinyin(w.pinyin),
  meanings: w.meanings.join(" ").toLowerCase(),
}));

const HAS_HANZI = /\p{Script=Han}/u;

export function WordList({ strengths }: { strengths: Record<string, number> }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [shown, setShown] = useState(PAGE);
  const [open, setOpen] = useState<string | null>(null);
  // Typing stays responsive while 1,300 rows re-filter behind it.
  const deferredQuery = useDeferredValue(query);

  const counts = useMemo(() => {
    const c: Record<WordStatus, number> = { new: 0, learning: 0, known: 0 };
    for (const w of words) c[statusOf(strengths[w.id])]++;
    return c;
  }, [strengths]);

  const results = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    const qPinyin = plainPinyin(q);
    return searchable
      .filter(({ word, pinyin, meanings }) => {
        if (filter !== "all" && statusOf(strengths[word.id]) !== filter) return false;
        if (!q) return true;
        if (HAS_HANZI.test(q)) return word.hanzi.includes(q);
        return (qPinyin && pinyin.includes(qPinyin)) || meanings.includes(q);
      })
      .map((s) => s.word);
  }, [deferredQuery, filter, strengths]);

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
            placeholder="Search 汉字, pinyin (zhenshi) or English"
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
                {f === "all" ? words.length : counts[f]}
              </span>
            </Button>
          ))}
        </div>
      </div>

      <p className="text-muted-foreground text-sm" aria-live="polite">
        <span className="font-numeric">{results.length}</span> word{results.length === 1 ? "" : "s"}
      </p>

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
                      <StatusBadge status={statusOf(strengths[w.id])} />
                      {strengths[w.id] !== undefined ? (
                        <span className="text-muted-foreground text-xs">
                          Strength{" "}
                          <span className="font-numeric">
                            {strengths[w.id]}/{MAX_STRENGTH}
                          </span>
                          {strengths[w.id] < KNOWN_STRENGTH ? ` · known at ${KNOWN_STRENGTH}` : ""}
                        </span>
                      ) : null}
                      {w.pos.map((p) => (
                        <span key={p} className="bg-secondary rounded-md px-2 py-0.5 text-xs">
                          {p}
                        </span>
                      ))}
                    </div>
                    <p className="text-muted-foreground">{w.meanings.join(" · ")}</p>
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
        Word list: complete-hsk-vocabulary (MIT). Definitions: CC-CEDICT (CC BY-SA 4.0).
      </p>
    </div>
  );
}
