/**
 * The drill content for each level, and the item ids results are stored
 * under. A confusable set holds several questions, so its questions are
 * "<id>#<index>"; a cloze passage's blanks are "<id>#<question number>".
 * Ids never repeat across levels (HSK 6 content is prefixed), so one
 * results table serves both.
 */
import { clozePassages } from "@/content/cloze";
import { clozeHsk6 } from "@/content/cloze-hsk6";
import { confusables } from "@/content/confusables";
import { confusablesHsk6 } from "@/content/confusables-hsk6";
import { errorsHsk6 } from "@/content/errors-hsk6";
import { orderingItems } from "@/content/ordering";
import { orderingPapers } from "@/content/ordering-papers";
import { readingH51329 } from "@/content/reading-h51329";
import type { ClozePassage, ConfusableSet, ErrorItem, OrderingItem, ReadingPaper } from "@/content/types";
import type { DrillKind } from "@/db/schema";
import type { Level } from "@/lib/levels";

import { questionId } from "./question-id";

export { questionId };

export type LevelDrills = {
  confusable: ConfusableSet[];
  cloze: ClozePassage[];
  /** HSK 5 only: writing Part 1. */
  ordering: { papers: OrderingItem[]; builtIn: OrderingItem[] };
  /** HSK 6 only: reading Part 1 (病句). */
  error: ErrorItem[];
  /** HSK 5 only: reading Parts 2–3 of whole papers. */
  reading: ReadingPaper[];
};

export const DRILLS: Record<Level, LevelDrills> = {
  5: {
    confusable: confusables,
    cloze: clozePassages,
    ordering: { papers: orderingPapers, builtIn: orderingItems },
    error: [],
    reading: [readingH51329],
  },
  6: {
    confusable: confusablesHsk6,
    cloze: clozeHsk6,
    ordering: { papers: [], builtIn: [] },
    error: errorsHsk6,
    reading: [],
  },
};

/** Which drills each level has, in menu order. */
export const LEVEL_DRILL_KINDS: Record<Level, DrillKind[]> = {
  5: ["confusable", "cloze", "ordering", "reading"],
  6: ["confusable", "cloze", "error"],
};

/** Every question id of one drill at one level. */
export function drillItemIds(level: Level, kind: DrillKind): string[] {
  const d = DRILLS[level];
  switch (kind) {
    case "confusable":
      return d.confusable.flatMap((set) => set.questions.map((_, i) => questionId(set.id, i)));
    case "cloze":
      return d.cloze.flatMap((p) => p.blanks.map((b) => questionId(p.id, b.number)));
    case "ordering":
      return [...d.ordering.papers, ...d.ordering.builtIn].map((item) => item.id);
    case "error":
      return d.error.map((item) => item.id);
    case "reading":
      return d.reading.flatMap((paper) =>
        [...paper.part2, ...paper.part3].flatMap((item) =>
          item.questions.map((q) => questionId(paper.id, q.number)),
        ),
      );
  }
}

const valid = new Map<DrillKind, Set<string>>();
/** Whether `itemId` is a question of drill `kind` at any level. */
export function isDrillItem(kind: DrillKind, itemId: string): boolean {
  let ids = valid.get(kind);
  if (!ids) {
    ids = new Set([...drillItemIds(5, kind), ...drillItemIds(6, kind)]);
    valid.set(kind, ids);
  }
  return ids.has(itemId);
}
