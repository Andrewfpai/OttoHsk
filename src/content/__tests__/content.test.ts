/**
 * Structural checks on the hand-written study content. They cannot judge the
 * Chinese, but they catch the mistakes that would silently mark a learner
 * wrong: an answer that is not among the options, a sentence with two blanks,
 * a duplicated id that would merge two items' results.
 */
import { describe, expect, it } from "vitest";

import { confusables } from "../confusables";
import { clozePassages } from "../cloze";
import { orderingItems } from "../ordering";
import { orderingPapers } from "../ordering-papers";
import { words } from "../words";

const BLANK = "＿＿";
const blanks = (s: string) => s.split(BLANK).length - 1;
const unique = (ids: string[]) => new Set(ids).size === ids.length;

describe("words", () => {
  it("has the HSK 2.0 level-5 list with unique ids and a gloss each", () => {
    expect(words.length).toBeGreaterThan(1200);
    expect(unique(words.map((w) => w.id))).toBe(true);
    for (const w of words) {
      expect(w.gloss, w.id).not.toBe("");
      expect(w.pinyin, w.id).not.toBe("");
    }
  });
});

describe("confusables", () => {
  it("has unique ids", () => {
    expect(unique(confusables.map((s) => s.id))).toBe(true);
  });

  it.each(confusables.map((s) => [s.id, s] as const))("%s is well-formed", (_, set) => {
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
});

describe("cloze", () => {
  it("has unique ids", () => {
    expect(unique(clozePassages.map((p) => p.id))).toBe(true);
  });

  it.each(clozePassages.map((p) => [p.id, p] as const))("%s is well-formed", (_, p) => {
    const marked = [...p.text.matchAll(/\{\{(\d+)\}\}/g)].map((m) => Number(m[1]));
    // Every {{n}} has exactly one blank, in the same order, and vice versa.
    expect(marked).toEqual(p.blanks.map((b) => b.number));
    for (const b of p.blanks) {
      expect(b.number, p.id).toBeGreaterThanOrEqual(46);
      expect(b.number, p.id).toBeLessThanOrEqual(60);
      expect(b.options, `${p.id} #${b.number}`).toHaveLength(4);
      expect(unique(b.options), `${p.id} #${b.number}`).toBe(true);
      expect([0, 1, 2, 3]).toContain(b.answer);
      expect(b.why.trim(), `${p.id} #${b.number}`).not.toBe("");
    }
  });
});

describe("ordering", () => {
  const all = [...orderingPapers, ...orderingItems];

  it("has unique ids across your papers and the built-in set", () => {
    expect(unique(all.map((i) => i.id))).toBe(true);
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
