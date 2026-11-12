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

/** One question of an HSK reading paper: four options, one right. */
export type ReadingQuestion = {
  /** The exam question number, e.g. 71. */
  number: number;
  /** The question; Part 2 has none (choose the statement that matches). */
  prompt?: string;
  options: [string, string, string, string];
  /** Index of the right option: 0 = A … 3 = D. */
  answer: 0 | 1 | 2 | 3;
  /** One or two English sentences on why, pointing at the passage. */
  why: string;
};

/** A passage with its questions. [[…]] in the text marks an underlined part. */
export type ReadingItem = {
  /** Stable id, e.g. "h51329-71". */
  id: string;
  /** "61" or "71–74". */
  numbers: string;
  /** Paragraphs separated by a newline. */
  passage: string;
  questions: ReadingQuestion[];
};

/** HSK 5 Reading Parts 2 (61–70) and 3 (71–90) of one paper. */
export type ReadingPaper = {
  id: string;
  title: string;
  source: string;
  part2: ReadingItem[];
  part3: ReadingItem[];
};

/**
 * One word of a reading text, as built by scripts/build-reading-tokens.ts.
 * Punctuation and other non-hanzi text are tokens with `t` only.
 */
export type ReadingToken = {
  /** The text itself. "\n" on its own breaks a paragraph. */
  t: string;
  /** Pinyin, read in context. */
  p?: string;
  /** Meaning. */
  g?: string;
  /** Level, e.g. "HSK 5" or "HSK 3.0 · 7". */
  l?: string;
  /** Word id, when it is in the learner's word lists (and so can be starred). */
  id?: string;
  /** Underlined in the paper. */
  u?: 1;
};

/** A paper in the reading section, with the letter it goes by ("A"). */
export type ReadingSet = { label: string; paper: ReadingPaper };

/**
 * New HSK 6 Reading Part 2 (questions 51–60): a passage with five gaps and
 * six sentences, A–F; five fill the gaps and one fits nowhere.
 */
export type SentenceFillPassage = {
  /** Stable id, e.g. "h6-sf-01". */
  id: string;
  /** Where it came from, e.g. "HSK 6 practice · 1". */
  source: string;
  /** Gaps written as {{51}} … {{55}} with their question numbers. Paragraphs by "\n". */
  text: string;
  /** The six sentences, A–F. */
  options: [string, string, string, string, string, string];
  /** One per gap, in order. `answer` is the option index, 0 = A … 5 = F. */
  blanks: { number: number; answer: number; why: string }[];
};

/** A new HSK 6 writing task: Part 1 practical writing, Part 2 an opinion essay. */
export type WritingPrompt = {
  /** Stable id, e.g. "h6-w1-01". */
  id: string;
  kind: "practical" | "opinion";
  /** The task in Chinese, as the exam words it. */
  prompt: string;
  /** The same in English, for the learner. */
  english: string;
  /** Minimum length in characters: 150 for Part 1, 300 for Part 2. */
  minChars: number;
};
