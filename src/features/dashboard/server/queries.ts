import { wordBank } from "@/content/words";
import type { DrillKind } from "@/db/schema";
import { LEVEL_DRILL_KINDS, drillItemIds } from "@/features/drills/lib/items";
import { type DrillSummary, summarize } from "@/features/drills/lib/stats";
import { getItemStats } from "@/features/drills/server/queries";
import { isDue } from "@/features/flashcards/lib/deck";
import { isLocked } from "@/features/flashcards/lib/lockout";
import { statusOf } from "@/features/flashcards/lib/schedule";
import { getFirstTestAt, getFlashcardInfo, getProgress } from "@/features/flashcards/server/queries";
import { type MockRow, getMocks } from "@/features/mocks/server/queries";
import { requireUser } from "@/lib/auth-guard";
import { daysUntilExam, localDate } from "@/lib/exam";
import type { Level } from "@/lib/levels";

import { type DailyTarget, dailyTarget, progressOf } from "../lib/target";

const DRILL_LINKS: Record<DrillKind, { label: string; href: string }> = {
  confusable: { label: "Confusables", href: "/confusables" },
  cloze: { label: "Fill in", href: "/cloze" },
  ordering: { label: "Sentence order", href: "/ordering" },
  error: { label: "Find the error", href: "/errors" },
  reading: { label: "Reading", href: "/reading" },
};

export type DrillCard = { kind: DrillKind; label: string; href: string; summary: DrillSummary };

export type Dashboard = {
  level: Level;
  /** "YYYY-MM-DD", or null when no exam date is set. */
  examDate: string | null;
  /** Days to the exam; null without an exam date. */
  daysLeft: number | null;
  totalWords: number;
  words: { known: number; learning: number; new: number };
  /** The straight-line plan to know every word a week before the exam; null without one. */
  target: DailyTarget | null;
  /** Words due in the next test. */
  due: number;
  /** Epoch ms while tests are locked, else null. */
  lockedUntil: number | null;
  drills: DrillCard[];
  latestMock: MockRow | null;
};

export async function getDashboard(): Promise<Dashboard> {
  const user = await requireUser();
  const kinds = LEVEL_DRILL_KINDS[user.level];
  const [progress, info, mocks, firstTestAt, ...drillStats] = await Promise.all([
    getProgress(),
    getFlashcardInfo(),
    getMocks(),
    getFirstTestAt(),
    ...kinds.map((kind) => getItemStats(kind)),
  ]);

  const now = new Date();
  const daysLeft = daysUntilExam(now, user.examDate);
  const totalWords = wordBank(user.level).total;

  const words = { known: 0, learning: 0, new: totalWords - progress.length };
  let due = 0;
  for (const p of progress) {
    words[statusOf(p.strength) === "known" ? "known" : "learning"]++;
    if (isDue(p, info.nextTest)) due++;
  }

  const lockedUntil = info.lockedUntil !== null ? new Date(info.lockedUntil) : null;
  const today = localDate(now);
  const target = dailyTarget({
    total: totalWords,
    progress: progressOf(progress.map((p) => p.strength)),
    startDate: firstTestAt ? localDate(firstTestAt) : today,
    today,
    examDate: user.examDate,
  });

  return {
    level: user.level,
    examDate: user.examDate,
    daysLeft,
    totalWords,
    words,
    target,
    due,
    lockedUntil: isLocked(lockedUntil, now) ? info.lockedUntil : null,
    drills: kinds.map((kind, i) => ({
      kind,
      ...DRILL_LINKS[kind],
      summary: summarize(drillItemIds(user.level, kind), drillStats[i]),
    })),
    latestMock: mocks.at(-1) ?? null,
  };
}
