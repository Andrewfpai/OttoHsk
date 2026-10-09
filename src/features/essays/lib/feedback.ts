/**
 * What the examiner model is asked for, and how its reply is read.
 *
 * Models wrap JSON in prose or code fences often enough that the parser
 * takes the outermost {...} rather than trusting the whole reply. Anything
 * still unreadable throws, which makes the fallback move to the next model.
 */
import { z } from "zod";

import type { ChatMessage } from "./fallback";

export type EssayKind = "q99" | "q100";

export const feedbackSchema = z.object({
  score: z.coerce.number().min(0).max(100).transform(Math.round),
  summary: z.string().min(1),
  wordUse: z
    .array(z.object({ word: z.string(), ok: z.boolean(), note: z.string().default("") }))
    .default([]),
  corrections: z
    .array(z.object({ original: z.string(), corrected: z.string(), why: z.string() }))
    .max(12)
    .default([]),
  corrected: z.string().default(""),
  modelAnswer: z.string().min(1),
  tips: z.array(z.string()).max(5).default([]),
});

export type Feedback = z.infer<typeof feedbackSchema>;

export function parseFeedback(content: string): Feedback {
  const start = content.indexOf("{");
  const end = content.lastIndexOf("}");
  if (start === -1 || end <= start) throw new Error("No JSON object in reply");
  return feedbackSchema.parse(JSON.parse(content.slice(start, end + 1)));
}

const SHAPE = `{
  "score": number 0-100, how an HSK 5 examiner would rate this answer,
  "summary": "2 sentences in English: the overall verdict and the single most important fix",
  "wordUse": [ { "word": "给定词", "ok": true or false, "note": "English, why the use is right or wrong" } ],
  "corrections": [ { "original": "the learner's wrong phrase, copied exactly", "corrected": "the fixed phrase", "why": "English, one sentence" } ],
  "corrected": "the learner's essay with only the errors fixed, keeping their ideas",
  "modelAnswer": "a strong model answer of about 80 characters for the same task",
  "tips": ["up to 3 short English tips"]
}`;

export function buildMessages(kind: EssayKind, prompt: string, body: string): ChatMessage[] {
  const task =
    kind === "q99"
      ? `HSK 5 Writing question 99: write a short passage of about 80 Chinese characters that uses ALL of these five words: ${prompt}.`
      : `HSK 5 Writing question 100: write a short passage of about 80 Chinese characters about this picture. The picture shows: ${prompt}`;

  return [
    {
      role: "system",
      content: [
        "You are an experienced HSK 5 (HSK 2.0) writing examiner helping a learner prepare.",
        "The learner reads English well; write every explanation in plain, simple English.",
        "Judge grammar, word choice, whether the task was completed (all five words used correctly for Q99; relevance to the picture for Q100), coherence, and length (about 80 characters).",
        "List real errors only, most important first; do not invent problems in a correct essay.",
        kind === "q99"
          ? "Fill wordUse with one entry for each of the five given words."
          : "Leave wordUse as an empty array.",
        "Reply with ONLY a JSON object, no other text, in exactly this shape:",
        SHAPE,
      ].join("\n"),
    },
    { role: "user", content: `${task}\n\nThe learner's answer:\n${body}` },
  ];
}
