import { z } from "zod";

import { PASSWORD_MAX, PASSWORD_MIN } from "@/lib/password-rules";

export const setPasswordSchema = z
  .object({
    password: z
      .string()
      .min(PASSWORD_MIN, `Use at least ${PASSWORD_MIN} characters`)
      .max(PASSWORD_MAX, `Keep it under ${PASSWORD_MAX} characters`),
    confirm: z.string(),
  })
  .refine((v) => v.password === v.confirm, {
    message: "The two passwords don't match",
    path: ["confirm"],
  });

export const passwordSignInSchema = z.object({
  email: z.string().trim().toLowerCase().max(254).pipe(z.email("Enter your email address")),
  password: z.string().min(1, "Enter your password").max(PASSWORD_MAX),
});

/** "" clears the exam date; otherwise a real calendar date. */
function isRealDate(iso: string): boolean {
  const d = new Date(`${iso}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().startsWith(iso);
}

export const studySettingsSchema = z.object({
  level: z.coerce.number().pipe(z.union([z.literal(5), z.literal(6)])),
  examDate: z
    .string()
    .trim()
    .refine((v) => v === "" || (/^\d{4}-\d{2}-\d{2}$/.test(v) && isRealDate(v)), "Pick a real date, or leave it empty")
    .transform((v) => v || null),
});
