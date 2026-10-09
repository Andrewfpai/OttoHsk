import type { OrderingItem } from "@/content/types";

/** The finished sentence, as the exam expects it written. */
export function sentenceOf(chunks: readonly string[], end: OrderingItem["end"] = "。"): string {
  return chunks.join("") + end;
}

/**
 * Right when the chunks match the key or a listed alternative, compared as
 * the sentence they spell — two chunk orders that read identically are the
 * same answer.
 */
export function isCorrectOrder(item: OrderingItem, placed: readonly string[]): boolean {
  const attempt = placed.join("");
  return [item.chunks, ...(item.alternatives ?? [])].some((order) => order.join("") === attempt);
}
