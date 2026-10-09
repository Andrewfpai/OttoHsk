import { redirect } from "next/navigation";

import { AppShell } from "@/components/layout/app-shell";
import { signOut } from "@/lib/auth";
import { requireUser } from "@/lib/auth-guard";

/**
 * Every authenticated route lives under this layout, which is where access is
 * enforced for pages. It does NOT protect Server Actions — those are reachable
 * by direct POST and must each call `requireUser()` themselves.
 */
export default async function AppLayout({ children }: LayoutProps<"/">) {
  const user = await requireUser();

  async function signOutAction() {
    "use server";
    await signOut({ redirect: false });
    redirect("/sign-in");
  }

  return (
    <AppShell user={user} signOutAction={signOutAction}>
      {children}
    </AppShell>
  );
}
