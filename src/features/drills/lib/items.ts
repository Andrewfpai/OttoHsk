/**
 * The drill item ids that results are stored under. A confusable set holds
 * several questions, so its questions are "<id>#<index>"; a cloze passage's
 * blanks are "<id>#<question number>".
 */
import { clozePassages } from "@/content/cloze";
import { confusables } from "@/content/confusables";
import { orderingItems } from "@/content/ordering";
import { orderingPapers } from "@/content/ordering-papers";
import type { DrillKind } from "@/db/schema";

export function questionId(parentId: string, index: number): string {
  return `${parentId}#${index}`;
}

export const DRILL_ITEM_IDS: Record<DrillKind, string[]> = {
  confusable: confusables.flatMap((set) => set.questions.map((_, i) => questionId(set.id, i))),
  ordering: [...orderingPapers, ...orderingItems].map((item) => item.id),
  cloze: clozePassages.flatMap((p) => p.blanks.map((b) => questionId(p.id, b.number))),
};

const valid: Record<DrillKind, Set<string>> = {
  confusable: new Set(DRILL_ITEM_IDS.confusable),
  ordering: new Set(DRILL_ITEM_IDS.ordering),
  cloze: new Set(DRILL_ITEM_IDS.cloze),
};

export function isDrillItem(kind: DrillKind, itemId: string): boolean {
  return valid[kind].has(itemId);
}
