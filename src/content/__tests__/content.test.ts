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
import { errorsHsk6 } from "../errors-hsk6";
import { orderingItems } from "../ordering";
import { getOrderingNote } from "../ordering-notes";
import { orderingPapers } from "../ordering-papers";
import { storiesHsk6 } from "../stories-hsk6";
import type { ClozePassage, ConfusableSet } from "../types";
import type { Word } from "../word-types";
import { bankHsk5, wordsHsk5 as words } from "../words-hsk5";
import { wordsHsk6 } from "../words-hsk6";

const getWord = bankHsk5.getWord;

const BLANK = "＿＿";
const blanks = (s: string) => s.split(BLANK).length - 1;
const unique = (ids: string[]) => new Set(ids).size === ids.length;

describe("words", () => {
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
    checkWordList(wordsHsk6, 2500);

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

  describe("cloze", () => checkCloze(clozeHsk6, 61, 70));

  describe("find the error", () => {
    it("has unique ids", () => {
      expect(unique(errorsHsk6.map((i) => i.id))).toBe(true);
    });

    it.each(errorsHsk6.map((i) => [i.id, i] as const))("%s is well-formed", (_, item) => {
      expect(item.sentences).toHaveLength(4);
      expect(unique(item.sentences)).toBe(true);
      expect([0, 1, 2, 3]).toContain(item.wrong);
      expect(item.corrected).not.toBe(item.sentences[item.wrong]);
      expect(item.point.trim()).not.toBe("");
      expect(item.why.trim()).not.toBe("");
    });
  });

  describe("retelling stories", () => {
    it("has unique ids", () => {
      expect(unique(storiesHsk6.map((s) => s.id))).toBe(true);
    });

    it.each(storiesHsk6.map((s) => [s.id, s] as const))("%s is exam length with key points", (_, story) => {
      const han = story.text.match(/[一-鿿]/g)?.length ?? 0;
      expect(han).toBeGreaterThanOrEqual(700);
      expect(han).toBeLessThanOrEqual(1100);
      expect(story.keyPoints.length).toBeGreaterThanOrEqual(5);
      expect(story.title.trim()).not.toBe("");
    });
  });
});
