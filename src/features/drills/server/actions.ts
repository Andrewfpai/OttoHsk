"use server";

import { z } from "zod";

import { db } from "@/db";
import { drillAttempts } from "@/db/schema";
import { type ActionResult, fail, ok } from "@/lib/action-result";
import { requireUser } from "@/lib/auth-guard";

import { isDrillItem } from "../lib/items";

const schema = z.object({
  kind: z.enum(["confusable", "ordering", "cloze"]),
  itemId: z.string().min(1).max(100),
  correct: z.boolean(),
});

/** Logs one drill answer. Content ids are checked so junk cannot pile up. */
export async function recordAttempt(input: unknown): Promise<ActionResult> {
  const user = await requireUser();
  const parsed = schema.safeParse(input);
  if (!parsed.success || !isDrillItem(parsed.data.kind, parsed.data.itemId)) {
    return fail("Could not save that answer.");
  }

  await db.insert(drillAttempts).values({ userId: user.id, ...parsed.data });

  // No revalidatePath: in Next 16 it re-renders the page the learner is on
  // (whatever path is named), re-sending every drill prop mid-answer. The
  // dashboard is rendered per request, so it is fresh on the next visit.
  return ok(undefined);
}
