/**
 * Builds src/content/words.json from the HSK 2.0 level-5 list.
 *
 * Source: scripts/data/hsk2-level5.json, from
 * https://github.com/drkameleon/complete-hsk-vocabulary (MIT), file
 * wordlists/exclusive/old/5.json. Definitions there come from CC-CEDICT
 * (CC BY-SA 4.0).
 *
 * The output is what the app ships: one compact record per word. A word's id
 * is its simplified hanzi, which is unique in the list and is what learner
 * progress rows are keyed by — so never re-key it.
 *
 *   npm run words:build
 */
import { readFileSync, writeFileSync } from "node:fs";

const source = JSON.parse(
  readFileSync(new URL("./data/hsk2-level5.json", import.meta.url), "utf8"),
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

/** Long enough to tell words apart in a quiz, short enough to scan. */
const GLOSS_MAX = 60;

function useful(meanings) {
  return meanings.filter((m) => !NOISE.test(m));
}

/** A meaning this long is an explanation, not a translation. */
const LONG = 45;

function glossOf(meanings) {
  const short = meanings.filter((m) => m.length <= LONG);
  const pool = short.length ? short : meanings;
  const parts = [];
  for (const m of pool) {
    const next = [...parts, m].join("; ");
    if (parts.length > 0 && next.length > GLOSS_MAX) break;
    parts.push(m);
    if (parts.length === 3) break;
  }
  return parts.join("; ");
}

const words = source
  .map((entry) => {
    let forms = entry.forms.filter((f) => useful(f.meanings).length > 0);
    if (forms.length === 0) forms = entry.forms;

    const pinyin = [...new Set(forms.map((f) => f.transcriptions.pinyin))];
    const meanings = [...new Set(forms.flatMap((f) => useful(f.meanings)))];
    const pos = [...new Set((entry.pos ?? []).map((p) => POS[p]).filter(Boolean))];

    return {
      id: entry.simplified,
      hanzi: entry.simplified,
      pinyin: pinyin.join(" / "),
      gloss: glossOf(meanings.length ? meanings : forms[0].meanings),
      meanings: meanings.length ? meanings : forms[0].meanings,
      pos,
      /** Lower is more common. Used to introduce common words first. */
      rank: entry.frequency,
    };
  })
  .sort((a, b) => a.rank - b.rank);

writeFileSync(
  new URL("../src/content/words.json", import.meta.url),
  JSON.stringify(words),
);

console.log(`Wrote ${words.length} words.`);
