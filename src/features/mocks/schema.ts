import { z } from "zod";

import { localDate } from "@/lib/exam";
import { type Level, SECTION_MAX } from "@/lib/levels";

/** A real calendar date, not in the future (the learner's today). */
function isPastOrToday(iso: string): boolean {
  const d = new Date(`${iso}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().startsWith(iso) && iso <= localDate(new Date());
}

const score = (max: number) => z.coerce.number().int().min(0).max(max);

/** One mock paper's scores, within the section sizes of `level`. */
export function mockSchema(level: Level) {
  const max = SECTION_MAX[level];
  return z.object({
    takenOn: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Pick a date")
      .refine(isPastOrToday, "Pick a real date, today or earlier"),
    label: z
      .string()
      .trim()
      .max(60)
      .transform((s) => s || null),
    listening: score(max.listening),
    reading: score(max.reading),
    writing: score(max.writing),
  });
}

export type MockInput = z.infer<ReturnType<typeof mockSchema>>;
