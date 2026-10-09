import { describe, expect, it } from "vitest";

import { words } from "@/content/words";
import { seededRng } from "@/lib/random";

import { buildDeck } from "../deck";
import { afterTest, failAt, isLocked, isPass, lockDurationMs, MAX_LOCK_MS } from "../lockout";
import { buildQuestions } from "../questions";
import { KNOWN_STRENGTH, gapFor, nextSchedule, statusOf } from "../schedule";

const NOW = new Date("2026-10-10T08:00:00Z");
const MIN = 60_000;

describe("schedule", () => {
  it("brings a first right answer back two tests later (test 1 → test 3)", () => {
    expect(nextSchedule(null, true, 1)).toEqual({ strength: 1, dueTest: 3 });
  });

  it("brings any wrong answer back in the very next test, 2 strength lower", () => {
    expect(nextSchedule(4, false, 10)).toEqual({ strength: 2, dueTest: 11 });
    expect(nextSchedule(1, false, 10)).toEqual({ strength: 0, dueTest: 11 });
    expect(nextSchedule(null, false, 1)).toEqual({ strength: 0, dueTest: 2 });
  });

  it("forgives a slip on a strong word: one right answer after it and it is spaced again", () => {
    const slip = nextSchedule(5, false, 40); // known word, misclicked in test 40
    expect(slip).toEqual({ strength: 3, dueTest: 41 });
    expect(nextSchedule(slip.strength, true, 41)).toEqual({ strength: 4, dueTest: 56 });
  });

  it("spaces strength 0–6 as 1, 2, 4, 8, 15, 30, 60 tests, capped at 6", () => {
    expect([0, 1, 2, 3, 4, 5, 6, 9].map(gapFor)).toEqual([1, 2, 4, 8, 15, 30, 60, 60]);
    expect(nextSchedule(6, true, 100)).toEqual({ strength: 6, dueTest: 160 });
  });

  it("calls a word known after 5 right answers with no slips", () => {
    let strength: number | null = null;
    let test = 1;
    for (let i = 0; i < KNOWN_STRENGTH; i++) {
      expect(statusOf(strength)).not.toBe("known");
      const next = nextSchedule(strength, true, test);
      strength = next.strength;
      test = next.dueTest;
    }
    expect(statusOf(strength)).toBe("known");
    // Learned in test 1; fifth right answer comes in test 1+2+4+8+15 = 30.
    expect(test).toBe(1 + 2 + 4 + 8 + 15 + 30);
  });

  it("says new only for words never tested", () => {
    expect(statusOf(null)).toBe("new");
    expect(statusOf(0)).toBe("learning");
    expect(statusOf(4)).toBe("learning");
  });
});

describe("lockout", () => {
  it("fails only when more than 60% are wrong", () => {
    expect(isPass(8, 20)).toBe(true); // 60% wrong exactly
    expect(isPass(7, 20)).toBe(false); // 65% wrong
    expect(isPass(0, 0)).toBe(false);
  });

  it("names the exact wrong count that fails, matching isPass for every size", () => {
    expect([10, 20, 30].map(failAt)).toEqual([7, 13, 19]);
    for (let total = 1; total <= 50; total++) {
      const n = failAt(total);
      expect(isPass(total - (n - 1), total), `${n - 1} wrong of ${total}`).toBe(true);
      expect(isPass(total - n, total), `${n} wrong of ${total}`).toBe(false);
    }
  });

  it("doubles from 1 minute and caps at 1 hour", () => {
    expect([0, 1, 2, 3, 4, 5].map(lockDurationMs)).toEqual([1, 2, 4, 8, 16, 32].map((m) => m * MIN));
    expect(lockDurationMs(6)).toBe(MAX_LOCK_MS);
    expect(MAX_LOCK_MS).toBe(60 * MIN);
    expect(lockDurationMs(30)).toBe(MAX_LOCK_MS);
  });

  it("escalates on consecutive failures and resets on a pass", () => {
    let s = afterTest({ level: 0, lockedUntil: null }, false, NOW);
    expect(s.level).toBe(1);
    expect(s.lockedUntil!.getTime() - NOW.getTime()).toBe(MIN);

    s = afterTest(s, false, NOW);
    expect(s.lockedUntil!.getTime() - NOW.getTime()).toBe(2 * MIN);

    expect(afterTest(s, true, NOW)).toEqual({ level: 0, lockedUntil: null });
  });

  it("is locked strictly before lockedUntil", () => {
    const until = new Date(NOW.getTime() + MIN);
    expect(isLocked(until, NOW)).toBe(true);
    expect(isLocked(until, until)).toBe(false);
    expect(isLocked(null, NOW)).toBe(false);
  });
});

