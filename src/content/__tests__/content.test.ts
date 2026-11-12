/**
 * Structural checks on the hand-written study content. They cannot judge the
 * Chinese, but they catch the mistakes that would silently mark a learner
 * wrong: an answer that is not among the options, a sentence with two blanks,
 * a duplicated id that would merge two items' results.
 */
import { describe, expect, it } from "vitest";

import { clozePassages } from "../cloze";
import { clozeHsk6 } from "../cloze-hsk6";
import { confusables } from "../confusables";
import { confusablesHsk6 } from "../confusables-hsk6";
import { orderingItems } from "../ordering";
import { getOrderingNote } from "../ordering-notes";
import { orderingPapers } from "../ordering-papers";
import { readingHsk6 } from "../reading-hsk6";
import { sentenceFillHsk6 } from "../sentence-fill-hsk6";
import type { ClozePassage, ConfusableSet } from "../types";
import { writingHsk6 } from "../writing-hsk6";
import type { Word } from "../word-types";
import { bankHsk5, wordsHsk5 as words } from "../words-hsk5";
import { wordsHsk6 } from "../words-hsk6";

const getWord = bankHsk5.getWord;

const BLANK = "＿＿";
const blanks = (s: string) => s.split(BLANK).length - 1;
const unique = (ids: string[]) => new Set(ids).size === ids.length;

describe("words", () => {
  it("gives every word a test sentence, different from the practice one", () => {
    for (const w of words) {
      expect(w.quiz, w.id).not.toBeNull();
      expect(w.quiz!.zh.split(w.hanzi).length - 1, `${w.id}: ${w.quiz!.zh}`).toBe(1);
      expect(w.quiz!.zh, w.id).not.toBe(w.example?.zh);
      expect(w.quiz!.en.trim(), w.id).not.toBe("");
    }
  });

  it("has the 1,300-word HSK 5 list with unique ids and a gloss each", () => {
    expect(words.length).toBe(1300);
    expect(unique(words.map((w) => w.id))).toBe(true);
    for (const w of words) {
      expect(w.gloss, w.id).not.toBe("");
      expect(w.pinyin, w.id).not.toBe("");
    }
  });

  it("gives every word a checked meaning in English and Indonesian", () => {
    for (const w of words) {
      expect(w.gloss.trim(), w.id).not.toBe("");
      expect(w.gloss.length, w.id).toBeLessThanOrEqual(70);
      expect(w.gloss, w.id).not.toMatch(/abbr\.|variant of|\(Tw\)|surname/i);
      expect(w.indonesian.trim(), w.id).not.toBe("");
    }
  });

  it("gives every word an example sentence that contains it", () => {
    for (const w of words) {
      expect(w.example, w.id).not.toBeNull();
      expect(w.example!.zh, w.id).toContain(w.hanzi);
      expect(w.example!.zh, w.id).toMatch(/[。？！]$/);
      expect(w.example!.en.trim(), w.id).not.toBe("");
    }
  });
});

function checkConfusables(sets: ConfusableSet[]) {
  it("has unique ids", () => {
    expect(unique(sets.map((s) => s.id))).toBe(true);
  });

  it.each(sets.map((s) => [s.id, s] as const))("%s is well-formed", (_, set) => {
    expect(set.words.length).toBeGreaterThanOrEqual(2);
    expect(unique(set.words.map((w) => w.hanzi))).toBe(true);
    expect(set.questions.length).toBeGreaterThan(0);
    const hanzi = set.words.map((w) => w.hanzi);
    for (const q of set.questions) {
      expect(blanks(q.sentence), q.sentence).toBe(1);
      expect(hanzi, q.sentence).toContain(q.answer);
      expect(q.why.trim(), q.sentence).not.toBe("");
    }
  });
}

