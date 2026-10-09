import { describe, expect, it } from "vitest";

import type { OrderingItem } from "@/content/types";
import { seededRng } from "@/lib/random";

import { isCorrectOrder, sentenceOf } from "../ordering";
import { interleave, practiceOrder, summarize, withSession } from "../stats";

const item: OrderingItem = {
  id: "t",
  chunks: ["他", "无论多忙", "都坚持锻炼"],
  alternatives: [["无论多忙", "他", "都坚持锻炼"]],
  translation: "",
  point: "",
  explanation: "",
};

describe("ordering", () => {
  it("accepts the key and listed alternatives only", () => {
    expect(isCorrectOrder(item, ["他", "无论多忙", "都坚持锻炼"])).toBe(true);
    expect(isCorrectOrder(item, ["无论多忙", "他", "都坚持锻炼"])).toBe(true);
    expect(isCorrectOrder(item, ["都坚持锻炼", "他", "无论多忙"])).toBe(false);
  });

  it("adds the sentence-final punctuation", () => {
    expect(sentenceOf(["好"], "！")).toBe("好！");
    expect(sentenceOf(["好"])).toBe("好。");
  });
});

describe("drill stats", () => {
  const ids = ["a", "b", "c", "d"];
  const stats = {
    a: { attempts: 2, correct: 2, lastCorrect: true },
    b: { attempts: 1, correct: 0, lastCorrect: false },
  };

  it("orders missed, then untried, then mastered", () => {
    const order = practiceOrder(ids, (x) => x, stats, seededRng(1));
    expect(order[0]).toBe("b");
    expect(order.slice(1, 3).sort()).toEqual(["c", "d"]);
    expect(order[3]).toBe("a");
  });

  it("interleaves 60/40: three of every five from the first queue", () => {
    const a = ["a1", "a2", "a3", "a4", "a5", "a6"];
    const b = ["b1", "b2", "b3", "b4"];
    expect(interleave(a, b, 0.6)).toEqual(["a1", "b1", "a2", "b2", "a3", "a4", "b3", "a5", "b4", "a6"]);
    // One queue running dry leaves the other to finish alone, order intact.
    expect(interleave(["a1"], ["b1", "b2", "b3"], 0.6)).toEqual(["a1", "b1", "b2", "b3"]);
    expect(interleave([], ["b1"], 0.6)).toEqual(["b1"]);
  });

  it("counts mastered by the latest attempt, session answers on top", () => {
    expect(summarize(ids, stats)).toEqual({ total: 4, tried: 2, mastered: 1 });
    const merged = withSession(stats, { b: true, c: false });
    expect(summarize(ids, merged)).toEqual({ total: 4, tried: 3, mastered: 2 });
    expect(merged.b).toEqual({ attempts: 2, correct: 1, lastCorrect: true });
  });
});
