import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";
import { SealMark } from "@/components/layout/brand";
import { auth, signIn } from "@/lib/auth";

export const metadata: Metadata = { title: "Sign in" };

const ERRORS: Record<string, string> = {
  AccessDenied: "That Google account is not on the list. Ask the owner to add your address.",
  Configuration:
    "Auth is not configured. Check AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET and AUTH_SECRET.",
  Verification: "That sign-in link has expired. Try again.",
};

export default async function SignInPage({ searchParams }: PageProps<"/sign-in">) {
  const session = await auth();
  if (session?.user) redirect("/dashboard");

  const params = await searchParams;
  const errorCode = typeof params.error === "string" ? params.error : null;
  const message = errorCode
    ? (ERRORS[errorCode] ?? "Something went wrong signing in. Try again.")
    : null;

  async function signInWithGoogle() {
    "use server";
    await signIn("google", { redirectTo: "/dashboard" });
  }

  return (
    <main className="flex min-h-dvh items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="mb-10 space-y-3 text-center">
          <SealMark className="mx-auto size-12 text-2xl" />
          <h1 className="text-2xl font-semibold tracking-tight">OttoHSK</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Words, flashcards and drills for HSK 5.
          </p>
        </div>

        {message ? (
          <p
            role="alert"
            className="border-destructive/30 bg-destructive/10 text-destructive mb-6 rounded-lg border px-4 py-3 text-sm"
          >
            {message}
          </p>
        ) : null}

        <form action={signInWithGoogle}>
          <GoogleSignInButton />
        </form>

        <p className="text-muted-foreground mt-6 text-center text-xs">Access is by invitation.</p>
      </div>
    </main>
  );
}
