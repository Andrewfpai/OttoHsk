/**
 * Sentence-ordering items transcribed from the learner's own papers
 * (组词成句 A–M). The drill mixes these with the built-in set, 60/40.
 */
import type { OrderingItem } from "./types";
import { orderingPapersAD } from "./ordering-papers-a-d";
import { orderingPapersEM } from "./ordering-papers-e-m";

export const orderingPapers: OrderingItem[] = [...orderingPapersAD, ...orderingPapersEM];
