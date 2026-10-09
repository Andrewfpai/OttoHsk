/**
 * Auth.js (NextAuth v5) configuration.
 *
 * Invite-only, the same way as OttoLabs. Owners are named in ALLOWED_EMAILS;
 * anyone else must be on the invite list owners manage in Settings → Access
 * (`allowed_emails`), or arrive through a one-time invite link. Every study
 * table carries `user_id`, so each person keeps their own progress.
 *
 * Route protection lives in `src/app/(app)/layout.tsx` and in every Server
 * Action via `requireUser()`, not in a proxy.
 */
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { cookies } from "next/headers";

import { db } from "@/db";
import { accounts, sessions, users, verificationTokens } from "@/db/schema";
import { INVITE_COOKIE } from "@/features/access/lib/invite-links";
import { hasAccess } from "@/features/access/server/check";
import { redeemInvite } from "@/features/access/server/invite-links";
import { ownerEmails } from "@/lib/access";
import { SESSION_COOKIE, SESSION_COOKIE_OPTIONS } from "@/lib/session-cookie";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),

  // Database sessions, so removing someone's access can end their login by
  // deleting rows (see auth-guard) rather than waiting out a JWT.
  session: { strategy: "database" },

  // Its own cookie name, shared with the password sign-in; see session-cookie.ts.
  cookies: {
    sessionToken: { name: SESSION_COOKIE, options: SESSION_COOKIE_OPTIONS },
  },

  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },

  providers: [Google],

  callbacks: {
    async signIn({ user, profile }) {
      // The allowlist matches by email, so only trust addresses Google has
      // verified.
      if (profile && profile.email_verified === false) return false;
      if (ownerEmails().length === 0) {
        // Fail closed for owners. An unset ALLOWED_EMAILS must not mean "the
        // internet may log in"; invited addresses can still get in.
        console.error(
          "[auth] ALLOWED_EMAILS is empty, so nobody is an owner. " +
            "Set it to your Google address in .env.local and in Vercel.",
        );
      }
      // Owners from the environment, everyone else from the invite list.
      if (await hasAccess(user.email)) return true;

      // Or a one-time invite link, carried through Google in a cookie by
      // /invite/[token]. Whichever Google account comes back spends it.
      const jar = await cookies();
      const token = jar.get(INVITE_COOKIE)?.value;
      if (!token || !user.email) return false;
      const granted = await redeemInvite(token, user.email);
      try {
        jar.delete(INVITE_COOKIE);
      } catch {
        // Read-only here in some contexts; it expires within minutes anyway.
      }
      return granted;
    },

    // An explicit shape, not the object Auth.js hands in: that carries the
    // session token and the whole users row (password hash included), and
    // whatever this returns is served at /api/auth/session.
    session({ session, user }) {
      return {
        expires: session.expires,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          emailVerified: user.emailVerified,
          // Whether one is set, never the hash itself.
          hasPassword: Boolean((user as { passwordHash?: string | null }).passwordHash),
        },
      };
    },
  },
});
