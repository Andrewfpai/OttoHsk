import { and, asc, eq } from "drizzle-orm";

import { db } from "@/db";
import { type DrillKind, drillAttempts } from "@/db/schema";
import { requireUser } from "@/lib/auth-guard";

import type { ItemStat } from "../lib/stats";

/**
 * Per-item history for one drill: how often it was tried and whether the
 * most recent try was right. Attempts are low-volume (hundreds), so they are
 * read whole and folded here rather than with window functions.
 */
export async function getItemStats(kind: DrillKind): Promise<Record<string, ItemStat>> {
  const user = await requireUser();
  const rows = await db
    .select({ itemId: drillAttempts.itemId, correct: drillAttempts.correct })
    .from(drillAttempts)
    .where(and(eq(drillAttempts.userId, user.id), eq(drillAttempts.kind, kind)))
    .orderBy(asc(drillAttempts.answeredAt));

  const stats: Record<string, ItemStat> = {};
  for (const r of rows) {
    const s = (stats[r.itemId] ??= { attempts: 0, correct: 0, lastCorrect: false });
    s.attempts++;
    if (r.correct) s.correct++;
    s.lastCorrect = r.correct;
  }
  return stats;
}

/**
 * A per-request seed for the drill's shuffle. The server picks it so the
 * server render and the client's first render shuffle identically.
 */
export async function drillSeed(): Promise<number> {
  return Date.now() % 1_000_000;
}
