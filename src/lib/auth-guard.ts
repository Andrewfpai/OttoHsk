import { redirect } from "next/navigation";
import { cache } from "react";

import { hasAccess, signOutEverywhere } from "@/features/access/server/check";
import { isOwnerEmail } from "@/lib/access";
import { auth } from "@/lib/auth";

export type AuthedUser = {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  hasPassword: boolean;
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

  // Access is re-checked on every request, not just at sign-in, so removing
  // an invite (or an owner from ALLOWED_EMAILS) takes effect immediately.
  // Signing them out first matters: with the login session still alive the
  // sign-in page would send them straight back here, in a loop.
  if (!(await hasAccess(session.user.email))) {
    await signOutEverywhere(session.user.email);
    redirect("/sign-in?error=AccessDenied");
  }

  return {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name ?? null,
    image: session.user.image ?? null,
    hasPassword: session.user.hasPassword ?? false,
  };
});

/** Owners manage the invite list. Server Actions must check this themselves. */
export async function isOwner(): Promise<boolean> {
  const user = await requireUser();
  return isOwnerEmail(user.email);
}
