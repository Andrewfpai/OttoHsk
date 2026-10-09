/**
 * Who may use the app: the Google addresses in ALLOWED_EMAILS, comma-separated.
 *
 * Read from the environment on every call, so a change in Vercel takes effect
 * on the next deploy without touching data.
 */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function allowedEmails(): string[] {
  return (process.env.ALLOWED_EMAILS ?? "")
    .split(",")
    .map(normalizeEmail)
    .filter(Boolean);
}

export function isAllowedEmail(email: string | null | undefined): boolean {
  return Boolean(email) && allowedEmails().includes(normalizeEmail(email!));
}
