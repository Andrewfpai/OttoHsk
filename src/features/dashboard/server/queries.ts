import { TOTAL_WORDS } from "@/content/words";
import { DRILL_ITEM_IDS } from "@/features/drills/lib/items";
import { type DrillSummary, summarize } from "@/features/drills/lib/stats";
import { getItemStats } from "@/features/drills/server/queries";
import { isDue } from "@/features/flashcards/lib/deck";
import { isLocked } from "@/features/flashcards/lib/lockout";
import { statusOf } from "@/features/flashcards/lib/schedule";
import { getFlashcardInfo, getProgress } from "@/features/flashcards/server/queries";
import { type MockRow, getMocks } from "@/features/mocks/server/queries";
import { daysUntilExam } from "@/lib/exam";

export type Dashboard = {
  daysLeft: number;
  words: { known: number; learning: number; new: number };
  /** New words to start each day so every word is seen by exam day. */
  newPerDay: number;
  /** Words due in the next test. */
  due: number;
  /** Epoch ms while tests are locked, else null. */
  lockedUntil: number | null;
  drills: { confusable: DrillSummary; cloze: DrillSummary; ordering: DrillSummary };
  latestMock: MockRow | null;
};

export async function getDashboard(): Promise<Dashboard> {
  const [progress, info, mocks, confusable, ordering, cloze] = await Promise.all([
    getProgress(),
    getFlashcardInfo(),
    getMocks(),
    getItemStats("confusable"),
    getItemStats("ordering"),
    getItemStats("cloze"),
  ]);

  const now = new Date();
  const daysLeft = daysUntilExam(now);

  const words = { known: 0, learning: 0, new: TOTAL_WORDS - progress.length };
  let due = 0;
  for (const p of progress) {
    words[statusOf(p.strength) === "known" ? "known" : "learning"]++;
    if (isDue(p, info.nextTest)) due++;
  }

  const lockedUntil = info.lockedUntil !== null ? new Date(info.lockedUntil) : null;

  return {
    daysLeft,
    words,
    newPerDay: daysLeft > 0 ? Math.ceil(words.new / daysLeft) : words.new,
    due,
    lockedUntil: isLocked(lockedUntil, now) ? info.lockedUntil : null,
    drills: {
      confusable: summarize(DRILL_ITEM_IDS.confusable, confusable),
      cloze: summarize(DRILL_ITEM_IDS.cloze, cloze),
      ordering: summarize(DRILL_ITEM_IDS.ordering, ordering),
    },
    latestMock: mocks.at(-1) ?? null,
  };
}
