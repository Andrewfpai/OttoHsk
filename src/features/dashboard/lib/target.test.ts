import { describe, expect, it } from "vitest";

import { dailyTarget, progressOf, wordCredit } from "./target";

describe("dailyTarget", () => {
  const base = { total: 1300, startDate: "2026-10-09", examDate: "2026-11-07" };

  it("plans every word known by 1 Nov, the same number each day", () => {
    // 9 Oct to 1 Nov is 24 days: 1,300 / 24 → 55 a day.
    const t = dailyTarget({ ...base, progress: 0, today: "2026-10-09" })!;
    expect(t.goalDate).toBe("2026-11-01");
    expect(t.planDays).toBe(24);
    expect(t.perDay).toBe(55);
    expect(t.day).toBe(1);
    expect(t.targetToday).toBe(55);
  });

  it("says how far behind the plan the learner is today", () => {
    // Day 7 (15 Oct): 7 × 55 = 385 should be known.
    const t = dailyTarget({ ...base, progress: 223, today: "2026-10-15" })!;
    expect(t.day).toBe(7);
    expect(t.targetToday).toBe(385);
    expect(t.behind).toBe(162);
  });

  it("is 0 behind when ahead of plan, and never targets more than every word", () => {
    expect(dailyTarget({ ...base, progress: 500, today: "2026-10-15" })!.behind).toBe(0);
    expect(dailyTarget({ ...base, progress: 0, today: "2026-11-01" })!.targetToday).toBe(1300);
  });

  it("starts today when no test has been taken yet", () => {
    const t = dailyTarget({ ...base, startDate: "2026-10-20", progress: 0, today: "2026-10-15" })!;
    expect(t.day).toBe(1);
    expect(t.planDays).toBe(18);
  });

  it("has no target without an exam date, or after the goal day", () => {
    expect(dailyTarget({ ...base, examDate: null, progress: 0, today: "2026-10-15" })).toBeNull();
    expect(dailyTarget({ ...base, progress: 0, today: "2026-11-02" })).toBeNull();
  });
});

describe("progress credit", () => {
  it("counts a known word once, and a learning word by its strength", () => {
    expect([0, 1, 2, 3, 6].map(wordCredit)).toEqual([0.25, 0.5, 0.75, 1, 1]);
  });

  it("does not treat one right answer as the word done", () => {
    // Fast-tracked after one right answer: strength 2, ¾ of a word.
    expect(progressOf([2, 2, 2, 2])).toBe(3);
    expect(progressOf([3, 3, 0, 0])).toBe(3);
  });
});
