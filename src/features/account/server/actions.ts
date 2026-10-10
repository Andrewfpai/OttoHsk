"use server";

import { and, eq, ne, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { sessions, users } from "@/db/schema";
import { hasAccess } from "@/features/access/server/check";
import { type ActionResult, fail, ok } from "@/lib/action-result";
import { requireUser } from "@/lib/auth-guard";
import { hashPassword, verifyPassword } from "@/lib/password";
import { SESSION_COOKIE, SESSION_COOKIE_OPTIONS, SESSION_MAX_AGE_S } from "@/lib/session-cookie";

import { passwordSignInSchema, setPasswordSchema, studySettingsSchema } from "../schema";

/**
 * Set or change your own password. Signs you out everywhere else, so a
 * changed password also ends any session someone else had.
 */
export async function setPassword(input: unknown): Promise<ActionResult> {
  const user = await requireUser();
  const parsed = setPasswordSchema.safeParse(input);
  if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? "Check the password.");

  await db
    .update(users)
    .set({ passwordHash: await hashPassword(parsed.data.password) })
    .where(eq(users.id, user.id));

  const current = (await cookies()).get(SESSION_COOKIE)?.value ?? "";
  await db
    .delete(sessions)
    .where(and(eq(sessions.userId, user.id), ne(sessions.sessionToken, current)));
  return ok(undefined);
}

/**
 * Hashed once, lazily: verified against when there is no account, so a miss
 * takes as long as a wrong password and timing reveals nothing.
 */
let dummyHash: Promise<string> | null = null;

/** One message for every failure, so it never reveals which part was wrong. */
const WRONG = "That email and password don't match an account here.";

/**
 * Sign in with email and password. The one Server Action that cannot call
 * requireUser(): it is how you become a user.
 *
 * Auth.js's Credentials provider only works with JWT sessions, and this app
 * uses database sessions. So this creates the same database session Auth.js
 * would, under the same cookie, and everything downstream — auth(),
 * requireUser(), sign-out, access removal — treats it like a Google login.
 */
export async function signInWithPassword(input: unknown): Promise<ActionResult> {
  const parsed = passwordSignInSchema.safeParse(input);
  if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? WRONG);
  const { email, password } = parsed.data;

  const [user] = await db
    .select({ id: users.id, email: users.email, passwordHash: users.passwordHash })
    .from(users)
    .where(eq(sql`lower(${users.email})`, email))
    .limit(1);

  if (!user?.passwordHash) {
    await verifyPassword(password, await (dummyHash ??= hashPassword("not-a-real-password")));
    return fail(WRONG);
  }
  if (!(await verifyPassword(password, user.passwordHash))) return fail(WRONG);
  // The same gate as Google sign-in: owners, and the invite list.
  if (!(await hasAccess(user.email))) {
    return fail("That account no longer has access. Ask the owner.", "ACCESS_DENIED");
  }

  const sessionToken = crypto.randomUUID();
  const expires = new Date(Date.now() + SESSION_MAX_AGE_S * 1000);
  await db.insert(sessions).values({ sessionToken, userId: user.id, expires });
  (await cookies()).set(SESSION_COOKIE, sessionToken, { ...SESSION_COOKIE_OPTIONS, expires });

  redirect("/dashboard");
}

/**
 * The learner's HSK level and exam date. Every tab follows the level;
 * progress is kept per level, so switching back and forth loses nothing.
 */
export async function updateStudySettings(input: unknown): Promise<ActionResult> {
  const user = await requireUser();
  const parsed = studySettingsSchema.safeParse(input);
  if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? "Check the settings.");
  await db
    .update(users)
    .set({ level: parsed.data.level, examDate: parsed.data.examDate })
    .where(eq(users.id, user.id));
  revalidatePath("/", "layout");
  return ok(undefined);
}
