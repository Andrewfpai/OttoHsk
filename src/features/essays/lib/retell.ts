/**
 * HSK 6 writing (question 101, 缩写): read a story for 10 minutes, then
 * retell it in about 400 characters, with a title, from memory, in 35.
 */
import type { RetellStory } from "@/content/types";

import type { ChatMessage } from "./fallback";

export const READ_MS = 10 * 60_000;
export const WRITE_MS = 35 * 60_000;
export const RETELL_TARGET = 400;

export type RetellLength = "short" | "good" | "long";

/** "About 400": 300–500 is fine. */
export function retellLength(chars: number): RetellLength {
  if (chars < 300) return "short";
  if (chars > 500) return "long";
  return "good";
}

const SHAPE = `{
  "score": number 0-100, how an HSK 6 examiner would rate this retelling,
  "summary": "2 sentences in English: the overall verdict and the single most important fix",
  "coverage": [ { "point": "one key point of the story, in Chinese, as given", "kept": true or false, "note": "English, what was missing or distorted; empty if kept well" } ],
  "titleNote": "one English sentence on the title (fits the story? too long?)",
  "corrections": [ { "original": "the learner's wrong phrase, copied exactly", "corrected": "the fixed phrase", "why": "English, one sentence" } ],
  "corrected": "the learner's retelling with only the errors fixed, keeping their wording",
  "modelAnswer": "a strong model retelling of about 400 characters, with a title on the first line",
  "tips": ["up to 3 short English tips"],
  "wordUse": []
}`;

export function buildRetellMessages(story: RetellStory, title: string, body: string): ChatMessage[] {
  return [
    {
      role: "system",
      content: [
        "You are an experienced HSK 6 (HSK 2.0) writing examiner helping a learner prepare for question 101 (缩写).",
        "The task: the learner read the story below for 10 minutes, then retold it from memory in about 400 Chinese characters with a title. Copying is impossible, so judge it as a retelling, not a summary of a text they could see.",
        "Judge, in this order: whether the main events, their order and the ending/lesson are kept (use the key points given); accuracy (nothing invented that changes the story); language (grammar, word choice, connectives); coherence; length (about 400 characters); and whether there is a fitting title.",
        "The learner reads English well; write every explanation in plain, simple English.",
        "Fill coverage with one entry per key point, in the same order. List real language errors only, most important first.",
        "Reply with ONLY a JSON object, no other text, in exactly this shape:",
        SHAPE,
      ].join("\n"),
    },
    {
      role: "user",
      content: [
        `The story (${story.title}):`,
        story.text,
        "",
        "Key points a good retelling keeps:",
        ...story.keyPoints.map((p, i) => `${i + 1}. ${p}`),
        "",
        `The learner's title: ${title || "(none)"}`,
        "The learner's retelling:",
        body,
      ].join("\n"),
    },
  ];
}
