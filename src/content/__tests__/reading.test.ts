import { describe, expect, it } from "vitest";

import { READING_SETS } from "../reading";
import tokens from "../reading-tokens.json";
import type { ReadingToken } from "../types";
import { findWord } from "../words";

const all = tokens as Record<string, ReadingToken[]>;
const join = (key: string) => (all[key] ?? []).map((t) => t.t).join("");
const unmark = (text: string) => text.replace(/\[\[|\]\]/g, "");

/** Official keys for questions 61–90, from each paper's answer sheet. */
const KEYS: Record<string, string> = {
  h51329: "CCDCDCCBBCADABADDCACDCADDBDBDA",
  h51332: "AACDDADBABCCBCACDBCDACBBDCCBAA",
  h51328: "ABBCDBCDAABCBACDDCAAACBADDDCBD",
  h51553c: "DCCDBBBCBCDDCDBCBDBCBDDCDCDBDA",
};

it("has four sets, A–D, with distinct ids", () => {
  expect(READING_SETS.map((s) => s.label)).toEqual(["A", "B", "C", "D"]);
  expect(new Set(READING_SETS.map((s) => s.paper.id)).size).toBe(4);
});

describe.each(READING_SETS)("set $label", ({ paper }) => {
  const items = [...paper.part2, ...paper.part3];
  const questions = items.flatMap((i) => i.questions);

  it("has questions 61–90, in order, with the official answer key", () => {
    expect(questions.map((q) => q.number)).toEqual(Array.from({ length: 30 }, (_, i) => 61 + i));
    expect(questions.map((q) => "ABCD"[q.answer]).join("")).toBe(KEYS[paper.id]);
  });

  it("gives Part 2 one statement question per passage, Part 3 four prompted ones", () => {
    expect(paper.part2).toHaveLength(10);
    expect(paper.part3).toHaveLength(5);
    for (const item of paper.part2) {
      expect(item.questions).toHaveLength(1);
      expect(item.questions[0].prompt).toBeUndefined();
    }
    for (const item of paper.part3) {
      expect(item.questions).toHaveLength(4);
      for (const q of item.questions) expect(q.prompt).toBeTruthy();
    }
  });

  it("explains every answer, has four distinct options and ids that start with the paper", () => {
    for (const item of items) expect(item.id.startsWith(`${paper.id}-`)).toBe(true);
    for (const q of questions) {
      expect(q.why.length).toBeGreaterThan(20);
      expect(new Set(q.options).size).toBe(4);
    }
  });

  it("has clean passages: no ASCII spaces or stray PDF characters", () => {
    for (const item of items) {
      expect(unmark(item.passage)).not.toMatch(/ |研宄|—个|[А-Яа-я]/);
    }
  });

  it("is rebuilt exactly by its tokens (run scripts/build-reading-tokens.ts)", () => {
    for (const item of items) {
      expect(join(item.id)).toBe(unmark(item.passage));
      for (const q of item.questions) {
        if (q.prompt) expect(join(`${paper.id}#${q.number}`)).toBe(unmark(q.prompt));
        q.options.forEach((o, i) => expect(join(`${paper.id}#${q.number}.${i}`)).toBe(o));
      }
    }
  });

  it("underlines exactly the marked parts", () => {
    for (const item of items) {
      const marked = [...item.passage.matchAll(/\[\[([^\]]+)\]\]/g)].map((m) => m[1]).join("");
      const underlined = all[item.id].filter((t) => t.u).map((t) => t.t).join("");
      expect(underlined).toBe(marked);
    }
  });
});

it("tokens give every word pinyin, nearly every one a meaning, and real ids", () => {
  const words = Object.values(all).flat().filter((t) => /\p{Script=Han}/u.test(t.t));
  for (const t of words) expect(t.p).toBeTruthy();
  expect(words.filter((t) => t.g).length / words.length).toBeGreaterThan(0.98);
  for (const t of words) if (t.id) expect(findWord(t.id)?.hanzi).toBe(t.t);
});
