/**
 * Reading Part 1 (questions 46–60) passages transcribed from the learner's
 * own papers ("mengisi" d and E).
 */
import { clozeD } from "./cloze-d";
import { clozeE } from "./cloze-e";
import type { ClozePassage } from "./types";

export const clozePassages: ClozePassage[] = [...clozeD, ...clozeE];
