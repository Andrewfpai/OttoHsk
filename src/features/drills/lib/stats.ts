import { type Rng, shuffle } from "@/lib/random";

export type ItemStat = { attempts: number; correct: number; lastCorrect: boolean };

/**
 * Practice order for a drill: items you got wrong last time first, then ones
 * never tried, then the rest. Shuffled within each group so a session never
 * replays the same sequence.
 */
export function practiceOrder<T>(
  items: readonly T[],
  idOf: (item: T) => string,
  stats: Record<string, ItemStat>,
  rng: Rng = Math.random,
): T[] {
  const missed: T[] = [];
  const fresh: T[] = [];
  const rest: T[] = [];
  for (const item of items) {
    const s = stats[idOf(item)];
    if (!s) fresh.push(item);
    else if (!s.lastCorrect) missed.push(item);
    else rest.push(item);
  }
  return [...shuffle(missed, rng), ...shuffle(fresh, rng), ...shuffle(rest, rng)];
}

/**
 * Merge two queues so `shareA` of every stretch comes from `a`: at 0.6 the
 * pattern is a b a b a — three of every five from `a`. When one runs out
 * the other continues alone. Each queue keeps its own order.
 */
export function interleave<T>(a: readonly T[], b: readonly T[], shareA: number): T[] {
  const out: T[] = [];
  let i = 0;
  let j = 0;
  while (i < a.length || j < b.length) {
    const wantA = j >= b.length || (i < a.length && i < Math.round((out.length + 1) * shareA));
    out.push(wantA ? a[i++] : b[j++]);
  }
  return out;
}

/** Stored stats with this session's answers applied on top. */
export function withSession(
  stats: Record<string, ItemStat>,
  session: Record<string, boolean>,
): Record<string, ItemStat> {
  const merged = { ...stats };
  for (const [id, right] of Object.entries(session)) {
    const prev = merged[id] ?? { attempts: 0, correct: 0, lastCorrect: false };
    merged[id] = {
      attempts: prev.attempts + 1,
      correct: prev.correct + (right ? 1 : 0),
      lastCorrect: right,
    };
  }
  return merged;
}

export type DrillSummary = { total: number; tried: number; mastered: number };

/** "Mastered" = the latest attempt was right. */
export function summarize(ids: readonly string[], stats: Record<string, ItemStat>): DrillSummary {
  let tried = 0;
  let mastered = 0;
  for (const id of ids) {
    const s = stats[id];
    if (!s) continue;
    tried++;
    if (s.lastCorrect) mastered++;
  }
  return { total: ids.length, tried, mastered };
}
