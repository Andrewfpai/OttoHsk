import { listeningHsk6Paper1 } from "./listening-hsk6-1";
import { listeningHsk6Paper2 } from "./listening-hsk6-2";
import type { ListeningPaper } from "./types";

/**
 * New HSK 6 listening practice papers (questions 1–40 each), recorded by
 * `npx tsx scripts/build-listening-audio.ts` (clips: listening-audio.json).
 */
export const listeningHsk6: ListeningPaper[] = [listeningHsk6Paper1, listeningHsk6Paper2];
