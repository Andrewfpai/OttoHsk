/**
 * Structural checks on the hand-written study content. They cannot judge the
 * Chinese, but they catch the mistakes that would silently mark a learner
 * wrong: an answer that is not among the options, a sentence with two blanks,
 * a duplicated id that would merge two items' results.
 */
import { describe, expect, it } from "vitest";

import { confusables } from "../confusables";
import { grammarPatterns } from "../grammar";
import { orderingItems } from "../ordering";
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

describe("grammar", () => {
  it("has unique ids", () => {
    expect(unique(grammarPatterns.map((p) => p.id))).toBe(true);
  });

  it.each(grammarPatterns.map((p) => [p.id, p] as const))("%s is well-formed", (_, p) => {
    expect(p.examples.length).toBeGreaterThan(0);
    expect(p.quiz.length).toBeGreaterThan(0);
    for (const q of p.quiz) {
      expect(blanks(q.prompt), q.prompt).toBe(1);
      expect(unique(q.options), q.prompt).toBe(true);
      expect(q.options, q.prompt).toContain(q.answer);
    }
  });
});

describe("ordering", () => {
  it("has unique ids", () => {
    expect(unique(orderingItems.map((i) => i.id))).toBe(true);
  });

  it.each(orderingItems.map((i) => [i.id, i] as const))("%s is well-formed", (_, item) => {
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
