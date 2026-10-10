/**
 * Turns a deck into a test.
 *
 * Four kinds, mixed evenly:
 * - meaning:  hanzi → pick the meaning (reading);
 * - hanzi:    meaning → pick the hanzi (recall);
 * - sentence: the word's example sentence with a blank → pick the word that
 *   fits, as in Reading Part 1;
 * - pinyin:   hanzi → type the pinyin. Typed, not chosen: with options,
 *   knowing one character of a two-character word is enough to find the
 *   answer. Tones are not checked. It is also how the exam's essays are
 *   written, with a pinyin keyboard.
 *
 * Every option is a word id, so grading a choice is just "did they pick the
 * word itself". Distractors are chosen so that no two options could both be
 * right: their meanings must differ.
 *
 * Distractors are look-alikes wherever possible: words from the same
 * confusable set, words sharing a character (安排 / 安慰 / 安装), and words
 * that sound alike. Words with too few look-alikes — about one in five — get
 * medium options instead: same number of characters, shared part of speech.
 */
import type { Word, WordBank } from "@/content/word-types";
import { plainPinyin } from "@/lib/pinyin";
import { type Rng, shuffle } from "@/lib/random";

export type ChoiceKind = "meaning" | "hanzi" | "sentence";
export type QuestionKind = ChoiceKind | "pinyin";
export type Difficulty = "medium" | "hard";

export type ChoiceQuestion = {
  wordId: string;
  kind: ChoiceKind;
  difficulty: Difficulty;
  /** Word ids, answer included, in display order. */
  options: string[];
};

/** Type the pinyin; graded by `pinyinMatches`. */
export type TypedQuestion = { wordId: string; kind: "pinyin" };

export type Question = ChoiceQuestion | TypedQuestion;

const KINDS: QuestionKind[] = ["meaning", "hanzi", "sentence", "pinyin"];
const OPTION_COUNT = 4;
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

type Mates = Map<string, Set<string>>;

/** hanzi → the other words in its confusable groups. Built once per level. */
const matesCache = new WeakMap<WordBank["confusableGroups"], Mates>();
function matesOf(groups: WordBank["confusableGroups"]): Mates {
  let mates = matesCache.get(groups);
  if (mates) return mates;
  mates = new Map();
  for (const group of groups) {
    for (const a of group) {
      const set = mates.get(a) ?? new Set<string>();
      for (const b of group) if (b !== a) set.add(b);
      mates.set(a, set);
    }
  }
  matesCache.set(groups, mates);
  return mates;
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
 * Two words clash when one could pass for the other's answer: any shared
 * meaning (爱护 and 爱惜 both gloss as "to cherish").
 */
function clash(a: Word, b: Word, kind: ChoiceKind): boolean {
  if (a.id === b.id) return true;
  // In a sentence, 不如 and 不 could both seem to fill the blank.
  if (kind === "sentence" && (a.hanzi.includes(b.hanzi) || b.hanzi.includes(a.hanzi))) return true;
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
function lookalikes(word: Word, candidates: readonly Word[], allMates: Mates, rng: Rng): Word[] {
  const mates = allMates.get(word.hanzi);
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
  kind: ChoiceKind,
  pool: readonly Word[],
  mates: Mates,
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

  take(lookalikes(word, candidates, mates, rng));
  const lookalikeCount = picked.length;
  take(shuffle(similar(word, candidates), rng));
  take(shuffle(candidates, rng));

  return {
    distractors: picked,
    difficulty: lookalikeCount >= MIN_LOOKALIKES ? "hard" : "medium",
  };
}

/** A test for `deck`, with distractors drawn from the rest of `bank`'s level. */
export function buildQuestions(
  deck: readonly Word[],
  bank: Pick<WordBank, "words" | "confusableGroups">,
  rng: Rng,
): Question[] {
  const pool = bank.words;
  const mates = matesOf(bank.confusableGroups);
  return shuffle(deck, rng).map((word, i): Question => {
    let kind = KINDS[i % KINDS.length];
    if (kind === "pinyin") return { wordId: word.id, kind };
    if (kind === "sentence" && !word.example?.zh.includes(word.hanzi)) kind = "hanzi";
    const { distractors, difficulty } = distractorsFor(word, kind, pool, mates, rng);
    const options = shuffle([word, ...distractors], rng).map((w) => w.id);
    return { wordId: word.id, kind, difficulty, options };
  });
}

/** The example sentence with the word blanked out, for a sentence question. */
export function blankedSentence(word: Word): string {
  return (word.example?.zh ?? "").split(word.hanzi).join("＿＿");
}

/**
 * Typed pinyin against the word's: tones, spaces, apostrophes and tone
 * numbers are ignored, and ü may be typed as v or u. A word with several
 * readings ("ò, ó, é") accepts any of them.
 */
export function pinyinMatches(typed: string, pinyin: string): boolean {
  const norm = (p: string) => plainPinyin(p).replace(/v/g, "u");
  const t = norm(typed);
  return t.length > 0 && pinyin.split(/,\s*/).some((reading) => t === norm(reading));
}
