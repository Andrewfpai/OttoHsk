"use server";

import { and, count, eq, gte } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { db } from "@/db";
import { essays } from "@/db/schema";
import { type ActionResult, fail, ok } from "@/lib/action-result";
import { requireUser } from "@/lib/auth-guard";
import { EXAM_TIME_ZONE, localDate } from "@/lib/exam";

import { countChars } from "../lib/checks";
import { type Attempt, AllModelsFailed, completeWithFallback } from "../lib/fallback";
import { type Feedback, buildMessages, parseFeedback } from "../lib/feedback";
import { DAILY_ESSAY_LIMIT, aiConfig } from "./ai";

/** Writing time is recorded, never a reason to refuse; a tab left open overnight still checks. */
const duration = z.number().int().min(0).transform((ms) => Math.min(ms, 24 * 60 * 60_000));

const schema = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("q99"),
    words: z.array(z.string().trim().min(1).max(8)).length(5),
    body: z.string().trim().min(10).max(600),
    durationMs: duration,
  }),
  z.object({
    kind: z.literal("q100"),
    scene: z.string().trim().min(4).max(300),
    body: z.string().trim().min(10).max(600),
    durationMs: duration,
  }),
]);

export type EssayResult = {
  id: string;
  feedback: Feedback;
  /** The model that answered. */
  model: string;
  /** Every model tried, in order, including the ones that failed. */
  attempts: Attempt[];
};

/** Midnight today in the exam's time zone, as a Date. */
function startOfToday(): Date {
  const today = localDate(new Date(), EXAM_TIME_ZONE);
  // Jakarta is UTC+7 all year, with no daylight saving.
  return new Date(`${today}T00:00:00+07:00`);
}

export async function checkEssay(input: unknown): Promise<ActionResult<EssayResult>> {
  const user = await requireUser();
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    const tooShort = parsed.error.issues.some((i) => i.path[0] === "body");
    return fail(
      tooShort
        ? "Write at least a sentence before asking for feedback."
        : "Check the task: Q99 needs all five words, Q100 a picture description.",
    );
  }
  const essay = parsed.data;

  const config = aiConfig();
  if (!config) return fail("AI feedback is not set up: AI_API_KEY is missing.", "NO_AI");

  const [{ n }] = await db
    .select({ n: count() })
    .from(essays)
    .where(and(eq(essays.userId, user.id), gte(essays.createdAt, startOfToday())));
  if (n >= DAILY_ESSAY_LIMIT) {
    return fail(`That's ${DAILY_ESSAY_LIMIT} checks today, the daily limit. Try again tomorrow.`, "LIMIT");
  }

  const prompt = essay.kind === "q99" ? essay.words.join("、") : essay.scene;

  let result;
  try {
    result = await completeWithFallback({
      ...config,
      messages: buildMessages(essay.kind, prompt, essay.body),
      parse: parseFeedback,
    });
  } catch (error) {
    if (error instanceof AllModelsFailed) {
      const tried = error.attempts.map((a) => `${a.model}: ${a.error}`).join("; ");
      return fail(`None of the models could check it right now (${tried}). Your essay is still here; try again in a minute.`, "AI_DOWN");
    }
    throw error;
  }

  const [row] = await db
    .insert(essays)
    .values({
      userId: user.id,
      kind: essay.kind,
      prompt,
      body: essay.body,
      chars: countChars(essay.body),
      durationMs: essay.durationMs,
      score: result.value.score,
      feedback: result.value,
      model: result.model,
    })
    .returning({ id: essays.id });

  revalidatePath("/essays");
  return ok({ id: row.id, feedback: result.value, model: result.model, attempts: result.attempts });
}
