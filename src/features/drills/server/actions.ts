"use server";

import { z } from "zod";

import { db } from "@/db";
import { drillAttempts } from "@/db/schema";
import { type ActionResult, fail, ok } from "@/lib/action-result";
import { requireUser } from "@/lib/auth-guard";

import { isDrillItem } from "../lib/items";

const kind = z.enum(["confusable", "ordering", "cloze", "error", "reading"]);

const schema = z.object({
  kind,
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

const batch = z.object({
  kind,
  results: z
    .array(z.object({ itemId: z.string().min(1).max(100), correct: z.boolean() }))
    .min(1)
    .max(60),
});

/** Logs a whole paper's answers at once, as one insert. */
export async function recordAttempts(input: unknown): Promise<ActionResult> {
  const user = await requireUser();
  const parsed = batch.safeParse(input);
  if (!parsed.success || !parsed.data.results.every((r) => isDrillItem(parsed.data.kind, r.itemId))) {
    return fail("Could not save those answers.");
  }
  const { kind: k, results } = parsed.data;
  await db.insert(drillAttempts).values(results.map((r) => ({ userId: user.id, kind: k, ...r })));
  return ok(undefined);
}
