import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      /** False until they set a password after their first Google sign-in. */
      hasPassword: boolean;
      /** The HSK level they study: 5 or 6. */
      level: number;
      /** Their exam day ("YYYY-MM-DD"), or null when none is set. */
      examDate: string | null;
    } & DefaultSession["user"];
  }
}
