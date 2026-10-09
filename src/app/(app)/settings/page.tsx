import type { Metadata } from "next";

import { PageContainer, PageHeader } from "@/components/layout/page-header";
import { AccessManager } from "@/features/access/components/access-manager";
import { InviteLinksManager } from "@/features/access/components/invite-links-manager";
import { getAccessList } from "@/features/access/server/queries";
import { SetPasswordForm } from "@/features/account/components/set-password-form";
import { requireUser } from "@/lib/auth-guard";
import { EXAM_TIME_ZONE } from "@/lib/exam";

export const metadata: Metadata = { title: "Settings" };

export default async function SettingsPage() {
  const [user, access] = await Promise.all([requireUser(), getAccessList()]);

  return (
    <PageContainer className="max-w-3xl">
      <PageHeader title="Settings" description={`Signed in as ${user.email}.`} />

      <section aria-labelledby="password-heading" className="bg-card mb-6 rounded-xl border p-4 sm:p-6">
        <h2 id="password-heading" className="text-sm font-medium">
          Change password
        </h2>
        <p className="text-muted-foreground mt-1 mb-4 text-xs">
          For signing in with {user.email} instead of Google.
        </p>
        <div className="max-w-sm">
          <SetPasswordForm submitLabel="Change password" />
        </div>
      </section>

      {access ? (
        <section aria-labelledby="access-heading" className="bg-card rounded-xl border p-4 sm:p-6">
          <h2 id="access-heading" className="text-sm font-medium">
            Access
          </h2>
          <p className="text-muted-foreground mt-1 mb-4 text-xs">
            Only you see this, as an owner. Send a one-time link, or add an address you already
            know. Owners come from ALLOWED_EMAILS in Vercel.
          </p>
          <InviteLinksManager links={access.links} now={access.now} timeZone={EXAM_TIME_ZONE} />
          <div className="mt-6 border-t pt-6">
            <AccessManager access={access} timeZone={EXAM_TIME_ZONE} />
          </div>
        </section>
      ) : (
        <p className="text-muted-foreground text-sm">
          Who can use OttoHSK is managed by its owner.
        </p>
      )}
    </PageContainer>
  );
}
