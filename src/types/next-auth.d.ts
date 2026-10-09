import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      /** False until they set a password after their first Google sign-in. */
      hasPassword: boolean;
    } & DefaultSession["user"];
  }
}
