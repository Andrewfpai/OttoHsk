/**
 * New HSK 6 writing (two tasks, 45 minutes in all): Part 1 is a practical
 * text of at least 150 characters, Part 2 an opinion essay of at least 300.
 */
import type { WritingPrompt } from "@/content/types";

import type { ChatMessage } from "./fallback";

/** Suggested time per task: the exam's 45 minutes, split by length. */
export const WRITING_MS: Record<WritingPrompt["kind"], number> = {
  practical: 15 * 60_000,
  opinion: 30 * 60_000,
};

export type WritingLength = "short" | "good" | "long";

/** At the minimum is enough; well over twice it is more than the exam needs. */
export function writingLength(chars: number, min: number): WritingLength {
  if (chars < min) return "short";
  if (chars > min * 2.2) return "long";
  return "good";
}

const SHAPE = `{
  "score": number 0-100, how an HSK 6 examiner would rate this answer,
  "summary": "2 sentences in English: the overall verdict and the single most important fix",
  "wordUse": [],
  "corrections": [ { "original": "the learner's wrong phrase, copied exactly", "corrected": "the fixed phrase", "why": "English, one sentence" } ],
  "corrected": "the learner's text with only the errors fixed, keeping their ideas and structure",
  "modelAnswer": "a strong model answer for the same task, a little over the minimum length",
  "tips": ["up to 3 short English tips"],
  "coverage": [ { "point": "a point the task asks for, in Chinese", "kept": true or false, "note": "English, how well it was covered" } ]
}`;

export function buildWritingMessages(prompt: WritingPrompt, body: string): ChatMessage[] {
  const part =
    prompt.kind === "practical"
      ? `New HSK 6 Writing Part 1 (practical writing, at least ${prompt.minChars} characters).`
      : `New HSK 6 Writing Part 2 (opinion essay, at least ${prompt.minChars} characters).`;
  return [
    {
      role: "system",
      content: [
        "You are an experienced HSK 6 (new HSK, HSK 3.0) writing examiner helping a learner prepare.",
        "The learner reads English well; write every explanation in plain, simple English.",
        prompt.kind === "practical"
          ? "Judge whether the text does its job: right format and register for the genre (notice, letter, post…), every point the task asks for covered, clear and polite; then grammar and word choice."
          : "Judge the argument: a clear position, reasons and examples that support it, logical structure with an opening and a conclusion, linking words; then grammar, word choice and range of HSK 6 vocabulary.",
        `Answers under ${prompt.minChars} characters lose marks for length.`,
        "List real errors only, most important first; do not invent problems in correct writing.",
        "Fill coverage with one entry for each point or requirement the task names (for an opinion essay: position, reasons, examples, conclusion).",
        "Reply with ONLY a JSON object, no other text, in exactly this shape:",
        SHAPE,
      ].join("\n"),
    },
    { role: "user", content: `${part}\nThe task: ${prompt.prompt}\n\nThe learner's answer:\n${body}` },
  ];
}
