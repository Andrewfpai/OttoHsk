/** A date as the learner reads it, in their time zone: "7 Nov 2026". */
export function formatDate(
  date: Date,
  timeZone: string,
  options: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" },
): string {
  return new Intl.DateTimeFormat("en-GB", { timeZone, ...options }).format(date);
}
