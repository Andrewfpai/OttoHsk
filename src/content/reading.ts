import { readingH51328 } from "./reading-h51328";
import { readingH51329 } from "./reading-h51329";
import { readingH51332 } from "./reading-h51332";
import { readingH51553C } from "./reading-h51553c";
import type { ReadingSet } from "./types";

/**
 * The HSK 5 reading papers, in the order of the learner's Hsk5set1.pdf
 * (sets A–D). Reading Parts 2 and 3 of each, with the official keys.
 */
export const READING_SETS: ReadingSet[] = [
  { label: "A", paper: readingH51329 },
  { label: "B", paper: readingH51332 },
  { label: "C", paper: readingH51328 },
  { label: "D", paper: readingH51553C },
];