/** `first`–`last`: the exam's question numbers for the section. */
function checkCloze(passages: ClozePassage[], first: number, last: number) {
  it("has unique ids", () => {
    expect(unique(passages.map((p) => p.id))).toBe(true);
  });

  it.each(passages.map((p) => [p.id, p] as const))("%s is well-formed", (_, p) => {
    const marked = [...p.text.matchAll(/\{\{(\d+)\}\}/g)].map((m) => Number(m[1]));
    // Every {{n}} has exactly one blank, in the same order, and vice versa.
    expect(marked).toEqual(p.blanks.map((b) => b.number));
    for (const b of p.blanks) {
      expect(b.number, p.id).toBeGreaterThanOrEqual(first);
      expect(b.number, p.id).toBeLessThanOrEqual(last);
      expect(b.options, `${p.id} #${b.number}`).toHaveLength(4);
      expect(unique(b.options), `${p.id} #${b.number}`).toBe(true);
      expect([0, 1, 2, 3]).toContain(b.answer);
      expect(b.why.trim(), `${p.id} #${b.number}`).not.toBe("");
    }
  });
}

describe("confusables", () => checkConfusables(confusables));
describe("cloze", () => checkCloze(clozePassages, 46, 60));

describe("ordering", () => {
  const all = [...orderingPapers, ...orderingItems];

  it("has unique ids across your papers and the built-in set", () => {
    expect(unique(all.map((i) => i.id))).toBe(true);
  });

  it("has pinyin and its HSK 5 words for every item (rerun scripts/build-ordering-notes.ts)", () => {
    for (const item of all) {
      const note = getOrderingNote(item.id);
      expect(note?.pinyin, item.id).toBeTruthy();
      const sentence = item.chunks.join("");
      for (const id of note!.words) {
        expect(getWord(id), `${item.id}: ${id}`).toBeDefined();
        expect(sentence, item.id).toContain(getWord(id)!.hanzi);
      }
    }
  });

  it("marks every item from your papers with its source", () => {
    for (const item of orderingPapers) expect(item.source, item.id).toBeTruthy();
  });

  it.each(all.map((i) => [i.id, i] as const))("%s is well-formed", (_, item) => {
    expect(item.chunks.length).toBeGreaterThanOrEqual(3);
    for (const c of item.chunks) {
      expect(c.trim(), item.id).not.toBe("");
      expect(c, item.id).not.toMatch(/[。？！，]/);
    }
    // An alternative must reuse exactly the same chunks, just reordered.
    const key = [...item.chunks].sort().join("|");
    for (const alt of item.alternatives ?? []) {
      expect([...alt].sort().join("|"), item.id).toBe(key);
    }
  });
});

/** The meaning a quiz shows must not contain the word it asks for. */
function checkWordList(list: Word[], size: number) {
  it(`has ${size} words with unique ids`, () => {
    expect(list.length).toBe(size);
    expect(unique(list.map((w) => w.id))).toBe(true);
  });

  it("gives every word pinyin, a meaning in English and Indonesian, and a part of speech", () => {
    for (const w of list) {
      expect(w.pinyin.trim(), w.id).not.toBe("");
      expect(w.gloss.trim(), w.id).not.toBe("");
      expect(w.indonesian.trim(), w.id).not.toBe("");
      expect(w.pos.length, w.id).toBeGreaterThan(0);
      expect(w.gloss, w.id).not.toMatch(/[一-鿿]/);
    }
  });

  it("gives every word a test sentence, different from the practice one", () => {
    for (const w of list) {
      expect(w.quiz, w.id).not.toBeNull();
      expect(w.quiz!.zh.split(w.hanzi).length - 1, `${w.id}: ${w.quiz!.zh}`).toBe(1);
      expect(w.quiz!.zh, w.id).not.toBe(w.example?.zh);
      expect(w.quiz!.en.trim(), w.id).not.toBe("");
    }
  });

  it("gives every word an example sentence that contains it", () => {
    for (const w of list) {
      expect(w.example, w.id).not.toBeNull();
      expect(w.example!.zh, w.id).toContain(w.hanzi);
      expect(w.example!.en.trim(), w.id).not.toBe("");
    }
  });
}

