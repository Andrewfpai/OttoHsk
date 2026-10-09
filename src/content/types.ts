/**
 * Shapes for the hand-written study content. Everything here is static: it
 * ships with the app and is never stored in the database. Only a learner's
 * results are stored, keyed by these ids — so ids must never change once
 * published, or past results lose their item.
 */

/** Two or three near-synonyms that HSK 5 reading Part 1 likes to test. */
export type ConfusableSet = {
  /** Stable kebab-case id, e.g. "bixu-bixu2". */
  id: string;
  words: { hanzi: string; pinyin: string; gloss: string }[];
  /** How they differ, in plain English. 2–4 sentences. */
  explanation: string;
  questions: {
    /** The sentence with exactly one blank written as ＿＿. */
    sentence: string;
    /** Must be one of `words[].hanzi`. */
    answer: string;
    /** One sentence on why this word, not the other. */
    why: string;
  }[];
};

/** One HSK 5 writing Part 1 item: put the chunks in order. */
export type OrderingItem = {
  /** Stable id, e.g. "ord-001". */
  id: string;
  /** The chunks in the correct order. The app shuffles them. */
  chunks: string[];
  /** Other complete orders that are also correct, if any. */
  alternatives?: string[][];
  /** Sentence-final punctuation. Defaults to "。". */
  end?: "。" | "？" | "！";
  translation: string;
  /** The grammar point being tested, e.g. "把 sentence". */
  point: string;
  /** Why the words go in this order. 1–3 sentences. */
  explanation: string;
};

export type GrammarCategory =
  | "connector"
  | "structure"
  | "adverb"
  | "complement"
  | "preposition"
  | "expression";

export type GrammarPattern = {
  /** Stable kebab-case id, e.g. "yuqi-buru". */
  id: string;
  /** As learners write it, e.g. "与其……不如……". */
  pattern: string;
  pinyin: string;
  category: GrammarCategory;
  /** Short English meaning, e.g. "rather than A, better B". */
  meaning: string;
  /** How and when to use it. 2–4 sentences. */
  explanation: string;
  examples: { zh: string; pinyin: string; en: string }[];
  quiz: {
    /** The sentence with exactly one blank written as ＿＿. */
    prompt: string;
    options: string[];
    /** Must be one of `options`. */
    answer: string;
  }[];
};
