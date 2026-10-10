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
  /** Where it came from, e.g. "组词成句 (A) 1", for items from your own papers. */
  source?: string;
};

/**
 * One HSK 5 Reading Part 1 passage (questions 46–60): a text with numbered
 * blanks, four options per blank.
 */
export type ClozePassage = {
  /** Stable id, e.g. "d-2012-1-46". */
  id: string;
  /** Where it came from, e.g. "HSK 5 (A) 2012 (I) · 46–48". */
  source: string;
  /**
   * The passage. Each blank is written as {{n}} with its question number,
   * e.g. "有个女人一直{{46}}住在对面的女人". Paragraphs are separated by a newline.
   */
  text: string;
  blanks: {
    /** The question number, matching a {{n}} in `text`. */
    number: number;
    /** Exactly four options, in A–D order. */
    options: [string, string, string, string];
    /** Index of the right option: 0 = A … 3 = D. */
    answer: 0 | 1 | 2 | 3;
    /** One English sentence on why it is right and the others are not. */
    why: string;
  }[];
};

/**
 * One HSK 6 Reading Part 1 item (questions 51–60): four sentences, exactly
 * one of which has a grammatical or usage error (病句).
 */
export type ErrorItem = {
  /** Stable id, e.g. "err-001". */
  id: string;
  /** Four sentences, in A–D order. */
  sentences: [string, string, string, string];
  /** Index of the sentence with the error: 0 = A … 3 = D. */
  wrong: 0 | 1 | 2 | 3;
  /** The wrong sentence, corrected with the smallest change. */
  corrected: string;
  /** The kind of error, e.g. "Redundancy (重复)", "Missing subject". */
  point: string;
  /** One or two English sentences on what is wrong and why. */
  why: string;
};

/**
 * One HSK 6 writing task (question 101, 缩写): read a story for 10 minutes,
 * then retell it in about 400 characters from memory, with a title.
 */
export type RetellStory = {
  /** Stable id, e.g. "story-01". */
  id: string;
  /** A title a learner might give it. */
  title: string;
  /** The story, 800–1,000 characters. Paragraphs separated by a newline. */
  text: string;
  /** The 5–8 points a good retelling keeps, in order, in Chinese. */
  keyPoints: string[];
};
