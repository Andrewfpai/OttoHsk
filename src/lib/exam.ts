/**
 * The exam everything counts down to. HSK 2.0 level 5, computer-based.
 */
export const EXAM_DATE = "2026-11-07";

/** Days are counted in the learner's local calendar, not UTC. */
export const EXAM_TIME_ZONE = "Asia/Jakarta";

/** Section sizes, for showing "30/45". Writing counts Part 1 only. */
export const SECTION_MAX = { listening: 45, reading: 45, writing: 8 } as const;

export type Section = keyof typeof SECTION_MAX;

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
 * Whole days from today to exam day. 0 on the day itself, negative after it.
 */
export function daysUntilExam(now: Date, examDate = EXAM_DATE): number {
  return dayNumber(examDate) - dayNumber(localDate(now));
}
