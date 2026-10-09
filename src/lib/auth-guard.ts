import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { cache } from "react";

import { db } from "@/db";
import { sessions } from "@/db/schema";
import { isAllowedEmail } from "@/lib/access";
import { auth } from "@/lib/auth";

export type AuthedUser = {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
};

/**
 * Gate for every authenticated Server Component and Server Action.
 *
 * Wrapped in React's `cache` so a page and its children calling it costs one
 * session lookup per request.
 *
 * Server Actions are reachable by direct POST, not only through our UI, so
 * every action must call this itself. Protecting the layout is not enough.
 */
export const requireUser = cache(async (): Promise<AuthedUser> => {
  const session = await auth();

  if (!session?.user?.id || !session.user.email) {
    redirect("/sign-in");
  }

  // Re-checked on every request, so removing someone from ALLOWED_EMAILS
  // takes effect immediately. Their login sessions go first: with one still
  // alive, the sign-in page would send them straight back here, in a loop.
  if (!isAllowedEmail(session.user.email)) {
    await db.delete(sessions).where(eq(sessions.userId, session.user.id));
    redirect("/sign-in?error=AccessDenied");
  }

  return {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name ?? null,
    image: session.user.image ?? null,
  };
});