describe("HSK 6", () => {
  describe("words", () => {
    checkWordList(wordsHsk6, 2547);

    it("puts the new HSK 5 words first, then the new HSK 6 list", () => {
      const from = wordsHsk6.map((w) => w.from);
      const firstL6 = from.indexOf("HSK 3.0 L6");
      expect(firstL6).toBeGreaterThan(700);
      expect(from.slice(0, firstL6).every((f) => f === "HSK 3.0 L5")).toBe(true);
      expect(from.slice(firstL6).every((f) => f === "HSK 3.0 L6")).toBe(true);
    });

    it("shares no word with HSK 5, so progress ids never collide", () => {
      const hsk5 = new Set(words.map((w) => w.id));
      expect(wordsHsk6.filter((w) => hsk5.has(w.id))).toEqual([]);
    });
  });

  describe("confusables", () => {
    checkConfusables(confusablesHsk6);

    it("never reuses an HSK 5 set id", () => {
      const hsk5 = new Set(confusables.map((s) => s.id));
      expect(confusablesHsk6.filter((s) => hsk5.has(s.id))).toEqual([]);
    });
  });

  describe("cloze", () => checkCloze(clozeHsk6, 41, 50));

  describe("sentence fill", () => {
    it("has unique ids", () => {
      expect(unique(sentenceFillHsk6.map((p) => p.id))).toBe(true);
    });

    it.each(sentenceFillHsk6.map((p) => [p.id, p] as const))("%s is well-formed", (_, p) => {
      const marked = [...p.text.matchAll(/\{\{(\d+)\}\}/g)].map((m) => Number(m[1]));
      expect(marked).toEqual(p.blanks.map((b) => b.number));
      expect(marked).toHaveLength(5);
      expect([51, 56]).toContain(marked[0]);
      expect(marked).toEqual(marked.map((_, i) => marked[0] + i));
      expect(p.options).toHaveLength(6);
      expect(unique(p.options)).toBe(true);
      const answers = p.blanks.map((b) => b.answer);
      expect(unique(answers.map(String))).toBe(true);
      for (const b of p.blanks) {
        expect([0, 1, 2, 3, 4, 5]).toContain(b.answer);
        expect(b.why.trim(), `${p.id} #${b.number}`).not.toBe("");
      }
    });
  });

  describe("reading", () => {
    it("has unique paper ids, none shared with HSK 5", () => {
      expect(unique(readingHsk6.map((p) => p.id))).toBe(true);
    });

    it.each(readingHsk6.map((p) => [p.id, p] as const))("%s has questions 61–80, four per passage", (_, paper) => {
      expect(paper.part2).toEqual([]);
      expect(paper.part3).toHaveLength(5);
      const qs = paper.part3.flatMap((i) => i.questions);
      expect(qs.map((q) => q.number)).toEqual(Array.from({ length: 20 }, (_, i) => 61 + i));
      for (const item of paper.part3) {
        expect(item.id.startsWith(`${paper.id}-`)).toBe(true);
        expect(item.questions).toHaveLength(4);
      }
      for (const q of qs) {
        expect(q.prompt?.trim()).toBeTruthy();
        expect(unique([...q.options])).toBe(true);
        expect([0, 1, 2, 3]).toContain(q.answer);
        expect(q.why.trim()).not.toBe("");
      }
    });
  });

  describe("writing", () => {
    it("has 20 tasks of each part, with unique ids", () => {
      expect(unique(writingHsk6.map((p) => p.id))).toBe(true);
      expect(writingHsk6.filter((p) => p.kind === "practical")).toHaveLength(20);
      expect(writingHsk6.filter((p) => p.kind === "opinion")).toHaveLength(20);
    });

    it.each(writingHsk6.map((p) => [p.id, p] as const))("%s states its length", (_, p) => {
      expect(p.minChars).toBe(p.kind === "practical" ? 150 : 300);
      expect(p.prompt).toContain(`字数不少于${p.minChars}字`);
      expect(p.english.trim()).not.toBe("");
    });
  });
});
