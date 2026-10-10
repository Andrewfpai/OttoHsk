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
 * the answer's. Tones are ignored for pinyin: two options that differ only
 * in tone are never offered together.
 *
 * Difficulty is mixed, about half and half:
 * - medium: same number of characters and a shared part of speech, so no
 *   option can be ruled out at a glance;
 * - hard: look-alikes — words from the same confusable set, words sharing a
 *   character (安排 / 安慰 / 安装), and words that sound alike.
 */
import { confusables } from "@/content/confusables";
import type { Word } from "@/content/words";
import { plainPinyin } from "@/lib/pinyin";
import { type Rng, shuffle } from "@/lib/random";

export type QuestionKind = "meaning" | "hanzi" | "pinyin";
export type Difficulty = "medium" | "hard";

export type Question = {
  wordId: string;
  kind: QuestionKind;
  difficulty: Difficulty;
  /** Word ids, answer included, in display order. */
  options: string[];
};

const KINDS: QuestionKind[] = ["meaning", "hanzi", "pinyin"];
const OPTION_COUNT = 4;
/**
 * Asked for in this share of questions. Some words have too few look-alikes
 * and fall back to medium, so this lands the real mix near half and half.
 */
const HARD_SHARE = 0.63;
/** A hard question has at least this many look-alike distractors. */
export const MIN_LOOKALIKES = 2;

/** Senses split on ";" and on "," outside brackets: "group, team" is two. */
function glossParts(w: Word): string[] {
  return w.gloss
    .split(/[;,](?![^(]*\))/)
    .map((s) => s.trim())
    .filter(Boolean);
}

const plainCache = new Map<string, string>();
function plain(w: Word): string {
  let p = plainCache.get(w.id);
  if (p === undefined) plainCache.set(w.id, (p = plainPinyin(w.pinyin)));
  return p;
}

/** hanzi → the other words in its confusable sets. */
const confusableMates = new Map<string, Set<string>>();
for (const set of confusables) {
  for (const a of set.words) {
    const mates = confusableMates.get(a.hanzi) ?? new Set<string>();
    for (const b of set.words) if (b.hanzi !== a.hanzi) mates.add(b.hanzi);
    confusableMates.set(a.hanzi, mates);
  }
}

/** Edit distance, stopping early once it passes `max`. */
function withinEdits(a: string, b: string, max: number): boolean {
  if (Math.abs(a.length - b.length) > max) return false;
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let best = i;
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      best = Math.min(best, cur[j]);
    }
    if (best > max) return false;
    prev = cur;
  }
  return prev[b.length] <= max;
}

/**
 * Two words clash when one could pass for the other's answer: the same
 * pinyin, tones aside, for a pinyin question, or any shared meaning
 * otherwise (爱护 and 爱惜 both gloss as "to cherish").
 */
function clash(a: Word, b: Word, kind: QuestionKind): boolean {
  if (a.id === b.id) return true;
  if (kind === "pinyin") return plain(a) === plain(b);
  const parts = glossParts(b);
  return glossParts(a).some((m) => parts.includes(m));
}

/**
 * Toneless pinyin one letter apart (jianzhu / jianzhi), or identical for a
 * short syllable, where one letter apart is just a different sound.
 */
function soundsAlike(a: string, b: string): boolean {
  return a.length >= 4 ? withinEdits(a, b, 1) : a === b;
}

/** Look-alikes for `word`, most confusing first: confusable sets, a shared character, a similar sound. */
function lookalikes(word: Word, candidates: readonly Word[], rng: Rng): Word[] {
  const mates = confusableMates.get(word.hanzi);
  const chars = new Set(word.hanzi);
  const sound = plain(word);
  const confusing: Word[] = [];
  const sharing: Word[] = [];
  const soundAlike: Word[] = [];
  for (const w of candidates) {
    if (mates?.has(w.hanzi)) confusing.push(w);
    else if ([...w.hanzi].some((c) => chars.has(c))) sharing.push(w);
    else if (w.hanzi.length === word.hanzi.length && soundsAlike(sound, plain(w))) soundAlike.push(w);
  }
  return [...shuffle(confusing, rng), ...shuffle(sharing, rng), ...shuffle(soundAlike, rng)];
}

/** Same number of characters and a shared part of speech, loosening only if too few. */
function similar(word: Word, candidates: readonly Word[]): Word[] {
  const samePos = (w: Word) => w.pos.some((p) => word.pos.includes(p));
  const sameLength = (w: Word) => w.hanzi.length === word.hanzi.length;
  for (const test of [(w: Word) => sameLength(w) && samePos(w), samePos, sameLength]) {
    const found = candidates.filter(test);
    if (found.length >= OPTION_COUNT * 3) return found;
  }
  return [...candidates];
}

function distractorsFor(
  word: Word,
  kind: QuestionKind,
  wantHard: boolean,
  pool: readonly Word[],
  rng: Rng,
): { distractors: Word[]; difficulty: Difficulty } {
  const candidates = pool.filter((w) => !clash(word, w, kind));
  const picked: Word[] = [];
  const take = (source: readonly Word[]) => {
    for (const w of source) {
      if (picked.length === OPTION_COUNT - 1) return;
      // Distractors must not clash with each other either.
      if (picked.some((p) => p.id === w.id || clash(p, w, kind))) continue;
      picked.push(w);
    }
  };

  let lookalikeCount = 0;
  if (wantHard) {
    take(lookalikes(word, candidates, rng));
    lookalikeCount = picked.length;
  }
  take(shuffle(similar(word, candidates), rng));
  take(shuffle(candidates, rng));

  return {
    distractors: picked,
    difficulty: lookalikeCount >= MIN_LOOKALIKES ? "hard" : "medium",
  };
}

export function buildQuestions(deck: readonly Word[], pool: readonly Word[], rng: Rng): Question[] {
  return shuffle(deck, rng).map((word, i) => {
    const kind = KINDS[i % KINDS.length];
    const { distractors, difficulty } = distractorsFor(word, kind, rng() < HARD_SHARE, pool, rng);
    const options = shuffle([word, ...distractors], rng).map((w) => w.id);
    return { wordId: word.id, kind, difficulty, options };
  });
}
