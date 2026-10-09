/**
 * Auth.js (NextAuth v5) configuration.
 *
 * Invite-only: the Google accounts listed in ALLOWED_EMAILS, nobody else.
 * Every study table carries `user_id`, so each person keeps their own
 * progress.
 *
 * Route protection lives in `src/app/(app)/layout.tsx` and in every Server
 * Action via `requireUser()`, not in a proxy.
 */
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import { db } from "@/db";
import { accounts, sessions, users, verificationTokens } from "@/db/schema";
import { isAllowedEmail, allowedEmails } from "@/lib/access";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),

  // Database sessions, so removing someone from ALLOWED_EMAILS can end their
  // login by deleting rows (see auth-guard) rather than waiting out a JWT.
  session: { strategy: "database" },

  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },

  providers: [Google],

  callbacks: {
    signIn({ user }) {
      if (allowedEmails().length === 0) {
        // Fail closed. An unset ALLOWED_EMAILS must not mean "the internet
        // may log in".
        console.error(
          "[auth] ALLOWED_EMAILS is empty, so nobody can sign in. " +
            "Set it to the Google addresses allowed in, in .env.local and in Vercel.",
        );
      }
      return isAllowedEmail(user.email);
    },

    session({ session, user }) {
      if (session.user) session.user.id = user.id;
      return session;
    },
  },
});
