import { describe, expect, it } from "vitest";

import { readingH51329 as paper } from "../reading-h51329";
import tokens from "../reading-tokens.json";
import type { ReadingToken } from "../types";
import { findWord } from "../words";

const all = tokens as Record<string, ReadingToken[]>;
const items = [...paper.part2, ...paper.part3];
const questions = items.flatMap((i) => i.questions);
const join = (key: string) => (all[key] ?? []).map((t) => t.t).join("");
const unmark = (text: string) => text.replace(/\[\[|\]\]/g, "");

describe("reading paper H51329", () => {
  it("has questions 61–90, in order, with the official answer key", () => {
    expect(questions.map((q) => q.number)).toEqual(Array.from({ length: 30 }, (_, i) => 61 + i));
    const key = questions.map((q) => "ABCD"[q.answer]).join("");
    expect(key).toBe("CCDCDCCBBCADABADDCACDCADDBDBDA");
  });

  it("gives Part 2 one statement question per passage, Part 3 four prompted ones", () => {
    for (const item of paper.part2) {
      expect(item.questions).toHaveLength(1);
      expect(item.questions[0].prompt).toBeUndefined();
    }
    for (const item of paper.part3) {
      expect(item.questions).toHaveLength(4);
      for (const q of item.questions) expect(q.prompt).toBeTruthy();
    }
  });

  it("explains every answer and has four distinct options", () => {
    for (const q of questions) {
      expect(q.why.length).toBeGreaterThan(20);
      expect(new Set(q.options).size).toBe(4);
    }
  });
});

describe("reading tokens", () => {
  it("rebuild every passage, prompt and option exactly (run scripts/build-reading-tokens.ts)", () => {
    for (const item of items) {
      expect(join(item.id)).toBe(unmark(item.passage));
      for (const q of item.questions) {
        if (q.prompt) expect(join(`${paper.id}#${q.number}`)).toBe(unmark(q.prompt));
        q.options.forEach((o, i) => expect(join(`${paper.id}#${q.number}.${i}`)).toBe(o));
      }
    }
  });

  it("underline exactly the marked parts", () => {
    for (const item of items) {
      const marked = [...item.passage.matchAll(/\[\[([^\]]+)\]\]/g)].map((m) => m[1]).join("");
      const underlined = all[item.id].filter((t) => t.u).map((t) => t.t).join("");
      expect(underlined).toBe(marked);
    }
  });

  it("give every word pinyin, nearly every one a meaning, and real ids", () => {
    const words = Object.values(all).flat().filter((t) => /\p{Script=Han}/u.test(t.t));
    for (const t of words) expect(t.p).toBeTruthy();
    expect(words.filter((t) => t.g).length / words.length).toBeGreaterThan(0.99);
    for (const t of words) if (t.id) expect(findWord(t.id)?.hanzi).toBe(t.t);
  });
});
