/**
 * Turns a deck into a multiple-choice test.
 *
 * Three kinds, mixed evenly: hanzi → meaning (reading), meaning → hanzi
 * (recall), and hanzi → pinyin. Pinyin matters on the computer-based exam:
 * you can only type a character you can spell.
 *
 * Every option is a word id, so grading is just "did they pick the word
 * itself". Distractors are chosen so that no two options could both be
 * right: their meanings (or pinyin, for pinyin questions) must differ from
 * the answer's.
 */
import type { Word } from "@/content/words";
import { syllableCount } from "@/lib/pinyin";
import { type Rng, shuffle } from "@/lib/random";

export type QuestionKind = "meaning" | "hanzi" | "pinyin";

export type Question = {
  wordId: string;
  kind: QuestionKind;
  /** Word ids, answer included, in display order. */
  options: string[];
};

const KINDS: QuestionKind[] = ["meaning", "hanzi", "pinyin"];
const OPTION_COUNT = 4;

function glossParts(w: Word): string[] {
  return w.gloss.split("; ");
}

/**
 * Two words clash when one could pass for the other's answer: same pinyin
 * for a pinyin question, or any shared meaning otherwise (爱护 and 爱惜 both
 * gloss as "to cherish").
 */
function clash(a: Word, b: Word, kind: QuestionKind): boolean {
  if (a.id === b.id) return true;
  if (kind === "pinyin") return a.pinyin === b.pinyin;
  const parts = glossParts(b);
  return glossParts(a).some((m) => parts.includes(m));
}

function distractorsFor(word: Word, kind: QuestionKind, pool: readonly Word[], rng: Rng): Word[] {
  const clashes = (other: Word) => clash(word, other, kind);

  const candidates = pool.filter((w) => !clashes(w));

  // Similar-looking options make the question about knowing the word, not
  // about spotting the odd one out: same syllable count for pinyin, a shared
  // part of speech for meanings.
  const similar = candidates.filter((w) =>
    kind === "pinyin"
      ? syllableCount(w.pinyin) === syllableCount(word.pinyin)
      : w.pos.some((p) => word.pos.includes(p)),
  );

  const source = similar.length >= OPTION_COUNT - 1 ? similar : candidates;
  const picked: Word[] = [];
  for (const w of shuffle(source, rng)) {
    // Distractors must not clash with each other either.
    if (picked.some((p) => clash(p, w, kind))) continue;
    picked.push(w);
    if (picked.length === OPTION_COUNT - 1) break;
  }
  return picked;
}

export function buildQuestions(deck: readonly Word[], pool: readonly Word[], rng: Rng): Question[] {
  return shuffle(deck, rng).map((word, i) => {
    const kind = KINDS[i % KINDS.length];
    const options = shuffle([word, ...distractorsFor(word, kind, pool, rng)], rng).map((w) => w.id);
    return { wordId: word.id, kind, options };
  });
}
