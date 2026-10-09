import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { SealMark } from "@/components/layout/brand";
import { SetPasswordForm } from "@/features/account/components/set-password-form";
import { signOut } from "@/lib/auth";
import { requireUser } from "@/lib/auth-guard";

export const metadata: Metadata = { title: "Set a password" };

/**
 * Shown once, after the first Google sign-in. Outside the (app) layout on
 * purpose: that layout sends anyone without a password here.
 */
export default async function SetPasswordPage() {
  const user = await requireUser();
  if (user.hasPassword) redirect("/dashboard");

  // The only way out of this page without a password: signed in with the
  // wrong Google account, you can go back and pick another.
  async function signOutAction() {
    "use server";
    await signOut({ redirect: false });
    redirect("/sign-in");
  }

  return (
    <main className="flex min-h-dvh items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 space-y-3 text-center">
          <SealMark className="mx-auto size-12 text-2xl" />
          <h1 className="text-2xl font-semibold tracking-tight">Set a password</h1>
          <p className="text-muted-foreground text-sm text-balance">
            So you can also sign in with <span className="text-foreground">{user.email}</span> and
            this password, without Google.
          </p>
        </div>
        <SetPasswordForm then="/dashboard" submitLabel="Save and continue" />
        <form action={signOutAction} className="mt-6 text-center">
          <button
            type="submit"
            className="text-muted-foreground hover:text-foreground cursor-pointer text-sm underline underline-offset-4"
          >
            Not you? Sign out and use another account
          </button>
        </form>
      </div>
    </main>
  );
}
