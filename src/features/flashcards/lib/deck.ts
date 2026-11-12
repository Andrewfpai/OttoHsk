/**
 * Which words go into the next test's session.
 *
 * Reviews come first, in this order:
 * 1. Words due exactly now, weakest first. That is every word missed in the
 *    last test (a miss is always due in the very next one) plus the words
 *    whose gap has just run out — so a miss really does come straight back.
 * 2. The overdue backlog, weakest first, then longest waiting.
 *
 * While unseen words remain, new words keep 30% of the deck. Otherwise a
 * backlog of reviews would stall coverage, and with a fixed exam date
 * reaching every word matters.
 *
 * A long list can be studied in chunks (HSK 6: 100 words). New words then
 * come only from the open chunks: the next one opens once every word of
 * the ones before has been seen and three in four of them are known. Reviews
 * still come from every word seen, so old chunks stay mixed in.
 */
import type { Word } from "@/content/word-types";

import { statusOf } from "./schedule";

export type ProgressLite = { wordId: string; strength: number; dueTest: number };

export const DECK_SIZES = [10, 20, 30] as const;
const NEW_SHARE = 0.3;

export type Deck = { words: Word[]; reviewCount: number; newCount: number };

/** Words due at or before test number `nextTest`. */
export function isDue(p: ProgressLite, nextTest: number): boolean {
  return p.dueTest <= nextTest;
}

/** Share of a chunk that must be known before the next chunk opens. */
export const CHUNK_OPEN_AT = 0.75;

export type Chunks = {
  size: number;
  /** How many chunks are open (1-based count). */
  open: number;
  total: number;
  /** The newest open chunk: its words seen and known so far. */
  seen: number;
  known: number;
  /** Words in the newest open chunk. */
  inChunk: number;
};

/**
 * How far into the list new words may come from. `allWords` is in study
 * order. Each chunk opens when the one before is fully seen and 75% known.
 */
export function chunksOf(allWords: readonly Word[], progress: readonly ProgressLite[], size: number): Chunks {
  const byId = new Map(progress.map((p) => [p.wordId, p]));
  const total = Math.ceil(allWords.length / size);
  const tally = (k: number) => {
    const chunk = allWords.slice(k * size, (k + 1) * size);
    let seen = 0;
    let known = 0;
    for (const w of chunk) {
      const p = byId.get(w.id);
      if (!p) continue;
      seen++;
      if (statusOf(p.strength) === "known") known++;
    }
    return { seen, known, inChunk: chunk.length };
  };
  let open = 1;
  let t = tally(0);
  while (open < total && t.seen === t.inChunk && t.known >= Math.ceil(t.inChunk * CHUNK_OPEN_AT)) {
    t = tally(open);
    open++;
  }
  return { size, open, total, ...t };
}

export function buildDeck(
  allWords: readonly Word[],
  progress: readonly ProgressLite[],
  nextTest: number,
  size: number,
  /** New words come only from the first this-many words (open chunks). */
  newLimit: number = allWords.length,
): Deck {
  const byId = new Map(allWords.map((w) => [w.id, w]));
  const seen = new Set(progress.map((p) => p.wordId));

  const known = progress.filter((p) => byId.has(p.wordId));
  let due = known
    .filter((p) => isDue(p, nextTest))
    .sort(
      (a, b) =>
        Number(b.dueTest === nextTest) - Number(a.dueTest === nextTest) ||
        a.strength - b.strength ||
        a.dueTest - b.dueTest,
    );

  // allWords is sorted most common first, so new words arrive in that order.
  const fresh = allWords.slice(0, newLimit).filter((w) => !seen.has(w.id));

  // Every word seen and none due (say, right after a perfect test): the
  // schedule only moves when a test is taken, so take the soonest-due words
  // rather than leave nothing to study.
  if (due.length === 0 && fresh.length === 0) {
    due = [...known].sort((a, b) => a.dueTest - b.dueTest || a.strength - b.strength);
  }

  const newSlots = Math.min(fresh.length, Math.floor(size * NEW_SHARE));
  const reviews = due.slice(0, size - newSlots).map((p) => byId.get(p.wordId)!);
  const news = fresh.slice(0, size - reviews.length);

  return { words: [...reviews, ...news], reviewCount: reviews.length, newCount: news.length };
}

/**
 * A deck of starred words only: due ones first, then weakest first, so the
 * words you flagged as shaky are the ones you meet. Unseen starred words
 * count as weakest. Answers go through the same schedule as any test.
 */
export function buildStarredDeck(
  allWords: readonly Word[],
  progress: readonly ProgressLite[],
  starredIds: readonly string[],
  nextTest: number,
  size: number,
): Deck {
  const byId = new Map(allWords.map((w) => [w.id, w]));
  const byWord = new Map(progress.map((p) => [p.wordId, p]));
  const rank = (id: string) => {
    const p = byWord.get(id);
    return p ? { due: isDue(p, nextTest), strength: p.strength, dueTest: p.dueTest } : { due: true, strength: -1, dueTest: 0 };
  };
  const words = starredIds
    .filter((id) => byId.has(id))
    .map((id) => ({ id, ...rank(id) }))
    .sort((a, b) => Number(b.due) - Number(a.due) || a.strength - b.strength || a.dueTest - b.dueTest)
    .slice(0, size)
    .map((r) => byId.get(r.id)!);
  const newCount = words.filter((w) => !byWord.has(w.id)).length;
  return { words, reviewCount: words.length - newCount, newCount };
}
