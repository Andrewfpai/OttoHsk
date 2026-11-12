import type { ListeningItem } from "@/content/types";

/**
 * What an item's recording says, in order, as clip keys into
 * src/content/listening-audio.json: the intro (Parts 2–3, "第9到12题是根据
 * 下面一段话："), every line, then (Parts 2–3) each spoken question.
 */
export type Segment = { key: string; kind: "intro" | "line" | "question" };

export function introText(item: ListeningItem): string | null {
  if (item.part === 1) return null;
  const [first, last] = [item.questions[0].number, item.questions.at(-1)!.number];
  return `第${first}到${last}题是根据下面一段${item.part === 3 ? "对话" : "话"}：`;
}

export function segmentsOf(item: ListeningItem): Segment[] {
  const out: Segment[] = [];
  if (item.part !== 1) out.push({ key: `${item.id}:intro`, kind: "intro" });
  item.lines.forEach((_, i) => out.push({ key: `${item.id}:L${i}`, kind: "line" }));
  if (item.part !== 1) for (const q of item.questions) out.push({ key: `${item.id}:Q${q.number}`, kind: "question" });
  return out;
}

/** Silence after a segment, in ms: a beat between lines, time to answer after a question. */
export function pauseAfter(seg: Segment, next: Segment | undefined): number {
  if (!next) return 0;
  if (seg.kind === "question") return 3000;
  if (next.kind === "question") return 1500;
  return seg.kind === "intro" ? 700 : 450;
}
