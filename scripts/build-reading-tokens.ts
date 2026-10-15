/**
 * Builds src/content/reading-tokens.json: every reading paper's passages,
 * questions and options split into words, each with its pinyin, meaning and
 * HSK level, so the learner can tap any word while reading.
 *
 * Words come from the app's own HSK 5 and HSK 6 lists first (checked
 * meanings), then complete-hsk-vocabulary (scripts/data/complete-hsk.json,
 * MIT; meanings from CC-CEDICT, CC BY-SA 4.0). The text is split by longest
 * match against both. Pinyin of a single character is read in context by
 * pinyin-pro, so 得 / 了 / 着 come out right.
 *
 *   npx tsx scripts/build-reading-tokens.ts
 */
import { readFileSync, writeFileSync } from "node:fs";
import { pinyin } from "pinyin-pro";

import { readingH51329 } from "../src/content/reading-h51329";
import type { ReadingPaper, ReadingToken as Token } from "../src/content/types";
import hsk5 from "../src/content/words.json" with { type: "json" };
import meanings5 from "../src/content/meanings.json" with { type: "json" };
import hsk6 from "../src/content/words-hsk6.json" with { type: "json" };

const PAPERS: ReadingPaper[] = [readingH51329];

type Entry = {
  pinyin: string;
  gloss: string;
  level?: string;
  id?: string;
  /** Every reading of a character, so the one used in context can be picked. */
  forms?: { pinyin: string; gloss: string }[];
};

const dict = new Map<string, Entry>();
type Complete = { s: string; l: string[]; f: { i: { y: string }; m: string[] }[] }[];
const complete: Complete = JSON.parse(readFileSync(new URL("./data/complete-hsk.json", import.meta.url), "utf8"));
/** The first few senses, kept short enough for a phone panel. */
function shortGloss(senses: string[]): string {
  let out = senses[0] ?? "";
  for (const m of senses.slice(1, 3)) if (out.length + m.length < 70) out += `; ${m}`;
  return out;
}
for (const e of complete) {
  const forms = e.f
    .filter((f) => f.m.length > 0 && !f.m.every((m) => /variant of|^used in /.test(m)))
    .map((f) => ({ pinyin: f.i.y.replace(/\s+/g, ""), gloss: shortGloss(f.m) }));
  if (forms.length === 0) continue;
  const old = e.l.find((l) => l.startsWith("o"));
  const neu = e.l.find((l) => l.startsWith("n"));
  dict.set(e.s, {
    ...forms[0],
    level: old ? `HSK ${old.slice(1)}` : neu ? `HSK 3.0 · ${neu.slice(1)}` : undefined,
    forms: forms.length > 1 ? forms : undefined,
  });
}
// The app's own lists win: checked meanings, and the words the learner studies.
const m5 = meanings5 as Record<string, { gloss: string }>;
for (const w of hsk5) dict.set(w.hanzi, { pinyin: w.pinyin, gloss: m5[w.id]?.gloss ?? w.gloss, level: "HSK 5", id: w.id });
for (const w of hsk6) dict.set(w.hanzi, { pinyin: w.pinyin, gloss: w.gloss, level: "HSK 6", id: w.id });

/**
 * Words the papers use that neither source has (names, literary words).
 * Hand-written; add to it when a new paper leaves words unexplained.
 */
const EXTRA: Record<string, [string, string]> = {
  武术: ["wǔshù", "martial arts"],
  练武: ["liànwǔ", "to practise martial arts"],
  练武者: ["liànwǔzhě", "martial arts practitioner"],
  强身健体: ["qiángshēn jiàntǐ", "to build up one's health"],
  刘半农: ["Liú Bànnóng", "Liu Bannong (writer, 1891–1934)"],
  赵元任: ["Zhào Yuánrèn", "Zhao Yuanren (linguist, 1892–1982)"],
  逐个击破: ["zhúgè jīpò", "to deal with one by one"],
  终极: ["zhōngjí", "ultimate; final"],
  企及: ["qǐjí", "to hope to reach"],
  何以: ["héyǐ", "how; why (literary)"],
  漠河: ["Mòhé", "Mohe (China's northernmost county)"],
  失恋: ["shīliàn", "to be lovelorn; a break-up"],
  断言: ["duànyán", "to assert"],
  郁闷: ["yùmèn", "depressed; gloomy"],
  无以复加: ["wúyǐ fùjiā", "extreme; could not be greater"],
  预想: ["yùxiǎng", "to anticipate"],
  消弭: ["xiāomǐ", "to dispel; to fade away"],
  味美: ["wèiměi", "tasty"],
  促: ["cù", "to urge; to prompt"],
  金币: ["jīnbì", "gold coin"],
  一半儿: ["yíbànr", "half"],
  眼珠: ["yǎnzhū", "eyeball"],
  坚称: ["jiānchēng", "to insist"],
  谎称: ["huǎngchēng", "to claim falsely"],
  公孙仪: ["Gōngsūn Yí", "Gongsun Yi (a musician in an old story)"],
  涓涓: ["juānjuān", "trickling (of water)"],
  怒涛: ["nùtāo", "raging waves"],
  秋虫: ["qiūchóng", "autumn insects"],
  低鸣: ["dīmíng", "a low chirp"],
  婉转: ["wǎnzhuǎn", "sweet and lilting; tactful"],
  突发奇想: ["tūfā qíxiǎng", "to suddenly have an odd idea"],
  嗡嗡: ["wēngwēng", "buzz (sound)"],
  哞哞: ["mōumōu", "moo (sound)"],
  勤学苦练: ["qínxué kǔliàn", "to study and practise hard"],
  衔: ["xián", "to hold in the mouth"],
  鼻头: ["bítóu", "tip of the nose"],
  自娱自乐: ["zìyú zìlè", "to amuse oneself"],
  齐白石: ["Qí Báishí", "Qi Baishi (painter, 1864–1957)"],
  艾青: ["Ài Qīng", "Ai Qing (poet, 1910–1996)"],
  真伪: ["zhēnwěi", "genuine or fake"],
  放大镜: ["fàngdàjìng", "magnifying glass"],
  愁眉不展: ["chóuméi bùzhǎn", "to frown with worry"],
  盛名于世: ["shèngmíng yú shì", "famous throughout the world"],
  描红: ["miáohóng", "to trace characters (beginner calligraphy)"],
  赞誉: ["zànyù", "praise; acclaim"],
  飘飘然: ["piāopiāorán", "smug; carried away"],
  不实之词: ["bùshí zhī cí", "untrue words"],
  蒙蔽: ["méngbì", "to deceive; to blind"],
  懈怠: ["xièdài", "to slack off"],
  棒状: ["bàngzhuàng", "rod-shaped"],
  球状: ["qiúzhuàng", "ball-shaped"],
  茶杯状: ["chábēizhuàng", "cup-shaped"],
  由此可知: ["yóucǐ kězhī", "from this we can see"],
  原貌: ["yuánmào", "original appearance"],
};
for (const [word, [p, g]] of Object.entries(EXTRA)) {
  if (!dict.has(word)) dict.set(word, { pinyin: p.replace(/\s+/g, ""), gloss: g });
}

