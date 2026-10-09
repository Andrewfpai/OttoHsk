import { z } from "zod";

import { SECTION_MAX } from "@/lib/exam";

const score = (max: number) => z.coerce.number().int().min(0).max(max);

export const mockSchema = z.object({
  takenOn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Pick a date"),
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
