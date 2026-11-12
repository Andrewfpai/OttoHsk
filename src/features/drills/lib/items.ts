/**
 * The drill content for each level, and the item ids results are stored
 * under. A confusable set holds several questions, so its questions are
 * "<id>#<index>"; a passage's blanks and questions are "<id>#<question
 * number>". Ids never repeat across levels (HSK 6 content is prefixed), so
 * one results table serves both.
 */
import { clozePassages } from "@/content/cloze";
import { clozeHsk6 } from "@/content/cloze-hsk6";
import { confusables } from "@/content/confusables";
import { confusablesHsk6 } from "@/content/confusables-hsk6";
import { orderingItems } from "@/content/ordering";
import { orderingPapers } from "@/content/ordering-papers";
import { READING_SETS } from "@/content/reading";
import { listeningHsk6 } from "@/content/listening-hsk6";
import { readingHsk6 } from "@/content/reading-hsk6";
import { sentenceFillHsk6 } from "@/content/sentence-fill-hsk6";
import type {
  ClozePassage,
  ConfusableSet,
  ListeningPaper,
  OrderingItem,
  ReadingPaper,
  SentenceFillPassage,
} from "@/content/types";
import type { DrillKind } from "@/db/schema";
import type { Level } from "@/lib/levels";

import { questionId } from "./question-id";

export { questionId };

export type LevelDrills = {
  confusable: ConfusableSet[];
  cloze: ClozePassage[];
  /** HSK 5 only: writing Part 1. */
  ordering: { papers: OrderingItem[]; builtIn: OrderingItem[] };
  /** HSK 6 only: reading Part 2 (51–60), five sentences into a passage. */
  sentence: SentenceFillPassage[];
  /** Long passages: HSK 5 Parts 2–3 of real papers; HSK 6 Part 3 (61–80). */
  reading: ReadingPaper[];
  /** HSK 6 only: listening practice papers (1–40). */
  listening: ListeningPaper[];
};

export const DRILLS: Record<Level, LevelDrills> = {
  5: {
    confusable: confusables,
    cloze: clozePassages,
    ordering: { papers: orderingPapers, builtIn: orderingItems },
    sentence: [],
    reading: READING_SETS.map((s) => s.paper),
    listening: [],
  },
  6: {
    confusable: confusablesHsk6,
    cloze: clozeHsk6,
    ordering: { papers: [], builtIn: [] },
    sentence: sentenceFillHsk6,
    reading: readingHsk6,
    listening: listeningHsk6,
  },
};

/** Which drills each level has, in menu order. */
export const LEVEL_DRILL_KINDS: Record<Level, DrillKind[]> = {
  5: ["confusable", "cloze", "ordering", "reading"],
  6: ["confusable", "listening", "cloze", "sentence", "reading"],
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
    case "sentence":
      return d.sentence.flatMap((p) => p.blanks.map((b) => questionId(p.id, b.number)));
    case "reading":
      return d.reading.flatMap((paper) =>
        [...paper.part2, ...paper.part3].flatMap((item) =>
          item.questions.map((q) => questionId(paper.id, q.number)),
        ),
      );
    case "listening":
      return d.listening.flatMap((paper) =>
        paper.items.flatMap((item) => item.questions.map((q) => questionId(paper.id, q.number))),
      );
    case "error":
      // The HSK 2.0 病句 drill is gone; past answers stay in the table.
      return [];
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
