import { describe, expect, it } from "vitest";

import { daysUntilExam, localDate } from "../exam";
import { plainPinyin } from "../pinyin";

describe("daysUntilExam", () => {
  it("counts calendar days in Jakarta, not UTC", () => {
    // 18:00 UTC on 6 Nov is already 01:00 on 7 Nov in Jakarta: exam day.
    expect(localDate(new Date("2026-11-06T18:00:00Z"))).toBe("2026-11-07");
    expect(daysUntilExam(new Date("2026-11-06T18:00:00Z"))).toBe(0);
    expect(daysUntilExam(new Date("2026-11-06T16:00:00Z"))).toBe(1);
  });

  it("is 28 days from 10 October", () => {
    expect(daysUntilExam(new Date("2026-10-10T03:00:00Z"))).toBe(28);
  });
});

describe("plainPinyin", () => {
  it("drops tones, spaces and folds ü to v", () => {
    expect(plainPinyin("zhēn shí")).toBe("zhenshi");
    expect(plainPinyin("lǜ shī")).toBe("lvshi");
    expect(plainPinyin("nǚ")).toBe("nv");
  });
});
