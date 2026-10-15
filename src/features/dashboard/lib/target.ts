/**
 * A straight-line plan to know every word a week before the exam (the last
 * days are for revision, not new words): the same number of words each day,
 * from the learner's first flashcard test to the goal date.
 *
 * Progress counts learning words too, but only in part: a word earns its
 * full place once it is known, and a share before that by strength. Seeing
 * a word once is a start, not the job done.
 */
import { KNOWN_STRENGTH } from "@/features/flashcards/lib/schedule";

/** Days before the exam by which every word should be known. */
export const KNOW_BY_DAYS_BEFORE_EXAM = 6;

/** How much one word counts towards the target: ¼ per strength step, 1 once known. */
export function wordCredit(strength: number): number {
  return Math.min(1, (strength + 1) / (KNOWN_STRENGTH + 1));
}

/** Total credit for a learner's words (strengths of the words they have started). */
export function progressOf(strengths: readonly number[]): number {
  return Math.round(strengths.reduce((sum, s) => sum + wordCredit(s), 0));
}

export type DailyTarget = {
  /** "YYYY-MM-DD": the day every word should be known. */
  goalDate: string;
  /** Words to get to "known" each day. */
  perDay: number;
  /** Day of the plan today is: 1 on the first day. */
  day: number;
  planDays: number;
  /** Progress there should be by the end of today. */
  targetToday: number;
  /** Credit earned so far: known words count 1, learning words ¼–¾. */
  progress: number;
  /** Progress still to make today to be on track; 0 when on track. */
  behind: number;
};

function dayNumber(iso: string): number {
  const [y, m, d] = iso.split("-").map(Number);
  return Date.UTC(y, m - 1, d) / 86_400_000;
}

function addDays(iso: string, days: number): string {
  return new Date((dayNumber(iso) + days) * 86_400_000).toISOString().slice(0, 10);
}

/**
 * `startDate` is the day of the first flashcard test at this level (today if
 * none yet); all dates are "YYYY-MM-DD" in the learner's calendar. Null when
 * there is no exam date, or the goal day has already passed.
 */
export function dailyTarget({
  total,
  progress,
  startDate,
  today,
  examDate,
}: {
  total: number;
  progress: number;
  startDate: string;
  today: string;
  examDate: string | null;
}): DailyTarget | null {
  if (!examDate) return null;
  const goalDate = addDays(examDate, -KNOW_BY_DAYS_BEFORE_EXAM);
  if (dayNumber(today) > dayNumber(goalDate)) return null;
  const start = dayNumber(startDate) <= dayNumber(today) ? startDate : today;
  const planDays = Math.max(1, dayNumber(goalDate) - dayNumber(start) + 1);
  const day = Math.min(planDays, dayNumber(today) - dayNumber(start) + 1);
  const perDay = Math.ceil(total / planDays);
  const targetToday = Math.min(total, perDay * day);
  return { goalDate, perDay, day, planDays, targetToday, progress, behind: Math.max(0, targetToday - progress) };
}
