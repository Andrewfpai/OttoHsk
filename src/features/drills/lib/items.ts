/**
 * The drill item ids that results are stored under. A set or pattern holds
 * several questions, so its questions are "<id>#<index>".
 */
import { confusables } from "@/content/confusables";
import { grammarPatterns } from "@/content/grammar";
import { orderingItems } from "@/content/ordering";
import type { DrillKind } from "@/db/schema";

export function questionId(parentId: string, index: number): string {
  return `${parentId}#${index}`;
}

export const DRILL_ITEM_IDS: Record<DrillKind, string[]> = {
  confusable: confusables.flatMap((set) => set.questions.map((_, i) => questionId(set.id, i))),
  ordering: orderingItems.map((item) => item.id),
  grammar: grammarPatterns.flatMap((p) => p.quiz.map((_, i) => questionId(p.id, i))),
};

const valid: Record<DrillKind, Set<string>> = {
  confusable: new Set(DRILL_ITEM_IDS.confusable),
  ordering: new Set(DRILL_ITEM_IDS.ordering),
  grammar: new Set(DRILL_ITEM_IDS.grammar),
};

export function isDrillItem(kind: DrillKind, itemId: string): boolean {
  return valid[kind].has(itemId);
}
