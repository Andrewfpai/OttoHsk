import { z } from "zod";

import { SECTION_MAX, localDate } from "@/lib/exam";

/** A real calendar date, not in the future (the learner's today). */
function isPastOrToday(iso: string): boolean {
  const d = new Date(`${iso}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().startsWith(iso) && iso <= localDate(new Date());
}

const score = (max: number) => z.coerce.number().int().min(0).max(max);

export const mockSchema = z.object({
  takenOn: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Pick a date")
    .refine(isPastOrToday, "Pick a real date, today or earlier"),
  label: z
    .string()
    .trim()
    .max(60)
    .transform((s) => s || null),
  listening: score(SECTION_MAX.listening),
  reading: score(SECTION_MAX.reading),
  writing: score(SECTION_MAX.writing),
});

export type MockInput = z.infer<typeof mockSchema>;
