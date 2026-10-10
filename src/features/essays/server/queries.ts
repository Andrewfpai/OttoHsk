import { and, desc, eq, inArray } from "drizzle-orm";

import { db } from "@/db";
import { essays } from "@/db/schema";
import { requireUser } from "@/lib/auth-guard";

import { type EssayKind, type Feedback, feedbackSchema } from "../lib/feedback";
import { aiConfig } from "./ai";

export type EssayRow = {
  id: string;
  kind: EssayKind;
  prompt: string;
  body: string;
  chars: number;
  score: number;
  model: string;
  createdAt: number;
  feedback: Feedback | null;
};

/** The learner's current level's writing: Q99/Q100 for HSK 5, retellings for HSK 6. */
export async function getRecentEssays(limit = 15): Promise<EssayRow[]> {
  const user = await requireUser();
  const kinds: EssayKind[] = user.level === 5 ? ["q99", "q100"] : ["retell"];
  const rows = await db
    .select()
    .from(essays)
    .where(and(eq(essays.userId, user.id), inArray(essays.kind, kinds)))
    .orderBy(desc(essays.createdAt))
    .limit(limit);
  return rows.map((r) => {
    // jsonb comes back untyped; re-validate rather than cast.
    const feedback = feedbackSchema.safeParse(r.feedback);
    return {
      id: r.id,
      kind: r.kind,
      prompt: r.prompt,
      body: r.body,
      chars: r.chars,
      score: r.score,
      model: r.model,
      createdAt: r.createdAt.getTime(),
      feedback: feedback.success ? feedback.data : null,
    };
  });
}

/** Whether checking is available, and in which model order — for the UI. */
export async function getAiStatus(): Promise<{ enabled: boolean; models: string[] }> {
  await requireUser();
  const config = aiConfig();
  return { enabled: config !== null, models: config?.models ?? [] };
}
