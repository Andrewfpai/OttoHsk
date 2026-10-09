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
 */
import type { Word } from "@/content/words";

export type ProgressLite = { wordId: string; strength: number; dueTest: number };

export const DECK_SIZES = [10, 20, 30] as const;
const NEW_SHARE = 0.3;

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
  const fresh = allWords.filter((w) => !seen.has(w.id));

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
