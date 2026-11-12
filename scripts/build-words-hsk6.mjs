/**
 * Builds the HSK 6 word list for the new HSK (HSK 3.0):
 * src/content/words-hsk6.json and its test sentences, quiz-hsk6.json.
 *
 * Which words: every word of the new HSK Level 5 list that is not already in
 * HSK 2.0 levels 1–5 (the learner passed HSK 5), then all of the new HSK
 * Level 6 list. Sources: scripts/data/hsk3-l5.json and hsk3-l6.json, parsed
 * by scripts/parse-hsk3.py from the learner's MandarinBean PDFs. Order:
 * the Level 5 words first, each part most common first, so the 100-word
 * chunks start with the easier words.
 *
 * Content, first found wins, by hanzi:
 * - the HSK 2.0 HSK 6 list this one replaces (scripts/data/hsk6-2.0-words.json
 *   and hsk6-2.0-quiz.json, the checked content it shipped with);
 * - the HSK 5 list (src/content/meanings.json, examples.json, quiz-hsk5.json);
 * - words new to the app: scripts/data/hsk3-batches/out-*.json, written and
 *   checked per word ({ gloss, indonesian, pos, example, quiz }).
 * Pinyin and part of speech come from the new HSK lists where they give them.
 * Every dictionary sense comes from scripts/data/complete-hsk.json
 * (complete-hsk-vocabulary, MIT; meanings from CC-CEDICT, CC BY-SA 4.0).
 *
 * Ids: a word's id is its hanzi, so progress on words the HSK 2.0 list had
 * carries over. A word that is also in the HSK 5 list gets "<hanzi>@6"
 * instead, so the two levels never share progress (each level counts its
 * own tests; see src/content/__tests__/content.test.ts).
 *
 *   npm run words:build:hsk6
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";

const read = (path) => JSON.parse(readFileSync(new URL(path, import.meta.url), "utf8"));

const l5 = read("./data/hsk3-l5.json");
const l6 = read("./data/hsk3-l6.json");
const complete = read("./data/complete-hsk.json");

const oldLevel = new Map();
const frequency = new Map();
const senses = new Map();
for (const e of complete) {
  const olds = e.l.filter((l) => l.startsWith("o")).map((l) => Number(l.slice(1)));
  if (olds.length) oldLevel.set(e.s, Math.min(...olds));
  if (e.q) frequency.set(e.s, e.q);
  senses.set(e.s, [...new Set(e.f.flatMap((f) => f.m).filter((m) => !/^(variant of|old variant|used in)/.test(m)))]);
}

/** One entry per hanzi: a word listed twice (two readings or senses) is merged. */
function merge(entries) {
  const by = new Map();
  for (const e of entries) {
    const prev = by.get(e.hanzi);
    if (!prev) {
      by.set(e.hanzi, { ...e, pinyin: [e.pinyin], translation: [e.translation] });
      continue;
    }
    prev.pinyin.push(e.pinyin);
    prev.translation.push(e.translation);
    prev.pos = [...new Set([...prev.pos, ...e.pos])];
  }
  return [...by.values()].map((e) => ({
    ...e,
    pinyin: [...new Set(e.pinyin)].join(", "),
    translation: [...new Set(e.translation)].join("; "),
  }));
}

const byFrequency = (a, b) => (frequency.get(a.hanzi) ?? 1e9) - (frequency.get(b.hanzi) ?? 1e9);
const newL5 = merge(l5)
  .filter((e) => (oldLevel.get(e.hanzi) ?? 99) > 5)
  .sort(byFrequency)
  .map((e) => ({ ...e, from: "HSK 3.0 L5" }));
const inL5 = new Set(newL5.map((e) => e.hanzi));
const allL6 = merge(l6)
  .filter((e) => !inL5.has(e.hanzi))
  .sort(byFrequency)
  .map((e) => ({ ...e, from: "HSK 3.0 L6" }));
const list = [...newL5, ...allL6];

// Content already written and checked.
const old6 = new Map(read("./data/hsk6-2.0-words.json").map((w) => [w.hanzi, w]));
const old6Quiz = read("./data/hsk6-2.0-quiz.json");
const hsk5 = new Map(read("../src/content/words.json").map((w) => [w.hanzi, w]));
const hsk5Meanings = read("../src/content/meanings.json");
const hsk5Examples = read("../src/content/examples.json");
const hsk5Quiz = read("../src/content/quiz-hsk5.json");
const written = {};
const batches = new URL("./data/hsk3-batches/", import.meta.url);
if (existsSync(batches)) {
  for (const name of readdirSync(batches).filter((n) => /^out-\d+\.json$/.test(n)).sort()) {
    Object.assign(written, JSON.parse(readFileSync(new URL(name, batches), "utf8")));
  }
}

function contentOf(hanzi) {
  const o = old6.get(hanzi);
  if (o?.example && old6Quiz[o.id]) {
    return { gloss: o.gloss, indonesian: o.indonesian, pos: o.pos, example: o.example, quiz: old6Quiz[o.id] };
  }
  const h = hsk5.get(hanzi);
  if (h && hsk5Examples[h.id] && hsk5Quiz[h.id]) {
    const m = hsk5Meanings[h.id] ?? {};
    return { gloss: m.gloss ?? h.gloss, indonesian: m.indonesian ?? "", pos: h.pos, example: hsk5Examples[h.id], quiz: hsk5Quiz[h.id] };
  }
  return written[hanzi] ?? null;
}

const missing = [];
const quiz = {};
const words = list.map((entry, i) => {
  const c = contentOf(entry.hanzi);
  if (!c) missing.push(entry);
  const id = hsk5.has(entry.hanzi) ? `${entry.hanzi}@6` : entry.hanzi;
  if (c?.quiz) quiz[id] = c.quiz;
  return {
    id,
    hanzi: entry.hanzi,
    pinyin: entry.pinyin,
    gloss: c?.gloss ?? entry.translation,
    indonesian: c?.indonesian ?? "",
    meanings: senses.get(entry.hanzi) ?? [entry.translation],
    pos: entry.pos.length ? entry.pos : (c?.pos ?? []),
    rank: i + 1,
    from: entry.from,
    example: c?.example ?? null,
  };
});

writeFileSync(new URL("../src/content/words-hsk6.json", import.meta.url), JSON.stringify(words) + "\n");
writeFileSync(new URL("../src/content/quiz-hsk6.json", import.meta.url), JSON.stringify(quiz) + "\n");
console.log(
  `Wrote ${words.length} HSK 6 words (${newL5.length} new from L5, ${allL6.length} from L6); ` +
    `${list.length - missing.length} with content, ${missing.length} still to write.`,
);
// The words still to write, for the batch writers.
writeFileSync(
  new URL("./data/hsk3-todo.json", import.meta.url),
  JSON.stringify(missing.map(({ hanzi, pinyin, pos, translation, from }) => ({ hanzi, pinyin, pos, translation, from })), null, 1) + "\n",
);
