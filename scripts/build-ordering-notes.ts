/**
 * Builds src/content/ordering-notes.json: for every sentence-order item, the
 * full sentence in pinyin and the HSK 5 words it uses.
 *
 *   npx tsx scripts/build-ordering-notes.ts            write the file
 *   npx tsx scripts/build-ordering-notes.ts --review   also print every sentence
 *
 * pinyin-pro reads characters in context, but it still misreads some that
 * have more than one reading (说得 as dé). Every sentence was read through by
 * hand and the misreadings are fixed in PINYIN_FIX; for HSK 5 words, the
 * list's own tones win. Run with --review after adding items and read the
 * new lines.
 *
 * Words are found by longest match against the HSK 5 list, with everyday
 * non-HSK 5 words (NOT_HSK5) matched too so their parts are not mistaken for
 * HSK 5 words.
 */
import { writeFileSync } from "node:fs";
import { pinyin } from "pinyin-pro";

import { orderingItems } from "../src/content/ordering";
import { orderingPapers } from "../src/content/ordering-papers";
import words from "../src/content/words.json" with { type: "json" };

/**
 * Item id → characters read differently in that sentence (every occurrence).
 * "r" is the 儿 of 一点儿, written onto the syllable before it.
 */
const PINYIN_FIX: Record<string, Record<string, string>> = {
  "ord-024": { 地: "de" },
  "ord-025": { 不: "bu" },
  "ord-026": { 得: "de" },
  "ord-027": { 得: "de" },
  "ord-028": { 得: "de", 不: "bu" },
  "ord-029": { 得: "de" },
  "ord-048": { 大: "dà" },
  "p-A-10": { 儿: "r" },
  "p-B-05": { 得: "de" },
  "p-C-03": { 得: "de" },
  "p-D-05": { 地: "de" },
  "p-E-08": { 得: "de" },
  "p-F-08": { 子: "zi" },
  "p-F-10": { 子: "zi" },
  "p-G-04": { 子: "zi" },
  "p-G-05": { 子: "zi", 得: "de" },
  "p-G-06": { 称: "chēng" },
  "p-G-07": { 把: "bǎ" },
  "p-H-09": { 得: "de" },
  "p-I-05": { 得: "de" },
  "p-J-11": { 得: "de" },
  "p-K-05": { 应: "yīng" },
  "p-M-04": { 儿: "r" },
  "p-M-07": { 地: "de" },
  "p-M-11": { 得: "de" },
  "p-M-13": { 会: "huì" },
};

/**
 * Everyday words outside the HSK 5 list that contain an HSK 5 word: 非常 is
 * not the word 非, 方便 is not 方. Matched like words, then ignored.
 */
const NOT_HSK5 = [
  "非常", "一直", "正在", "计划", "漂亮", "方便", "所有", "便宜", "联系", "方面",
  "翻译", "诗人", "诗歌", "平米", "要不要", "一个人", "每个人", "连续剧",
];

/** Item id → HSK 5 words matched there by accident (谁会计算 is 会 + 计算, not 会计). */
const NOT_THE_WORD: Record<string, string[]> = {
  "p-M-13": ["会计"],
};

const OUT = "src/content/ordering-notes.json";
const MAX_WORD = Math.max(...words.map((w) => w.hanzi.length));
const byHanzi = new Map(words.map((w) => [w.hanzi, w]));
for (const w of NOT_HSK5) if (byHanzi.has(w)) throw new Error(`${w} is an HSK 5 word`);
const HAN = /\p{Script=Han}/u;

function strip(p: string): string {
  return p.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

type Note = { pinyin: string; words: string[] };

const notes: Record<string, Note> = {};
const review: string[] = [];

for (const item of [...orderingItems, ...orderingPapers]) {
  const text = item.chunks.join("") + (item.end ?? "。");
  const chars = [...text];
  const syllables = pinyin(text, { type: "array", toneType: "symbol" });
  if (syllables.length !== chars.length) throw new Error(`${item.id}: pinyin length mismatch`);

  const fixes = PINYIN_FIX[item.id] ?? {};
  chars.forEach((c, i) => {
    if (fixes[c]) syllables[i] = fixes[c];
  });

  const found: string[] = [];
  const flags: string[] = [];
  for (let i = 0; i < chars.length; ) {
    let len = Math.min(MAX_WORD, chars.length - i);
    let matched = 1;
    for (; len > 0; len--) {
      const text = chars.slice(i, i + len).join("");
      if (NOT_HSK5.includes(text)) {
        matched = len;
        break;
      }
      const w = byHanzi.get(text);
      if (!w || NOT_THE_WORD[item.id]?.includes(w.hanzi)) continue;
      matched = len;
      if (!found.includes(w.id)) found.push(w.id);
      const listPinyin = w.pinyin.replace(/[\s']/g, "").normalize("NFC");
      const got = syllables.slice(i, i + len);
      if (strip(got.join("")) !== strip(listPinyin)) {
        flags.push(`${w.hanzi}: ${got.join("")} vs list ${w.pinyin} (different syllables)`);
      } else if (len > 1) {
        // Same syllables: take the list's tones (姑娘 gūniang, not gūniáng).
        let at = 0;
        got.forEach((syl, k) => {
          syllables[i + k] = listPinyin.slice(at, at + syl.normalize("NFC").length);
          at += syl.normalize("NFC").length;
        });
      }
      break;
    }
    i += matched;
  }

  // Syllables separated by spaces; punctuation sticks to the word before it.
  let out = "";
  chars.forEach((c, i) => {
    if (!HAN.test(c)) {
      // Numbers stand apart from the syllables around them: 持续 10 天.
      if (/[0-9A-Za-z]/.test(c) && /[^\s\d“‘（《]$/.test(out)) out += " ";
      out += c;
      return;
    }
    // 一点儿: the r joins the syllable before it.
    if (syllables[i] === "r") {
      out += "r";
      return;
    }
    // A space before each syllable, except at the start or after an opening mark.
    if (out && !/[\s“‘（《]$/.test(out)) out += " ";
    out += syllables[i];
  });
  // Chinese punctuation in a Latin line: a space after commas and the like.
  out = out.replace(/([，、：；])(?=\S)/g, "$1 ").trim();

  notes[item.id] = { pinyin: out, words: found };
  review.push(
    `${item.id}  ${text}\n    ${out}\n    words: ${found.join(" ") || "—"}` +
      (flags.length ? `\n    CHECK: ${flags.join("; ")}` : ""),
  );
}

writeFileSync(OUT, JSON.stringify(notes, null, 2) + "\n");
if (process.argv.includes("--review")) console.log(review.join("\n"));
console.log(`Wrote ${Object.keys(notes).length} notes to ${OUT}.`);
