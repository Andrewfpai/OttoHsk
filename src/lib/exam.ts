/**
 * The default exam day for new accounts. Each person can change or clear it
 * in Settings; the countdown uses theirs.
 */
export const DEFAULT_EXAM_DATE = "2026-11-07";

/** Days are counted in the learner's local calendar, not UTC. */
export const EXAM_TIME_ZONE = "Asia/Jakarta";


/** The calendar date ("YYYY-MM-DD") at `now` in `timeZone`. */
export function localDate(now: Date, timeZone = EXAM_TIME_ZONE): string {
  // en-CA formats as YYYY-MM-DD.
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

function dayNumber(isoDate: string): number {
  const [y, m, d] = isoDate.split("-").map(Number);
  return Date.UTC(y, m - 1, d) / 86_400_000;
}

/**
 * Whole days from today to exam day. 0 on the day itself, negative after it,
 * null when no exam date is set.
 */
export function daysUntilExam(now: Date, examDate: string | null): number | null {
  if (!examDate) return null;
  return dayNumber(examDate) - dayNumber(localDate(now));
}
