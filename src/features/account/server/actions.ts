"use server";

import { eq, sql } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { sessions, users } from "@/db/schema";
import { hasAccess } from "@/features/access/server/check";
import { type ActionResult, fail, ok } from "@/lib/action-result";
import { requireUser } from "@/lib/auth-guard";
import { hashPassword, verifyPassword } from "@/lib/password";
import { SESSION_COOKIE, SESSION_COOKIE_OPTIONS, SESSION_MAX_AGE_S } from "@/lib/session-cookie";

import { passwordSignInSchema, setPasswordSchema } from "../schema";

/** Set or change your own password. */
export async function setPassword(input: unknown): Promise<ActionResult> {
  const user = await requireUser();
  const parsed = setPasswordSchema.safeParse(input);
  if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? "Check the password.");

  await db
    .update(users)
    .set({ passwordHash: await hashPassword(parsed.data.password) })
    .where(eq(users.id, user.id));
  return ok(undefined);
}

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

  if (!user?.passwordHash || !(await verifyPassword(password, user.passwordHash))) {
    return fail(WRONG);
  }
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
