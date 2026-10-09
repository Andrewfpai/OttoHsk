/**
 * Which words go into the next test's session.
 *
 * Due words come first — most overdue first, then the shakiest (lowest
 * strength) — but while unseen words remain, reviews take at most 70% of the
 * deck. Otherwise a backlog of reviews would stall coverage, and with a fixed
 * exam date reaching every word matters.
 */
import type { Word } from "@/content/words";

export type ProgressLite = { wordId: string; strength: number; dueTest: number };

export const DECK_SIZES = [10, 20, 30] as const;
const MAX_REVIEW_SHARE = 0.7;

export type Deck = { words: Word[]; reviewCount: number; newCount: number };

/** Words due at or before test number `nextTest`. */
export function isDue(p: ProgressLite, nextTest: number): boolean {
  return p.dueTest <= nextTest;
}

export function buildDeck(
  allWords: readonly Word[],
  progress: readonly ProgressLite[],
  nextTest: number,
  size: number,
): Deck {
  const byId = new Map(allWords.map((w) => [w.id, w]));
  const seen = new Set(progress.map((p) => p.wordId));

  const due = progress
    .filter((p) => isDue(p, nextTest) && byId.has(p.wordId))
    .sort((a, b) => a.dueTest - b.dueTest || a.strength - b.strength)
    .map((p) => byId.get(p.wordId)!);

  // allWords is sorted most common first, so new words arrive in that order.
  const fresh = allWords.filter((w) => !seen.has(w.id));

  const reviewCap = fresh.length > 0 ? Math.ceil(size * MAX_REVIEW_SHARE) : size;
  const reviews = due.slice(0, reviewCap);
  const news = fresh.slice(0, size - reviews.length);

  return { words: [...reviews, ...news], reviewCount: reviews.length, newCount: news.length };
}
