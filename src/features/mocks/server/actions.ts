"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { db } from "@/db";
import { mockTests } from "@/db/schema";
import { type ActionResult, fail, ok } from "@/lib/action-result";
import { requireUser } from "@/lib/auth-guard";

import { mockSchema } from "../schema";

function refresh() {
  revalidatePath("/mocks");
  revalidatePath("/dashboard");
}

export async function saveMock(id: string | null, input: unknown): Promise<ActionResult> {
  const user = await requireUser();
  const parsed = mockSchema(user.level).safeParse(input);
  if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? "Check the scores.");

  if (id) {
    if (!z.uuid().safeParse(id).success) return fail("That mock test no longer exists.");
    // Scoped by user: an id from someone else's row updates nothing.
    const updated = await db
      .update(mockTests)
      .set(parsed.data)
      // Scored for the current level, so it may only change that level's rows.
      .where(and(eq(mockTests.id, id), eq(mockTests.userId, user.id), eq(mockTests.level, user.level)))
      .returning({ id: mockTests.id });
    if (updated.length === 0) return fail("That mock test no longer exists.");
  } else {
    await db.insert(mockTests).values({ userId: user.id, level: user.level, ...parsed.data });
  }

  refresh();
  return ok(undefined);
}

export async function deleteMock(id: string): Promise<ActionResult> {
  const user = await requireUser();
  if (!z.uuid().safeParse(id).success) return fail("That mock test no longer exists.");
  await db.delete(mockTests).where(and(eq(mockTests.id, id), eq(mockTests.userId, user.id)));
  refresh();
  return ok(undefined);
}