/** The structural particles, read from the word before them. */
const PARTICLES: Record<string, string> = {
  的: "(particle) of; 's; marks what describes a noun",
  地: "(particle) -ly: turns what comes before into an adverb",
  得: "(particle) links a verb to how / how much",
  了: "(particle) completed action; change of state",
  着: "(particle) -ing: an ongoing action or state",
};

/**
 * pinyin-pro misreads 地 / 得 on their own (慢慢地 dì). As separate tokens
 * they are nearly always particles; the exceptions follow a few words.
 */
function particleReading(char: string, prev: string | undefined): string | null {
  if (char === "的") return "de";
  // 地 dì after a place word (在地上, 各地, 当地); otherwise the adverb particle.
  if (char === "地") return !prev || /^(在|各|当|本|外|内|此|满|土|大|草|山|田|陆|基|落)$/.test(prev) ? "dì" : "de";
  if (char === "得") {
    if (prev && /^(还|就|也|都|总|又|可|只)$/.test(prev)) return "děi";
    if (prev && /^(能|难|获|取|所|必|不)$/.test(prev)) return "dé";
    return "de";
  }
  return null;
}

const HAN = /\p{Script=Han}/u;
const MAX = 6;

function tokenize(text: string, underline = false): Token[] {
  const chars = [...text];
  // Context-aware readings for single characters.
  const readings = pinyin(text, { type: "array", toneType: "symbol" });
  const out: Token[] = [];
  let i = 0;
  while (i < chars.length) {
    const c = chars[i];
    if (!HAN.test(c)) {
      // Punctuation, digits and Latin letters stay as plain text.
      const last = out.at(-1);
      if (last && !last.p && !last.g && last.t !== "\n" && c !== "\n") last.t += c;
      else out.push({ t: c });
      i++;
      continue;
    }
    let len = Math.min(MAX, chars.length - i);
    for (; len > 1; len--) if (dict.has(chars.slice(i, i + len).join(""))) break;
    const word = chars.slice(i, i + len).join("");
    const entry = dict.get(word);
    const prev = out.at(-1)?.p ? out.at(-1)!.t : undefined;
    const particle = len === 1 ? particleReading(word, prev) : null;
    const p = particle ?? (len === 1 ? readings[i] : entry?.pinyin ?? readings.slice(i, i + len).join(""));
    // 个 gè, not gě; 了 le, not liǎo: the sense that goes with the reading.
    const form = entry?.forms?.find((f) => f.pinyin === p) ?? entry;
    const token: Token = { t: word, p };
    if (len === 1 && PARTICLES[word] && /^(de|le|zhe)$/.test(p)) {
      token.g = PARTICLES[word];
    } else if (form?.gloss) token.g = form.gloss;
    if (entry?.level) token.l = entry.level;
    if (entry?.id) token.id = entry.id;
    if (underline) token.u = 1;
    out.push(token);
    i += len;
  }
  if (underline) for (const t of out) t.u = 1;
  return out;
}

/** Text with [[underlined]] parts: tokenized piece by piece. */
function tokenizeMarked(text: string): Token[] {
  return text.split(/(\[\[[^\]]+\]\])/).flatMap((part) =>
    part.startsWith("[[") ? tokenize(part.slice(2, -2), true) : part ? tokenize(part) : [],
  );
}

const tokens: Record<string, Token[]> = {};
for (const paper of PAPERS) {
  for (const item of [...paper.part2, ...paper.part3]) {
    tokens[item.id] = tokenizeMarked(item.passage);
    for (const q of item.questions) {
      if (q.prompt) tokens[`${paper.id}#${q.number}`] = tokenizeMarked(q.prompt);
      q.options.forEach((o, i) => (tokens[`${paper.id}#${q.number}.${i}`] = tokenize(o)));
    }
  }
}

writeFileSync(new URL("../src/content/reading-tokens.json", import.meta.url), JSON.stringify(tokens) + "\n");
const all = Object.values(tokens).flat();
const han = all.filter((t) => t.p);
console.log(`${Object.keys(tokens).length} texts, ${han.length} words; ${han.filter((t) => t.g).length} with a meaning, ${han.filter((t) => !t.g).map((t) => t.t).join("")} without`);
