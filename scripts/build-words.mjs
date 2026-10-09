/**
 * Builds src/content/words.json: the HSK 5 (HSK 2.0) word list.
 *
 * Which words, and their pinyin: the 1,300-word list from MandarinBean
 * (scripts/data/hsk5-mandarinbean.json, transcribed from the learner's PDF).
 * It matches the learner's own official list (hsk5-official-list.json) word
 * for word, and its pinyin is the standard mainland reading, neutral tones
 * included. Where it is wrong, PINYIN_FIX below says so.
 *
 * Dictionary data for each word (all senses, part of speech, frequency):
 * - scripts/data/hsk2-level5.json — wordlists/exclusive/old/5.json, and
 * - scripts/data/hsk5-extra-entries.json — the list's words that file lacks,
 *   from complete.min.json (five written by hand),
 * both from https://github.com/drkameleon/complete-hsk-vocabulary (MIT),
 * whose definitions come from CC-CEDICT (CC BY-SA 4.0).
 *
 * The meaning shown in the app is NOT built here: it is the checked meaning
 * in src/content/meanings.json, merged in src/content/words.ts.
 *
 * A word's id is its simplified hanzi; learner progress is keyed by it.
 *
 *   npm run words:build
 */
import { readFileSync, writeFileSync } from "node:fs";

const read = (name) => JSON.parse(readFileSync(new URL(`./data/${name}`, import.meta.url), "utf8"));

const list = read("hsk5-mandarinbean.json");
const entries = new Map(
  [...read("hsk2-level5.json"), ...read("hsk5-extra-entries.json")].map((e) => [e.simplified, e]),
);

const POS = {
  n: "noun", nr: "noun", nz: "noun", ns: "noun", s: "noun", f: "noun",
  v: "verb", vn: "verb", vd: "verb",
  a: "adjective", an: "adjective", ad: "adjective", b: "adjective", z: "adjective",
  d: "adverb",
  c: "conjunction", cc: "conjunction",
  p: "preposition",
  q: "measure word", qt: "measure word", qv: "measure word", mq: "measure word",
  m: "numeral", Mg: "numeral",
  t: "time word", tg: "time word",
  r: "pronoun",
  e: "interjection", y: "particle", u: "particle", o: "onomatopoeia",
};

/** Cross-references and surnames are dictionary bookkeeping, not meanings. */
const NOISE = /^(old )?variant of |^surname |^see |^used in |^\(old\)|^also written /i;

/** Where the list's pinyin is wrong for the sense the app teaches. */
const PINYIN_FIX = {
  元旦: "yuándàn", // printed "uándàn"
  嗯: "ǹg", // printed "en"; the "uh-huh, yes" reading the app teaches
  吐: "tǔ", // printed "tù" (to vomit); the app teaches "to spit", tǔ
  老婆: "lǎopo", // printed "lǎopó"; the dictionary form is neutral-tone
};

const missing = [];
const words = list.map((o) => {
  const entry = entries.get(o.hanzi);
  if (!entry) missing.push(o.hanzi);
  const forms = entry?.forms ?? [];
  const meanings = [
    ...new Set(forms.flatMap((f) => f.meanings.filter((m) => !NOISE.test(m)))),
  ];
  return {
    id: o.hanzi,
    hanzi: o.hanzi,
    pinyin: PINYIN_FIX[o.hanzi] ?? o.pinyin,
    // A fallback only; the checked meaning in src/content/meanings/ wins.
    gloss: meanings.slice(0, 3).join("; "),
    meanings,
    pos: [...new Set((entry?.pos ?? []).map((p) => POS[p]).filter(Boolean))],
    /** Lower is more common. Used to introduce common words first. */
    rank: entry?.frequency ?? 99_999,
    /** Position in the list; used only to break frequency ties. */
    n: o.n,
  };
});

if (missing.length) throw new Error(`No dictionary entry for: ${missing.join(" ")}`);

words.sort((a, b) => a.rank - b.rank || a.n - b.n);

writeFileSync(
  new URL("../src/content/words.json", import.meta.url),
  // The list position only broke ties; the app does not need it.
  JSON.stringify(words, (k, v) => (k === "n" ? undefined : v)),
);

console.log(`Wrote ${words.length} words.`);
