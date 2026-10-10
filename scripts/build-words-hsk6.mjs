/**
 * Builds src/content/words-hsk6.json: the HSK 6 (HSK 2.0) word list, in the
 * same shape the app uses for HSK 5, with everything merged into one file.
 *
 * - Which words, their pinyin and order: scripts/data/hsk6-list.json, parsed
 *   from the learner's PDF (Chill Chinese HSK 6 list, most common first) by
 *   scripts/parse-hsk6.py. Its meaning column is NOT used.
 * - The checked meaning (English and Indonesian), part of speech and example
 *   sentence: scripts/data/hsk6-batches/out-*.json, written and checked per
 *   word. Fix a meaning there and rebuild.
 * - Every dictionary sense, for the word list's detail view:
 *   scripts/data/hsk2-level6.json — wordlists/exclusive/old/6.json from
 *   https://github.com/drkameleon/complete-hsk-vocabulary (MIT), whose
 *   definitions come from CC-CEDICT (CC BY-SA 4.0). Words it lacks show no
 *   extra senses.
 *
 * A word's id is its simplified hanzi; learner progress is keyed by it. No
 * HSK 6 word is also an HSK 5 word, so ids never collide across levels.
 *
 *   npm run words:build:hsk6
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const read = (path) => JSON.parse(readFileSync(new URL(path, import.meta.url), "utf8"));

const list = read("./data/hsk6-list.json");
const dictionary = new Map(read("./data/hsk2-level6.json").map((e) => [e.simplified, e]));

const checked = {};
for (let k = 1; k <= 5; k++) {
  const url = new URL(`./data/hsk6-batches/out-${k}.json`, import.meta.url);
  if (existsSync(url)) Object.assign(checked, JSON.parse(readFileSync(url, "utf8")));
}

const missing = [];
const words = list.map((entry) => {
  const c = checked[entry.hanzi];
  if (!c) missing.push(entry.hanzi);
  const senses = (dictionary.get(entry.hanzi)?.forms ?? []).flatMap((f) => f.meanings);
  return {
    id: entry.hanzi,
    hanzi: entry.hanzi,
    pinyin: entry.pinyin,
    gloss: c?.gloss ?? "",
    indonesian: c?.indonesian ?? "",
    meanings: [...new Set(senses)],
    pos: c?.pos ?? [],
    rank: entry.n,
    example: c?.example ?? null,
  };
});

writeFileSync(
  new URL("../src/content/words-hsk6.json", import.meta.url),
  JSON.stringify(words) + "\n",
);
console.log(`Wrote ${words.length} HSK 6 words.`);
if (missing.length) console.log(`No checked meaning yet for ${missing.length}: ${missing.slice(0, 20).join(" ")}…`);