describe("deck", () => {
  it("fills an empty history with the most common new words", () => {
    const deck = buildDeck(words, [], 1, 10);
    expect(deck.newCount).toBe(10);
    expect(deck.words.map((w) => w.id)).toEqual(words.slice(0, 10).map((w) => w.id));
  });

  it("puts overdue words weakest first, and skips words not yet due", () => {
    const progress = [
      { wordId: words[5].id, strength: 2, dueTest: 4 },
      { wordId: words[6].id, strength: 1, dueTest: 9 },
      { wordId: words[7].id, strength: 0, dueTest: 3 },
      { wordId: words[8].id, strength: 3, dueTest: 4 },
    ];
    const deck = buildDeck(words, progress, 5, 10);
    expect(deck.words.slice(0, 3).map((w) => w.id)).toEqual([words[7].id, words[5].id, words[8].id]);
    expect(deck.words.some((w) => w.id === words[6].id)).toBe(false);
    expect(deck.reviewCount).toBe(3);
  });

  it("brings last test's misses back ahead of an older backlog", () => {
    // 30 old overdue words at strength 0, then a miss from test 9 (due in 10).
    const backlog = words.slice(0, 30).map((w) => ({ wordId: w.id, strength: 0, dueTest: 2 }));
    const missed = { wordId: words[40].id, strength: 2, dueTest: 10 };
    const deck = buildDeck(words, [...backlog, missed], 10, 10);
    expect(deck.words[0].id).toBe(words[40].id);
  });

  it("never leaves nothing to study once every word has been seen", () => {
    const progress = words.map((w, i) => ({ wordId: w.id, strength: 6, dueTest: 100 + i }));
    const deck = buildDeck(words, progress, 50, 10);
    expect(deck.words.map((w) => w.id)).toEqual(words.slice(0, 10).map((w) => w.id));
  });

  it("caps reviews at 70% while new words remain", () => {
    const progress = words.slice(0, 50).map((w) => ({ wordId: w.id, strength: 0, dueTest: 1 }));
    const deck = buildDeck(words, progress, 2, 10);
    expect(deck.reviewCount).toBe(7);
    expect(deck.newCount).toBe(3);
  });
});

describe("questions", () => {
  const deck = words.slice(0, 30);
  const questions = buildQuestions(deck, words, seededRng(42));

  it("asks about every word once, with 4 distinct options including the answer", () => {
    expect(questions.map((q) => q.wordId).sort()).toEqual(deck.map((w) => w.id).sort());
    for (const q of questions) {
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options).size).toBe(4);
      expect(q.options).toContain(q.wordId);
    }
  });

  it("mixes the three kinds evenly", () => {
    const count = (k: string) => questions.filter((q) => q.kind === k).length;
    expect([count("meaning"), count("hanzi"), count("pinyin")]).toEqual([10, 10, 10]);
  });

  it("never offers two options that share a meaning or a pinyin", () => {
    const all = buildQuestions(words.slice(0, 300), words, seededRng(7));
    const byId = new Map(words.map((w) => [w.id, w]));
    for (const q of all) {
      const opts = q.options.map((id) => byId.get(id)!);
      for (let i = 0; i < opts.length; i++) {
        for (let j = i + 1; j < opts.length; j++) {
          if (q.kind === "pinyin") {
            expect(opts[i].pinyin).not.toBe(opts[j].pinyin);
          } else {
            const a = opts[i].gloss.split("; ");
            expect(opts[j].gloss.split("; ").some((m) => a.includes(m))).toBe(false);
          }
        }
      }
    }
  });
});
